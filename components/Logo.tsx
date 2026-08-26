// Fixed brand colors (not theme-adaptive): electric-violet tile, light "R",
// and a small cyan "grade" dot — matches the Aurora Glass accent system.
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="16.6" fill="#8B5CF6" />
      <path
        d="M14.44 49.5V17.5H21.57V49.5ZM33.7 49.5 24.4 35.85H32.22L41.96 49.5ZM19.66 39.33V33.72H27.48Q29.05 33.72 30.2 33.09Q31.35 32.46 31.98 31.3Q32.61 30.15 32.61 28.63Q32.61 27.11 31.98 25.96Q31.35 24.8 30.2 24.17Q29.05 23.54 27.48 23.54H19.66V17.5H26.92Q30.87 17.5 33.79 18.7Q36.7 19.89 38.27 22.24Q39.83 24.59 39.83 28.15V28.85Q39.83 32.37 38.24 34.7Q36.66 37.02 33.77 38.17Q30.87 39.33 26.92 39.33Z"
        fill="#F4F5F9"
      />
      <circle cx="47.4" cy="42.4" r="5.2" fill="#22D3EE" />
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
      <span className="font-display text-lg font-semibold tracking-tight text-primary">ResumeGrading</span>
    </span>
  );
}
