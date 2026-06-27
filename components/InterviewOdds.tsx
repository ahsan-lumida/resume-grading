"use client";

import { useEffect, useState } from "react";
import type { ResumeAnalysis } from "@/types/analysis";
import { pctHex } from "@/lib/ui";

export default function InterviewOdds({
  tiers,
}: {
  tiers: ResumeAnalysis["interview_probability_by_tier"];
}) {
  // Animate bars from 0 → probability on mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!tiers || tiers.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
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
                <span className="text-sm font-bold" style={{ color }}>
                  {Math.round(pct)}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{ width: mounted ? `${pct}%` : "0%", backgroundColor: color }}
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
