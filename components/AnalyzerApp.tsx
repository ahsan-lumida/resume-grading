"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AlertCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { submitAnalysis } from "@/lib/client";
import { ApiError, type ApiState, type ProgressStage, type ResumeAnalysis } from "@/types/analysis";
import UploadZone from "@/components/UploadZone";
import ResultsNav, { type NavSection } from "@/components/ResultsNav";
import { SkeletonCard } from "@/components/Skeleton";

// Heavy result components are code-split and excluded from SSR so recharts and
// friends don't block first paint. Skeletons reserve space (no layout shift).
// Next requires the options object to be an inline literal per call.
const ScoreDashboard = dynamic(() => import("@/components/ScoreDashboard"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const QuickWins = dynamic(() => import("@/components/QuickWins"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const StrengthsWeaknesses = dynamic(() => import("@/components/StrengthsWeaknesses"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const ATSPanel = dynamic(() => import("@/components/ATSPanel"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const InterviewOdds = dynamic(() => import("@/components/InterviewOdds"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const ImprovementsBoard = dynamic(() => import("@/components/ImprovementsBoard"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const BulletRewriter = dynamic(() => import("@/components/BulletRewriter"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const QuantificationPanel = dynamic(() => import("@/components/QuantificationPanel"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const RedFlags = dynamic(() => import("@/components/RedFlags"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const TailoringTips = dynamic(() => import("@/components/TailoringTips"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});

interface SectionDef extends NavSection {
  node: React.ReactNode;
  show: boolean;
}

function buildSections(a: ResumeAnalysis): SectionDef[] {
  const defs: SectionDef[] = [
    { id: "score", label: "Score", show: true, node: <ScoreDashboard analysis={a} /> },
    {
      id: "quick-wins",
      label: "Quick Wins",
      show: (a.quick_wins?.length ?? 0) > 0,
      node: <QuickWins wins={a.quick_wins} />,
    },
    {
      id: "strengths",
      label: "Strengths",
      show: true,
      node: <StrengthsWeaknesses analysis={a} />,
    },
    { id: "ats", label: "ATS", show: true, node: <ATSPanel analysis={a} /> },
    {
      id: "interview-odds",
      label: "Interview Odds",
      show: (a.interview_probability_by_tier?.length ?? 0) > 0,
      node: <InterviewOdds tiers={a.interview_probability_by_tier} />,
    },
    {
      id: "improvements",
      label: "Improvements",
      show: (a.top_improvements?.length ?? 0) > 0,
      node: <ImprovementsBoard improvements={a.top_improvements} />,
    },
    {
      id: "rewrites",
      label: "Rewrites",
      show: (a.rewritten_bullets?.length ?? 0) > 0,
      node: <BulletRewriter bullets={a.rewritten_bullets} />,
    },
    {
      id: "quantify",
      label: "Add Numbers",
      show: (a.quantification_opportunities?.length ?? 0) > 0,
      node: <QuantificationPanel opportunities={a.quantification_opportunities} />,
    },
    { id: "red-flags", label: "Red Flags", show: true, node: <RedFlags flags={a.red_flags} /> },
    {
      id: "tailoring",
      label: "Tailoring",
      show: (a.tailoring_tips?.length ?? 0) > 0,
      node: <TailoringTips tips={a.tailoring_tips} />,
    },
  ];
  return defs.filter((d) => d.show);
}

export default function AnalyzerApp() {
  const [state, setState] = useState<ApiState>("idle");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ stage: ProgressStage; pct: number } | null>(null);

  // Warm up the Render backend the moment this component mounts so it's
  // ready by the time the user finishes uploading their file.
  useEffect(() => {
    fetch("/api/warmup").catch(() => undefined);
  }, []);

  async function handleSubmit(file: File, jobDescription?: string) {
    setState("loading");
    setError(null);
    setProgress({ stage: "parsing", pct: 0 });
    try {
      const result = await submitAnalysis(file, jobDescription, setProgress);
      setAnalysis(result);
      setState("done");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setState("error");
    } finally {
      setProgress(null);
    }
  }

  function reset() {
    setState("idle");
    setAnalysis(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Results view ────────────────────────────────────────────────
  if (state === "done" && analysis) {
    const sections = buildSections(analysis);
    const navSections: NavSection[] = sections.map(({ id, label }) => ({ id, label }));

    return (
      <>
        <ResultsNav sections={navSections} />
        <div className="flex flex-col gap-6 pb-24">
          {/* Results header */}
          <div className="animate-fade-slide-up flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Your resume analysis
              </h2>
              <p className="mt-1 text-sm text-secondary">
                The honest breakdown — work it top to bottom.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-tertiary">
              {analysis.redaction_applied && (
                <span className="flex items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-2.5 py-1 text-green">
                  <ShieldCheck size={13} aria-hidden="true" />
                  Personal info redacted
                </span>
              )}
              {analysis.provider_used && (
                <span className="hidden sm:inline">Analyzed via {analysis.provider_used}</span>
              )}
            </div>
          </div>

          {sections.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="animate-fade-slide-up scroll-mt-24"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              {s.node}
            </div>
          ))}

          {/* Sticky reset */}
          <div className="pointer-events-none sticky bottom-6 flex justify-center">
            <button
              onClick={reset}
              className="pointer-events-auto flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent shadow-paper-lg transition-colors hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Analyze another resume
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── Loading view ────────────────────────────────────────────────
  if (state === "loading") {
    return (
      <div className="flex flex-col gap-8">
        <div className="mx-auto w-full max-w-[480px]">
          <UploadZone onSubmit={handleSubmit} loading progress={progress} />
        </div>
        <div className="flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Idle / error view ───────────────────────────────────────────
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-4">
      {state === "error" && error && (
        <div className="animate-fade-slide-up flex items-start gap-3 rounded-2xl border border-red/30 bg-red/10 p-4 text-sm text-red">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      <UploadZone onSubmit={handleSubmit} loading={false} />
    </div>
  );
}
