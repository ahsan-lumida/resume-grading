"use client";

import { useRef } from "react";
import {
  Check,
  Crosshair,
  Flag,
  LayoutList,
  ScanSearch,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CHECKS } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "ATS Compatibility": ScanSearch,
  "Content & Impact": Sparkles,
  "Recruiter Red Flags": Flag,
  "Seniority & Fit": TrendingUp,
  "Structure & Readability": LayoutList,
  "Job Tailoring": Crosshair,
};

// Bento layout: first and last cards span two columns on lg (4-col grid),
// so 6 categories fill exactly two rows — [2,1,1] / [1,1,2].
const SPAN: Record<number, string> = {
  0: "lg:col-span-2",
  5: "lg:col-span-2",
};

export default function ChecksTaxonomy() {
  const total = CHECKS.reduce((n, c) => n + c.items.length, 0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Icons drift at three different rates as the section scrolls — subtle parallax.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const drift1 = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const drift2 = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const drift3 = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const drifts = [drift1, drift2, drift3];

  return (
    <section
      ref={sectionRef}
      id="what-we-check"
      className="scroll-mt-24 border-t border-border py-20 sm:py-24"
    >
      <Reveal>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {total} checks across {CHECKS.length} categories
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
          ResumeGrade goes well beyond spelling and formatting — it grades the things recruiters
          and applicant tracking systems actually weigh, then tells you how to fix each one.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CHECKS.map((cat, i) => {
          const Icon = CATEGORY_ICONS[cat.category] ?? Check;
          return (
            <Reveal key={cat.category} delay={(i % 4) * 0.07} className={SPAN[i] ?? ""}>
              <TiltCard maxTilt={3} className="h-full rounded-2xl">
                <div className="glass h-full rounded-2xl border border-border p-6 transition-colors duration-200 hover:border-border-bright">
                  <div className="flex items-center gap-3">
                    <motion.span
                      style={reduceMotion ? undefined : { y: drifts[i % 3] }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-elevated text-secondary ring-1 ring-border-bright"
                    >
                      <Icon size={19} aria-hidden="true" />
                    </motion.span>
                    <h3 className="text-sm font-semibold tracking-tight text-primary">
                      {cat.category}
                    </h3>
                  </div>
                  <ul
                    className={`mt-4 gap-x-6 gap-y-2.5 ${
                      SPAN[i] ? "grid grid-cols-1 space-y-0 sm:grid-cols-2" : "space-y-2.5"
                    }`}
                  >
                    {cat.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-secondary">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
