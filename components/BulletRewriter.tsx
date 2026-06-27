import { Fragment } from "react";
import type { ResumeAnalysis } from "@/types/analysis";

// Highlights [BRACKETED] placeholders (e.g. [METRIC], [X%]) in the rewritten
// bullet so the user sees exactly where to drop in real numbers.
function highlightMetrics(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span
          key={i}
          className="rounded bg-amber-500/20 px-1 font-mono text-amber-400"
        >
          {part}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function BulletRewriter({
  bullets,
}: {
  bullets: ResumeAnalysis["rewritten_bullets"];
}) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
        Bullet Rewrites
      </h2>
      <div className="space-y-4">
        {bullets.map((b, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-base/40 p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-rose-400">
                  Original
                </span>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{b.original}</p>
              </div>
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-green-400">
                  Improved
                </span>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  {highlightMetrics(b.rewritten)}
                </p>
              </div>
            </div>
            {b.improvement_reason && (
              <p className="mt-3 text-xs italic leading-relaxed text-tertiary">
                {b.improvement_reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
