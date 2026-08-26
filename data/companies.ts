// Static data powering the programmatic-SEO route
// app/resume-checker/company/[company]. Content here is deliberately limited
// to well-known, publicly documented facts about each company's stated
// culture/hiring values (e.g. Amazon's published Leadership Principles) —
// no invented internal ATS details, pass rates, or score thresholds.

export interface Company {
  /** URL segment, e.g. "google" → /resume-checker/company/google */
  slug: string;
  /** Display name, e.g. "Google" */
  name: string;
  /** Matches the tier labels the analyzer itself returns (interview_probability_by_tier). */
  tier: string;
  /** One or two sentences of context, grounded in public information only. */
  blurb: string;
  /** Generic, defensible resume traits associated with this company's public culture. */
  whatTheyValue: string[];
}

export const COMPANIES: Company[] = [
  {
    slug: "google",
    name: "Google",
    tier: "FAANG / Big Tech",
    blurb:
      "Google hires at huge volume across engineering, product, and business roles, and is known for weighing measurable impact as heavily as raw responsibilities.",
    whatTheyValue: [
      "Quantified impact over duty statements — numbers, scale, and outcomes",
      "Clear ownership of a specific project or system",
      "Evidence of collaboration across large, cross-functional teams",
      "Depth in your core discipline over broad, unfocused generalism",
    ],
  },
  {
    slug: "amazon",
    name: "Amazon",
    tier: "FAANG / Big Tech",
    blurb:
      "Amazon's hiring process is built around its publicly published Leadership Principles, and resumes that use language mapping to them tend to read stronger to Amazon recruiters.",
    whatTheyValue: [
      "Ownership — bullets that show you drove an outcome, not just participated",
      "Customer obsession — impact framed around the end user or customer",
      "Bias for action and delivering results at scale",
      "Concrete metrics — Amazon's culture runs on data, and quantified results stand out",
    ],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    tier: "FAANG / Big Tech",
    blurb:
      "Microsoft has publicly framed its culture around a \"growth mindset,\" valuing continuous learning and cross-team collaboration alongside technical depth.",
    whatTheyValue: [
      "Growth and learning — evidence you've picked up new skills or technologies",
      "Collaboration across disciplines and teams",
      "Technical depth paired with clear, plain-language communication",
      "Measurable outcomes tied to products or customers",
    ],
  },
  {
    slug: "meta",
    name: "Meta",
    tier: "FAANG / Big Tech",
    blurb:
      "Meta is known for a fast-moving, impact-driven culture, and resumes that read as duty lists instead of outcomes tend to get filtered early.",
    whatTheyValue: [
      "Speed and iteration — shipping and measuring quickly",
      "Quantified product or business impact",
      "Individual ownership within a broader team effort",
      "Directness and clarity over jargon-heavy phrasing",
    ],
  },
  {
    slug: "apple",
    name: "Apple",
    tier: "FAANG / Big Tech",
    blurb:
      "Apple is known for a strong craftsmanship and design-quality bar — even in non-design roles — and for tight cross-functional collaboration.",
    whatTheyValue: [
      "Attention to detail and quality in how you describe your work",
      "Cross-functional collaboration, especially between technical and design teams",
      "Focus on the end-user experience of what you built or shipped",
      "Concise, polished writing — the resume itself is treated as a craft signal",
    ],
  },
];

/** Look up a single company by slug (undefined if not found). */
export function getCompany(slug: string): Company | undefined {
  return COMPANIES.find((company) => company.slug === slug);
}
