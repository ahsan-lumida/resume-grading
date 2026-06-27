"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  UploadCloud,
} from "lucide-react";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ".pdf,.docx";
const VALID_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const LOADING_MESSAGES = [
  "Parsing your resume...",
  "Redacting personal info...",
  "Running AI analysis...",
  "Generating improvements...",
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validate(file: File): string | null {
  const isValidType =
    VALID_TYPES.includes(file.type) ||
    /\.(pdf|docx)$/i.test(file.name);
  if (!isValidType) return "Unsupported file type. Please upload a PDF or DOCX.";
  if (file.size > MAX_BYTES) return "That file is too large. Maximum size is 5 MB.";
  return null;
}

export default function UploadZone({
  onSubmit,
  loading,
}: {
  onSubmit: (file: File, jobDescription?: string) => void;
  loading: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [jdOpen, setJdOpen] = useState(false);
  const [jd, setJd] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle status messages while the analysis runs. (Index is reset in
  // handleSubmit so each run starts on the first message.)
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [loading]);

  function acceptFile(f: File | undefined) {
    if (!f) return;
    const err = validate(f);
    if (err) {
      setFileError(err);
      setFile(null);
      return;
    }
    setFileError(null);
    setFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (loading) return;
    acceptFile(e.dataTransfer.files?.[0]);
  }

  function handleSubmit() {
    if (!file || loading) return;
    setMsgIndex(0);
    onSubmit(file, jd);
  }

  return (
    <div className="w-full">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!loading) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !loading) inputRef.current?.click();
        }}
        className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center backdrop-blur transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
          dragOver
            ? "border-accent bg-elevated shadow-[0_0_50px_-12px_rgba(79,110,247,0.6)]"
            : "border-border-bright bg-card/70 hover:border-accent/60 hover:bg-elevated/70"
        } ${loading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
        {file ? (
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-400" size={22} />
            <div className="text-left">
              <p className="flex items-center gap-2 text-sm font-medium text-primary">
                <FileText size={15} className="text-secondary" />
                {file.name}
              </p>
              <p className="text-xs text-tertiary">{formatSize(file.size)}</p>
            </div>
          </div>
        ) : (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-elevated ring-1 ring-border-bright transition-colors group-hover:ring-accent/50">
              <UploadCloud
                className="text-secondary transition-colors group-hover:text-accent"
                size={26}
              />
            </span>
            <p className="mt-4 text-sm font-medium text-primary">
              Drop your resume here, or{" "}
              <span className="text-accent">click to browse</span>
            </p>
            <p className="mt-1 text-xs text-tertiary">PDF or DOCX, up to 5 MB</p>
          </>
        )}
      </div>

      {fileError && <p className="mt-2 text-sm text-red-400">{fileError}</p>}

      {/* Collapsible job description */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setJdOpen((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${jdOpen ? "rotate-180" : ""}`}
          />
          Add job description for tailoring tips
        </button>
        {jdOpen && (
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            rows={5}
            disabled={loading}
            className="mt-3 w-full resize-y rounded-xl border border-border bg-base p-3 text-sm text-primary placeholder:text-tertiary focus:border-border-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!file || loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:shadow-[0_10px_40px_-12px_rgba(79,110,247,0.85)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {LOADING_MESSAGES[msgIndex]}
          </>
        ) : (
          "Analyze My Resume →"
        )}
      </button>
    </div>
  );
}
