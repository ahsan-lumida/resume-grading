// Domain types for the resume analysis API.
// Mirrors the backend contract at POST /api/v1/analyze.

export type Severity = "minor" | "moderate" | "critical";

export type Section =
  | "summary"
  | "experience"
  | "skills"
  | "education"
  | "structure"
  | "other";

export type Effort = "low" | "medium" | "high";
export type Impact = "low" | "medium" | "high";
export type Priority = "do_now" | "do_soon" | "long_term";

export type SeniorityLevel =
  | "junior"
  | "mid"
  | "senior"
  | "staff"
  | "executive";

export type CareerTrajectory =
  | "ascending"
  | "lateral"
  | "descending"
  | "unclear";

export interface RedFlag {
  flag: string;
  severity: Severity;
  mitigation: string;
}

export interface InterviewTier {
  tier: string;
  probability_pct: number;
  rationale: string;
}

export interface Improvement {
  rank: number;
  section: Section;
  title: string;
  description: string;
  effort: Effort;
  impact: Impact;
  priority: Priority;
}

export interface RewrittenBullet {
  original: string;
  rewritten: string;
  improvement_reason: string;
}

export interface QuantificationOpp {
  original_bullet: string;
  what_to_measure: string;
  how_to_find_it: string;
}

export interface ResumeAnalysis {
  overall_score: number;
  score_rationale: string;
  first_impression: string;
  seniority_level: SeniorityLevel;
  career_trajectory: CareerTrajectory;
  market_competitiveness_percentile: number;
  experience_score: number;
  experience_notes: string;
  achievement_impact_score: number;
  achievement_impact_notes: string;
  technical_skills_score: number;
  technical_skills_notes: string;
  structure_readability_score: number;
  structure_readability_notes: string;
  education_notes: string;
  resume_length_assessment: string;
  ats_score: number;
  ats_keywords_present: string[];
  ats_keywords_missing: string[];
  strengths: string[];
  weaknesses: string[];
  missing_sections: string[];
  red_flags: RedFlag[];
  quick_wins: string[];
  interview_probability_by_tier: InterviewTier[];
  top_improvements: Improvement[];
  quantification_opportunities: QuantificationOpp[];
  rewritten_bullets: RewrittenBullet[];
  tailoring_tips: string[];
  model_used: string;
  provider_used: string;
  redaction_applied: boolean;
}

// UI state machine for the analysis page.
export type ApiState = "idle" | "loading" | "done" | "error";

// Auth token response from POST /api/v1/auth/token.
export interface TokenResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
}

// Thrown by the data layer with a user-friendly, status-mapped message.
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
