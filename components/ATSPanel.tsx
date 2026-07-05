"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ResumeAnalysis } from "@/types/analysis";
import { pctHex } from "@/lib/ui";

// Keyword chips pop in one after another (30ms apart) when scrolled into view.
function ChipList({
  keywords,
  empty,
  chipClass,
}: {
  keywords: string[];
  empty: string;
  chipClass: string;
}) {
  const reduceMotion = useReducedMotion();
  if (keywords.length === 0) {
    return <span className="text-sm text-tertiary">{empty}</span>;
  }
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={{ show: { transition: { staggerChildren: reduceMotion ? 0 : 0.03 } } }}
    >
      {keywords.map((kw, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 6 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 400, damping: 22 },
            },
          }}
          className={`rounded-full border px-3 py-1 font-mono text-xs ${chipClass}`}
        >
          {kw}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function ATSPanel({ analysis }: { analysis: ResumeAnalysis }) {
  const reduceMotion = useReducedMotion();
  // Backend sends ats_score on a 1–10 scale (same as overall_score); scale to
  // 0–100 for the ATS-convention percentage display used here.
  const score = Math.max(0, Math.min(100, analysis.ats_score * 10));
  const present = analysis.ats_keywords_present ?? [];
  const missing = analysis.ats_keywords_missing ?? [];

  return (
    <section className="glass rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium uppercase tracking-wider text-secondary">
          ATS Score
        </h2>
        <span className="text-sm font-semibold tabular-nums" style={{ color: pctHex(score) }}>
          {Math.round(score)}
          <span className="text-secondary"> / 100</span>
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: pctHex(score) }}
          initial={{ width: reduceMotion ? `${score}%` : "0%" }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
            Found <span className="text-green">({present.length})</span>
          </p>
          <ChipList
            keywords={present}
            empty="None detected."
            chipClass="border-green/20 bg-green/10 text-green"
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
            Missing <span className="text-red">({missing.length})</span>
          </p>
          <ChipList
            keywords={missing}
            empty="Nothing critical missing."
            chipClass="border-red/20 bg-red/10 text-red"
          />
        </div>
      </div>
    </section>
  );
}
