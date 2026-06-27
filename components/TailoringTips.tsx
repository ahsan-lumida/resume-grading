import { Target } from "lucide-react";
import type { ResumeAnalysis } from "@/types/analysis";

export default function TailoringTips({
  tips,
}: {
  tips: ResumeAnalysis["tailoring_tips"];
}) {
  if (!tips || tips.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xs font-medium uppercase tracking-wider text-secondary">
        Tailoring Tips
      </h2>
      <p className="mt-1 text-xs text-tertiary">Based on the job description you provided</p>
      <ol className="mt-4 space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-3">
            <Target size={16} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-sm leading-relaxed text-primary">
              <span className="mr-1 font-semibold text-secondary">{i + 1}.</span>
              {tip}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
