import { FileSearch, FileText, Lock, Sparkles, Target, Zap } from "lucide-react";
import AnalyzerApp from "@/components/AnalyzerApp";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import HowItWorks from "@/components/sections/HowItWorks";
import ChecksTaxonomy from "@/components/sections/ChecksTaxonomy";
import FaqSection from "@/components/sections/FaqSection";
import { FAQ_HOME, HOW_IT_WORKS } from "@/lib/content";
import { howToLd } from "@/lib/seo";

const FEATURES = [
  {
    Icon: FileSearch,
    title: "ATS Score",
    body: "See exactly which keywords you're missing for your target role before a recruiter ever opens it.",
  },
  {
    Icon: Sparkles,
    title: "Bullet Rewrites",
    body: "Weak bullets rewritten in XYZ format with the impact metrics that make hiring managers stop scrolling.",
  },
  {
    Icon: Target,
    title: "Interview Odds",
    body: "Honest probability estimates by company tier — FAANG, startup, and SMB — so you know where you stand.",
  },
];

const TRUST = [
  { Icon: Lock, label: "Private — redacted before analysis" },
  { Icon: Zap, label: "Results in ~60 seconds" },
  { Icon: FileText, label: "PDF & DOCX" },
  { Icon: Sparkles, label: "Free, no signup" },
];

const howToJsonLd = howToLd(
  "How to check your resume with ResumeGrading",
  HOW_IT_WORKS.map((s) => ({ name: s.title, text: s.body })),
);

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Above the fold — hero + upload */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-14">
        <div className="mb-9 flex flex-col items-center text-center">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-secondary backdrop-blur-xl">
              <Sparkles size={13} className="text-accent" aria-hidden="true" />
              Instant AI resume review
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Free AI Resume Checker
              <br />
              &amp; ATS Optimizer
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
              Sharpen your resume and land the interview. Upload it for a hiring manager&apos;s
              honest take — score, missing ATS keywords, bullet rewrites, and interview odds — in
              under 60 seconds.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.26} className="w-full">
          <div id="upload" className="w-full scroll-mt-24">
            <AnalyzerApp />
          </div>
        </Reveal>

        <Reveal delay={0.38}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            {TRUST.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs text-tertiary">
                <Icon size={14} className="text-secondary" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Features */}
      <section className="border-t border-border py-20 sm:py-24">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            A full review, not just a score
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
            Every analysis breaks your resume down the way a recruiter and an ATS both would — then
            hands you the exact edits to make.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FEATURES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.09} className="h-full">
              <TiltCard maxTilt={4} className="h-full rounded-2xl">
                <div className="glass group h-full rounded-2xl border border-border p-6 transition-colors duration-200 hover:border-border-bright">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <HowItWorks />
      <ChecksTaxonomy />
      <FaqSection items={FAQ_HOME} />
    </main>
  );
}
