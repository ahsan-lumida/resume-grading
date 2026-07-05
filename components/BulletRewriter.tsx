"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ResumeAnalysis } from "@/types/analysis";

// Highlights [BRACKETED] placeholders (e.g. [METRIC], [X%]) in the rewritten
// bullet so the user sees exactly where to drop in real numbers.
function highlightMetrics(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span key={i} className="rounded bg-accent-2-soft px-1 font-mono text-amber">
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
  const reduceMotion = useReducedMotion();

  if (!bullets || bullets.length === 0) return null;

  const panel = (delay: number) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.3 },
        }
      : {
          initial: { opacity: 0, x: -10 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, margin: "0px 0px -40px 0px" },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
        Bullet Rewrites
      </h2>
      <div className="space-y-4">
        {bullets.map((b, i) => (
          <div key={i} className="glass rounded-2xl border border-border p-5">
            {/* Before → after: original fades in first, improved follows a beat later */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <motion.div {...panel(0)} className="rounded-xl border border-border bg-elevated p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-red">
                  Original
                </span>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{b.original}</p>
              </motion.div>
              <motion.div {...panel(0.25)} className="rounded-xl border border-green/20 bg-green/5 p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-green">
                  Improved
                </span>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  {highlightMetrics(b.rewritten)}
                </p>
              </motion.div>
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
