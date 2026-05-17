# CyberPivot — AI Context File

This file is read by Claude Code and Cursor at the start of every session.
Always read this file before making any code decisions.

---

## What We're Building

CyberPivot is a free, open source, lifecycle-based cybersecurity learning platform.
Core philosophy: **Start where you are.**

Users go from zero (or wherever they are) to having real skills, a real home lab, and a real portfolio they can show employers. Not a course platform — a practical, path-aware, scenario-driven journey.

Full vision is in PRD.md — read it.

---

## Tech Stack

- **Frontend:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend / Auth / DB:** Supabase (PostgreSQL + Auth + Realtime)
- **Content:** MDX files in /content directory
- **Package Manager:** pnpm (always use pnpm, never npm or yarn)
- **Language:** TypeScript everywhere, no plain JS files
- **CLI Companion:** Python (in /cli directory)
- **Hosting:** Vercel (primary) + Docker Compose (self-host option)

---

## Folder Structure

```
cyberpivot/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── paths/
│   │   ├── labs/
│   │   ├── interview/
│   │   ├── cv/
│   │   └── cabinet/
│   ├── (marketing)/
│   └── api/
├── components/
│   ├── ui/              # shadcn/ui only
│   ├── modules/
│   └── layout/
├── content/
│   ├── foundations/
│   ├── paths/
│   │   ├── azure-security/
│   │   ├── pentest/
│   │   ├── soc/
│   │   ├── grc/
│   │   ├── api-security/
│   │   └── appsec/
│   ├── labs/
│   └── interview/
├── lib/
├── hooks/
├── types/
├── cli/
└── supabase/
```

---

## Coding Conventions

- TypeScript strict mode always on
- Use server components by default, client components only when needed
- All components in PascalCase
- All utility functions in camelCase
- Files use kebab-case naming
- Always use absolute imports with @ alias
- Zod for all form validation and schema definition
- React Hook Form for all forms
- Every component must have proper TypeScript types — no `any`

---

## Styling Rules

- Tailwind CSS utility classes only — no custom CSS unless absolutely necessary
- shadcn/ui for all UI components — don't build from scratch what shadcn provides
- Dark mode first — all components must look correct in dark mode
- Mobile responsive always — use Tailwind responsive prefixes
- Consistent spacing — use Tailwind spacing scale, don't use arbitrary values unless needed

---

## Supabase Rules

- All DB queries go through typed Supabase client
- Row Level Security (RLS) enabled on all tables
- Never expose service role key on client side
- Auth handled entirely through Supabase Auth
- Database types auto-generated and kept in /types/supabase.ts

---

## Content Rules

- All module content written in MDX format
- Each module file follows the standard template in /content/TEMPLATE.mdx
- Scenarios always come before theory in every module
- Tools introduced hands-on before explained conceptually
- Every module ends with a cabinet artifact — something tangible the user builds

---

## V1 Priority — Build These First

1. Onboarding assessment flow
2. Foundation Layer modules (5 modules)
3. Azure Security path (8 modules)
4. Progress dashboard
5. Cabinet display
6. Cert roadmap (Azure path)
7. Interview prep (general + Azure)
8. CV builder (Azure template)

Do not build V2 features until V1 is complete and working.

---

## What Not To Do

- Do not use npm or yarn — always pnpm
- Do not create plain .js files — TypeScript only
- Do not use inline styles — Tailwind only
- Do not build custom UI components if shadcn/ui has it
- Do not add dependencies without checking if one already exists for that purpose
- Do not skip TypeScript types — no `any` types
- Do not build V2 features (community, job board, threat feed) in V1
- Do not make the platform light mode only — dark mode is primary

---

## Writing Voice

All copy on this platform — UI text, module content, onboarding, interview prep, CV builder, tooltips, error messages, everything — follows these rules.

**The voice:** A knowledgeable security practitioner who is also a good teacher. Direct, honest, no performance.

**Rules:**
- Write like a person, not a product
- Short sentences. Say the thing. Move on.
- No em dashes
- No "delve into", "leverage", "comprehensive", "in today's landscape", "it's worth noting", "in conclusion"
- No announcing what you're about to say — just say it
- No rhetorical questions
- No bullet points for everything — use prose when it reads better
- Explain the why, not just the what
- Don't dumb it down but don't show off either
- Dry humour is fine, forced enthusiasm is not

**Bad:**
"In today's ever-evolving cybersecurity landscape, it's worth noting that understanding network fundamentals is a comprehensive first step in your journey."

**Good:**
"This module is about how traffic moves across a network. Start here before anything else."

When generating any user-facing text, apply this voice. No exceptions.

---

## Key Context

- Target users: complete beginners, IT professionals pivoting to security, existing security practitioners
- Platform is free and open source — keep dependencies free or with generous free tiers
- Windows is the primary dev OS for this project
- Community contributes content via GitHub PRs on MDX files
- Every decision should ask: does this help someone land a cybersecurity job?
