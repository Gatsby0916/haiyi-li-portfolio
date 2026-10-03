# Academic Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current colorful card-based academic portfolio with a cinematic dark typographic design — film-grain dark background, Playfair Display + Inter + JetBrains Mono three-font system, numbered publications list, unified timeline, and tag-cloud skills.

**Architecture:** All content stays in `data.ts` (no external data source). Each page section becomes its own focused component. `App.tsx` owns language state and orchestrates the layout. TypeScript compilation (`npm run build`) is the primary correctness gate; each task ends with a passing build.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. New: `@fontsource/playfair-display`, `@fontsource/inter`, `@fontsource/jetbrains-mono`.

## Global Constraints

- Background: `#0a0a0a` everywhere
- Font hierarchy: Playfair Display (headings) · Inter (body/UI) · JetBrains Mono (metadata/labels)
- Noise overlay: SVG fractal noise, `opacity: 0.03`, fixed position, `pointer-events: none`, `z-index: 9999`
- Max content width: `max-w-5xl` (Tailwind, ~1024px)
- Bilingual EN/ZH support preserved; toggle in nav bar
- No cards, no box shadows, no colored gradients
- `showArxiv: true` only on EndoExtract (arXiv:2601.18154); accepted papers with confirmed venue show no arXiv link
- Haiyi Li's name always bold + full opacity in author lists

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `package.json` | Modify | Add three `@fontsource/*` packages |
| `index.css` | Rewrite | Dark base styles, font imports, noise overlay utility |
| `types.ts` | Modify | Add `showArxiv?: boolean` to `Publication` |
| `data.ts` | Modify | Verified publication data; remove Tableau, add CUDA |
| `components/Nav.tsx` | Create | Fixed nav bar, scroll-aware, language toggle |
| `components/Hero.tsx` | Create | Full-viewport hero with research statement |
| `components/Section.tsx` | Rewrite | Minimal label + slot wrapper |
| `components/PublicationCard.tsx` | Rewrite | Numbered entry, click-to-expand |
| `components/Timeline.tsx` | Create | Unified Education + Experience + Honors |
| `App.tsx` | Rewrite | Orchestrator: language state, translations, Skills + Footer inline |

---

### Task 1: Install font packages and rewrite global CSS

**Files:**
- Modify: `package.json`
- Rewrite: `index.css`

**Interfaces:**
- Produces: CSS classes `font-playfair`, noise overlay via `.noise-overlay` div

- [ ] **Step 1: Install font packages**

```bash
cd "03_研究与主页/个人主页"
npm install @fontsource/playfair-display @fontsource/inter @fontsource/jetbrains-mono
```

Expected: packages added to `node_modules`, `package-lock.json` updated.

- [ ] **Step 2: Rewrite `index.css`**

Replace the entire file with:

```css
@import '@fontsource/playfair-display/400.css';
@import '@fontsource/playfair-display/700.css';
@import '@fontsource/inter/300.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/jetbrains-mono/400.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-padding-top: 56px;
}

body {
  margin: 0;
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.font-playfair {
  font-family: 'Playfair Display', Georgia, serif;
}

/* Noise texture overlay — rendered as a fixed div in App.tsx */
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: no errors. The CSS imports resolve via the installed font packages.

- [ ] **Step 4: Commit**

```bash
git add index.css package.json package-lock.json
git commit -m "feat: install fontsource packages, rewrite global CSS to dark base"
```

---

### Task 2: Update types and data

**Files:**
- Modify: `types.ts`
- Modify: `data.ts`

**Interfaces:**
- Produces: `Publication.showArxiv?: boolean` field; updated publications array; updated `skills.viz` (no Tableau, no Tableau; CUDA added to `skills.stack`)

- [ ] **Step 1: Add `showArxiv` to `types.ts`**

In `types.ts`, add `showArxiv?: boolean` inside the `Publication` interface, after the `image?` fields:

```ts
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  status: 'Published' | 'Under Review' | 'Submitted' | 'Conditionally Accepted' | 'Accepted';
  year: string;
  description: string;
  tags: string[];
  image?: string;
  imageFit?: 'contain' | 'cover';
  imageMaxHeight?: number;
  showArxiv?: boolean;
  links?: {
    pdf?: string;
    code?: string;
    project?: string;
    arxiv?: string;
  };
}
```

- [ ] **Step 2: Update `data.ts` publications**

Replace the `publications` array in `data.ts` with:

```ts
export const publications: Publication[] = [
  {
    id: "ougs-2026",
    title: "OUGS: Active View Selection via Object-aware Uncertainty Estimation in 3DGS",
    authors: ["Haiyi Li", "Qi Chen", "Denis Kalkofen", "Hsiang-Ting Chen"],
    venue: "EuroGraphics 2026",
    status: "Accepted",
    year: "2026",
    description: "Introduces OUGS, an object-aware uncertainty framework for 3D Gaussian Splatting that derives uncertainty from Gaussian primitive parameters and propagates covariances through the rendering Jacobian. Integrating segmentation masks enables targeted uncertainty scoring and more efficient active view selection for improved object fidelity.",
    tags: ["Computer Graphics", "3D Gaussian Splatting", "Uncertainty Estimation"],
    showArxiv: false,
    links: { arxiv: "https://arxiv.org/abs/2511.09397" }
  },
  {
    id: "chi-2026-whofails",
    title: "Who Fails Where? LLM and Human Error Patterns in Endometriosis Ultrasound Report Extraction",
    authors: ["Haiyi Li", "Yutong Li", "Yiheng Chi", "Alison Deslandes", "Mathew Leonardi", "Shay Freger", "Yuan Zhang", "Jodie Avery", "M. Louise Hull", "Hsiang-Ting Chen"],
    venue: "CHI 2026 Extended Abstracts",
    status: "Accepted",
    year: "2026",
    description: "Evaluates on-premise LLMs for converting endometriosis transvaginal ultrasound reports into structured data, comparing multiple model scales against expert extraction across 49 reports. Finds complementary LLM–human error profiles and motivates a human-in-the-loop workflow.",
    tags: ["LLMs", "Medical Imaging", "HCI"],
    showArxiv: false,
    links: { arxiv: "https://arxiv.org/abs/2601.09053" }
  },
  {
    id: "endoextract-2026",
    title: "EndoExtract: Co-Designing Structured Text Extraction from Endometriosis Ultrasound Reports",
    authors: ["Haiyi Li", "Yiyang Zhao", "Yutong Li", "Alison Deslandes", "Jodie Avery", "Mathew Leonardi", "M. Louise Hull", "Hsiang-Ting Chen"],
    venue: "ACM Interactive Health 2026",
    status: "Accepted",
    year: "2026",
    description: "Presents EndoExtract, an on-premise LLM system for extracting structured fields from free-text endometriosis ultrasound reports and surfacing interpretive fields for mandatory human review. Grounded in contextual inquiry and formative evaluation.",
    tags: ["LLMs", "Medical Imaging", "HCI", "Co-design"],
    showArxiv: true,
    links: { arxiv: "https://arxiv.org/abs/2601.18154" }
  },
  {
    id: "amm-2025",
    title: "A Variational Path to Laplace's Equation via Complex Analysis",
    authors: ["Haiyi Li"],
    venue: "American Mathematical Monthly",
    status: "Under Review",
    year: "2025",
    description: "Establishes a novel framework linking a degenerate variational principle to Laplace's equation via complex analysis.",
    tags: ["Applied Mathematics", "Complex Analysis", "PDEs"],
    showArxiv: false
  },
  {
    id: "dis-2026",
    title: "To Know or Not to Know?: How User Awareness of Physiological Sensing Impacts AI Persuasion and User Experience",
    authors: ["Xiaoyan Wei", "Yutong Qu", "Yutong Li", "Haiyi Li", "et al."],
    venue: "DIS 2026",
    status: "Under Review",
    year: "2026",
    description: "Demonstrates the trade-off between perceived persuasiveness and user negative affect via repeated-measures ANOVA and Wilcoxon tests in a physiological-sensing AI persuasion study.",
    tags: ["HCI", "AI Persuasion", "Statistical Analysis"],
    showArxiv: false
  }
];
```

- [ ] **Step 3: Update `data.ts` skills**

Replace the `skills` export:

```ts
export const skills = {
  programming: ["Python", "MATLAB", "R", "SQL"],
  stack: ["PyTorch", "OpenCV", "3DGS", "NeRF", "SfM", "CUDA", "Docker"],
  viz: ["Matplotlib", "Gephi", "Seaborn"],
  languages: ["English (TOEFL)", "GRE", "Mandarin (Native)"]
};
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: clean TypeScript compile. If errors, they will point to places where `image` or `imageFit` fields are still referenced — remove those references in `App.tsx` if they appear (they will be fully removed in Task 8).

- [ ] **Step 5: Commit**

```bash
git add types.ts data.ts
git commit -m "feat: add showArxiv field, update publication statuses from Scholar, replace Tableau with CUDA"
```

---

### Task 3: Create Nav component

**Files:**
- Create: `components/Nav.tsx`

**Interfaces:**
- Consumes: `language: 'en' | 'zh'`, `onToggleLanguage: () => void`, `navItems: { label: string; href: string }[]`
- Produces: `export default function Nav(props: NavProps)`

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
import { useState, useEffect } from 'react';

interface NavProps {
  language: 'en' | 'zh';
  onToggleLanguage: () => void;
  navItems: { label: string; href: string }[];
}

export default function Nav({ language, onToggleLanguage, navItems }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="font-playfair text-lg font-bold text-white tracking-tight"
        >
          HL
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={onToggleLanguage}
            className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest"
          >
            {language === 'en' ? 'ZH' : 'EN'}
          </button>
        </nav>

        {/* Mobile: compact bottom row */}
        <button
          onClick={onToggleLanguage}
          className="md:hidden font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors tracking-widest"
        >
          {language === 'en' ? 'ZH' : 'EN'}
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: clean compile. Nav is not yet imported by App.tsx so no existing import errors.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add Nav component — fixed dark header with scroll-aware bg"
```

---

### Task 4: Create Hero component

**Files:**
- Create: `components/Hero.tsx`

**Interfaces:**
- Consumes:
  - `heroPill: string` — e.g. `"Academic Portfolio"`
  - `heroTagline: string` — one-line subtitle
  - `aboutContent: string` — research statement paragraph
  - `email: string`, `github: string`, `orcid: string`
- Produces: `export default function Hero(props: HeroProps)`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import { motion } from 'framer-motion';

interface HeroProps {
  heroPill: string;
  heroTagline: string;
  aboutContent: string;
  email: string;
  github: string;
  orcid: string;
}

export default function Hero({ heroPill, heroTagline, aboutContent, email, github, orcid }: HeroProps) {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-14 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 w-full"
      >
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/30 uppercase mb-10">
          [ {heroPill} ]
        </p>

        <h1 className="font-playfair text-7xl md:text-8xl font-bold text-white leading-none mb-5">
          Haiyi Li
        </h1>

        <p className="font-sans text-lg text-white/55 font-light mb-8">
          {heroTagline}
        </p>

        <div className="w-full h-px bg-white/10 mb-8" />

        <p className="font-sans text-[1.05rem] text-white/75 leading-[1.9] max-w-[65ch] mb-10">
          {aboutContent}
        </p>

        <div className="flex flex-wrap gap-6">
          <a
            href={`mailto:${email}`}
            className="font-mono text-xs text-white/35 hover:text-white/65 transition-colors underline-offset-4 hover:underline"
          >
            {email}
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-white/35 hover:text-white/65 transition-colors underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href={orcid}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-white/35 hover:text-white/65 transition-colors underline-offset-4 hover:underline"
          >
            ORCID
          </a>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero component — full-viewport typographic research statement"
```

---

### Task 5: Rewrite Section component

**Files:**
- Rewrite: `components/Section.tsx`

**Interfaces:**
- Consumes: `id: string`, `label: string`, `children: React.ReactNode`
- Produces: `export default function Section(props: SectionProps)` — minimal wrapper with monospace label

- [ ] **Step 1: Rewrite `components/Section.tsx`**

```tsx
interface SectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export default function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 py-24 border-t border-white/8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-white/35 uppercase mb-12">
        {label}
      </p>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: This will likely produce TypeScript errors in `App.tsx` because the old `Section` accepted `title`, `accentFrom`, `accentTo`, `accentSoft` props. These will be resolved in Task 8. If the errors are in `App.tsx` only, they are expected — proceed.

- [ ] **Step 3: Commit**

```bash
git add components/Section.tsx
git commit -m "feat: rewrite Section to minimal monospace-label wrapper"
```

---

### Task 6: Rewrite PublicationCard component

**Files:**
- Rewrite: `components/PublicationCard.tsx`

**Interfaces:**
- Consumes: `pub: Publication` (from `types.ts`), `index: number`
- Produces: `export default function PublicationEntry(props)` — numbered expandable entry

- [ ] **Step 1: Rewrite `components/PublicationCard.tsx`**

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Publication } from '../types';

interface PublicationEntryProps {
  pub: Publication;
  index: number;
}

export default function PublicationEntry({ pub, index }: PublicationEntryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="py-7 border-b border-white/8 first:border-t first:border-white/8">
      <div className="flex gap-6 items-start">
        <span className="font-mono text-xs text-white/25 w-8 shrink-0 pt-[3px]">
          [{String(index + 1).padStart(2, '0')}]
        </span>

        <div className="flex-1 min-w-0">
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-left w-full group"
          >
            <h3 className="font-playfair italic text-[1.2rem] text-white/85 group-hover:text-white transition-colors leading-snug">
              {pub.title}
            </h3>
          </button>

          <p className="font-sans text-[0.82rem] text-white/45 mt-2 leading-relaxed">
            {pub.authors.map((author, i) => (
              <span key={i}>
                {i > 0 && <span className="text-white/20">, </span>}
                <span className={author === 'Haiyi Li' ? 'text-white/80 font-semibold' : ''}>
                  {author}
                </span>
              </span>
            ))}
          </p>

          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2">
            <span className="font-mono text-[0.7rem] text-white/35">{pub.venue}</span>
            {pub.status !== 'Accepted' && pub.status !== 'Published' && (
              <>
                <span className="font-mono text-[0.7rem] text-white/20">·</span>
                <span className="font-mono text-[0.7rem] text-white/35">{pub.status}</span>
              </>
            )}
            <span className="font-mono text-[0.7rem] text-white/20">·</span>
            <span className="font-mono text-[0.7rem] text-white/35">{pub.year}</span>
            {pub.showArxiv && pub.links?.arxiv && (
              <>
                <span className="font-mono text-[0.7rem] text-white/20">·</span>
                <a
                  href={pub.links.arxiv}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="font-mono text-[0.7rem] text-white/40 hover:text-white/70 transition-colors"
                >
                  ↗ arXiv
                </a>
              </>
            )}
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.p
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="font-sans text-sm text-white/45 mt-4 leading-relaxed overflow-hidden"
              >
                {pub.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: `App.tsx` still has old `PublicationCard` usage which will error — that is resolved in Task 8. If errors are only in `App.tsx`, proceed.

- [ ] **Step 3: Commit**

```bash
git add components/PublicationCard.tsx
git commit -m "feat: rewrite PublicationCard to numbered expandable list entry"
```

---

### Task 7: Create Timeline component

**Files:**
- Create: `components/Timeline.tsx`

**Interfaces:**
- Consumes: `education: Education[]`, `experience: Experience[]`, `awards: Award[]`  
  All types from `types.ts`. Arrays are pre-localized (caller handles EN/ZH swap).
- Produces: `export default function Timeline(props: TimelineProps)`

- [ ] **Step 1: Create `components/Timeline.tsx`**

```tsx
import { Education, Experience, Award } from '../types';

interface TimelineProps {
  education: Education[];
  experience: Experience[];
  awards: Award[];
}

const EXP_TAG: Record<string, string> = {
  aiml: 'RESEARCH',
  csiro: 'INDUSTRY',
  robinson: 'RESEARCH',
};

function DiamondNode() {
  return (
    <div className="absolute -left-[25px] top-[6px] w-2 h-2 rotate-45 border border-white/30 bg-[#0a0a0a]" />
  );
}

function Row({ date, tag, children }: { date: string; tag?: string; children: React.ReactNode }) {
  return (
    <div className="relative flex gap-6 items-start pl-0">
      <DiamondNode />
      <span className="font-mono text-[0.7rem] text-white/28 w-32 shrink-0 pt-0.5 leading-relaxed">
        {date}
      </span>
      <div className="flex-1 min-w-0">
        {tag && (
          <span className="font-mono text-[9px] tracking-widest text-white/22 uppercase block mb-0.5">
            [{tag}]
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function GroupLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.25em] text-white/22 uppercase mb-6 -ml-6 pt-2">
      {text}
    </p>
  );
}

export default function Timeline({ education, experience, awards }: TimelineProps) {
  return (
    <div className="relative pl-6 border-l border-white/10 space-y-8">
      <GroupLabel text="EDUCATION" />
      {education.map(edu => (
        <Row key={edu.id} date={edu.period}>
          <p className="font-sans font-semibold text-white text-[0.95rem]">{edu.institution}</p>
          <p className="font-sans text-sm text-white/55 mt-0.5">
            {edu.degree}{edu.ranking ? ` · ${edu.ranking}` : ''}
          </p>
        </Row>
      ))}

      <GroupLabel text="EXPERIENCE" />
      {experience.map(exp => (
        <Row key={exp.id} date={exp.period} tag={EXP_TAG[exp.id]}>
          <p className="font-sans font-semibold text-white text-[0.95rem]">{exp.institution}</p>
          <p className="font-sans text-sm text-white/55 mt-0.5">{exp.role}</p>
        </Row>
      ))}

      <GroupLabel text="HONORS" />
      {awards.map(award => (
        <Row key={award.id} date={award.year}>
          <p className="font-sans text-sm text-white/80">
            <span className="font-semibold text-white">{award.title}</span>
            <span className="text-white/40"> · {award.issuer}</span>
            {award.selectivity && (
              <span className="font-mono text-[0.65rem] text-white/28 ml-2">{award.selectivity}</span>
            )}
          </p>
        </Row>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Timeline.tsx
git commit -m "feat: add Timeline component — unified Education, Experience, Honors with diamond nodes"
```

---

### Task 8: Rewrite App.tsx

**Files:**
- Rewrite: `App.tsx`

**Interfaces:**
- Consumes: `Nav`, `Hero`, `Section`, `PublicationEntry` (from PublicationCard.tsx), `Timeline`
- Consumes: `personalInfo`, `publications`, `education`, `experience`, `awards`, `skills` from `data.ts`
- Produces: working single-page app; all earlier tasks' components visible in browser

- [ ] **Step 1: Rewrite `App.tsx`**

```tsx
import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';
import PublicationEntry from './components/PublicationCard';
import Timeline from './components/Timeline';
import { personalInfo, publications, education, experience, awards, skills } from './data';
import { Education, Experience, Award } from './types';

// ─── Translations ────────────────────────────────────────────────────────────

const translations = {
  en: {
    heroPill: 'Academic Portfolio',
    heroTagline: 'Incoming M.S. Computational Science and Engineering · Harvard University',
    nav: {
      about: 'About',
      research: 'Research',
      background: 'Background',
      skills: 'Skills',
    },
    sections: {
      research: 'PUBLICATIONS',
      background: 'BACKGROUND',
      skills: 'SKILLS',
    },
  },
  zh: {
    heroPill: '学术主页',
    heroTagline: '哈佛大学计算科学与工程硕士新生',
    nav: {
      about: '关于我',
      research: '科研成果',
      background: '经历',
      skills: '技能',
    },
    sections: {
      research: '论文',
      background: '学习与工作',
      skills: '技能',
    },
  },
} as const;

type Language = keyof typeof translations;

// ─── ZH overrides ────────────────────────────────────────────────────────────

const aboutTextZh =
  '我即将于 2026 年秋季进入哈佛大学攻读计算科学与工程硕士，目前就读于阿德莱德大学数学科学荣誉学士项目。我的研究兴趣位于应用分析与偏微分方程、数值方法、计算机图形学、三维高斯点渲染以及数据驱动的人机协作交互的交汇处。在 2026 年秋季研究生申请季中，我收到了来自哈佛大学、卡内基梅隆大学、宾夕法尼亚大学和西北大学等顶尖项目的录取。我的目标是构建在数学上可靠、稳定且可解释的模型，用于真实世界中的不确定性建模。';

const educationZh: Record<string, Partial<Education>> = {
  harvard: { institution: '哈佛大学', degree: '计算科学与工程硕士', ranking: '2026 年秋季入学录取', period: '2026 →' },
  adelaide: { institution: '阿德莱德大学', degree: '数学科学荣誉学士学位', ranking: '年级排名第 1' },
  ocean: { institution: '中国海洋大学', degree: '数学与应用数学专业', ranking: '专业排名前 1%' },
};

const experienceZh: Record<string, Partial<Experience>> = {
  aiml: {
    role: '科研助理',
    institution: '阿德莱德大学澳大利亚机器学习研究院（AIML）',
    description: ['在 AIML 的计算机图形学与三维视觉研究环境中担任 RA，聚焦 3D Gaussian Splatting 与场景重建。'],
  },
  csiro: {
    role: '工业见习生',
    institution: '澳大利亚联邦科学与工业研究组织（CSIRO）',
    description: ['研究初始类别结构如何影响群体模型的疫情轨迹。'],
  },
  robinson: {
    role: '科研助理',
    institution: 'IMAGENDO 项目，罗宾逊研究院',
    description: ['面向妇科超声的 AI 流程：负责预处理/数据工具链与病灶检测原型。'],
  },
};

const awardsZh: Record<string, Partial<Award>> = {
  'national-scholarship': { title: '国家奖学金', issuer: '中华人民共和国教育部', selectivity: '获奖率 < 1%' },
  'hurd-prize': { title: '马克·埃德温·赫德纪念奖', issuer: '阿德莱德大学', selectivity: '每年 1 名学生' },
  'summer-research': { title: '暑期科研奖学金', issuer: '阿德莱德大学', selectivity: '录取率 < 5%' },
  'global-citizen': { title: '全球公民卓越奖学金', issuer: '阿德莱德大学', selectivity: '录取率 < 10%' },
  icm: { title: '2024 ICM 美国大学生数学建模大赛 F 奖', issuer: 'COMAP', selectivity: '优胜队 < 2%' },
  'outstanding-student': { title: '优秀学生奖', issuer: '中国海洋大学', selectivity: '录取率 < 10%' },
  'math-modeling-national': { title: '全国统计建模大赛三等奖', issuer: '中国统计教育学会', selectivity: '录取率 < 10%' },
  'mathorcup-2024': { title: 'Mathorcup 数学建模挑战赛国家二等奖', issuer: '中国运筹学会', selectivity: '录取率 < 10%' },
  'cp-market': { title: '"正大杯"市场调研分析大赛', issuer: '中国商业统计学会', selectivity: '录取率 < 10%' },
  'mathorcup-bigdata': { title: '2023 Mathorcup 大数据挑战赛国家二等奖', issuer: '中国运筹学会', selectivity: '录取率 < 10%' },
};

// ─── App ─────────────────────────────────────────────────────────────────────

const ALL_SKILLS = [
  ...skills.programming,
  'SEPARATOR',
  ...skills.stack,
  'SEPARATOR',
  ...skills.viz,
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];
  const isZh = language === 'zh';

  const localizedEducation = isZh
    ? education.map(e => ({ ...e, ...(educationZh[e.id] ?? {}) }))
    : education;

  const localizedExperience = isZh
    ? experience.map(e => ({ ...e, ...(experienceZh[e.id] ?? {}) }))
    : experience;

  const localizedAwards = isZh
    ? awards.map(a => ({ ...a, ...(awardsZh[a.id] ?? {}) }))
    : awards;

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.research, href: '#publications' },
    { label: t.nav.background, href: '#background' },
    { label: t.nav.skills, href: '#skills' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Film-grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Nav
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'zh' : 'en')}
        navItems={navItems}
      />

      <Hero
        heroPill={t.heroPill}
        heroTagline={t.heroTagline}
        aboutContent={isZh ? aboutTextZh : personalInfo.about}
        email={personalInfo.email}
        github={personalInfo.github}
        orcid={personalInfo.orcid}
      />

      <Section id="publications" label={t.sections.research}>
        <div>
          {publications.map((pub, i) => (
            <PublicationEntry key={pub.id} pub={pub} index={i} />
          ))}
        </div>
      </Section>

      <Section id="background" label={t.sections.background}>
        <Timeline
          education={localizedEducation}
          experience={localizedExperience}
          awards={localizedAwards}
        />
      </Section>

      <Section id="skills" label={t.sections.skills}>
        <div className="flex flex-wrap items-center gap-2">
          {ALL_SKILLS.map((item, i) =>
            item === 'SEPARATOR' ? (
              <span key={`sep-${i}`} className="text-white/20 text-sm mx-1 select-none">—</span>
            ) : (
              <span
                key={item}
                className="font-sans text-sm font-medium text-white/55 border border-white/10 bg-white/[0.03] px-3 py-1 rounded-sm"
              >
                {item}
              </span>
            )
          )}
        </div>
      </Section>

      <footer className="border-t border-white/8 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-white/25">
            © 2026 Haiyi Li
          </p>
          <div className="flex gap-6">
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              {personalInfo.email}
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalInfo.orcid}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              ORCID
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Remove unused imports from `data.ts`**

The `personalInfo.phone` field and `location` are no longer used in the template. No code change needed — they can stay in `data.ts` silently. TypeScript will not error on unused exports.

- [ ] **Step 3: Verify clean build**

```bash
npm run build
```

Expected: **zero TypeScript errors**. If any appear, they will name the exact file and line. Common issues:
- If `Education.period` shape differs — check `data.ts` education entries have `period` strings matching the timeline format
- If `experience` entries include `kumon` (removed in design) — delete the kumon entry from `data.ts` if still present

- [ ] **Step 4: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- Dark `#0a0a0a` background (no white flash)
- "HL" monogram top-left, nav links top-right
- Hero: large serif "Haiyi Li" heading, research statement paragraph, contact links
- Publications: numbered `[01]`–`[05]` list, click title → description expands
- Background section: timeline with diamond nodes, EDUCATION / EXPERIENCE / HONORS labels
- Skills: tag-cloud row with `—` separators
- Footer: one-line centered links
- Language toggle: clicking `ZH` switches all text to Chinese

- [ ] **Step 5: Commit**

```bash
git add App.tsx data.ts
git commit -m "feat: full App.tsx rewrite — dark typographic academic layout wired to all components"
```

---

### Task 9: Final build verification and deploy

**Files:**
- No new files

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: `dist/` folder generated, no warnings about unresolved imports.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4173` (or port shown). Verify:
- Noise overlay visible (subtle grain on dark background)
- Fonts load correctly (Playfair Display for headings, monospace for labels)
- No layout shift on scroll
- Language toggle works in production build

- [ ] **Step 3: Deploy to GitHub Pages**

```bash
npm run deploy
```

Expected: pushes `dist/` to `gh-pages` branch. Live at `https://Gatsby0916.github.io/haiyi-li-portfolio/` within ~1 minute.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: production-verified redesign complete"
```

---

## Self-Review

**Spec coverage:**
- ✅ Dark `#0a0a0a` theme — Task 1 (index.css)
- ✅ Three-font system — Task 1 (font packages + CSS)
- ✅ Noise overlay — Task 1 (CSS), Task 8 (div in App)
- ✅ Hero / Research Statement — Task 4
- ✅ Publications numbered list, click-to-expand, `showArxiv` logic — Tasks 2 + 6
- ✅ Verified publication data from Google Scholar — Task 2
- ✅ Unified Education + Experience + Honors timeline with diamonds — Task 7
- ✅ Skills tag cloud, CUDA added, Tableau removed — Tasks 2 + 8
- ✅ Footer single-line — Task 8
- ✅ Nav scroll-aware, language toggle — Task 3
- ✅ EN/ZH bilingual preserved — Task 8 (translations + ZH overrides)
- ✅ No cards, no shadows, no colored gradients — enforced in all components

**Placeholder scan:** No TBDs or TODOs in plan. All code blocks are complete.

**Type consistency:**
- `PublicationEntry` uses `pub: Publication` — matches `types.ts` interface including `showArxiv?: boolean` added in Task 2
- `Timeline` consumes `Education`, `Experience`, `Award` — all imported from `types.ts`
- `Section` label prop is `string` — all callers pass string literals
- `Nav` `navItems` prop is `{ label: string; href: string }[]` — matches App.tsx construction
