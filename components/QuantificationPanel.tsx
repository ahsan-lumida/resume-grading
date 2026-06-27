"use client";

import { useState } from "react";
import { ChevronDown, Ruler, Search } from "lucide-react";
import type { ResumeAnalysis } from "@/types/analysis";

export default function QuantificationPanel({
  opportunities,
}: {
  opportunities: ResumeAnalysis["quantification_opportunities"];
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (!opportunities || opportunities.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
        These Bullets Need Numbers
      </h2>
      <div className="space-y-3">
        {opportunities.map((opp, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-150 hover:border-border-bright"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary">
                  {opp.original_bullet}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-secondary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-border/60 px-5 pb-5 pt-4">
                  <div className="flex gap-3">
                    <Ruler size={16} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-secondary">
                        What to measure
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-primary">
                        {opp.what_to_measure}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Search size={16} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-secondary">
                        How to find it
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-primary">
                        {opp.how_to_find_it}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
