// Fixed brand colors (not theme-adaptive): electric-violet tile, light "R",
// and a small cyan "grade" dot — matches the Aurora Glass accent system.
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
      <rect width="32" height="32" rx="8" fill="#8B5CF6" />
      <path
        d="M10 21V11.5h5.2c2 0 3.4 1.2 3.4 3s-1.4 3-3.4 3H12"
        stroke="#F4F5F9"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22.5" cy="21.5" r="2.3" fill="#22D3EE" />
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
      <span className="font-display text-lg font-semibold tracking-tight text-primary">ResumeGrade</span>
    </span>
  );
}
