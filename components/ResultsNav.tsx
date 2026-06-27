"use client";

import { useEffect, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
}

// Floating right-rail scroll-spy. Hidden below xl so it never crowds the
// single-column reading flow. Dots expand + reveal labels for the active /
// hovered section.
export default function ResultsNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Results sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-2">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center justify-end gap-2.5">
                <span
                  className={`whitespace-nowrap rounded-md bg-elevated/80 px-2 py-0.5 text-xs font-medium opacity-0 backdrop-blur transition-opacity duration-150 group-hover:opacity-100 ${
                    isActive ? "text-primary" : "text-secondary"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "w-5 bg-accent"
                      : "w-1.5 bg-border-bright group-hover:bg-secondary"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
