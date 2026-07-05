// Ambient page background: near-black base with three large, blurred
// aurora blobs (violet / cyan / amber) drifting on slow 26–34s loops,
// plus a faint dot grid for texture. Purely decorative — colors here
// never carry meaning. Blob motion is CSS-only and is switched off
// under prefers-reduced-motion (they remain as static glows).

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base"
    >
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
