import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROLES } from "@/data/roles";

export default function PopularRoles() {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Resume Checkers by Role
      </h2>
      <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
        Get the ATS keywords and bullet rewrites recruiters expect for your specific role.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ROLES.map((role) => (
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
  );
}
