// Hone brand mark + wordmark. The mark is an upward "honed edge" chevron —
// precision + ascent — in the indigo→violet brand gradient.

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="hone-mark" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F6EF7" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#hone-mark)" />
      <path
        d="M9 19.5 L16 10.5 L23 19.5"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 23 L20 23" stroke="white" strokeOpacity="0.7" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({
  size = 30,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="text-lg font-semibold tracking-tight text-primary">Hone</span>
    </span>
  );
}
