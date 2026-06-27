import { CheckCircle2 } from "lucide-react";
import type { ResumeAnalysis, Severity } from "@/types/analysis";

const severityMeta: Record<Severity, { border: string; badge: string }> = {
  minor: {
    border: "border-l-amber-500",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  moderate: {
    border: "border-l-orange-500",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  critical: {
    border: "border-l-red-500",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

export default function RedFlags({
  flags,
}: {
  flags: ResumeAnalysis["red_flags"];
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary">
        Red Flags
      </h2>
      {!flags || flags.length === 0 ? (
        <div className="flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-sm font-medium text-green-400">
          <CheckCircle2 size={18} />
          No red flags detected
        </div>
      ) : (
        <div className="space-y-3">
          {flags.map((f, i) => {
            const meta = severityMeta[f.severity];
            return (
              <div
                key={i}
                className={`rounded-2xl border border-border border-l-4 bg-card p-5 ${meta.border}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold tracking-tight text-primary">{f.flag}</span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${meta.badge}`}
                  >
                    {f.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{f.mitigation}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
