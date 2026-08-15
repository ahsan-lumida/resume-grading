"use client";

import { useEffect } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, HelpCircle, TrendingDown, TrendingUp } from "lucide-react";
import type { CareerTrajectory, ResumeAnalysis } from "@/types/analysis";
import { scoreToGrade } from "@/lib/ui";

const RING_SIZE = 144;
const RING_RADIUS = 62;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// Radial score ring: the arc sweeps 0 → score and the number counts up on the
// same spring, so they always agree. Static under prefers-reduced-motion.
function ScoreRing({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(10, score));
  const grade = scoreToGrade(clamped);
  const reduceMotion = useReducedMotion();

  const spring = useSpring(0, { stiffness: 45, damping: 16 });
  const dashOffset = useTransform(spring, (v) => RING_CIRCUMFERENCE * (1 - v / 10));
  const display = useTransform(spring, (v) => (Math.round(v * 10) / 10).toFixed(1));

  useEffect(() => {
    if (reduceMotion) spring.jump(clamped);
    else spring.set(clamped);
  }, [clamped, reduceMotion, spring]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative"
        role="img"
        aria-label={`Overall grade ${grade}, score ${clamped.toFixed(1)} out of 10`}
      >
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          aria-hidden="true"
        >
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="var(--accent-2-soft)"
            strokeWidth="9"
          />
          <motion.circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <motion.span className="font-display text-4xl font-bold tabular-nums text-accent">
            {display}
          </motion.span>
          <span className="font-mono text-xs text-tertiary">/ 10</span>
        </div>
      </div>
      <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-0.5 font-display text-sm font-bold text-accent">
        Grade {grade}
      </span>
    </div>
  );
}

const trajectoryMeta: Record<
  CareerTrajectory,
  { label: string; Icon: typeof TrendingUp; className: string }
> = {
  ascending: { label: "Ascending", Icon: TrendingUp, className: "text-green" },
  lateral: { label: "Lateral", Icon: ArrowRight, className: "text-amber" },
  descending: { label: "Descending", Icon: TrendingDown, className: "text-red" },
  unclear: { label: "Unclear", Icon: HelpCircle, className: "text-secondary" },
};

export default function ScoreDashboard({ analysis }: { analysis: ResumeAnalysis }) {
  const reduceMotion = useReducedMotion();
  const radarData = [
    { metric: "Experience", value: analysis.experience_score },
    { metric: "Impact", value: analysis.achievement_impact_score },
    { metric: "Tech Skills", value: analysis.technical_skills_score },
    { metric: "Structure", value: analysis.structure_readability_score },
  ];

  // Fall back to "unclear" if the API returns an out-of-enum trajectory —
  // otherwise traj?.Icon / traj?.label below would blow up the whole results page.
  const traj = trajectoryMeta[analysis.career_trajectory] ?? trajectoryMeta.unclear;
  const percentile = Math.max(0, Math.min(100, analysis.market_competitiveness_percentile));
  const topPct = Math.max(1, 100 - Math.round(percentile));

  return (
    <section className="glass rounded-2xl border border-border p-6 md:p-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
        {/* Score ring + rationale */}
        <div className="flex flex-col items-center text-center md:w-1/2">
          <ScoreRing score={analysis.overall_score} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">
            {analysis.score_rationale}
          </p>
        </div>

        {/* Radar of subscores */}
        <div className="h-56 w-full md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
              />
              <Radar
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--accent-glow)"
                fillOpacity={1}
                dot={{ fill: "var(--accent)", r: 3 }}
                isAnimationActive={!reduceMotion}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Badges + first impression */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/60 pt-6">
        <span className="rounded-full border border-border-bright bg-elevated px-3 py-0.5 text-xs font-medium uppercase tracking-wider text-secondary">
          {analysis.seniority_level}
        </span>
        <span
          className={`flex items-center gap-1.5 rounded-full border border-border-bright bg-elevated px-3 py-0.5 text-xs font-medium ${traj.className}`}
        >
          <traj.Icon size={13} strokeWidth={2.5} />
          {traj.label}
        </span>

        {/* Market percentile */}
        <div className="ml-auto flex w-full items-center gap-3 sm:w-auto sm:min-w-[220px]">
          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-secondary">
            Top {topPct}%
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: reduceMotion ? `${percentile}%` : "0%" }}
              animate={{ width: `${percentile}%` }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>

      {analysis.first_impression && (
        <p className="mt-4 text-sm italic leading-relaxed text-secondary">
          “{analysis.first_impression}”
        </p>
      )}
    </section>
  );
}
