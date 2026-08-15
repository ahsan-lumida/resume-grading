"use client";

import { useState } from "react";
import type { Improvement, Priority, ResumeAnalysis } from "@/types/analysis";
import { levelClass, sectionTagClass } from "@/lib/ui";

const TABS: { key: Priority; label: string }[] = [
  { key: "do_now", label: "Do Now" },
  { key: "do_soon", label: "Do Soon" },
  { key: "long_term", label: "Long Term" },
];

function ImprovementCard({ item }: { item: Improvement }) {
  return (
    <div className="rounded-2xl border border-border glass p-5 transition-colors duration-150 hover:border-border-bright hover:bg-elevated">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elevated text-xs font-semibold text-secondary">
          {item.rank}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${sectionTagClass[item.section] ?? sectionTagClass.other}`}
            >
              {item.section}
            </span>
          </div>
          <h3 className="mt-2 font-semibold tracking-tight text-primary">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-secondary">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelClass[item.effort] ?? levelClass.medium}`}
            >
              {item.effort} effort
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelClass[item.impact] ?? levelClass.medium}`}
            >
              {item.impact} impact
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImprovementsBoard({
  improvements,
}: {
  improvements: ResumeAnalysis["top_improvements"];
}) {
  const [active, setActive] = useState<Priority>("do_now");
  const filtered = (improvements ?? [])
    .filter((i) => i.priority === active)
    .sort((a, b) => a.rank - b.rank);

  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
        Prioritized Improvements
      </h2>

      <div className="mb-5 flex gap-6 border-b border-border">
        {TABS.map((tab) => {
          const count = (improvements ?? []).filter((i) => i.priority === tab.key).length;
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "border-accent text-primary"
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs text-tertiary">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border glass p-6 text-sm text-tertiary">
          No improvements in this category.
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <ImprovementCard key={item.rank} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
