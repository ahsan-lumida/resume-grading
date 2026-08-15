// Static data powering the programmatic-SEO route app/resume-checker/[role].
// One entry per target role; each pre-renders its own landing page at build
// time (see generateStaticParams). Keep slugs URL-safe and stable — they're
// public URLs and appear in the sitemap.

export interface Role {
  /** URL segment, e.g. "software-engineer" → /resume-checker/software-engineer */
  slug: string;
  /** Display name, e.g. "Software Engineer" */
  title: string;
  /** Real ATS keywords recruiters and parsers weigh for this role. */
  topKeywords: string[];
  /** A weak, duty-focused bullet a resume for this role often contains. */
  sampleBulletBefore: string;
  /** The same bullet rewritten in XYZ format with quantified impact. */
  sampleBulletAfter: string;
}

export const ROLES: Role[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    topKeywords: [
      "React",
      "TypeScript",
      "REST APIs",
      "CI/CD",
      "AWS",
      "unit testing",
      "microservices",
    ],
    sampleBulletBefore: "Responsible for building features and fixing bugs on the web app.",
    sampleBulletAfter:
      "Shipped 12 features and cut the P1 bug backlog 40% by adding a React + TypeScript test suite that raised coverage from 55% to 88%.",
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    topKeywords: [
      "product roadmap",
      "user research",
      "A/B testing",
      "stakeholder management",
      "KPIs",
      "agile",
      "go-to-market",
    ],
    sampleBulletBefore: "Worked with engineering and design to launch new product features.",
    sampleBulletAfter:
      "Led a cross-functional squad of 8 to launch a self-serve onboarding flow, lifting activation 27% and adding $1.2M ARR in two quarters.",
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    topKeywords: [
      "SQL",
      "Python",
      "Tableau",
      "data visualization",
      "ETL",
      "A/B testing",
      "dashboards",
    ],
    sampleBulletBefore: "Created reports and dashboards for the business team.",
    sampleBulletAfter:
      "Built 15 self-service Tableau dashboards on a SQL/Python ETL pipeline, cutting ad-hoc report requests 60% and saving the team ~10 hours a week.",
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    topKeywords: [
      "patient care",
      "BLS/ACLS certification",
      "electronic health records (EHR)",
      "medication administration",
      "care plans",
      "HIPAA",
      "patient assessment",
    ],
    sampleBulletBefore: "Took care of patients and gave medications on a busy hospital floor.",
    sampleBulletAfter:
      "Managed care for up to 6 acute patients per shift with 100% medication-administration accuracy, improving unit patient-satisfaction scores from 82% to 94%.",
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    topKeywords: [
      "financial modeling",
      "Excel",
      "forecasting",
      "variance analysis",
      "GAAP",
      "budgeting",
      "valuation",
    ],
    sampleBulletBefore: "Helped prepare budgets and financial reports for management.",
    sampleBulletAfter:
      "Rebuilt the annual budgeting model in Excel, cutting the forecasting cycle from 3 weeks to 5 days and reducing variance-to-actuals from 12% to 4%.",
  },
];

/** Look up a single role by slug (undefined if not found). */
export function getRole(slug: string): Role | undefined {
  return ROLES.find((role) => role.slug === slug);
}
