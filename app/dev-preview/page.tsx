"use client";

// Dev-only preview of the full results view with mock data, so results-page
// motion and styling can be checked visually without running the backend.
// 404s in production builds.

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { ResumeAnalysis } from "@/types/analysis";
import type { ResumeContent } from "@/types/resumeContent";
import { SkeletonCard } from "@/components/Skeleton";
import ResumeTemplatePreview from "@/components/ResumeTemplatePreview";

const ScoreDashboard = dynamic(() => import("@/components/ScoreDashboard"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const QuickWins = dynamic(() => import("@/components/QuickWins"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const StrengthsWeaknesses = dynamic(() => import("@/components/StrengthsWeaknesses"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const ATSPanel = dynamic(() => import("@/components/ATSPanel"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const InterviewOdds = dynamic(() => import("@/components/InterviewOdds"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const ImprovementsBoard = dynamic(() => import("@/components/ImprovementsBoard"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const BulletRewriter = dynamic(() => import("@/components/BulletRewriter"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});
const RedFlags = dynamic(() => import("@/components/RedFlags"), {
  loading: () => <SkeletonCard />,
  ssr: false,
});

const MOCK: ResumeAnalysis = {
  overall_score: 7.5,
  score_rationale:
    "Strong engineering depth with clear career progression, held back by unquantified achievements and missing role keywords.",
  first_impression:
    "Solid senior engineer resume — reads well, but the impact story is told in duties, not numbers.",
  seniority_level: "senior",
  career_trajectory: "ascending",
  market_competitiveness_percentile: 78,
  experience_score: 8,
  experience_notes: "Consistent growth across roles.",
  achievement_impact_score: 6,
  achievement_impact_notes: "Few quantified outcomes.",
  technical_skills_score: 8.5,
  technical_skills_notes: "Modern, relevant stack.",
  structure_readability_score: 7,
  structure_readability_notes: "Clean single-column layout.",
  education_notes: "Relevant degree, well placed.",
  resume_length_assessment: "Two pages — appropriate for seniority.",
  ats_score: 7.2,
  ats_keywords_present: [
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "AWS",
    "CI/CD",
    "Docker",
  ],
  ats_keywords_missing: ["Kubernetes", "Terraform", "System design", "Mentorship", "Next.js"],
  strengths: [
    "Clear upward career trajectory across three companies",
    "Modern, in-demand technical stack",
    "Concise, scannable formatting",
  ],
  weaknesses: [
    "Most bullets describe responsibilities, not outcomes",
    "No summary section tailored to the target role",
    "Missing several keywords recruiters search for",
  ],
  missing_sections: ["Professional summary"],
  red_flags: [
    {
      flag: "Eight-month employment gap in 2024",
      severity: "moderate",
      mitigation: "Add a one-line note (sabbatical, freelance, upskilling) to preempt the question.",
    },
  ],
  quick_wins: [
    "Add a 2-line professional summary with your target title",
    "Quantify your top three bullets with %, $, or scale",
    "Add 'Kubernetes' and 'Terraform' to your skills section",
  ],
  interview_probability_by_tier: [
    {
      tier: "FAANG / Big Tech",
      probability_pct: 34,
      rationale: "Strong stack but unquantified impact hurts at this tier's bar.",
    },
    {
      tier: "Startups",
      probability_pct: 72,
      rationale: "Breadth and ownership signals map well to startup needs.",
    },
    {
      tier: "SMB / Enterprise",
      probability_pct: 85,
      rationale: "Experience level and stack are an excellent match.",
    },
  ],
  top_improvements: [
    {
      rank: 1,
      section: "experience",
      title: "Quantify your achievements",
      description: "Replace duty statements with measurable results — %, $, time saved, scale.",
      effort: "medium",
      impact: "high",
      priority: "do_now",
    },
    {
      rank: 2,
      section: "summary",
      title: "Add a targeted summary",
      description: "Two lines stating your title, years, and the value you bring to the target role.",
      effort: "low",
      impact: "high",
      priority: "do_now",
    },
  ],
  quantification_opportunities: [
    {
      original_bullet: "Improved API performance for the checkout service",
      what_to_measure: "Latency reduction and request volume",
      how_to_find_it: "Check APM dashboards (Datadog/Grafana) for before/after p95 latency.",
    },
  ],
  rewritten_bullets: [
    {
      original: "Responsible for improving the performance of the main API",
      rewritten:
        "Cut checkout API p95 latency by [X%] across [N] requests/day by introducing Redis caching and query batching",
      improvement_reason: "Leads with a measurable outcome and names the technique.",
    },
    {
      original: "Worked on the migration to a new frontend framework",
      rewritten:
        "Led migration of [N]-page legacy app to React/TypeScript, shipping [X%] faster page loads with zero rollback incidents",
      improvement_reason: "Shows ownership (led), scale, and a risk-managed result.",
    },
  ],
  tailoring_tips: [],
  model_used: "mock",
  provider_used: "mock",
  redaction_applied: true,
};

// Sourced from a real /generate/stream run so this preview matches what the
// on-page template actually has to handle — long bullets, multiple projects,
// categorized skills, a job with no location, etc.
const MOCK_RESUME: ResumeContent = {
  contact: {
    name: "Ahsan Iftikhar",
    email: "ahsaniftikhar2016@gmail.com",
    phone: "+92307 2668682",
    location: "Karachi, Pakistan",
    linkedin: "linkedin.com/in/ahsaniftikhar99",
    github: "github.com/ahsan-lumida",
    website: "portfoliobyahsan.netlify.app",
  },
  summary:
    "Senior software engineer with 4+ years delivering production fintech and AI systems, including a React web platform and React Native app serving 1,000+ active users. Built automated trade-sheet processing that reduced manual preparation from ~2 hours to ~5 seconds. Experienced across the full stack — React, React Native, Python (Flask/FastAPI), Node.js/NestJS, GCP, DevOps — balancing deterministic computation with judicious AI application.",
  work_experience: [
    {
      company: "Lumida Wealth",
      title: "Senior Software Engineer",
      location: "New Jersey, USA (Remote)",
      start_date: "Dec 2024",
      end_date: "Present",
      bullets: [
        "Own the React front-end for an in-house equities-research platform used by the CIO team to drive live U.S. market investment decisions — factor analysis, news, earnings-call transcripts, charting, and backtesting.",
        "Lead mobile engineer on a React Native stocks and crypto app in beta with 1,000+ active users, owning iOS and Android releases, brokerage account linking, and deep linking.",
        "Built and own Trade Sheet, cutting trade-sheet preparation from ~2 hours of manual spreadsheet work to ~5 seconds, with live price validation before any order reaches the brokerage.",
      ],
    },
    {
      company: "Paysys Labs",
      title: "Software Engineer",
      location: "Karachi, Pakistan",
      start_date: "Nov 2022",
      end_date: "Oct 2024",
      bullets: [
        "Developed Jasper reports (complex SQL / PL-SQL) consumed by 300+ National Savings branches for transaction and KYC reporting.",
      ],
    },
  ],
  projects: [
    {
      name: "Trade Sheet — Automated Trade Order Preparation System",
      stack: "Python, Flask, Firestore, WebSockets, pandas",
      description:
        "Replaced a manual spreadsheet trade-prep workflow with a Flask REST API converting analyst allocations into exact per-account share quantities across four order types, with real-time price validation rejecting orders that deviate more than 7% from live prices.",
      links: [],
    },
    {
      name: "ResumeGrade — AI Resume Feedback App",
      stack: "Next.js, FastAPI, Groq / Cerebras / OpenRouter",
      description:
        "Free AI web app returning structured, actionable resume feedback. Shipped solo: Next.js/Vercel front-end, FastAPI backend, a multi-provider LLM waterfall for reliability, spaCy-based PII redaction before any LLM call.",
      links: ["resumegrade.vercel.app"],
    },
  ],
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C#", "SQL"] },
    { category: "Frontend", items: ["React", "Next.js", "Vite", "React Query", "XState"] },
    { category: "Mobile", items: ["React Native (iOS & Android)", "Reanimated / Worklets"] },
    { category: null, items: ["Node.js", "Flask", "FastAPI", "PostgreSQL", "Docker"] },
  ],
  education: [
    {
      institution: "FAST — NUCES, Karachi, Pakistan",
      degree: "BS, Computer Science",
      field_of_study: null,
      location: null,
      start_date: "Aug 2018",
      end_date: "Jun 2022",
      details: null,
    },
  ],
  certifications: [],
};

export default function DevPreview() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Results preview (mock data)</h1>
      <ScoreDashboard analysis={MOCK} />
      <QuickWins wins={MOCK.quick_wins} />
      <StrengthsWeaknesses analysis={MOCK} />
      <ATSPanel analysis={MOCK} />
      <InterviewOdds tiers={MOCK.interview_probability_by_tier} />
      <ImprovementsBoard improvements={MOCK.top_improvements} />
      <BulletRewriter bullets={MOCK.rewritten_bullets} />
      <RedFlags flags={MOCK.red_flags} />

      <h1 className="mt-6 text-2xl font-bold tracking-tight">Improved-resume template preview</h1>
      <ResumeTemplatePreview resume={MOCK_RESUME} />
    </main>
  );
}
