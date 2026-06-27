import type { Metadata } from "next";
import Link from "next/link";
import AnalyzerApp from "@/components/AnalyzerApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import HowItWorks from "@/components/sections/HowItWorks";
import FaqSection from "@/components/sections/FaqSection";
import Cta from "@/components/sections/Cta";
import { FAQ_HOME } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Free Resume Score Checker — Score My Resume | Hone" },
  description:
    "Score my resume: get an instant 0–10 resume score with AI feedback on content, impact, ATS keywords, and structure — plus the exact fixes to raise it. Free, private, no signup.",
  keywords: [
    "resume score",
    "score my resume",
    "resume score checker",
    "resume grader",
    "what is a good resume score",
    "free resume review",
  ],
  alternates: { canonical: "/resume-score" },
};

const SCORE_FAQ = FAQ_HOME.filter((f) =>
  [
    "What is a good resume score?",
    "What is a resume checker and how does Hone work?",
    "How is the ATS score calculated?",
    "Is Hone really free?",
  ].includes(f.q),
);

const AXES = [
  { label: "Experience", body: "Depth, relevance, and progression of your roles." },
  { label: "Achievement impact", body: "Quantified results versus vague responsibilities." },
  { label: "Technical skills", body: "Coverage and evidence of the skills your target role needs." },
  { label: "Structure & readability", body: "Layout, length, and how easily it scans." },
  { label: "ATS compatibility", body: "Parse rate and keyword match for the job." },
];

export default function ResumeScore() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-5">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resume Score Checker", path: "/resume-score" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          Free <span className="text-gradient">Resume Score</span> Checker
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
          Score my resume — instantly. Upload your resume to get an honest 0–10 score with a clear
          rationale, your ATS score, and a ranked list of the highest-impact fixes to raise it.
        </p>
      </section>

      <div id="upload" className="scroll-mt-24 pb-8">
        <AnalyzerApp />
      </div>

      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          What is a good resume score?
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-secondary sm:text-base">
          <p>
            On Hone&apos;s 0–10 scale, <strong className="text-primary">8 or above</strong> is strong
            and competitive, <strong className="text-primary">5–7</strong> means a solid resume with
            clear room to improve, and <strong className="text-primary">below 5</strong> signals
            issues a recruiter or ATS would likely catch. Your score comes with a plain-English
            rationale, so you always know <em>why</em> — not just the number.
          </p>
          <p>The overall score is built from the dimensions recruiters weigh most:</p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AXES.map((axis) => (
            <li key={axis.label} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
              <h3 className="text-sm font-semibold tracking-tight text-primary">{axis.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary">{axis.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <HowItWorks />

      <FaqSection items={SCORE_FAQ} heading="Resume score FAQ" />

      <section className="border-t border-border py-12">
        <p className="text-sm text-secondary">
          Related:{" "}
          <Link href="/ats-resume-checker" className="text-accent hover:underline">
            ATS Resume Checker
          </Link>{" "}
          ·{" "}
          <Link href="/guides/ats-resume" className="text-accent hover:underline">
            How to Write an ATS Resume
          </Link>
        </p>
      </section>

      <Cta href="#upload" title="Get your resume score now" />
    </main>
  );
}
