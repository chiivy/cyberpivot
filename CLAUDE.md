# CyberPivot — AI Context File

This file is read by Claude Code and Cursor at the start of every session.
Always read this file before making any code decisions.

---

## What We're Building

CyberPivot is a free, open source, lifecycle-based cybersecurity learning platform.
Core philosophy: **Start where you are.**

Users go from zero (or wherever they are) to having real skills, a real home lab, and a real portfolio they can show employers. Not a course platform. A practical, role-aware, scenario-driven journey that ends with a cabinet of real artifacts and the confidence to walk into interviews.

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
- **Analytics:** Plausible (open source, privacy friendly)

---

## Folder Structure

```
cyberpivot/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── roles/
│   │   ├── modules/
│   │   ├── labs/
│   │   ├── interview/
│   │   ├── cv/
│   │   └── cabinet/
│   ├── (marketing)/        # Homepage, role pages, about
│   └── api/
├── components/
│   ├── ui/                 # shadcn/ui only
│   ├── modules/            # Module-specific components
│   └── layout/             # Layout components
├── content/
│   ├── modules/            # All modules live here, shared across roles
│   │   ├── networking-fundamentals/
│   │   ├── linux-fundamentals/
│   │   ├── windows-active-directory/
│   │   ├── identity-access-management/
│   │   ├── cloud-fundamentals/
│   │   ├── log-analysis/
│   │   ├── owasp-top-10/
│   │   ├── risk-management/
│   │   ├── threat-modeling/
│   │   └── ...
│   ├── roles/              # Role definitions — which modules, in what order
│   │   ├── soc-analyst.json
│   │   ├── penetration-tester.json
│   │   ├── cloud-security-azure.json
│   │   ├── grc-analyst.json
│   │   └── ...
│   ├── labs/
│   └── interview/
├── lib/
├── hooks/
├── types/
├── cli/
└── supabase/
```

---

## Platform Architecture

Modules are the core building blocks. Roles are curated collections of modules in a specific order. Some modules appear across multiple role paths — written once, used everywhere.

Roles are grouped into five domains:

**Defensive Security**
SOC Analyst (V1), Incident Responder, Threat Hunter, EDR Analyst

**Offensive Security**
Vulnerability Assessment Analyst, Penetration Tester (V1), Red Teamer, Bug Bounty Hunter

**Application & Product Security**
AppSec Engineer (V1), API Security Engineer (V1), DevSecOps Engineer, AI Security Engineer

**Cloud & Infrastructure Security**
Cloud Security Azure (V1), Cloud Security AWS, Cloud Security GCP, Network Security Engineer, Identity Security Engineer, Email Security Engineer

**Governance Risk & Compliance**
GRC Analyst (V1), Compliance Analyst, Risk Analyst, Security Auditor, vCISO

Every role is visible from day one. V1 roles are fully built. All others show as Coming Soon with expected dates and a notify option. Users can see the full module list for any role even if content is not built yet.

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
- shadcn/ui for all UI components — do not build from scratch what shadcn provides
- Dark mode first — all components must look correct in dark mode
- Mobile responsive always — use Tailwind responsive prefixes
- Consistent spacing — use Tailwind spacing scale

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

**Every module that involves tooling covers two tracks:**

Free/Open Source Track — what the user installs and uses in the lab. Fully functional, no credit card needed.

Enterprise Track — what they will see on the job. Trial links where available. Screenshots and walkthroughs where not. Explains what the enterprise tool does and why organisations pay for it.

Example: A SIEM module covers Wazuh (free, full hands-on lab) and Splunk (enterprise, trial link and guided walkthrough).

---

## Role Pages

Every role has a dedicated page before the user commits to a path. Each covers:
- What the role actually does day to day — honest, no fluff
- Entry, mid, or senior level
- What background suits this role
- What a typical week looks like
- Salary range by region
- Industries that hire for this role
- Tools used on the job — free and enterprise both listed
- Certs that actually matter — honest assessment
- Where this role leads — career progression
- Full module list with availability status
- Cabinet artifacts they will build

---

## Homepage

Speaks to someone who has heard about cybersecurity as a career and wants to know if CyberPivot is worth their time. Direct. No marketing language.

Answers three questions fast: What is this? Why does it exist? What do I get?

Sections: Hero, The Problem, How It Works, The Roles (all five domains), The Cabinet (what you actually build), Open Source section, Final CTA.

No feature walls. No vague promises. No stock photos. No padlock imagery. Specific about what the user gets.

---

## Writing Voice

All copy on this platform follows these rules. UI text, module content, onboarding, interview prep, CV builder, tooltips, error messages — everything.

The voice: a knowledgeable security practitioner who is a good teacher. Direct, honest, no performance.

Rules:
- Write like a person, not a product
- Short sentences. Say the thing. Move on.
- No em dashes
- No "delve into", "leverage", "comprehensive", "in today's landscape", "it's worth noting", "in conclusion"
- No announcing what you are about to say — just say it
- No rhetorical questions
- No bullet points for everything — use prose when it reads better
- Explain the why, not just the what
- Do not dumb it down but do not show off either
- Dry humour is fine, forced enthusiasm is not

Bad: "In today's ever-evolving cybersecurity landscape, it's worth noting that understanding network fundamentals is a comprehensive first step in your journey."

Good: "This module is about how traffic moves across a network. Start here before anything else."

Apply this voice to every piece of user-facing text. No exceptions.

---

## V1 Priority — Build In This Order

1. Homepage
2. Onboarding assessment flow
3. All role pages (V1 roles full detail, Coming Soon roles visible with basic info)
4. Shared foundation modules
5. Cloud Security Azure path (first complete role)
6. SOC Analyst path
7. Penetration Tester path
8. GRC Analyst path
9. Progress dashboard
10. Cabinet display
11. Cert roadmap per role
12. Interview prep — general and per role
13. CV builder — per role templates

Do not build V2 features until V1 is complete.

V2: Community layer, job board, threat intel feed, AppSec path, API Security path, DevSecOps path, all Coming Soon roles.

---

## What Not To Do

- Do not use npm or yarn — always pnpm
- Do not create plain .js files — TypeScript only
- Do not use inline styles — Tailwind only
- Do not build custom UI components if shadcn/ui has it
- Do not add dependencies without checking if one already exists
- Do not skip TypeScript types — no `any` types
- Do not build V2 features in V1
- Do not make the platform light mode only — dark mode is primary
- Do not write AI-sounding copy — follow the writing voice rules above

---

## Key Context

- Target users: complete beginners, IT professionals pivoting to security, developers moving into security, existing security practitioners
- Platform is free and open source — keep all dependencies free or with generous free tiers
- Windows is the primary dev OS for this project
- Community contributes content via GitHub PRs on MDX files
- Every decision should ask: does this help someone land a cybersecurity job?
