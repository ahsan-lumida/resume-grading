// Shared marketing/SEO content. Centralized so pages, the sitemap, and the
// footer stay consistent and DRY.

import type { QA } from "@/lib/seo";
import { ROLES } from "@/data/roles";
import { COMPANIES } from "@/data/companies";

// ATS platforms we reference for long-tail keyword coverage.
export const ATS_PLATFORMS = ["Workday", "Greenhouse", "Lever", "Taleo", "iCIMS"];

export interface HowStep {
  title: string;
  body: string;
}

export const HOW_IT_WORKS: HowStep[] = [
  {
    title: "Upload your resume",
    body: "Drop in a PDF or DOCX (up to 5 MB). Personal details are redacted before anything is analyzed — no account, no signup.",
  },
  {
    title: "AI reviews it like a recruiter and an ATS",
    body: "ResumeGrading parses your resume the way applicant tracking systems such as Workday, Greenhouse, and Lever do, then scores content, impact, and structure against what hiring managers look for.",
  },
  {
    title: "Get your score and exact fixes",
    body: "See your overall and ATS scores, missing keywords, rewritten bullets, red flags, and a ranked list of improvements you can act on in minutes.",
  },
];

export interface CheckCategory {
  category: string;
  items: string[];
}

// Mirrors what the analysis API actually returns — honest, not invented.
export const CHECKS: CheckCategory[] = [
  {
    category: "ATS Compatibility",
    items: [
      "ATS parse & readability score",
      "Keywords present vs. missing for your role",
      "Section structure ATS can extract",
      "File format & length",
    ],
  },
  {
    category: "Content & Impact",
    items: [
      "Achievement & quantified-impact scoring",
      "Bullet rewrites in XYZ format",
      "Bullets that need numbers",
      "Action verbs & clarity",
    ],
  },
  {
    category: "Recruiter Red Flags",
    items: [
      "Credibility & risk signals",
      "Severity-rated red flags",
      "Employment-gap detection",
      "Mitigation guidance",
    ],
  },
  {
    category: "Seniority & Fit",
    items: [
      "Seniority-level assessment",
      "Career-trajectory read",
      "Market-competitiveness percentile",
      "Interview odds by company tier",
    ],
  },
  {
    category: "Structure & Readability",
    items: [
      "Structure & readability score",
      "Resume-length assessment",
      "Missing essential sections",
      "Formatting consistency",
    ],
  },
  {
    category: "Job Tailoring",
    items: [
      "Keyword match to a job description",
      "Hard & soft skill coverage",
      "Tailoring tips for the role",
      "Summary alignment",
    ],
  },
];

// Homepage FAQ — expanded to target People-Also-Ask queries.
export const FAQ_HOME: QA[] = [
  {
    q: "What is a resume checker and how does ResumeGrading work?",
    a: "A resume checker analyzes your resume the way an applicant tracking system (ATS) and a recruiter would, then scores it and suggests fixes. ResumeGrading parses your uploaded resume, checks it against ATS signals and hiring-manager criteria, and returns an overall score, ATS score, missing keywords, bullet rewrites, red flags, and ranked improvements — in about 60 seconds.",
  },
  {
    q: "What is a good resume score?",
    a: "On ResumeGrading's 0–10 scale, 8+ is strong and competitive, 5–7 means solid with clear room to improve, and below 5 signals issues a recruiter or ATS would likely catch. The score rationale and ranked improvements tell you exactly what to fix to move up.",
  },
  {
    q: "How does an ATS read my resume?",
    a: "An applicant tracking system extracts text from your file and maps it into fields — contact info, experience, skills, education — then makes it searchable by keyword for recruiters. If your formatting blocks clean parsing or you're missing role keywords, you can be filtered out before a human ever sees it. ResumeGrading shows you how parseable your resume is and which keywords you're missing.",
  },
  {
    q: "How do I make my resume ATS-friendly?",
    a: "Use a clean single-column layout, standard section headings, a text-based PDF or DOCX, and the exact keywords from the job description. Avoid tables, text boxes, and images for critical content. ResumeGrading flags ATS parsing problems and the specific keywords to add.",
  },
  {
    q: "Which ATS platforms does ResumeGrading check against?",
    a: `ResumeGrading evaluates your resume using signals researched across major applicant tracking systems including ${ATS_PLATFORMS.join(", ")}. If our checker can read and understand your resume, company ATSes generally can too.`,
  },
  {
    q: "Is my resume data private?",
    a: "Yes. Personal details are redacted before analysis, your resume is processed in-memory for the single request, and nothing is stored or shared. No account or signup is required.",
  },
  {
    q: "What file formats are supported?",
    a: "ResumeGrading accepts text-based PDF and DOCX files up to 5 MB. Scanned image-only PDFs can't be read — export a text-based version instead.",
  },
  {
    q: "How is the ATS score calculated?",
    a: "We extract the keywords and skills an ATS looks for in your target role, then measure how many your resume already contains versus the ones it's missing, alongside how cleanly your resume can be parsed.",
  },
  {
    q: "How accurate are the interview probability estimates?",
    a: "They're directional estimates, not guarantees. The model weighs your experience, achievements, and how your resume compares to others at each company tier (FAANG, startup, SMB) to give you a realistic sense of where you stand.",
  },
  {
    q: "Is ResumeGrading really free?",
    a: "Yes — ResumeGrading's resume review is completely free, with no signup, paywall, or credit card required.",
  },
];

// ── Internal-linking config (footer + sitemap) ───────────────────

export interface SiteRoute {
  path: string;
  label: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}

export const ROUTES: SiteRoute[] = [
  { path: "/", label: "Resume Checker", priority: 1.0, changeFrequency: "weekly" },
  {
    path: "/resume-checker",
    label: "Resume Checker Directory",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/ats-resume-checker",
    label: "ATS Resume Checker",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/resume-score",
    label: "Resume Score Checker",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/guides/ats-resume",
    label: "How to Write an ATS Resume",
    priority: 0.7,
    changeFrequency: "monthly",
  },
];

export interface FooterColumn {
  heading: string;
  links: { href: string; label: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Tools",
    links: [
      { href: "/", label: "AI Resume Checker" },
      { href: "/ats-resume-checker", label: "ATS Resume Checker" },
      { href: "/resume-score", label: "Resume Score Checker" },
    ],
  },
  {
    heading: "Guides",
    links: [{ href: "/guides/ats-resume", label: "How to Write an ATS Resume" }],
  },
  {
    heading: "Resume Checkers by Role",
    links: [
      { href: "/resume-checker", label: "All Roles & Companies" },
      ...ROLES.map((role) => ({
        href: `/resume-checker/${role.slug}`,
        label: `${role.title} Resume Checker`,
      })),
    ],
  },
  {
    heading: "Resume Checkers by Company",
    links: COMPANIES.map((company) => ({
      href: `/resume-checker/company/${company.slug}`,
      label: `${company.name} Resume Checker`,
    })),
  },
  {
    heading: "Get started",
    links: [
      { href: "/#upload", label: "Analyze my resume" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
];
