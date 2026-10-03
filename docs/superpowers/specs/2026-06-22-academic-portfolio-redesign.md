# Academic Portfolio Redesign

**Date:** 2026-06-22  
**Status:** Approved  
**Live site:** https://Gatsby0916.github.io/haiyi-li-portfolio/

## Goal

Redesign the existing React + TypeScript + Vite academic portfolio into a cinematic, typographically-driven academic homepage. The current site feels too designed and informal for a serious researcher. The new version should feel like a high-quality academic publication rendered as a webpage.

## Design Direction

**Aesthetic:** Cinematic dark academic. Visual impact comes entirely from typography hierarchy and contrast — no gradients, no glow effects, no card shadows. Film-grain texture (SVG noise overlay, opacity ~0.03) is the only decorative layer.

**Theme:** Dark only (for now). Background `#0a0a0a`.

**Typography (three-font system):**
- Headings: Playfair Display (serif) — academic gravitas
- Body / UI: Inter (sans-serif) — legibility
- Metadata / code: JetBrains Mono — precision, monospace layer

**Tech stack:** Unchanged — React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. Add `@fontsource/playfair-display`, `@fontsource/inter`, `@fontsource/jetbrains-mono`.

---

## Page Structure

Single-page, vertical scroll. Six sections in narrative order:

```
① Hero / Research Statement
② Publications
③ Education & Experience (unified timeline)
④ Honors (inline, end of timeline)
⑤ Skills
⑥ Footer
```

**Navigation:** Fixed top bar. Transparent until scroll > 20px, then `bg-[#0a0a0a]/90 backdrop-blur-sm`. Left: "HL" monogram in Playfair Display. Right: text links + EN/ZH toggle button (JetBrains Mono, small). No hamburger animation — mobile collapses to a bottom bar.

---

## Section Designs

### ① Hero / Research Statement

Full viewport height (`100vh`). Pure typography, no images.

Top-to-bottom layout:
- Small label: `[ ACADEMIC PORTFOLIO ]` — JetBrains Mono, wide letter-spacing, ~30% opacity
- Name: **Haiyi Li** — Playfair Display, ~`7rem`, weight 700, white
- One-line title: `Incoming M.S. CSE · Harvard University` — Inter Light, `1.1rem`, ~60% opacity
- Full-width `1px` divider line
- Research Statement: 3–4 sentences (trimmed version of current `about` in `data.ts`), Inter Regular, `1.05rem`, line-height `1.9`, max-width `65ch`, ~80% opacity
- Contact row: `gatsbyli@g.harvard.edu · GitHub · ORCID` — JetBrains Mono, small, underline on hover

Entry animation: `y: 16px → 0, opacity: 0 → 1`, 0.6s ease-out, fires once.

### ② Publications

Section label: `PUBLICATIONS` — JetBrains Mono, all-caps, letter-spacing `0.25em`, ~40% opacity, left-aligned.

Each entry (numbered, separated by full-width `1px` lines, no cards):

```
[01]  Title in Playfair Display Italic
      ──────────────────────────────────────
      Authors in Inter small  (author's own name bold)
      Venue  ·  Status  ·  Year          [↗ arXiv if applicable]
```

- `[01]` — JetBrains Mono, fixed column width, ~40% opacity
- Title — Playfair Display Italic, `1.25rem`, white; hover brightens slightly
- Authors — Inter, `0.875rem`, ~55% opacity; **Haiyi Li** always bold + full opacity
- Venue line — JetBrains Mono, `0.75rem`, `·`-separated, ~40% opacity
- Description hidden by default; click title to expand (height transition)
- Paper image removed entirely

**Publication data (verified from Google Scholar 2026-06-22):**

| # | Title | Venue | Status | arXiv |
|---|-------|-------|--------|-------|
| 01 | OUGS: Active View Selection… | EuroGraphics 2026 | Accepted | — |
| 02 | Who Fails Where?… | CHI 2026 Extended Abstracts | Accepted | — |
| 03 | EndoExtract… | ACM Interactive Health 2026 | Accepted | ↗ shown |
| 04 | A Variational Path to Laplace's Equation… | American Mathematical Monthly | Under Review | — |
| 05 | To Know or Not to Know?… | DIS 2026 | Under Review | — |

Rule: Accepted papers with a confirmed venue do not display arXiv links, **except** EndoExtract which shows arXiv by explicit preference. Under Review papers show submission target only, no link.

### ③ Education & Experience (Unified Timeline)

Left vertical rail (`1px`, ~15% opacity). Node marker: small diamond ◆ (not a circle). Education and Experience on the same timeline, reverse-chronological. Category distinguished by small JetBrains Mono label at section start (`EDUCATION`, `EXPERIENCE`), not by visual separation.

```
◆  2026 →        Harvard University
                  M.S. Computational Science and Engineering · Incoming

◆  2024 – now    University of Adelaide
                  Honours, Mathematical Sciences · Top 1%

◆  2022 – 2024   Ocean University of China
                  B.Sc. Mathematics and Applied Mathematics · Top 1%

◆  2024 – now    AIML, University of Adelaide                [RESEARCH]
                  Research Assistant · 3DGS & Scene Reconstruction

◆  2025 – now    CSIRO                                       [INDUSTRY]
                  Industrial Trainee · Population Dynamics Modelling

◆  2025 – 2025   Robinson Research Institute                 [RESEARCH]
                  Research Assistant · IMAGENDO Project
```

- Institution name: Inter SemiBold, white
- Degree/role: Inter Regular, ~65% opacity
- Date: JetBrains Mono, fixed left column, ~35% opacity
- Type tag `[RESEARCH]` / `[INDUSTRY]`: JetBrains Mono, extra-small, ~30% opacity

### ④ Honors

Inline at the end of the timeline, preceded by label `HONORS` in the same style. Same left-rail, same diamond nodes.

Each award: one line — `Year  ·  Award Title  ·  Issuer  ·  Selectivity`

### ⑤ Skills

Section label: `SKILLS` — same style as Publications label.

Single tag-cloud line, grouped by category with `—` separator, no cards, no icons, no progress bars:

```
Python  MATLAB  R  SQL  —  PyTorch  OpenCV  3DGS  NeRF  SfM  CUDA  Docker  —  Matplotlib  Gephi  Seaborn
```

Tags: Inter Medium, `0.875rem`, `px-3 py-1`, thin border `border-white/10`, background `white/4`.

### ⑥ Footer

One line, centered:

```
© 2026 Haiyi Li  ·  gatsbyli@g.harvard.edu  ·  GitHub  ·  ORCID
```

JetBrains Mono, small, ~30% opacity.

---

## Bilingual Support (EN/ZH)

Existing translation system in `App.tsx` is preserved. All new UI strings are added to the `translations` object. Localized content overrides (`educationZh`, `experienceZh`, `awardsZh`) carry over with updated data. Toggle button stays in nav bar.

---

## File Changes

| File | Change |
|------|--------|
| `data.ts` | Update publication statuses and authors per Google Scholar; remove Tableau, add CUDA to skills |
| `App.tsx` | Full layout rewrite; replace all section rendering with new designs; update translations |
| `types.ts` | Minor: add `showArxiv?: boolean` field to `Publication` to control per-paper arXiv link display |
| `index.css` | Add noise texture utility, font imports, `hover-underline-animation` refinement |
| `package.json` | Add `@fontsource/playfair-display`, `@fontsource/inter`, `@fontsource/jetbrains-mono` |
| `components/Section.tsx` | Replace with new minimal section wrapper (label + slot) |
| `components/PublicationCard.tsx` | Full rewrite to numbered-list format |
| `components/Timeline.tsx` | New component: unified Education + Experience + Honors timeline |

---

## Out of Scope

- Light/dark toggle (dark only for now)
- CMS or external data source (content stays in `data.ts`)
- Blog or project pages
- Contact form
