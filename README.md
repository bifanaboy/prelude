# crosscutter

Administers the DSM-5-TR Cross Cutting Measures as a web app via an LLM-powered chatbot.

## Status

**Active Development — MVP Sprint** — Milestone 1 (Likert scale online) in progress. See [Roadmap](#roadmap) for current phase.

## Overview

Crosscutter is a research tool that administers the DSM-5-TR Level 1 and Level 2 Cross-Cutting Symptom Measures through an interactive LLM-powered chatbot. The system guides respondents through standardized psychiatric symptom screening in a conversational format, with planned evolution toward speech-to-speech interaction.

**Intended Use:** Personal research only. This is **not** a clinical or diagnostic tool and does not replace professional clinical judgment.

## Features

| Feature | Status | Milestone |
|---------|--------|-----------|
| DSM-5-TR Level 1 Cross-Cutting Measure (23-item Likert scale) | 🟡 In Progress | 1 |
| Chat-based administration with LLM | 🟡 In Progress | 2 |
| Response scoring and severity classification | ⚪ Planned | 2 |
| Session persistence and history | ⚪ Planned | 2 |
| Level 2 domain-specific follow-up measures | ⚪ Planned | 2 |
| Speech-to-speech interaction (STT/TTS) | ⚪ Future | 3 |
| Multi-language support | ⚪ Future | 3 |
| Exportable reports (PDF/JSON) | ⚪ Planned | 2 |

## Technology Stack (Decided)

| Layer | Decision | Status |
|-------|----------|--------|
| Runtime / Language | TypeScript / Node.js | 🟢 Decided |
| Web Framework | Next.js (App Router) | 🟢 Decided |
| LLM Provider & Model | OpenAI GPT-4o (via Vercel AI SDK) | 🟢 Decided |
| Database | SQLite (dev) → PostgreSQL (Render, via Prisma) | 🟢 Decided |
| UI Framework / Styling | React + Tailwind CSS + shadcn/ui | 🟢 Decided |
| Testing Stack | Vitest + Playwright | 🟢 Decided |
| Deployment Target | Render (Next.js + Managed PostgreSQL) | 🟢 Decided |

> **Legend:** 🟢 Decided · 🟡 In Discussion · 🔴 Undecided (blocking)

## Project Structure

```
crosscutter/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (chat, scoring, sessions)
│   ├── assessment/        # Assessment flow pages
│   └── layout.tsx
├── components/            # React components
│   ├── chat/              # Chat interface components
│   ├── measures/          # Measure-specific components
│   └── ui/                # shadcn/ui primitives
├── lib/                   # Core logic
│   ├── measures/          # DSM-5-TR measure definitions
│   ├── scoring/           # Scoring algorithms
│   ├── llm/               # LLM integration
│   └── db/                # Database layer (Prisma)
├── prisma/                # Prisma schema & migrations
├── types/                 # TypeScript types
├── e2e/                   # Playwright E2E tests
└── public/                # Static assets
```

## Roadmap

### Milestone 1: Likert Scale Online (Week 1-2)
**Goal:** DSM-5-TR Level 1 measure rendered as interactive Likert scale (web form)

- [ ] Project scaffolding (Next.js, TypeScript, Tailwind, shadcn/ui, Prisma)
- [ ] DSM-5-TR Level 1 Cross-Cutting Measure data model (23 items, 13 domains, scoring rules)
- [ ] Likert scale UI component (0-4 scale: None/Slight/Mild/Moderate/Severe)
- [ ] Form validation and progress tracking
- [ ] In-memory response capture
- [ ] Scoring engine: raw scores → severity thresholds per domain
- [ ] Unit tests for scoring logic (Vitest)
- [ ] Deploy to Render (static form, no chat yet)

**Deliverable:** Working web form at `https://crosscutter.onrender.com` administering the 23-item Level 1 measure with instant scoring.

---

### Milestone 2: Chatbot Administration (Week 3-4)
**Goal:** LLM-powered conversational administration of Level 1 + Level 2 measures

- [ ] LLM chat loop with structured item administration (Vercel AI SDK `streamText` + tool use)
- [ ] Chat UI: message history, streaming responses, user input, progress indicator
- [ ] Function calling schema for DSM item administration (present item → capture response → next)
- [ ] Conditional branching: Level 1 domain elevation → auto-administer corresponding Level 2
- [ ] Level 2 domain-specific measures (12 domains: depression, anger, mania, anxiety, somatic, suicidal ideation, psychosis, sleep, memory, repetitive thoughts, dissociation, personality functioning)
- [ ] Session persistence (Prisma + SQLite/PostgreSQL): create, resume, list, export
- [ ] Results dashboard: domain scores, severity badges, longitudinal tracking
- [ ] Export: JSON + PDF report generation
- [ ] E2E test: complete Level 1 + conditional Level 2 assessment flow (Playwright)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Responsive design (mobile-first)

**Deliverable:** Full chat-based assessment at `https://crosscutter.onrender.com` with persistent sessions and conditional Level 2 follow-up.

---

### Milestone 3: Speech-to-Speech (Week 5-6)
**Goal:** Voice-driven administration for hands-free / accessibility use cases

- [ ] STT + TTS integration (Web Speech API primary; Whisper + TTS provider fallback)
- [ ] Voice selection, rate/pitch controls
- [ ] Audio playback queue management (interruptible, barge-in support)
- [ ] Silence detection, noise handling
- [ ] Fallback to text chat when speech unavailable
- [ ] Mobile Safari / Chrome compatibility matrix
- [ ] E2E test: complete voice-driven assessment flow

**Deliverable:** Speech-enabled assessment at `https://crosscutter.onrender.com` with seamless text/voice switching.

---

### Phase 4: Hardening & Extensibility (Week 7-10)
**Goal:** Production readiness, researcher features

- [ ] Authentication (magic link / OAuth) for multi-user support
- [ ] Role-based access (researcher, participant, admin)
- [ ] Study configuration: custom measure subsets, branching rules
- [ ] Batch import/export (CSV, REDCap-compatible)
- [ ] Audit logging, data retention policies
- [ ] CI/CD pipeline (GitHub Actions → Render)
- [ ] Load testing, error monitoring (Sentry)
- [ ] Documentation site

---

### Phase 5: Research Extensions (Ongoing)
**Goal:** Domain-specific adaptations

- [ ] Pediatric measure variant (ages 6-17)
- [ ] Clinician-administered mode (side-by-side view)
- [ ] Integration hooks for EHR/REDCap
- [ ] Plugin architecture for custom measures
- [ ] Multi-site study coordination

## Architectural Decisions (Resolved)

All Phase 0 decisions resolved via GitHub issues:

| # | Decision | Resolution | Issue |
|---|----------|------------|-------|
| 1 | Runtime / Language | TypeScript / Node.js | [#7](https://github.com/bifanaboy/prelude/issues/7) |
| 2 | Web Framework | Next.js (App Router) | [#8](https://github.com/bifanaboy/prelude/issues/8) |
| 3 | LLM Provider | OpenAI GPT-4o (Vercel AI SDK) | [#9](https://github.com/bifanaboy/prelude/issues/9) |
| 4 | Database | SQLite → PostgreSQL (Prisma) | [#10](https://github.com/bifanaboy/prelude/issues/10) |
| 5 | UI Framework | React + Tailwind + shadcn/ui | [#11](https://github.com/bifanaboy/prelude/issues/11) |
| 6 | Testing | Vitest + Playwright | [#12](https://github.com/bifanaboy/prelude/issues/12) |
| 7 | Deployment | Render (Next.js + Managed PG) | [#13](https://github.com/bifanaboy/prelude/issues/13) |

## Disclaimer

> This project is not a validated clinical instrument. It is not intended for diagnosis or treatment and is not a substitute for professional clinical judgement. The DSM-5-TR Cross-Cutting Symptom Measures are copyrighted by the American Psychiatric Association; this implementation is for personal research use only.

## Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add OPENAI_API_KEY to .env

# Database setup (SQLite for local dev)
npx prisma generate
npx prisma db push

# Run dev server
npm run dev

# Run tests
npm run test        # Unit tests (Vitest)
npm run test:e2e    # Playwright E2E

# Type check
npm run typecheck

# Lint
npm run lint
```

## Deployment (Render)

1. Connect GitHub repository to Render
2. Render auto-detects Next.js (uses `render.yaml` for config)
3. Add Managed PostgreSQL database
4. Set environment variables:
   - `OPENAI_API_KEY` — OpenAI API key
   - `DATABASE_URL` — Auto-provided by Render PostgreSQL
   - `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
5. Deploy

`render.yaml` defines the web service and database for reproducible infrastructure.

## License

MIT — See [LICENSE](LICENSE) for details.

## References

- [DSM-5-TR Cross-Cutting Symptom Measures (APA)](https://www.psychiatry.org/psychiatrists/practice/dsm/educational-resources/assessment-measures)
- [Level 1 Measure (Adult)](https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM5TR_Cross-Cutting_Level1_Adult.pdf)
- [Level 2 Measures](https://www.psychiatry.org/psychiatrists/practice/dsm/educational-resources/assessment-measures#Level2)