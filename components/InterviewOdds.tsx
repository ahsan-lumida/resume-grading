"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ResumeAnalysis } from "@/types/analysis";
import { pctHex } from "@/lib/ui";

export default function InterviewOdds({
  tiers,
}: {
  tiers: ResumeAnalysis["interview_probability_by_tier"];
}) {
  const reduceMotion = useReducedMotion();

  if (!tiers || tiers.length === 0) return null;

  return (
    <section className="glass rounded-2xl border border-border p-6">
      <h2 className="mb-5 text-xs font-medium uppercase tracking-wider text-secondary">
        Interview Odds by Company Tier
      </h2>
      <div className="space-y-5">
        {tiers.map((t, i) => {
          const pct = Math.max(0, Math.min(100, t.probability_pct));
          const color = pctHex(pct);
          return (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-primary">{t.tier}</span>
                <span className="text-sm font-bold tabular-nums" style={{ color }}>
                  {Math.round(pct)}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: reduceMotion ? `${pct}%` : "0%" }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              {t.rationale && (
                <p className="mt-2 text-xs leading-relaxed text-secondary">{t.rationale}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
