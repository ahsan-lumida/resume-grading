import { HOW_IT_WORKS } from "@/lib/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-border py-20 sm:py-24">
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        How the resume checker works
      </h2>
      <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
        Three steps, about a minute, no signup — from upload to an actionable, recruiter-grade
        review.
      </p>

      <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {HOW_IT_WORKS.map((step, i) => (
          <li
            key={step.title}
            className="relative rounded-2xl border border-border bg-card/70 p-6 backdrop-blur"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-sm font-semibold text-accent ring-1 ring-accent/20">
              {i + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
