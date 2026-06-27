// Centralized SEO config + JSON-LD builders.
// SITE_URL is env-driven so the production domain can change without code edits.

export const SITE_URL = "https://ai-resume-grade.vercel.app";

export const SITE_NAME = "ResumeGrade";
export const SITE_TAGLINE = "Grade your resume. Land the interview.";

/** Build an absolute URL for a given path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface QA {
  q: string;
  a: string;
}

/** WebApplication schema for the product. */
export function webApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "AI-powered resume reviewer with ATS scoring, bullet rewrites, and interview probability estimates.",
  };
}

/** FAQPage schema from a list of Q&A. */
export function faqPageLd(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** HowTo schema for the "how it works" flow. */
export function howToLd(name: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    totalTime: "PT1M",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** BreadcrumbList schema for supporting pages. */
export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Article schema for guide pages. */
export function articleLd(opts: {
  headline: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

/** Render a JSON-LD object as a <script> string payload. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data);
}
