import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Cta({
  title = "Ready to see your resume score?",
  body = "Upload your resume and get an instant, recruiter-grade review — free, private, no signup.",
  href = "/#upload",
  label = "Analyze my resume",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="py-16">
      <div className="ring-gradient glow-soft relative overflow-hidden rounded-3xl border border-border bg-card/70 p-10 text-center backdrop-blur">
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-balance leading-relaxed text-secondary">{body}</p>
        <Link
          href={href}
          className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:shadow-[0_10px_40px_-12px_rgba(79,110,247,0.85)]"
        >
          {label}
          <ArrowUpRight
            size={17}
            className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
