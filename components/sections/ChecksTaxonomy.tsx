import { Check } from "lucide-react";
import { CHECKS } from "@/lib/content";

export default function ChecksTaxonomy() {
  const total = CHECKS.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="what-we-check" className="scroll-mt-24 border-t border-border py-20 sm:py-24">
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        {total} checks across {CHECKS.length} categories
      </h2>
      <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
        Hone goes well beyond spelling and formatting — it grades the things recruiters and
        applicant tracking systems actually weigh, then tells you how to fix each one.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CHECKS.map((cat) => (
          <div
            key={cat.category}
            className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur"
          >
            <h3 className="text-sm font-semibold tracking-tight text-primary">{cat.category}</h3>
            <ul className="mt-4 space-y-2.5">
              {cat.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-secondary">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
