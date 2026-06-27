import type { Metadata } from "next";
import Link from "next/link";
import AnalyzerApp from "@/components/AnalyzerApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChecksTaxonomy from "@/components/sections/ChecksTaxonomy";
import FaqSection from "@/components/sections/FaqSection";
import Cta from "@/components/sections/Cta";
import { ATS_PLATFORMS, FAQ_HOME } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Free ATS Resume Checker — Pass the ATS | Hone" },
  description:
    "Check whether your resume passes applicant tracking systems like Workday, Greenhouse, and Lever. Get your ATS score, missing keywords, and parsing fixes instantly. Free, no signup.",
  keywords: [
    "ATS resume checker",
    "ATS checker",
    "applicant tracking system checker",
    "ATS-friendly resume",
    "resume ATS score",
    "does my resume pass ATS",
  ],
  alternates: { canonical: "/ats-resume-checker" },
};

const ATS_FAQ = FAQ_HOME.filter((f) =>
  ["How does an ATS read my resume?", "How do I make my resume ATS-friendly?", "Which ATS platforms does Hone check against?", "How is the ATS score calculated?"].includes(
    f.q,
  ),
);

export default function AtsResumeChecker() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-5">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "ATS Resume Checker", path: "/ats-resume-checker" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          Free <span className="text-gradient">ATS Resume Checker</span>
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
          Most resumes are filtered by an applicant tracking system before a human ever reads them.
          Upload yours to see how cleanly an ATS can parse it, which keywords you&apos;re missing,
          and exactly what to fix — in under 60 seconds.
        </p>
      </section>

      <div id="upload" className="scroll-mt-24 pb-8">
        <AnalyzerApp />
      </div>

      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          What an ATS actually does to your resume
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-secondary sm:text-base">
          <p>
            An applicant tracking system (ATS) is software employers use to collect, parse, and rank
            applications. When you apply, the ATS extracts the text from your file and maps it into
            structured fields — contact details, work experience, skills, and education — then makes
            everything searchable so recruiters can filter for the keywords that matter to the role.
          </p>
          <p>
            That means two things decide whether you make the shortlist: whether the system can{" "}
            <strong className="text-primary">read</strong> your resume, and whether your resume
            contains the <strong className="text-primary">keywords</strong> the recruiter searches
            for. Complex layouts, tables, text boxes, headers/footers, and image-based text routinely
            break parsing — so strong candidates get filtered out for formatting reasons alone.
          </p>
          <p>
            Hone evaluates your resume using signals researched across major ATS platforms including{" "}
            {ATS_PLATFORMS.join(", ")}. If our checker can read and understand your resume, company
            systems generally can too — and you&apos;ll see the specific keywords and structure
            changes that move your ATS score up.
          </p>
        </div>
      </section>

      <ChecksTaxonomy />

      <FaqSection items={ATS_FAQ} heading="ATS resume checker FAQ" />

      <section className="border-t border-border py-12">
        <p className="text-sm text-secondary">
          Related:{" "}
          <Link href="/resume-score" className="text-accent hover:underline">
            Resume Score Checker
          </Link>{" "}
          ·{" "}
          <Link href="/guides/ats-resume" className="text-accent hover:underline">
            How to Write an ATS Resume
          </Link>
        </p>
      </section>

      <Cta href="#upload" title="Is your resume ATS-ready?" />
    </main>
  );
}
