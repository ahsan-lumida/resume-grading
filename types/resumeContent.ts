// Domain types for the resume generation API.
// Mirrors the backend contract at POST /api/v1/generate/stream
// (app/models/resume_content.py in resume-api).

export interface ContactInfo {
  name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  website: string | null;
}

export interface WorkExperienceEntry {
  company: string;
  title: string;
  location: string | null;
  start_date: string;
  end_date: string;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field_of_study: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  details: string | null;
}

export interface CertificationEntry {
  name: string;
  issuer: string | null;
  date: string | null;
}

export interface ProjectEntry {
  name: string;
  stack: string | null;
  description: string;
  links: string[];
}

export interface SkillGroup {
  category: string | null;
  items: string[];
}

export interface ResumeContent {
  contact: ContactInfo;
  summary: string | null;
  skills: SkillGroup[];
  work_experience: WorkExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
}

export interface GeneratedResume {
  content: ResumeContent;
  pdf_base64: string;
  model_used: string;
  provider_used: string;
}

// NDJSON event contract from POST /api/v1/generate/stream (and relayed as-is
// by /api/generate). Keep in sync with app/models/progress.py in resume-api.
export type GenerateProgressStage =
  | "parsing"
  | "redacting_pii"
  | "calling_llm"
  | "validating"
  | "restoring_contact_info"
  | "rendering_pdf";

export type GenerateProgressEvent =
  | { stage: GenerateProgressStage; pct: number }
  | { stage: "done"; pct: 100; result: GeneratedResume }
  | { stage: "error"; code: string; message: string };
