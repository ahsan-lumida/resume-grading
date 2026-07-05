// Small presentation helpers shared across result components.
// Colors here follow design-system/MASTER.md ("Ink & Parchment") — no raw
// Tailwind palette colors (indigo/cyan/violet/etc.), only the brand tokens
// plus a small set of muted "ledger tab" hues for section chips.

import type { Section } from "@/types/analysis";

/** Maps a 0–10 score to its design-system color (CSS var, adapts to dark mode). */
export function scoreHex(score: number): string {
  if (score > 7) return "var(--score-high)";
  if (score >= 5) return "var(--score-mid)";
  return "var(--score-low)";
}

/** Maps a 0–100 percentage to a color (CSS var, adapts to dark mode). */
export function pctHex(pct: number): string {
  if (pct > 60) return "var(--score-high)";
  if (pct >= 30) return "var(--score-mid)";
  return "var(--score-low)";
}

/** Maps a 0–10 resume score to a report-card letter grade for the grade badge. */
export function scoreToGrade(score: number): string {
  const s = Math.max(0, Math.min(10, score));
  if (s >= 9.5) return "A+";
  if (s >= 9) return "A";
  if (s >= 8.5) return "A-";
  if (s >= 8) return "B+";
  if (s >= 7.3) return "B";
  if (s >= 6.5) return "B-";
  if (s >= 6) return "C+";
  if (s >= 5) return "C";
  if (s >= 4) return "D";
  return "F";
}

/** Tailwind class set for a section tag chip, colored per section. */
export const sectionTagClass: Record<Section, string> = {
  experience: "bg-accent/10 text-accent border-accent/20",
  skills: "bg-tag-gold/10 text-tag-gold border-tag-gold/20",
  summary: "bg-tag-slate/10 text-tag-slate border-tag-slate/20",
  education: "bg-tag-sage/10 text-tag-sage border-tag-sage/20",
  structure: "bg-tag-clay/10 text-tag-clay border-tag-clay/20",
  other: "bg-elevated text-secondary border-border",
};

/** Tailwind text/bg classes for low/medium/high effort or impact pills. */
export const levelClass: Record<"low" | "medium" | "high", string> = {
  low: "bg-green/10 text-green border-green/20",
  medium: "bg-amber/10 text-amber border-amber/20",
  high: "bg-red/10 text-red border-red/20",
};
