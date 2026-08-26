import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/content";
import { ROLES } from "@/data/roles";
import { COMPANIES } from "@/data/companies";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Programmatic role landing pages (app/resume-checker/[role]).
  const roleRoutes: MetadataRoute.Sitemap = ROLES.map((role) => ({
    url: absoluteUrl(`/resume-checker/${role.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Programmatic company landing pages (app/resume-checker/company/[company]).
  const companyRoutes: MetadataRoute.Sitemap = COMPANIES.map((company) => ({
    url: absoluteUrl(`/resume-checker/company/${company.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...roleRoutes, ...companyRoutes];
}
