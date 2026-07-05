import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

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
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-3xl border border-border p-10 text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-balance leading-relaxed text-secondary">
            {body}
          </p>
          <Magnetic className="mt-7 inline-block">
            <Link
              href={href}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors duration-200 glow-accent hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              {label}
              <ArrowUpRight
                size={17}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
