# Design System Master File — "Aurora Glass"

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

## Direction

Dark, high-end, motion-first. Near-black base with slow-drifting aurora
gradient blobs behind frosted-glass surfaces. One saturated accent
(electric violet) with strict discipline: it marks **score numbers,
primary CTAs, and progress rings — never decoration**. Depth comes from
glass layering, inner edge highlights, and 3D tilt — not from colored
borders or heavy drop shadows.

Anti-goals: light/cream themes (reads as Claude.ai), flat hairline-card
minimalism, purple-on-purple gradient text, decorative accent sprawl,
WebGL/three.js (all 3D feel via Framer Motion transforms only).

## Color tokens (`app/globals.css` `:root` — dark only, `color-scheme: dark`)

| Token | Value | Use | Contrast on base/glass |
|---|---|---|---|
| `--bg-base` | `#0A0A0F` | page background | — |
| `--bg-card` | `rgba(255,255,255,0.04)` | glass panel fill | — |
| `--bg-elevated` | `rgba(255,255,255,0.07)` | hover fill | — |
| `--bg-solid` | `#14141B` | opaque cores (badge center, menus) | — |
| `--border` | `rgba(255,255,255,0.10)` | glass hairline | — |
| `--border-bright` | `rgba(255,255,255,0.20)` | hover/active border | — |
| `--text-primary` | `#F4F5F9` | headings, body | ~16:1 |
| `--text-secondary` | `#A9AEC0` | supporting text | ~7.5:1 |
| `--text-tertiary` | `#7D8296` | captions only | ~4.8:1 |
| `--accent` | `#A78BFA` | THE accent (violet) | ~6.8:1 |
| `--accent-dim` | `#BDA5FE` | accent hover (brighter) | — |
| `--on-accent` | `#14082B` | text on accent fills | ~7:1 on accent |
| `--accent-2` | `#22D3EE` | cyan, rare decorative | ~10:1 |
| `--green / --amber / --red` | `#4ADE80 / #FBBF24 / #F87171` | semantic + score trio | all >7:1 |

Aurora blobs (background only, never foreground): violet
`rgba(139,92,246,.34)`, cyan `rgba(34,211,238,.22)`, amber
`rgba(251,191,36,.13)` — radial gradients, `blur(90px)`, 26–34s
`ease-in-out infinite alternate` drift loops. Static under
reduced-motion.

## Glass recipe

`.glass` utility (and the Tailwind long-form for one-offs):
`backdrop-blur-xl` + `bg-white/[0.04]` + `border border-white/10` +
inner top highlight `inset 0 1px 0 rgba(255,255,255,0.08)` + ambient
`0 8px 32px rgba(0,0,0,0.35)`. `.glass-strong` (nav, modals): 6% fill,
`blur(32px) saturate(1.4)`. Never stack more than two glass layers.

## Typography

- **Display**: Sora (`--font-display`) — geometric, confident; headings,
  score numbers. Tracking -0.02em.
- **Body**: Geist (`--font-body`) — 16px base, line-height 1.6.
- **Data**: Geist Mono (`--font-data`) — scores, percentages, tabular
  figures.

## Motion system

- Libraries: **framer-motion** (all UI motion), **lenis** (smooth scroll,
  `lerp 0.12`, anchor offset -88 for sticky nav), **react-parallax-tilt**
  available but prefer raw FM transforms.
- Page transitions: `app/template.tsx` remounts per route → fade + rise
  (y:12) + scale(0.99→1), 350ms, ease `[0.16,1,0.3,1]`.
- Micro-interactions 150–300ms; entrances ≤400ms; stagger lists 30–50ms.
- Springs for scale/tilt feedback (press scale 0.97); ease-out enters,
  ease-in exits; exits ~65% of enter duration.
- Continuous ambient loops (blobs) are CSS keyframes, not FM.
- **Every FM component checks `useReducedMotion()`** → opacity-only
  fallback; CSS loops disabled via media query in globals.css.
- Transform/opacity only — never animate width/height/top/left.

## Accent discipline (hard rule)

Violet `--accent` may appear on: primary CTA fills (+ `.glow-accent`),
score numbers/rings, active nav state, focus rings, links. Everything
else is white-alpha, text tokens, or semantic green/amber/red. If a
surface "needs color", it gets glass + light, not violet.

## CSS cascade rules (hard rule — this one has bitten us)

**Every element-level default in `app/globals.css` MUST live inside
`@layer base { }`.** Tailwind v4 emits `@layer theme, base, components,
utilities` and puts all of its utilities in `@layer utilities`. Per the
cascade-layer spec, **unlayered declarations beat every layered
declaration regardless of specificity** — so an unlayered `p { color }`
silently defeats `text-secondary`, `text-zinc-700`, and every other text
colour utility in the app.

This shipped as a P0: unlayered `h1..h6 { color }` and `p { color }`
overrode the light-paper resume preview
(`components/ResumeTemplatePreview.tsx`, which is `bg-white`), rendering
`#f4f5f9` on `#ffffff` — a **1.09:1** contrast ratio. The candidate's
name, every section heading, the summary, all dates and the education
block were invisible; only classed `<span>`/`<li>` survived. It went
unnoticed on the dark pages because there it merely flattened hierarchy.

Verify with the computed value, not by eye:

```js
getComputedStyle(document.querySelector('.bg-white h1')).color
// must be the utility's colour, not var(--text-primary)
```

Related: **two plain classes that set the same property silently
clobber each other.** `.glow-accent` and `.shadow-paper-lg` both set
`box-shadow` at equal specificity, so an element with both got only the
later one. They now compose through `--elev-shadow` / `--glow-shadow`,
declared with `@property { inherits: false }` (without that, a
`.shadow-paper-lg` card leaks its elevation into every descendant
carrying `.glow-accent`). Add a new elevation/glow class the same way.

**Anything that renders on a light surface needs checking on both.**
`ResumeTemplatePreview` is the only light-surface component in the app
and sits deliberately outside Aurora Glass; `::selection` also carries no
`color` for this reason. Dark app chrome floating over that card (sticky
action bars, the sticky navbar) needs its own scrim — `bg-card` is 4%
white and vanishes on paper.

## Component rules

- Cards/panels/nav/dropzone/FAQ = glass. Radius: `rounded-2xl` cards,
  `rounded-lg` buttons/inputs.
- Elevation classes `.shadow-paper-sm/md/lg` (legacy names) = dark
  ambient shadow + inner highlight scale. See the cascade rules above
  before editing them.
- Icons: lucide-react SVGs only, no emoji.
- Focus: `focus-visible:ring-2 ring-accent` + offset on base.
- Touch targets ≥44px; breakpoints 375/768/1024/1440.

## Phase plan

1. ✅ Foundation: tokens, glass utils, aurora blobs, scroll-aware glass
   nav, Lenis, template.tsx transitions, Sora/Geist.
2. ✅ Hero stagger + tilt dropzone + magnetic CTA.
3. ✅ whileInView reveals, tilt cards w/ specular highlight, SVG
   progress-line draw (scroll-scrubbed via useScroll).
4. ✅ Bento checks grid (4-col, corners span 2), parallax icons,
   AnimatePresence FAQ accordion.
5. ✅ Results: SVG score ring + spring count-up, staggered ATS chips,
   before→after bullet reveal, animated odds bars.

Shared primitives live in `components/motion/`: `Reveal` (whileInView
fade+rise, stagger via `delay`), `TiltCard` (±4° mouse tilt + specular
glare), `Magnetic` (CTA drift toward cursor + press scale). All three
degrade to plain fades / static under prefers-reduced-motion.
`/dev-preview` renders the results view with mock data (dev-only,
404s in production) for visual checks without the backend.
Note: `.glass` is a Tailwind @utility and does NOT set a border —
markup adds `border border-border` alongside.

## Pre-delivery checklist (per phase)

- [ ] Text ≥4.5:1 over worst-case glass+blob background
- [ ] Hover + focus-visible states on all interactive elements
- [ ] 375/768/1024/1440 responsive, no horizontal scroll
- [ ] No emoji-as-icons
- [ ] reduced-motion fallback (fades only; no tilt/parallax/blob/count-up)
- [ ] `tsc --noEmit`, `next lint`, `next build` clean
