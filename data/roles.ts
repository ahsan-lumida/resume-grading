// Static data powering the programmatic-SEO route app/resume-checker/[role].
// One entry per target role; each pre-renders its own landing page at build
// time (see generateStaticParams). Keep slugs URL-safe and stable — they're
// public URLs and appear in the sitemap.

export interface Role {
  /** URL segment, e.g. "software-engineer" → /resume-checker/software-engineer */
  slug: string;
  /** Display name, e.g. "Software Engineer" */
  title: string;
  /** Grouping used for related-role widgets and the directory hub. */
  category: string;
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
    category: "Tech & Product",
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
    slug: "frontend-developer",
    title: "Frontend Developer",
    category: "Tech & Product",
    topKeywords: [
      "React",
      "JavaScript",
      "TypeScript",
      "CSS/Sass",
      "responsive design",
      "accessibility (a11y)",
      "Webpack/Vite",
    ],
    sampleBulletBefore: "Responsible for building the user interface for the company website.",
    sampleBulletAfter:
      "Rebuilt the checkout UI in React and TypeScript, cutting page load time 45% and lifting mobile conversion 18% across 200K monthly sessions.",
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    category: "Tech & Product",
    topKeywords: [
      "CI/CD",
      "Kubernetes",
      "Terraform",
      "AWS/GCP/Azure",
      "Docker",
      "monitoring & observability",
      "infrastructure as code",
    ],
    sampleBulletBefore: "Managed servers and deployments for the engineering team.",
    sampleBulletAfter:
      "Migrated the deployment pipeline to Kubernetes and Terraform, cutting release time from 45 minutes to 6 and reducing production incidents 30% over two quarters.",
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    category: "Tech & Product",
    topKeywords: [
      "Figma",
      "user research",
      "wireframing",
      "usability testing",
      "design systems",
      "prototyping",
      "information architecture",
    ],
    sampleBulletBefore: "Designed screens and mockups for new features.",
    sampleBulletAfter:
      "Redesigned the onboarding flow in Figma based on 20 user interviews, raising activation 22% and cutting setup-related support tickets 35%.",
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    category: "Business & Finance",
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
    slug: "project-manager",
    title: "Project Manager",
    category: "Business & Finance",
    topKeywords: [
      "project planning",
      "Agile/Scrum",
      "risk management",
      "stakeholder communication",
      "Jira/Asana",
      "budgeting",
      "cross-functional coordination",
    ],
    sampleBulletBefore: "Managed timelines and coordinated with different teams on projects.",
    sampleBulletAfter:
      "Delivered a 6-team platform migration two weeks ahead of schedule by restructuring the sprint cadence and cutting cross-team blockers 40%.",
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    category: "Business & Finance",
    topKeywords: [
      "campaign management",
      "SEO/SEM",
      "content strategy",
      "marketing analytics",
      "email marketing",
      "brand positioning",
      "budget management",
    ],
    sampleBulletBefore: "Ran marketing campaigns and managed the content calendar.",
    sampleBulletAfter:
      "Launched a multi-channel campaign that grew qualified leads 65% quarter-over-quarter while cutting cost-per-lead 28%.",
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    category: "Business & Finance",
    topKeywords: [
      "requirements gathering",
      "SQL",
      "process mapping",
      "stakeholder management",
      "data analysis",
      "Excel",
      "business process improvement",
    ],
    sampleBulletBefore: "Gathered requirements from stakeholders and documented business processes.",
    sampleBulletAfter:
      "Mapped and streamlined 4 core workflows using SQL-driven process analysis, cutting manual processing time 30% and saving ~15 hours a week.",
  },
  {
    slug: "accountant",
    title: "Accountant",
    category: "Business & Finance",
    topKeywords: [
      "GAAP",
      "reconciliation",
      "accounts payable/receivable",
      "financial reporting",
      "Excel",
      "audit support",
      "month-end close",
    ],
    sampleBulletBefore: "Handled bookkeeping and prepared financial statements.",
    sampleBulletAfter:
      "Cut the month-end close cycle from 8 days to 4 by automating reconciliation in Excel, while maintaining a zero-error audit record across 3 years.",
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    category: "Business & Finance",
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
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Data & Design",
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
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Data & Design",
    topKeywords: [
      "Python",
      "machine learning",
      "SQL",
      "statistical modeling",
      "A/B testing",
      "data pipelines",
      "model deployment",
    ],
    sampleBulletBefore: "Built models and analyzed data to support the product team.",
    sampleBulletAfter:
      "Built and deployed a churn-prediction model in Python that flagged at-risk customers 3 weeks earlier, contributing to a 12% drop in quarterly churn.",
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    category: "Healthcare & Admin",
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
    slug: "medical-assistant",
    title: "Medical Assistant",
    category: "Healthcare & Admin",
    topKeywords: [
      "patient intake",
      "EHR/EMR systems",
      "vital signs",
      "HIPAA",
      "medical terminology",
      "scheduling",
      "clinical support",
    ],
    sampleBulletBefore: "Helped the doctor with patients and kept records updated.",
    sampleBulletAfter:
      "Managed intake and EHR documentation for 25+ patients daily, cutting average wait time 15% while maintaining 100% charting accuracy.",
  },
  {
    slug: "administrative-assistant",
    title: "Administrative Assistant",
    category: "Healthcare & Admin",
    topKeywords: [
      "calendar management",
      "Microsoft Office/Google Workspace",
      "scheduling",
      "travel coordination",
      "office management",
      "correspondence",
      "data entry",
    ],
    sampleBulletBefore: "Answered phones, scheduled meetings, and did general office tasks.",
    sampleBulletAfter:
      "Managed calendars and travel for a 5-person executive team, cutting scheduling conflicts 90% and coordinating 40+ trips a year with zero missed logistics.",
  },
];

/** Look up a single role by slug (undefined if not found). */
export function getRole(slug: string): Role | undefined {
  return ROLES.find((role) => role.slug === slug);
}

/** Category display order for the directory hub and related-role widgets. */
export const ROLE_CATEGORIES: string[] = Array.from(new Set(ROLES.map((r) => r.category)));
