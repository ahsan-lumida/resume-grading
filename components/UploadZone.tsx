"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";
import type { ProgressStage } from "@/types/analysis";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ".pdf,.docx";
const VALID_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Real stage names streamed from the backend, mapped to the same copy shown before.
const STAGE_LABELS: Record<ProgressStage, string> = {
  parsing: "Parsing your resume...",
  redacting_pii: "Redacting personal info...",
  calling_llm: "Running AI analysis...",
  validating: "Generating improvements...",
};
const DEFAULT_LOADING_LABEL = "Analyzing...";

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
  progress = null,
}: {
  onSubmit: (file: File, jobDescription?: string) => void;
  loading: boolean;
  progress?: { stage: ProgressStage; pct: number } | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [jdOpen, setJdOpen] = useState(false);
  const [jd, setJd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

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
    onSubmit(file, jd);
  }

  return (
    <div className="w-full">
      {/* Drop zone — frosted glass panel with mouse-tracked 3D tilt */}
      <TiltCard maxTilt={4} className="rounded-2xl">
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
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center backdrop-blur-xl transition-[border-color,box-shadow,background-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
            dragOver
              ? "scale-[1.015] border-accent bg-accent/[0.08] shadow-[0_0_40px_var(--accent-glow),inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "border-white/20 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.35)] hover:border-accent/50 hover:bg-white/[0.06]"
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
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="text-green" size={22} aria-hidden="true" />
              <div className="text-left">
                <p className="flex items-center gap-2 text-sm font-medium text-primary">
                  <FileText size={15} className="text-secondary" />
                  {file.name}
                </p>
                <p className="text-xs text-tertiary">{formatSize(file.size)}</p>
              </div>
            </motion.div>
          ) : (
            <>
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-all duration-300 ${
                  dragOver
                    ? "bg-accent/15 ring-accent/50"
                    : "bg-elevated ring-border-bright group-hover:ring-accent/50"
                }`}
              >
                <UploadCloud
                  className={`transition-all duration-300 ${
                    dragOver ? "-translate-y-0.5 text-accent" : "text-secondary group-hover:text-accent"
                  }`}
                  size={26}
                  aria-hidden="true"
                />
              </span>
              <p className="mt-4 text-sm font-medium text-primary">
                {dragOver ? (
                  "Drop it — we've got it from here"
                ) : (
                  <>
                    Drop your resume here, or <span className="text-accent">click to browse</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-xs text-tertiary">PDF or DOCX, up to 5 MB</p>
            </>
          )}
        </div>
      </TiltCard>

      {fileError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red"
        >
          {fileError}
        </motion.p>
      )}

      {/* Collapsible job description */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setJdOpen((v) => !v)}
          aria-expanded={jdOpen}
          className="flex items-center gap-1.5 rounded text-sm font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${jdOpen ? "rotate-180" : ""}`}
          />
          Add job description for tailoring tips
        </button>
        <AnimatePresence initial={false}>
          {jdOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                rows={5}
                disabled={loading}
                className="mt-3 w-full resize-y rounded-xl border border-border bg-white/[0.03] p-3 text-sm text-primary backdrop-blur-xl placeholder:text-tertiary focus:border-border-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit — magnetic primary CTA with press scale-down */}
      <Magnetic className="mt-5" strength={0.08} maxShift={5}>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!file || loading}
          className={`flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-on-accent transition-[background-color,box-shadow] duration-200 hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:cursor-not-allowed disabled:opacity-40 ${
            file && !loading ? "glow-accent" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              {progress ? `${STAGE_LABELS[progress.stage]} (${progress.pct}%)` : DEFAULT_LOADING_LABEL}
            </>
          ) : (
            "Analyze My Resume →"
          )}
        </button>
      </Magnetic>

      {loading && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress?.pct ?? 0))}%` }}
          />
        </div>
      )}
    </div>
  );
}
