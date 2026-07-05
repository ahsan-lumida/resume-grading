import Link from "next/link";
import Logo from "@/components/Logo";
import { FOOTER_COLUMNS } from "@/lib/content";
import { SITE_TAGLINE } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-2 gap-8 px-5 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Logo size={26} />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary">{SITE_TAGLINE}</p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-tertiary">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-[1100px] px-5 py-6 text-xs text-tertiary">
          © {new Date().getFullYear()} ResumeGrade — Free AI resume review. Private, no signup.
        </p>
      </div>
    </footer>
  );
}
