"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/ats-resume-checker", label: "ATS Checker" },
  { href: "/resume-score", label: "Resume Score" },
  { href: "/guides/ats-resume", label: "Guide" },
];

// Transparent over the hero; solidifies into frosted glass once the
// page scrolls (driven by framer-motion's useScroll).
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1100px] items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Link href="/" className="transition-opacity hover:opacity-80" aria-label="ResumeGrade home">
            <Logo />
          </Link>
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-accent/15 text-accent"
                    : "text-secondary hover:bg-elevated hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/#upload"
          className="group glow-accent flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        >
          Analyze resume
          <ArrowUpRight
            size={15}
            className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </nav>
    </header>
  );
}
