// Ambient page background: slow-drifting aurora blobs + a masked dot grid.
// CSS-only and GPU-friendly (transform/opacity), fixed behind all content.

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-48 left-1/2 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-accent/20 blur-[150px] animate-aurora-1" />
      <div className="absolute top-1/4 -right-48 h-[520px] w-[520px] rounded-full bg-violet-500/15 blur-[140px] animate-aurora-2" />
      <div className="absolute bottom-0 -left-32 h-[440px] w-[560px] rounded-full bg-cyan-500/10 blur-[140px] animate-aurora-3" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
