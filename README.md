# crosscutter

Administers the DSM-5-TR Cross Cutting Measures as a web app via an LLM-powered chatbot.

## Status

**Active Development** — Core chat-based administration in progress. See [Roadmap](#roadmap) for current phase.

## Overview

Crosscutter is a research tool that administers the DSM-5-TR Level 1 and Level 2 Cross-Cutting Symptom Measures through an interactive LLM-powered chatbot. The system guides respondents through standardized psychiatric symptom screening in a conversational format, with planned evolution toward speech-to-speech interaction.

**Intended Use:** Personal research only. This is **not** a clinical or diagnostic tool and does not replace professional clinical judgment.

## Features (Planned / In Progress)

| Feature | Status |
|---------|--------|
| Chat-based DSM-5-TR Level 1 Cross-Cutting Measure administration | 🟡 In Progress |
| Level 2 domain-specific follow-up measures | ⚪ Planned |
| Response scoring and severity classification | ⚪ Planned |
| Session persistence and history | ⚪ Planned |
| Speech-to-speech interaction (STT/TTS) | ⚪ Future |
| Multi-language support | ⚪ Future |
| Exportable reports (PDF/JSON) | ⚪ Planned |

## Technology Stack (Decided)

- **Runtime:** Node.js / TypeScript
- **Framework:** Next.js (App Router)
- **LLM:** OpenAI API (GPT-4o / o1) with function calling
- **Database:** SQLite (local) / PostgreSQL (production)
- **UI:** React + Tailwind CSS + shadcn/ui
- **Testing:** Vitest + Playwright

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
│   └── db/                # Database layer
├── types/                 # TypeScript types
└── public/                # Static assets
```

## Roadmap

### Phase 1: Foundation (Current — Weeks 1-3)
**Goal:** Minimal viable chat administration of Level 1 measure

- [ ] Project scaffolding (Next.js, TypeScript, Tailwind, shadcn/ui)
- [ ] DSM-5-TR Level 1 Cross-Cutting Measure data model (23 items, domains, scoring rules)
- [ ] LLM chat loop with function calling for structured item administration
- [ ] Basic chat UI (message history, user input, progress indicator)
- [ ] Response capture and in-memory session state
- [ ] Scoring engine: raw scores → severity thresholds (None/Slight/Mild/Moderate/Severe)
- [ ] Unit tests for scoring logic (Vitest)
- [ ] E2E test: complete Level 1 assessment flow (Playwright)

### Phase 2: Persistence & Polish (Weeks 4-6)
**Goal:** Durable sessions, Level 2 measures, usable UI

- [ ] Database schema (sessions, responses, scores, users)
- [ ] Session CRUD: create, resume, list, export
- [ ] Level 2 domain-specific measures (12 domains: depression, anger, mania, anxiety, somatic, suicidal ideation, psychosis, sleep, memory, repetitive thoughts, dissociation, personality functioning)
- [ ] Conditional branching: Level 1 domain elevation → auto-administer corresponding Level 2
- [ ] Results dashboard: domain scores, severity badges, longitudinal tracking
- [ ] Export: JSON + PDF report generation
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Responsive design (mobile-first)

### Phase 3: Speech Interface (Weeks 7-10)
**Goal:** Speech-to-speech interaction

- [ ] Web Speech API integration (STT + TTS) as primary interface
- [ ] Fallback to text chat when speech unavailable
- [ ] Voice selection, rate/pitch controls
- [ ] Audio playback queue management
- [ ] Noise handling, silence detection, barge-in support
- [ ] Mobile Safari / Chrome compatibility matrix

### Phase 4: Hardening & Extensibility (Weeks 11-14)
**Goal:** Production readiness, researcher features

- [ ] Authentication (magic link / OAuth) for multi-user support
- [ ] Role-based access (researcher, participant, admin)
- [ ] Study configuration: custom measure subsets, branching rules
- [ ] Batch import/export (CSV, REDCap-compatible)
- [ ] Audit logging, data retention policies
- [ ] CI/CD pipeline (GitHub Actions → Vercel/Render)
- [ ] Load testing, error monitoring (Sentry)
- [ ] Documentation site (Nextra or Mintlify)

### Phase 5: Research Extensions (Ongoing)
**Goal:** Domain-specific adaptations

- [ ] Pediatric measure variant (ages 6-17)
- [ ] Clinician-administered mode (side-by-side view)
- [ ] Integration hooks for EHR/REDCap
- [ ] Plugin architecture for custom measures
- [ ] Multi-site study coordination

## Disclaimer

> This project is not a validated clinical instrument. It is not intended for diagnosis or treatment and is not a substitute for professional clinical judgement. The DSM-5-TR Cross-Cutting Symptom Measures are copyrighted by the American Psychiatric Association; this implementation is for personal research use only.

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm run test        # Unit tests
npm run test:e2e    # Playwright E2E

# Type check
npm run typecheck

# Lint
npm run lint
```

## License

MIT — See [LICENSE](LICENSE) for details.

## References

- [DSM-5-TR Cross-Cutting Symptom Measures (APA)](https://www.psychiatry.org/psychiatrists/practice/dsm/educational-resources/assessment-measures)
- [Level 1 Measure (Adult)](https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM5TR_Cross-Cutting_Level1_Adult.pdf)
- [Level 2 Measures](https://www.psychiatry.org/psychiatrists/practice/dsm/educational-resources/assessment-measures#Level2)