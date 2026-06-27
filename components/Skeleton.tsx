// Reusable skeleton placeholders shown while async/dynamic sections load.
// Reserves layout space to avoid cumulative layout shift.

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-[skeleton-pulse_1.5s_ease-in-out_infinite] rounded-xl bg-elevated ${className}`}
    />
  );
}

export function SkeletonText({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-3.5 w-full ${className}`} />;
}

export function SkeletonBadge({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-6 w-20 rounded-full ${className}`} />;
}

/** Full-height section placeholder matching the result card shell. */
export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <SkeletonBadge className="w-28" />
      </div>
      <div className="mt-5 space-y-3">
        <SkeletonText />
        <SkeletonText className="w-11/12" />
        <SkeletonText className="w-9/12" />
      </div>
      <div className="mt-6 flex gap-2">
        <SkeletonBadge />
        <SkeletonBadge className="w-16" />
        <SkeletonBadge className="w-24" />
      </div>
    </div>
  );
}
