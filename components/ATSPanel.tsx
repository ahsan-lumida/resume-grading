import type { ResumeAnalysis } from "@/types/analysis";
import { pctHex } from "@/lib/ui";

export default function ATSPanel({ analysis }: { analysis: ResumeAnalysis }) {
  // ats_score is treated as a 0–100 percentage (ATS convention), matching the
  // market-percentile meter style.
  const score = Math.max(0, Math.min(100, analysis.ats_score));
  const present = analysis.ats_keywords_present ?? [];
  const missing = analysis.ats_keywords_missing ?? [];

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium uppercase tracking-wider text-secondary">
          ATS Score
        </h2>
        <span className="text-sm font-semibold" style={{ color: pctHex(score) }}>
          {Math.round(score)}
          <span className="text-secondary"> / 100</span>
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: pctHex(score) }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
            Found <span className="text-green-400">({present.length})</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {present.length === 0 ? (
              <span className="text-sm text-tertiary">None detected.</span>
            ) : (
              present.map((kw, i) => (
                <span
                  key={i}
                  className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 font-mono text-xs text-green-400"
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
            Missing <span className="text-red-400">({missing.length})</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.length === 0 ? (
              <span className="text-sm text-tertiary">Nothing critical missing.</span>
            ) : (
              missing.map((kw, i) => (
                <span
                  key={i}
                  className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 font-mono text-xs text-red-400"
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
