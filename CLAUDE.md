# CyberPivot — AI Context File

Read this file fully before making any code or content decisions.
Also read PRD.md and DECISIONS.md before starting any session.

---

## What We Are Building

CyberPivot is a paid cybersecurity learning platform with a deliberately free Foundation experience. Selected introductory or sample content may also be free. Role-path content is paid unless explicitly marked free. CyberPivot is no longer positioned as an open-source product.
Core philosophy: **Start where you are.**

Users go from zero (or wherever they are) to having real skills, a real home lab, and a real portfolio. Not a course platform. A practical, role-aware, scenario-driven journey that ends with a cabinet of real artifacts and the confidence to walk into interviews.

Full vision and structure in PRD.md. All decisions and reasoning in DECISIONS.md.

---

## Tech Stack

- **Frontend:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend / Auth / DB:** Supabase (PostgreSQL + Auth + Realtime)
- **Content:** MDX files in /content directory
- **Package Manager:** pnpm — always pnpm, never npm or yarn
- **Language:** TypeScript everywhere — no plain JS files
- **CLI Companion:** Python (in /cli directory)
- **Hosting:** Vercel (primary) + Docker Compose (self-host option)
- **Analytics:** Plausible (open source, privacy friendly)

---

## Folder Structure

```
cyberpivot/
├── app/
│   ├── (auth)/                   # Auth pages — login, signup, callback
│   ├── (dashboard)/              # Logged in experience
│   │   ├── dashboard/            # Progress dashboard
│   │   ├── roles/                # Role pages
│   │   ├── modules/              # Module viewer
│   │   ├── labs/                 # Standalone labs
│   │   ├── interview/            # Interview prep
│   │   ├── cv/                   # CV builder
│   │   └── cabinet/              # Portfolio display
│   ├── (marketing)/              # Homepage, intro, about
│   ├── (onboarding)/             # Onboarding flow
│   └── api/                      # API routes
├── components/
│   ├── ui/                       # shadcn/ui only
│   ├── modules/                  # Module-specific components
│   └── layout/                   # Layout components
├── content/
│   ├── intro/                    # Introduction section (8 parts)
│   ├── foundations/              # Foundation layer modules
│   ├── modules/                  # All role modules — shared building blocks
│   │   ├── networking-fundamentals/
│   │   ├── linux-fundamentals/
│   │   ├── windows-and-active-directory/
│   │   ├── identity-access-management/
│   │   ├── cloud-fundamentals/
│   │   ├── log-analysis/
│   │   ├── owasp-top-10/
│   │   ├── risk-management/
│   │   ├── threat-modeling/
│   │   └── ...
│   ├── roles/                    # Role definitions — module lists in order
│   │   ├── soc-analyst.json
│   │   ├── penetration-tester.json
│   │   ├── azure-security-engineer.json
│   │   ├── grc-analyst.json
│   │   └── ...
│   ├── specialist/               # Specialist modules
│   ├── topics/                   # Topic library entries
│   ├── labs/                     # Standalone lab content
│   └── interview/                # Interview prep content
├── lib/                          # Utilities and helpers
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript types
├── cli/                          # Python CLI companion
├── supabase/                     # DB config and migrations
├── PRD.md                        # Product requirements
├── CLAUDE.md                     # This file
├── DECISIONS.md                  # Decision log
├── CONTRIBUTING.md               # How to contribute
└── README.md
```

---

## Platform Architecture

Modules remain the conceptual building blocks, but the repository implementation has evolved from the original central JSON module-library design. Current source-of-truth locations are `content/foundations/` for Foundation modules, `content/paths/` for role-path modules, and `lib/roles/` for role definitions and path metadata. Do not assume the old `content/modules/` or `content/roles/*.json` structure exists. Foundation and role-path modules may use different supported content structures.

The Cabinet is part of the product model. Artifacts are outputs learners produce through practical work, not downloadable templates.

**Six domains — 30+ roles across six security domains:**

Defensive Security — SOC Analyst (V1), Incident Responder, Threat Hunter, EDR Analyst, DFIR Analyst

Offensive Security — Vulnerability Assessment, Penetration Tester (V1), Red Teamer, Bug Bounty Hunter, Malware Analyst, AI Red Teamer

Application and Product Security — AppSec Engineer (V1), API Security Engineer (V1), DevSecOps Engineer, AI Security Engineer

Cloud and Infrastructure Security — Azure Security Engineer (V1), AWS Security Engineer, GCP Security Engineer, Network Security Engineer, Identity Security Engineer, Email Security Engineer, Security Engineer

Governance, Risk and Compliance — GRC Analyst (V1), Compliance Analyst, Risk Analyst, Security Auditor, vCISO, Privacy Analyst

Operational Technology and Industrial Control Systems Security — OT Security Analyst, OT Security Engineer

Every role may be visible from day one, but availability must reflect the actual repository state. Do not mark content as available unless the corresponding module content and route actually exist. Coming-soon roles must not silently redirect to unrelated role content.

**Content levels:**
- Introduction — free, ungated, no account needed
- Foundation Layer — shared modules for beginners
- Role Paths — structured journeys with cabinet artifacts
- Specialist Modules — deep dives, standalone or embedded in paths
- Topic Library — short focused explainers, community contributed
- Tools Directory — filterable reference, V2

---

## Coding Conventions

- TypeScript strict mode always on
- Server components by default, client components only when needed
- All components in PascalCase
- All utility functions in camelCase
- Files use kebab-case naming
- Always use absolute imports with @ alias
- Zod for all form validation and schema definition
- React Hook Form for all forms
- Every component must have proper TypeScript types — no `any`
- Loading states on all async operations — no frozen screens
- Error states on all async operations — clear non-technical messages

---

## Styling Rules

- Tailwind CSS utility classes only — no custom CSS unless absolutely necessary
- shadcn/ui for all UI components — do not build from scratch what shadcn provides
- Dark mode first — all components must look correct in dark mode
- Mobile responsive always — use Tailwind responsive prefixes
- Consistent spacing — use Tailwind spacing scale

---

## Security Rules

The platform must be secure by design. Non-negotiable.

- Input sanitisation on all user input
- Secure HTTP headers — CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy
- OAuth state parameter validated on all SSO flows
- Auth errors never reveal whether an email exists
- JWT tokens handled entirely by Supabase
- Rate limiting on all auth endpoints
- Environment variables validated at startup
- RLS enforced on every Supabase table — no exceptions
- No sensitive data in localStorage

---

## Supabase Rules

- All DB queries through typed Supabase client
- RLS enabled on all tables
- Never expose service role key client-side
- Auth handled entirely through Supabase Auth
- Database types in /types/supabase.ts

---

## Content Rules

- Module content is MDX, but Foundation and role-path modules may use different supported structures.
- Treat `/content/TEMPLATE.mdx` as a reference, not proof that every live module must use identical headings.
- Core content standard: context/scenario, concepts, hands-on work, job context, and a Cabinet artifact. Modules may add setup, analysis, answer guides, checks, troubleshooting, environment options, or extra theory when appropriate.
- Scenario/context should ground the learner before abstract explanation.
- Tooling modules should provide practical hands-on work and an enterprise equivalent where appropriate.
- Every role-path learning module should produce a meaningful tangible artifact; validate the actual module requirements before assuming a universal artifact schema.
- Do not invent URLs, tools, environments, enterprise products, or technical behaviour. Flag uncertain technical details for review.

**Every module that involves tooling covers two tracks:**

Free/Open Source Track — what the user installs and uses in the lab. Fully functional, no credit card.

Enterprise Track — what they will see on the job. Trial link where available. Screenshots and walkthrough where not. Explains what the enterprise tool does and why organisations pay for it.

---

## Writing Voice

All copy on this platform follows these rules. No exceptions.

**The voice:** A knowledgeable security practitioner who is a good teacher. Someone who has done the job, seen real incidents, used real tools.

**Real examples always:**
- Use real incidents — WannaCry, SolarWinds, Uber breach, NHS ransomware
- Use relatable analogies before technical concepts
- Treat the reader as intelligent, just new to this

**Rules:**
- Short sentences. Say the thing. Move on.
- No em dashes
- No "delve into", "leverage", "comprehensive", "in today's landscape", "it's worth noting", "in conclusion"
- No announcing what you are about to say
- No rhetorical questions
- Explain the why, not just the what
- Dry humour is fine. Forced enthusiasm is not.

Bad: "In today's ever-evolving cybersecurity landscape, it's worth noting that understanding network fundamentals is a comprehensive first step."

Good: "This module is about how traffic moves across a network. Start here before anything else."

---

## Current Implementation Context

The repository is beyond the original V1 planning stage, but many planned role paths remain incomplete. As of the current repository inventory:

- 6 Foundation modules exist under `content/foundations/`.
- 2 OT Security modules exist under `content/paths/ot-security/`.
- Other V1 role-path directories are currently placeholders rather than completed module libraries.
- Role metadata is implemented in TypeScript under `lib/roles/`, not JSON files under `content/roles/`.
- Foundation and OT registries/loaders exist under `lib/foundations/` and `lib/roles/ot-security/`.
- There is not yet a dedicated MDX/frontmatter/content QA pipeline. Existing `verify-*` scripts validate specific Cabinet user-generated content and should not be treated as a complete content QA system.

When implementing new work, inspect the actual repository before assuming a planned feature exists. Prefer the current repository plus DECISIONS.md and PRD.md over stale historical examples.

## Build Priorities

Build in this order unless the current task explicitly changes it:

1. Content Assurance / deterministic content QA foundation
2. GitHub quality gate for content changes
3. Repo-aware Content Copilot for drafting and maintenance
4. Job Role Intelligence for curriculum gap analysis
5. Technical validation for selected labs/detections
6. Skill/Cabinet intelligence and later change-impact automation

Automation must remain human-approved. No agent should auto-merge or autonomously publish production content.

---

## What Not To Do

- Do not use npm or yarn — always pnpm
- Do not create plain .js files — TypeScript only
- Do not use inline styles — Tailwind only
- Do not build custom UI if shadcn provides it
- Do not skip TypeScript types — no `any`
- Do not build unrelated future features before current priorities are complete
- Do not use light mode as default
- Do not write AI-sounding copy — follow writing voice rules
- Do not name the cloud path "Cloud Security Azure" — it is "Azure Security Engineer"
- Do not skip loading or error states

---

## Key Context

- Target users: complete beginners, IT professionals pivoting, developers moving into security, existing practitioners
- Product model: paid subscription platform with free Foundation content and selected free samples
- CyberPivot is proprietary, not an open-source product
- Keep infrastructure and dependencies practical and maintainable; do not assume a free/self-hosted business model
- Windows is the primary dev OS for this project
- GitHub is the source of truth for code and content changes; changes require human approval before merge
- Every decision: does this improve content quality, production speed, maintenance, learner experience, or the ability to build real cybersecurity skills?
