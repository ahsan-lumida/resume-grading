"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Download, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { submitGeneration } from "@/lib/client";
import { useResumeSession } from "@/components/ResumeSessionProvider";
import ResumeTemplatePreview from "@/components/ResumeTemplatePreview";
import { ApiError } from "@/types/analysis";
import type { GenerateProgressStage, GeneratedResume } from "@/types/resumeContent";

type ViewState = "loading" | "done" | "error";

const STAGE_LABELS: Record<GenerateProgressStage, string> = {
  parsing: "Reading your resume...",
  redacting_pii: "Securing your personal info...",
  calling_llm: "Rewriting your resume with every fix applied...",
  validating: "Validating the new content...",
  restoring_contact_info: "Restoring your contact details...",
  rendering_pdf: "Designing your new resume...",
};

function downloadPdf(base64: string, filename: string) {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
  const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ImprovedResumeApp() {
  const { file, jobDescription, analysis } = useResumeSession();
  const [state, setState] = useState<ViewState>("loading");
  const [generated, setGenerated] = useState<GeneratedResume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ stage: GenerateProgressStage; pct: number } | null>(null);
  const started = useRef(false);

  // No setState before the first `await` here — this is called directly from
  // the mount effect below, and synchronous setState reachable from an effect
  // body triggers cascading renders (react-hooks/set-state-in-effect).
  async function execute() {
    if (!file || !analysis) return;
    try {
      const result = await submitGeneration(file, jobDescription, analysis, setProgress);
      setGenerated(result);
      setState("done");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setState("error");
    } finally {
      setProgress(null);
    }
  }

  // Retry from the error view — a plain event handler, so a synchronous
  // reset here is fine (it's not reachable from the effect body above).
  function retry() {
    setState("loading");
    setError(null);
    setProgress({ stage: "parsing", pct: 0 });
    execute();
  }

  useEffect(() => {
    if (started.current) return;
    if (!file || !analysis) return;
    started.current = true;
    // One-time fetch-on-mount, guarded by the ref above so it can never
    // re-fire; the rule can't see that guard statically.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, analysis]);

  // No file/analysis in session — e.g. a hard refresh or a direct link.
  // Nothing is persisted server-side, so send the user back to start over.
  if (!file || !analysis) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-elevated text-secondary ring-1 ring-border-bright">
          <AlertCircle size={22} aria-hidden="true" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          No resume in this session
        </h1>
        <p className="text-sm leading-relaxed text-secondary">
          We don&apos;t store your resume — this page only works right after an analysis in the
          same browser tab. Analyze your resume again to generate an improved version.
        </p>
        <Link
          href="/#upload"
          className="mt-2 flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dim"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Analyze my resume
        </Link>
      </div>
    );
  }

  if (state === "loading") {
    const pct = progress?.pct ?? 0;
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 py-24 text-center">
        <Loader2 size={28} className="animate-spin text-accent" aria-hidden="true" />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-primary">
            Building your improved resume
          </h1>
          <p className="mt-2 text-sm text-secondary">
            {progress ? STAGE_LABELS[progress.stage] : "Getting started..."}
          </p>
        </div>
        <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red/10 text-red ring-1 ring-red/30">
          <AlertCircle size={22} aria-hidden="true" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Couldn&apos;t generate your resume
        </h1>
        <p className="text-sm leading-relaxed text-secondary">{error}</p>
        <button
          onClick={retry}
          className="mt-2 flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dim"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }

  // ── Done ────────────────────────────────────────────────────────
  const resume = generated!.content;
  const filename = `${(resume.contact.name || "Improved_Resume").trim().replace(/\s+/g, "_")}_Resume.pdf`;

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="animate-fade-slide-up flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Your improved resume
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Every fix from your analysis, already applied — proofread the details, then download.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-2.5 py-1 text-xs text-green">
          <ShieldCheck size={13} aria-hidden="true" />
          Personal info never left redaction
        </span>
      </div>

      <div className="animate-fade-slide-up">
        <ResumeTemplatePreview resume={resume} />
      </div>

      <div className="pointer-events-none sticky bottom-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => downloadPdf(generated!.pdf_base64, filename)}
          className="glow-accent pointer-events-auto flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent shadow-paper-lg transition-colors hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </button>
        <Link
          href="/#upload"
          className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-paper-sm backdrop-blur-xl transition-colors hover:border-border-bright hover:bg-elevated"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Analyze another resume
        </Link>
      </div>
    </div>
  );
}
