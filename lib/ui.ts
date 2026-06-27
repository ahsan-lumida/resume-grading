// Small presentation helpers shared across result components.

import type { Section } from "@/types/analysis";

/** Maps a 0–10 score to its design-system color hex (for SVG strokes). */
export function scoreHex(score: number): string {
  if (score > 7) return "#22c55e"; // --score-high
  if (score >= 5) return "#f59e0b"; // --score-mid
  return "#ef4444"; // --score-low
}

/** Maps a 0–100 percentage to a color hex (interview odds, meters). */
export function pctHex(pct: number): string {
  if (pct > 60) return "#22c55e";
  if (pct >= 30) return "#f59e0b";
  return "#ef4444";
}

/** Tailwind class set for a section tag chip, colored per section. */
export const sectionTagClass: Record<Section, string> = {
  experience: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  skills: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  summary: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  education: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  structure: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  other: "bg-slate-500/10 text-slate-300 border-slate-500/20",
};

/** Tailwind text/bg classes for low/medium/high effort or impact pills. */
export const levelClass: Record<"low" | "medium" | "high", string> = {
  low: "bg-green-500/10 text-green-400 border-green-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};
