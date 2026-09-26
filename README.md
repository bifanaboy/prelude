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

## Technology Stack — **TBD: See [Architectural Decisions](#architectural-decisions-needed)**

| Layer | Decision | Status |
|-------|----------|--------|
| Runtime / Language | TBD | 🔴 Undecided |
| Web Framework | TBD | 🔴 Undecided |
| LLM Provider & Model | TBD | 🔴 Undecided |
| Database | TBD | 🔴 Undecided |
| UI Framework / Styling | TBD | 🔴 Undecided |
| Testing Stack | TBD | 🔴 Undecided |
| Deployment Target | TBD | 🔴 Undecided |

> **Legend:** 🟢 Decided · 🟡 In Discussion · 🔴 Undecided (blocking)

## Project Structure (TBD — Depends on Stack)

```
crosscutter/
├── TBD/                    # Structure follows framework choice
```

## Roadmap

### Phase 0: Architectural Decisions (Current — Week 0)
**Goal:** Finalize technology choices before implementation

- [ ] **Issue:** Choose runtime/language (TypeScript/Node vs Python vs other)
- [ ] **Issue:** Choose web framework (Next.js vs FastAPI vs SvelteKit vs CLI-only)
- [ ] **Issue:** Choose LLM provider & model (OpenAI vs Anthropic vs Local vs Multi-provider)
- [ ] **Issue:** Choose database (SQLite vs PostgreSQL vs DuckDB vs None)
- [ ] **Issue:** Choose UI approach (React+Tailwind vs Vue vs Svelte vs HTMX vs None)
- [ ] **Issue:** Choose testing stack
- [ ] **Issue:** Choose deployment target (Vercel vs Render vs Fly.io vs Self-hosted)

### Phase 1: Foundation (Weeks 1-3)
**Goal:** Minimal viable chat administration of Level 1 measure

- [ ] Project scaffolding (per Phase 0 decisions)
- [ ] DSM-5-TR Level 1 Cross-Cutting Measure data model (23 items, domains, scoring rules)
- [ ] LLM chat loop with structured item administration (function calling / tool use)
- [ ] Basic chat UI (message history, user input, progress indicator)
- [ ] Response capture and in-memory session state
- [ ] Scoring engine: raw scores → severity thresholds (None/Slight/Mild/Moderate/Severe)
- [ ] Unit tests for scoring logic
- [ ] E2E test: complete Level 1 assessment flow

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

- [ ] STT + TTS integration (Web Speech API vs Whisper + TTS provider)
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
- [ ] CI/CD pipeline
- [ ] Load testing, error monitoring
- [ ] Documentation site

### Phase 5: Research Extensions (Ongoing)
**Goal:** Domain-specific adaptations

- [ ] Pediatric measure variant (ages 6-17)
- [ ] Clinician-administered mode (side-by-side view)
- [ ] Integration hooks for EHR/REDCap
- [ ] Plugin architecture for custom measures
- [ ] Multi-site study coordination

## Architectural Decisions Needed

These are open questions blocking Phase 1. Each should become a bead/issue for discussion.

| # | Decision | Options | Considerations |
|---|----------|---------|----------------|
| 1 | **Runtime / Language** | TypeScript/Node · Python · Rust · Go | Team familiarity, LLM SDK maturity, ecosystem |
| 2 | **Web Framework** | Next.js · FastAPI · SvelteKit · Hono · CLI-only | SSR needs, API vs serverless, bundle size |
| 3 | **LLM Provider** | OpenAI · Anthropic · Local (Ollama/llama.cpp) · Multi (Vercel AI SDK) | Cost, latency, privacy, function calling quality |
| 4 | **Database** | SQLite · PostgreSQL · DuckDB · File (JSONL) · None (ephemeral) | Persistence needs, concurrent users, analytics |
| 5 | **UI Framework** | React+Tailwind · Vue · Svelte · HTMX · Plain HTML | Team skill, interactivity level, bundle size |
| 6 | **Testing** | Vitest+Playwright · Jest · Pytest · None yet | Coverage goals, E2E priority, CI speed |
| 7 | **Deployment** | Vercel · Render · Fly.io · Railway · Self-hosted | Cost, scaling, HTTPS, custom domains |

## Disclaimer

> This project is not a validated clinical instrument. It is not intended for diagnosis or treatment and is not a substitute for professional clinical judgement. The DSM-5-TR Cross-Cutting Symptom Measures are copyrighted by the American Psychiatric Association; this implementation is for personal research use only.

## Development (TBD)

```bash
# TBD — Depends on Phase 0 decisions
# Example for Node/Next.js:
# npm install
# npm run dev
# npm run test
# npm run typecheck
# npm run lint
```

## License

MIT — See [LICENSE](LICENSE) for details.

## References

- [DSM-5-TR Cross-Cutting Symptom Measures (APA)](https://www.psychiatry.org/psychiatrists/practice/dsm/educational-resources/assessment-measures)
- [Level 1 Measure (Adult)](https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM5TR_Cross-Cutting_Level1_Adult.pdf)
- [Level 2 Measures](https://www.psychiatry.org/psychiatrists/practice/dsm/educational-resources/assessment-measures#Level2)