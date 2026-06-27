import type { ResumeAnalysis } from "@/types/analysis";

export default function QuickWins({ wins }: { wins: ResumeAnalysis["quick_wins"] }) {
  if (!wins || wins.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
        ⚡ Quick Wins
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wins.slice(0, 3).map((win, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-border bg-card p-5 pl-6 transition-colors duration-150 hover:border-border-bright hover:bg-elevated"
          >
            <span className="absolute inset-y-4 left-0 w-0.5 rounded-full bg-accent" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
              {i + 1}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-primary">{win}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
