import { CheckCircle2, XCircle } from "lucide-react";
import type { ResumeAnalysis } from "@/types/analysis";

export default function StrengthsWeaknesses({ analysis }: { analysis: ResumeAnalysis }) {
  const strengths = analysis.strengths ?? [];
  const weaknesses = analysis.weaknesses ?? [];
  const missing = analysis.missing_sections ?? [];

  return (
    <section className="rounded-2xl border border-border glass p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-secondary">
            Strengths
          </h2>
          <ul className="space-y-3">
            {strengths.map((s, i) => (
              <li key={i} className="flex gap-2.5">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-primary">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-secondary">
            Weaknesses
          </h2>
          <ul className="space-y-3">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex gap-2.5">
                <XCircle size={16} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-primary">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {missing.length > 0 && (
        <div className="mt-6 border-t border-border/60 pt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
            Missing Sections
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.map((m, i) => (
              <span
                key={i}
                className="rounded-full bg-elevated px-3 py-0.5 text-xs font-medium capitalize text-secondary"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
