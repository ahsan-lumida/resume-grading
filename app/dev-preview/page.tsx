"use client";

// Dev-only preview of the full results view with mock data, so results-page
// motion and styling can be checked visually without running the backend.
// 404s in production builds.

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { ResumeAnalysis } from "@/types/analysis";
import { SkeletonCard } from "@/components/Skeleton";

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
    </main>
  );
}
