"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

// Step-number tile: springs in with a bounce when scrolled into view.
function StepNumber({ n, className = "" }: { n: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 380, damping: 14, delay: 0.15 + n * 0.15 }
      }
      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-accent ring-1 ${className}`}
    >
      {n + 1}
    </motion.span>
  );
}

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Progress line draws in as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.9", "start 0.35"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-border py-20 sm:py-24">
      <Reveal>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          How the resume checker works
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
          Three steps, about a minute, no signup — from upload to an actionable, recruiter-grade
          review.
        </p>
      </Reveal>

      {/* Desktop: step numbers ride a scroll-drawn connector line above the cards. */}
      <div ref={lineRef} className="relative mt-12 hidden md:block">
        <svg
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-10 w-full -translate-y-1/2"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* No vector-effect here: it breaks pathLength dash normalization in
              Chrome, and the horizontal stroke only scales on Y (factor 1). */}
          <path d="M 0 20 H 100" stroke="var(--border)" strokeWidth="2" />
          <motion.path
            d="M 0 20 H 100"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: reduceMotion ? 1 : pathLength }}
          />
        </svg>
        <div className="relative grid grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="flex justify-center">
              <StepNumber n={i} className="bg-solid ring-accent/30 shadow-paper-md" />
              {/* bg-solid (opaque) so the connector line doesn't show through */}
            </div>
          ))}
        </div>
      </div>

      <ol className="mt-5 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-3">
        {HOW_IT_WORKS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.12} className="h-full">
            <TiltCard maxTilt={3} className="h-full rounded-2xl">
              <li className="glass relative h-full list-none rounded-2xl border border-border p-6">
                <StepNumber n={i} className="bg-accent/10 ring-accent/20 md:hidden" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary md:mt-0">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{step.body}</p>
              </li>
            </TiltCard>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
