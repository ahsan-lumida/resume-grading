# ResumeGrade — Google Search SEO Brief

## Ask for Gemini
I've already built the on-page/technical SEO for this site (documented below). I want to **rank on Google search** for resume-checker intent. Please act as a technical SEO consultant and give me:

1. **Keyword gaps** — high-intent queries I'm not targeting yet (informational + transactional), with rough difficulty and search-intent notes.
2. **On-page fixes** — improvements to my titles, meta descriptions, H1s, and internal linking for the existing pages.
3. **Content strategy** — new landing pages / guides / comparison pages worth building to capture long-tail traffic (give me a prioritized list with target keyword + suggested title + why).
4. **Structured data gaps** — additional schema.org types I should add (e.g. Review/AggregateRating, SoftwareApplication, VideoObject) and where.
5. **Technical SEO audit** — anything missing that hurts crawlability, indexing, Core Web Vitals, or rich results.
6. **Off-page / authority** — realistic backlink and distribution ideas for a free solo-built tool.

Prioritize recommendations by expected impact vs. effort. Be specific and actionable — no generic "write good content" advice.

---

## Product

- **Name:** ResumeGrade
- **What it is:** Free AI resume checker.
- **Live URL:** https://ai-resume-grade.vercel.app
- **Value prop:** Upload a resume (+ optional job description) → in under 60 seconds get an instant score, missing ATS keywords, rewritten bullet points, red flags recruiters catch, and interview probability by company tier.
- **Cost:** 100% free — no signup, no credit card, no paywall.
- **Privacy:** Stateless backend — resume is processed and discarded, never stored, no accounts.

## Target Audience / Search Intent
Job seekers, new grads, career switchers, and professionals optimizing resumes for ATS (Applicant Tracking Systems). Core intents: "check my resume", "is my resume ATS-friendly", "resume score", "how to beat the ATS".

---

## Current SEO Implementation (already live)

**Tech stack:** Next.js (App Router), hosted on Vercel.

**Home title tag:** `ResumeGrade — Free AI Resume Checker & ATS Score Analyzer`
**Title template for subpages:** `%s — ResumeGrade`
**Tagline:** `Grade your resume. Land the interview.`
**Home meta description:** `Free AI resume checker that scores your resume, flags missing ATS keywords, rewrites weak bullets, and estimates interview odds by company tier. Instant, private, no signup.`

**Keywords currently declared:**
`resume checker`, `ATS resume checker`, `resume score`, `AI resume checker`, `resume analyzer`, `free resume review`, `ATS score checker`

**Existing pages (from sitemap):**
| Path | Target | Priority | Change freq |
|------|--------|----------|-------------|
| `/` | AI Resume Checker (home) | 1.0 | weekly |
| `/ats-resume-checker` | ATS Resume Checker | 0.9 | monthly |
| `/resume-score` | Resume Score Checker | 0.9 | monthly |
| `/guides/ats-resume` | Guide: How to Write an ATS Resume | 0.7 | monthly |

**Structured data (JSON-LD) already implemented:**
- `WebApplication` (applicationCategory: BusinessApplication, `offers` price 0 USD → free)
- `FAQPage`
- `HowTo` (the "how it works" flow, totalTime PT1M)
- `BreadcrumbList` (supporting pages)
- `Article` (guide pages)

**Technical SEO already in place:**
- `sitemap.xml` (auto-generated from route config with per-route priority + changeFrequency)
- `robots.txt` — `allow: /`, `disallow: /api/`, references sitemap + host
- Canonical URL set (`alternates.canonical`)
- `robots: index, follow`
- Google Search Console verification meta tag present
- Open Graph + Twitter `summary_large_image` cards
- Auto-generated OG image (`opengraph-image.tsx`)
- `metadataBase` set for absolute URLs
- Mobile viewport + theme color
- `preconnect` to the API origin (perf)
- Fonts loaded via `next/font` with `display: swap`

**Internal linking:** Footer has "Tools" and "Guides" columns linking the tool pages and the guide.

---

## Constraints / Notes
- Solo-built, no marketing budget — recommendations should be realistic for one person.
- Backend is stateless; there are no user accounts or saved data (so no logged-in/UGC pages).
- Domain is currently a `*.vercel.app` subdomain (open question: does moving to a custom root domain meaningfully help ranking? Please advise.).
