import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/sections/Cta";
import { articleLd, howToLd } from "@/lib/seo";
import { ATS_PLATFORMS } from "@/lib/content";

const PATH = "/guides/ats-resume";
const TITLE = "How to Write an ATS Resume (2026 Guide)";
const DESCRIPTION =
  "A practical guide to writing an ATS-friendly resume that passes applicant tracking systems and reaches a recruiter — formatting, keywords, sections, and the mistakes to avoid.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ATS resume",
    "how to write an ATS resume",
    "ATS-friendly resume",
    "ATS resume format",
    "ATS resume tips",
    "applicant tracking system resume",
  ],
  alternates: { canonical: PATH },
};

const STEPS = [
  {
    name: "Use a clean, single-column layout",
    text: "Stick to one column with standard section headings. Avoid tables, text boxes, columns, headers/footers, and images for any content you need parsed.",
  },
  {
    name: "Export as a text-based PDF or DOCX",
    text: "Save from a word processor so the text is selectable. Never submit a scanned or image-only PDF — an ATS can't read it.",
  },
  {
    name: "Mirror the job description's keywords",
    text: "Use the exact hard and soft skills, tools, and job-title language from the posting, placed naturally in your summary, skills, and experience.",
  },
  {
    name: "Quantify your impact",
    text: "Replace duties with measurable results. Numbers (%, $, time saved, scale) signal impact to both the ATS keyword match and the human reviewer.",
  },
  {
    name: "Include the standard sections",
    text: "Contact info, summary, experience, skills, and education — labeled with conventional headings the ATS expects to find.",
  },
];

const DOS = [
  "Single-column layout with standard headings (Experience, Skills, Education)",
  "Text-based PDF or DOCX with selectable text",
  "Keywords from the job description, used naturally",
  "Quantified, results-focused bullet points",
  "Consistent dates and a professional email",
];

const DONTS = [
  "Tables, columns, or text boxes for key content",
  "Important text inside images or graphics",
  "Headers/footers holding contact info",
  "Fancy fonts, icons, or color-coded skill bars",
  "Scanned or image-only PDFs",
];

export default function AtsResumeGuide() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLd({ headline: TITLE, description: DESCRIPTION, path: PATH })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToLd("How to write an ATS-friendly resume", STEPS)),
        }}
      />

      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "ATS Resume Guide", path: PATH },
        ]}
      />

      <article className="py-12 text-secondary sm:py-16">
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            How to Write an <span className="text-gradient">ATS Resume</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Roughly three out of four resumes are screened by software before a person reads them.
            Here&apos;s how to write a resume that gets parsed correctly, matches the role, and lands
            on a recruiter&apos;s screen.
          </p>
        </header>

        {/* What is an ATS resume */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            What is an ATS resume?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
            An ATS resume is one formatted so an applicant tracking system — software like{" "}
            {ATS_PLATFORMS.join(", ")} — can cleanly extract your information and match it to a job.
            It isn&apos;t a special template; it&apos;s a set of formatting and content choices that
            keep your resume readable by machines without sacrificing readability for humans.
          </p>
        </section>

        {/* 5 Steps */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            5 steps to an ATS-friendly resume
          </h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map((step, i) => (
              <li key={step.name} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-semibold text-accent ring-1 ring-accent/20">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-primary">{step.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Do / Don't */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            ATS resume do&apos;s and don&apos;ts
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-green-400">Do</p>
              <ul className="mt-4 space-y-2.5">
                {DOS.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-secondary">
                    <Check size={16} className="mt-0.5 shrink-0 text-green-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-400">Don&apos;t</p>
              <ul className="mt-4 space-y-2.5">
                {DONTS.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-secondary">
                    <X size={16} className="mt-0.5 shrink-0 text-red-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Check before you apply */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Check your resume before you apply
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
            The fastest way to know whether your resume is ATS-ready is to test it. Run it through
            the{" "}
            <Link href="/ats-resume-checker" className="text-accent hover:underline">
              ATS resume checker
            </Link>{" "}
            to see your parse rate and missing keywords, or get your full{" "}
            <Link href="/resume-score" className="text-accent hover:underline">
              resume score
            </Link>{" "}
            with ranked fixes.
          </p>
        </section>
      </article>

      <Cta
        href="/#upload"
        title="Test your resume against the ATS"
        body="Upload your resume and see your ATS score, missing keywords, and exact fixes in under 60 seconds."
      />
    </main>
  );
}
