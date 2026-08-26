import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import AnalyzerApp from "@/components/AnalyzerApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/sections/Cta";
import { COMPANIES, getCompany } from "@/data/companies";

type RouteParams = { company: string };

// Pre-render one static page per company at build time. With dynamicParams=false,
// any slug not in this list returns a 404 instead of rendering on-demand.
export function generateStaticParams(): RouteParams[] {
  return COMPANIES.map((company) => ({ company: company.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { company: slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};

  const path = `/resume-checker/company/${company.slug}`;
  return {
    title: {
      absolute: `Free ${company.name} Resume Checker & ATS Scanner | ResumeGrading`,
    },
    description: `Free resume checker tuned for ${company.name} applications: see your ATS score, missing keywords, and quantified bullet rewrites — instant, private, no signup.`,
    alternates: { canonical: path },
  };
}

export default async function CompanyResumeChecker({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { company: slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const otherCompanies = COMPANIES.filter(
    (c) => c.tier === company.tier && c.slug !== company.slug,
  ).slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resume Checker", path: "/resume-checker" },
          { name: `${company.name} Resume Checker`, path: `/resume-checker/company/${company.slug}` },
        ]}
      />

      <section className="py-12 sm:py-16">
        <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Free {company.name} Resume Checker
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
          {company.blurb} Upload your resume to see your score, missing ATS keywords, and
          rewritten bullets — plus your estimated interview odds for {company.tier}-tier
          companies. Instant, private, no signup.
        </p>
      </section>

      <div id="upload" className="scroll-mt-24 pb-8">
        <AnalyzerApp />
      </div>

      {/* What this company values */}
      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          What {company.name} Resumes Tend to Get Right
        </h2>
        <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
          Based on {company.name}&apos;s publicly stated hiring values — not internal or
          confidential information — here&apos;s what tends to stand out:
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {company.whatTheyValue.map((trait) => (
            <li
              key={trait}
              className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-secondary shadow-paper-sm"
            >
              <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              {trait}
            </li>
          ))}
        </ul>
      </section>

      {/* Cross-link to other companies in the same tier */}
      {otherCompanies.length > 0 && (
        <section className="border-t border-border py-16 sm:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Check Resumes for Other {company.tier} Companies
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherCompanies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/resume-checker/company/${c.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-paper-sm transition-colors hover:border-border-bright"
                >
                  <span className="text-sm font-semibold tracking-tight text-primary">
                    {c.name} Resume Checker
                  </span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-secondary transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-secondary">
            <Link href="/resume-checker" className="text-accent hover:underline">
              Browse all resume checkers by role &amp; company
            </Link>
          </p>
        </section>
      )}

      <Cta href="#upload" title={`Ready to grade your resume for ${company.name}?`} />
    </main>
  );
}
