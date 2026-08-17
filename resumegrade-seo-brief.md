# ResumeGrading — Google Search SEO Brief

## Ask for Gemini
I've already built the on-page/technical SEO for this site (documented below). I want to **rank on Google search** for resume-checker intent. Please act as a technical SEO consultant and give me:

1. **Keyword gaps** — high-intent queries I'm not targeting yet (informational + transactional), with rough difficulty and search-intent notes.
2. **On-page fixes** — improvements to my titles, meta descriptions, H1s, and internal linking for the existing pages.
3. **Content strategy** — new landing pages / guides / comparison pages worth building to capture long-tail traffic (give me a prioritized list with target keyword + suggested title + why).
4. **Structured data gaps** — additional schema.org types I should add (e.g. Review/AggregateRating, VideoObject) and where.
5. **Technical SEO audit** — anything missing that hurts crawlability, indexing, Core Web Vitals, or rich results.
6. **Off-page / authority** — realistic backlink and distribution ideas for a free solo-built tool.
7. **Programmatic SEO review** — I have 5 role-specific landing pages live (see below); tell me if they're differentiated enough to avoid thin-content/duplicate-content issues, and which additional roles are worth adding next.

Prioritize recommendations by expected impact vs. effort. Be specific and actionable — no generic "write good content" advice.

---

## Product

- **Name:** ResumeGrading *(rebranded from "ResumeGrade")*
- **What it is:** Free AI resume checker.
- **Live URL:** https://www.resumegrading.com *(moved off the `*.vercel.app` subdomain onto a custom root domain — the prior open question about domain is resolved. A permanent redirect from the old subdomain (`ai-resume-grade.vercel.app`) to this domain is now in place — see Technical SEO section.)*
- **Value prop:** Upload a resume (+ optional job description) → in under 60 seconds get an instant score, missing ATS keywords, rewritten bullet points, red flags recruiters catch, and interview probability by company tier.
- **Cost:** 100% free — no signup, no credit card, no paywall.
- **Privacy:** Stateless backend — resume is processed and discarded, never stored, no accounts.

## Target Audience / Search Intent
Job seekers, new grads, career switchers, and professionals optimizing resumes for ATS (Applicant Tracking Systems). Core intents: "check my resume", "is my resume ATS-friendly", "resume score", "how to beat the ATS".

---

## Current SEO Implementation (already live)

**Tech stack:** Next.js (App Router), hosted on Vercel, custom domain `www.resumegrading.com`.

**Home title tag:** `Free AI Resume Checker & ATS Scanner | ResumeGrading` *(updated — previously `ResumeGrading — Free AI Resume Checker & ATS Score Analyzer`, which was actually the odd one out; every subpage already used the brand-last "| ResumeGrading" pipe format, so home was brought in line rather than the reverse.)*
**Title template for subpages:** `%s — ResumeGrading` *(still used only by `/guides/ats-resume`, which supplies a plain string title; all other subpages set their own absolute title.)*
**Tagline:** `Grade your resume. Land the interview.`
**Home meta description:** `Free AI resume checker that scores your resume, flags missing ATS keywords, rewrites weak bullets, and estimates interview odds by company tier. Instant, private, no signup.`

**Keywords meta tag:** No longer declared anywhere in the codebase (was previously set; dropped at some point — Google ignores this tag for ranking anyway, so low priority, but flagging the removal in case it was unintentional).

**Existing pages (from sitemap):**
| Path | Target | Priority | Change freq |
|------|--------|----------|-------------|
| `/` | AI Resume Checker (home) | 1.0 | weekly |
| `/ats-resume-checker` | ATS Resume Checker | 0.9 | monthly |
| `/resume-score` | Resume Score Checker | 0.9 | monthly |
| `/guides/ats-resume` | Guide: How to Write an ATS Resume | 0.7 | monthly |
| `/resume-checker/software-engineer` | Programmatic role page | 0.8 | monthly |
| `/resume-checker/product-manager` | Programmatic role page | 0.8 | monthly |
| `/resume-checker/data-analyst` | Programmatic role page | 0.8 | monthly |
| `/resume-checker/registered-nurse` | Programmatic role page | 0.8 | monthly |
| `/resume-checker/financial-analyst` | Programmatic role page | 0.8 | monthly |

**New: programmatic SEO role pages (`/resume-checker/[role]`)** — statically generated at build time (`generateStaticParams`, `dynamicParams = false`, so unlisted slugs 404 instead of soft-rendering). Each page has a unique title (`Free {Role} Resume Checker & ATS Scanner | ResumeGrading`), unique meta description, canonical, `BreadcrumbList` JSON-LD, a role-specific H1, a "Top ATS Keywords for {Role}s" section, and a before/after bullet rewrite example — all sourced from a per-role data file (`data/roles.ts`), so content is differentiated rather than templated boilerplate. Currently 5 roles live; the data file is structured to make adding more roles cheap.

**Structured data (JSON-LD) already implemented:**
- `SoftwareApplication` (was `WebApplication`; applicationCategory: BusinessApplication, `offers` price 0 USD → free) — sitewide in `<head>`
- `FAQPage` (home; expanded to 10 Q&As explicitly targeting People-Also-Ask-style queries — score benchmarks, ATS parsing mechanics, privacy, file formats, accuracy caveats)
- `HowTo` (the "how it works" flow, totalTime PT1M)
- `BreadcrumbList` (supporting pages, including the new role pages)
- `Article` (guide pages)

**Technical SEO already in place:**
- `sitemap.xml` (auto-generated from route config + programmatically from the roles data file, with per-route priority + changeFrequency)
- `robots.txt` — `allow: /`, `disallow: /api/`, references sitemap + host
- Canonical URL set (`alternates.canonical`) on every page including role pages
- `robots: index, follow`
- Google Search Console verification meta tag present
- Open Graph + Twitter `summary_large_image` cards
- Static OG image (`app/opengraph-image.png` + `opengraph-image.alt.txt`) — previously a dynamically generated `opengraph-image.tsx`, since replaced with a static asset
- `metadataBase` set for absolute URLs
- Mobile viewport + theme color
- `preconnect` to the API origin (perf)
- Fonts loaded via `next/font` with `display: swap`
- Full dark-theme UI redesign ("Aurora Glass") with a motion system — worth a Core Web Vitals gut-check if animations run on scroll/load, since that's the most common way a visual redesign quietly regresses CLS/INP
- **New:** Permanent redirect (`next.config.ts`, host-matched, `permanent: true` → 308) from the legacy `ai-resume-grade.vercel.app` subdomain to `https://www.resumegrading.com`, preserving path — consolidates any residual link equity/indexing on the old host.

**Internal linking:** Footer now has four nav columns — "Tools," "Guides," **"Resume Checkers by Role"** *(new)*, and "Get started" — the new column links all 5 `/resume-checker/[role]` pages, generated directly from the roles data file so it stays in sync as roles are added. A new **"Resume Checkers by Role"** section (`components/sections/PopularRoles.tsx`) was also added near the bottom of `/` and `/ats-resume-checker`, linking the same 5 role pages. Role pages were previously only reachable via the sitemap and cross-links to each other; they're now linked from the homepage, the ATS checker page, and the sitewide footer — closing the internal-linking gap flagged previously.

---

## Constraints / Notes
- Solo-built, no marketing budget — recommendations should be realistic for one person.
- Backend is stateless; there are no user accounts or saved data (so no logged-in/UGC pages).
- Custom root domain is live (`www.resumegrading.com`) — no longer on a `*.vercel.app` subdomain.
- There's also a `/dev-preview` route used to visually check the results UI with mock data; it's client-rendered and 404s in production builds, and isn't in the sitemap or ROUTES config, so it shouldn't be a crawl/indexing concern, but flagging it for completeness.
