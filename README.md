# ResumeForge

**ResumeForge** is a professional resume builder that helps you create MNC-standard, ATS-optimized resumes. Build recruiter-ready resumes with enterprise-grade scoring and multiple templates—all in one place.

---

## Features

- **Resume builder** — Two-column layout: form on the left (Personal Info, Summary, Education, Experience, Projects, Skills, Links) and live preview on the right. Data is auto-saved to your browser.
- **Enterprise ATS score** — Scoring aligned with what large companies and ATS systems (e.g. Workday, Taleo) look for: contact completeness, summary quality, experience with metrics, education, skills, projects, and professional links. Score 0–100 with “MNC-Ready” at 71+.
- **Improvement suggestions** — Clear, point-based tips (e.g. “Add measurable impact in bullets +8 pts”) so you know exactly how to improve your score.
- **6 resume templates** — Classic, Modern, Minimal, Executive, Compact, and Bold. Switch layout and typography without changing your content.
- **Accent colors** — Teal, Navy, Burgundy, Forest, or Charcoal for headings and accents. Choice is saved.
- **Professional standards** — Expandable “MNC resume standards” panel with guidance on section order, bullet format (action + result + metric), summary length, and what recruiters expect.
- **Bullet guidance** — Inline hints in Experience and Projects when bullets lack action verbs or numbers (non-blocking).
- **Export** — Print / Save as PDF (browser print), Download PDF (toast), and Copy Resume as Text. Print styling hides nav and keeps the resume clean.
- **Settings** — Default template and accent color, export/clear resume data, and theme (light/dark).
- **Light & dark mode** — Toggle in the header or under Settings → Appearance. Preference is saved.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — build and dev server
- **React Router** — routes for Home, Builder, Preview, Jobs, Analyze, Applications, Settings, Proof
- **Tailwind CSS** — utility styles (v4 with Vite plugin)
- **CSS Modules** — component styling with shell (light) and premium (dark) theme variables
- **Local storage** — resume data, template, accent color, and theme persistence

---

## Getting started

### Prerequisites

- **Node.js** 18+ (or 20+ recommended)
- **npm** (or pnpm / yarn)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173` (or the port Vite shows).

### Build

```bash
npm run build
```

Output is in the `dist/` folder. Serve it with any static host or run `npm run preview` to test the production build locally.

### Lint

```bash
npm run lint
```

---

## Project structure (overview)

| Path | Purpose |
|------|--------|
| `src/App.tsx` | Routes and providers (Resume, Template, Theme, Readiness, RB) |
| `src/context/` | ResumeContext, TemplateContext, ThemeContext, ReadinessContext, RBContext |
| `src/layouts/` | AppLayout (main nav + theme toggle), PremiumLayout (build track) |
| `src/pages/` | HomePage, BuilderPage, PreviewPage, SettingsPage, JobsPage, AnalyzePage, etc. |
| `src/components/` | LivePreview, ATSScoreMeter, TemplateThumbnails, ProfessionalStandards, etc. |
| `src/utils/` | atsScore.ts (MNC-level scoring), bulletGuidance, resumeToText, exportValidation |

---

## Data & privacy

All resume data is stored **only in your browser** (localStorage). Nothing is sent to a server. You can export your data as JSON or clear it from Settings.

---

## License

Private / project use. See repository for details.
