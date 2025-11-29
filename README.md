# Haiyi Li — Academic Portfolio

Personal academic homepage featuring research, education, experience, awards, and skills. Built with React + Vite, styled via Tailwind CDN, and deployable to GitHub Pages.

## Live Site
- GitHub Pages: `https://Gatsby0916.github.io/haiyi-li-portfolio/` (after `npm run deploy`)

## Quick Start (Local)
```bash
npm install
npm run dev   # open http://localhost:3000
```

## Build & Preview
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages
```bash
npm run deploy
# then enable gh-pages branch in GitHub: Settings → Pages → Branch: gh-pages
```

## Tech Stack
- React 19, Vite 6
- TypeScript
- Tailwind (CDN) + custom CSS
- Framer Motion, Lucide React

## Project Structure
- `App.tsx` — page layout and sections
- `components/` — shared UI (Section, PublicationCard, etc.)
- `data.ts` — content (info, publications, experience, awards, skills)
- `public/` — static assets (images/PDFs)

## Notes
- Environment: Node.js 18+ recommended
- Sensitive files are ignored via `.gitignore` (`.env`, build outputs, logs, etc.)

## License
This repository is private-use; contact the author for permissions.
