"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, HelpCircle, TrendingDown, TrendingUp } from "lucide-react";
import type { CareerTrajectory, ResumeAnalysis } from "@/types/analysis";
import { scoreHex } from "@/lib/ui";

const GAUGE = { size: 220, stroke: 10, r: 100, cx: 110, cy: 110 };
// Length of a semicircle of radius r (π·r).
const ARC_LEN = Math.PI * GAUGE.r;

function ArcGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(10, score));
  const color = scoreHex(clamped);
  const offset = ARC_LEN * (1 - clamped / 10);
  const display = Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(1);

  return (
    <div className="relative" style={{ width: GAUGE.size, height: GAUGE.cy + GAUGE.stroke }}>
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: color, opacity: 0.22 }}
      />
      <svg
        width={GAUGE.size}
        height={GAUGE.cy + GAUGE.stroke}
        viewBox={`0 0 ${GAUGE.size} ${GAUGE.cy + GAUGE.stroke}`}
        role="img"
        aria-label={`Overall score ${display} out of 10`}
      >
        {/* Track */}
        <path
          d={`M ${GAUGE.cx - GAUGE.r} ${GAUGE.cy} A ${GAUGE.r} ${GAUGE.r} 0 0 1 ${GAUGE.cx + GAUGE.r} ${GAUGE.cy}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth={GAUGE.stroke}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${GAUGE.cx - GAUGE.r} ${GAUGE.cy} A ${GAUGE.r} ${GAUGE.r} 0 0 1 ${GAUGE.cx + GAUGE.r} ${GAUGE.cy}`}
          fill="none"
          stroke={color}
          strokeWidth={GAUGE.stroke}
          strokeLinecap="round"
          strokeDasharray={ARC_LEN}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            filter: `drop-shadow(0 0 6px ${color}66)`,
          }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-1 flex items-end justify-center gap-1">
        <span className="text-5xl font-bold tracking-tight" style={{ color }}>
          {display}
        </span>
        <span className="mb-1 text-2xl text-secondary">/ 10</span>
      </div>
    </div>
  );
}

const trajectoryMeta: Record<
  CareerTrajectory,
  { label: string; Icon: typeof TrendingUp; className: string }
> = {
  ascending: { label: "Ascending", Icon: TrendingUp, className: "text-green-400" },
  lateral: { label: "Lateral", Icon: ArrowRight, className: "text-amber-400" },
  descending: { label: "Descending", Icon: TrendingDown, className: "text-red-400" },
  unclear: { label: "Unclear", Icon: HelpCircle, className: "text-secondary" },
};

export default function ScoreDashboard({ analysis }: { analysis: ResumeAnalysis }) {
  const radarData = [
    { metric: "Experience", value: analysis.experience_score },
    { metric: "Impact", value: analysis.achievement_impact_score },
    { metric: "Tech Skills", value: analysis.technical_skills_score },
    { metric: "Structure", value: analysis.structure_readability_score },
  ];

  const traj = trajectoryMeta[analysis.career_trajectory];
  const percentile = Math.max(0, Math.min(100, analysis.market_competitiveness_percentile));
  const topPct = Math.max(1, 100 - Math.round(percentile));

  return (
    <section className="ring-gradient glow-soft rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
        {/* Gauge + rationale */}
        <div className="flex flex-col items-center text-center md:w-1/2">
          <ArcGauge score={analysis.overall_score} />
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
            <div
              className="h-full rounded-full bg-accent transition-all duration-700"
              style={{ width: `${percentile}%` }}
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
