# ResumeGrading

Free AI resume checker. Upload a resume, get an instant score, missing ATS keywords, rewritten bullets, red flags, and interview probability by company tier — in under 60 seconds. No signup, no paywall.

**Live:** https://www.resumegrading.com  
**API:** https://resume-api-3w5v.onrender.com

---

## What it does

1. User uploads a PDF or DOCX resume (optionally with a job description).
2. The frontend proxies the file to a FastAPI backend via a BFF route — the backend token never reaches the browser.
3. The backend redacts personal info, parses the resume, and runs it through an LLM pipeline (Groq / Cerebras / OpenRouter).
4. Results are returned as structured JSON and rendered across 10 interactive panels.

### Analysis output
- **Overall score** (0–10) with rationale
- **ATS score** — parse rate + keyword match
- **Quick wins** — highest-leverage fixes ranked by impact
- **Strengths & weaknesses**
- **Interview odds** by company tier (FAANG, startup, SMB)
- **Improvements board** — ranked action items
- **Bullet rewrites** — weak bullets rewritten in XYZ format
- **Quantification opportunities** — bullets that need numbers
- **Red flags** — credibility/risk signals with severity
- **Tailoring tips** — keyword and summary alignment to the job

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript + React 19 |
| Styling | Tailwind CSS v4 (tokens in `globals.css` via `@theme inline`) |
| Charts | recharts 3.9 |
| Icons | lucide-react |
| Backend | FastAPI (Python) — separate repo at `resume-api/` |
| Hosting | Vercel (frontend) + Render (backend) |

---

## Architecture

```
Browser
  └── /api/analyze (Next.js BFF route)        ← CLIENT_SECRET stays server-side
        └── POST /api/v1/analyze (FastAPI)
              └── LLM pipeline (Groq → Cerebras → OpenRouter fallback)
```

**Key patterns:**
- `lib/api.ts` is `server-only` — never imported client-side
- `lib/client.ts` hits `/api/analyze` (BFF), never the backend directly
- All heavy result components are `next/dynamic` with `ssr: false` + skeleton fallbacks
- Module-level token cache in `lib/api.ts` (55-min TTL) avoids re-auth on every request
- `/api/warmup` pings the backend `/health` on page load to pre-warm Render's cold-start

---

## Project structure

```
app/
  layout.tsx                  # Site shell, metadata, JSON-LD WebApplication schema
  page.tsx                    # Homepage — hero, upload zone, features, FAQ
  globals.css                 # Design tokens + Tailwind v4 @theme
  opengraph-image.tsx         # Dynamic OG card (1200×630)
  robots.ts                   # robots.txt
  sitemap.ts                  # sitemap.xml (4 routes)
  ats-resume-checker/         # ATS-specific landing page
  resume-score/               # Resume score landing page
  guides/ats-resume/          # Long-form ATS resume guide
  api/
    analyze/route.ts          # BFF — proxies file to backend
    warmup/route.ts           # Silent health ping to warm Render

components/
  AnalyzerApp.tsx             # Main state machine (idle → loading → done/error)
  UploadZone.tsx              # Drag/drop file input + job description
  Navbar.tsx                  # Sticky glass nav with active-route highlighting
  Background.tsx              # CSS aurora blobs + dot grid
  Footer.tsx                  # Hub-and-spoke footer with all topic-cluster links
  Logo.tsx                    # SVG mark + "ResumeGrading" wordmark
  ResultsNav.tsx              # Right-rail scroll-spy (xl screens)
  ScoreDashboard.tsx          # SVG semicircle arc gauge
  Breadcrumbs.tsx             # BreadcrumbList schema + visual crumbs
  Skeleton.tsx                # Skeleton card for dynamic import fallbacks
  sections/
    HowItWorks.tsx
    ChecksTaxonomy.tsx
    FaqSection.tsx
    Cta.tsx
  [+ 7 result panel components]

lib/
  api.ts          # server-only — token fetch/cache + analyzeResume()
  client.ts       # browser-safe submitAnalysis() → hits BFF
  seo.ts          # SITE_URL + JSON-LD builders (WebApplication, FAQ, HowTo, Article, Breadcrumb)
  content.ts      # All marketing copy, FAQ, ATS platforms, routes, footer columns

types/
  analysis.ts     # TypeScript interfaces matching backend API contract
```

---

## SEO structure

Topic-cluster (hub-and-spoke) model targeting resume tool keywords:

| Route | Target keyword | Schema |
|-------|---------------|--------|
| `/` | "AI resume checker", "ATS score analyzer" | WebApplication, HowTo, FAQPage |
| `/ats-resume-checker` | "ATS resume checker" | FAQPage |
| `/resume-score` | "resume score checker" | FAQPage |
| `/guides/ats-resume` | "how to write an ATS resume" | Article, HowTo, BreadcrumbList |

All routes are cross-linked. Sitemap and robots.txt are auto-generated from `lib/content.ts`.

---

## Environment variables

### Frontend (`resume-frontend/.env`)
```
NEXT_PUBLIC_API_URL=https://resume-api-3w5v.onrender.com
CLIENT_SECRET=<shared secret — must match backend>
```

### Backend (`resume-api/.env`)
```
ALLOWED_ORIGINS=["http://localhost:3000","https://www.resumegrading.com"]
CLIENT_SECRET=<shared secret>
JWT_SECRET_KEY=<random secret>
JWT_EXPIRE_MINUTES=60
GROQ_API_KEY=...
CEREBRAS_API_KEY=...
OPENROUTER_API_KEY=...
```

> `CLIENT_SECRET` must match on both sides. The frontend exchanges it for a JWT on the first request; the JWT is cached for 55 minutes.

---

## Running locally

```bash
# Frontend
cd resume-frontend
npm install
npm run dev        # http://localhost:3000

# Backend (separate terminal)
cd resume-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

---

## Deployment

| Service | What to set |
|---------|-------------|
| **Vercel** (frontend) | `NEXT_PUBLIC_API_URL`, `CLIENT_SECRET` |
| **Render** (backend) | All backend env vars including `ALLOWED_ORIGINS` with the Vercel URL |

Render free tier spins down after 15 min of inactivity. The `/api/warmup` route mitigates the cold-start by pinging `/health` as soon as the upload zone mounts.

---

## Design system

Dark theme only. Tokens defined in `globals.css` `:root`, exposed as Tailwind utilities via `@theme inline`.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#080b11` | Page background |
| `--bg-card` | `#0f1420` | Cards |
| `--text-primary` | `#eef2ff` | Headings, body text |
| `--text-secondary` | `#8b9cc8` | Muted labels, descriptions |
| `--accent` | `#4f6ef7` | CTAs, links |
| `--accent-2` | `#8b5cf6` | Gradient partner |
