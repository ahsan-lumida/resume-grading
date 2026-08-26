import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import AnalyzerApp from "@/components/AnalyzerApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import Cta from "@/components/sections/Cta";
import { ROLES, getRole } from "@/data/roles";

type RouteParams = { role: string };

// Pre-render one static page per role at build time. With dynamicParams=false,
// any slug not in this list returns a 404 instead of rendering on-demand.
export function generateStaticParams(): RouteParams[] {
  return ROLES.map((role) => ({ role: role.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { role: slug } = await params;
  const role = getRole(slug);
  if (!role) return {};

  const path = `/resume-checker/${role.slug}`;
  return {
    title: {
      absolute: `Free ${role.title} Resume Checker & ATS Scanner | ResumeGrading`,
    },
    description: `Free ${role.title} resume checker: scan your resume against ${role.title} job descriptions, see the ATS keywords recruiters look for, and get quantified bullet rewrites — instant, private, no signup.`,
    alternates: { canonical: path },
  };
}

export default async function RoleResumeChecker({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { role: slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const relatedRoles = ROLES.filter(
    (r) => r.category === role.category && r.slug !== role.slug,
  ).slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-[1100px] px-5">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resume Checker", path: "/resume-checker" },
          { name: `${role.title} Resume Checker`, path: `/resume-checker/${role.slug}` },
        ]}
      />

      <section className="py-12 sm:py-16">
        <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Free {role.title} Resume Checker
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
          Upload your resume to see how it scores for {role.title} roles — the ATS keywords
          you&apos;re missing, the bullets that need numbers, and exactly what to fix before you
          apply. Instant, private, no signup.
        </p>
      </section>

      <div id="upload" className="scroll-mt-24 pb-8">
        <AnalyzerApp />
      </div>

      {/* Top ATS keywords */}
      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Top ATS Keywords for {role.title}s
        </h2>
        <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
          These are the skills and terms an applicant tracking system most often screens for in{" "}
          {role.title} applications. Work the ones that genuinely apply to you into your summary,
          skills, and experience — using the exact wording from the job post.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {role.topKeywords.map((keyword) => (
            <li
              key={keyword}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-secondary shadow-paper-sm"
            >
              <Check size={15} className="shrink-0 text-accent" aria-hidden="true" />
              {keyword}
            </li>
          ))}
        </ul>
      </section>

      {/* Before & after bullet rewrites */}
      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Before &amp; After Bullet Rewrites for {role.title}s
        </h2>
        <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
          A strong {role.title} bullet trades vague duties for quantified impact. Here&apos;s the
          kind of rewrite ResumeGrading suggests:
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-red/20 bg-red/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-red">Before</p>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              {role.sampleBulletBefore}
            </p>
          </div>
          <div className="rounded-2xl border border-green/20 bg-green/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-green">After</p>
            <p className="mt-4 text-sm leading-relaxed text-secondary">{role.sampleBulletAfter}</p>
          </div>
        </div>
      </section>

      {/* Cross-link to related roles in the same category */}
      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Check Other {role.category} Resumes
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {relatedRoles.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/resume-checker/${r.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-paper-sm transition-colors hover:border-border-bright"
              >
                <span className="text-sm font-semibold tracking-tight text-primary">
                  {r.title} Resume Checker
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

      <Cta href="#upload" title={`Ready to grade your ${role.title} resume?`} />
    </main>
  );
}
