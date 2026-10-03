# Haiyi Li — Academic Portfolio

Personal academic portfolio. Live at **<https://Gatsby0916.github.io/haiyi-li-portfolio/>**

![Homepage QR](public/images/homepage-qr.png)

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build → dist/
npm run deploy    # Build + publish to GitHub Pages
```

## Updating Content

**All CV content lives in `data.ts`** — edit only that file for:
- Personal info, about text, contact links
- Publications (title, authors, venue, status, DOI / arXiv links)
- Education, experience, awards
- Skills

Chinese translations for structured data live in `educationZh`, `experienceZh`, `awardsZh` at the top of `App.tsx`. The `aboutTextZh` prose string is also in `App.tsx`.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS (CDN) + custom CSS in `index.css` |
| Animations | Framer Motion |
| Fonts | Playfair Display · Inter · JetBrains Mono |
| Deployment | GitHub Pages (`gh-pages` branch) |

## Design

Dark cinematic academic aesthetic — `#0a0a0a` background, Harvard Crimson `#A51C30` accents, three-font typographic hierarchy. Visual effects: film-grain noise overlay, mouse-tracking spotlight, slow-drifting ambient orbs, crimson scroll-progress line, pulsing status dot, scroll-triggered section animations.

Full design system and architecture reference: `../../../CLAUDE.md`

## Environment

Create `.env.local` (not committed):

```
VITE_PHONE_NUMBER=+xx-xxxx-xxxx
```
