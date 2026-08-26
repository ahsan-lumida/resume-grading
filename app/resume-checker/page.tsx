import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/sections/Cta";
import { ROLES, ROLE_CATEGORIES } from "@/data/roles";
import { COMPANIES } from "@/data/companies";

export const metadata: Metadata = {
  title: { absolute: "All Resume Checkers by Role & Company | ResumeGrading" },
  description:
    "Browse every free ResumeGrading resume checker — by role (Software Engineer, Product Manager, Nurse, and more) and by target company tier (Google, Amazon, Microsoft, and more).",
  alternates: { canonical: "/resume-checker" },
};

export default function ResumeCheckerDirectory() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-5">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resume Checker Directory", path: "/resume-checker" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Every ResumeGrading Resume Checker
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
          The same free, private, no-signup resume analysis — tuned to the ATS keywords and
          expectations for your specific role or target company.
        </p>
      </section>

      {ROLE_CATEGORIES.map((category) => (
        <section key={category} className="border-t border-border py-12 sm:py-16">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            {category} Resume Checkers
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ROLES.filter((role) => role.category === category).map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/resume-checker/${role.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-paper-sm transition-colors hover:border-border-bright"
                >
                  <span className="text-sm font-semibold tracking-tight text-primary">
                    {role.title} Resume Checker
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
        </section>
      ))}

      <section className="border-t border-border py-12 sm:py-16">
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Resume Checkers by Target Company
        </h2>
        <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
          See how your resume reads for the tier your target company falls into.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COMPANIES.map((company) => (
            <li key={company.slug}>
              <Link
                href={`/resume-checker/company/${company.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-paper-sm transition-colors hover:border-border-bright"
              >
                <span className="text-sm font-semibold tracking-tight text-primary">
                  {company.name} Resume Checker
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
      </section>

      <Cta href="/#upload" title="Ready to grade your resume?" />
    </main>
  );
}
