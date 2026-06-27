import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(crumbs)) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tertiary">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.name} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-secondary">{c.name}</span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-primary">
                  {c.name}
                </Link>
              )}
              {!isLast && <ChevronRight size={13} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
