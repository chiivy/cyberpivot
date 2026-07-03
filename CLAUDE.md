# CyberPivot — AI Context File

Read this file fully before making any code or content decisions.
Also read PRD.md and DECISIONS.md before starting any session.

---

## What We Are Building

CyberPivot is a free, open source cybersecurity learning platform.
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

Modules are the core building blocks. Roles are curated collections of modules in a specific order. Some modules appear across multiple role paths — written once, used everywhere.

**Six domains — 30+ roles across six security domains:**

Defensive Security — SOC Analyst (V1), Incident Responder, Threat Hunter, EDR Analyst, DFIR Analyst

Offensive Security — Vulnerability Assessment, Penetration Tester (V1), Red Teamer, Bug Bounty Hunter, Malware Analyst, AI Red Teamer

Application and Product Security — AppSec Engineer (V1), API Security Engineer (V1), DevSecOps Engineer, AI Security Engineer

Cloud and Infrastructure Security — Azure Security Engineer (V1), AWS Security Engineer, GCP Security Engineer, Network Security Engineer, Identity Security Engineer, Email Security Engineer, Security Engineer

Governance, Risk and Compliance — GRC Analyst (V1), Compliance Analyst, Risk Analyst, Security Auditor, vCISO, Privacy Analyst

Operational Technology and Industrial Control Systems Security — OT Security Analyst, OT Security Engineer

Every role is visible from day one. V1 roles fully built. All others show as Coming Soon with expected dates and a notify option.

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

- All module content in MDX format
- Follow the standard template in /content/TEMPLATE.mdx
- Scenario always comes before theory
- Tools introduced hands-on before explained conceptually
- Every module ends with a cabinet artifact

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

## V1 Build Order

1. Homepage
2. Introduction section (all 8 parts)
3. Onboarding flow
4. All role pages (V1 full, Coming Soon basic)
5. Foundation modules (all 6 complete and live)
6. Azure Security Engineer path
7. SOC Analyst path
8. Penetration Tester path
9. GRC Analyst path
10. Progress dashboard
11. Cabinet display
12. Cert roadmap per role
13. Interview prep
14. CV builder

Do not build V2 features until V1 is complete.

---

## What Not To Do

- Do not use npm or yarn — always pnpm
- Do not create plain .js files — TypeScript only
- Do not use inline styles — Tailwind only
- Do not build custom UI if shadcn provides it
- Do not skip TypeScript types — no `any`
- Do not build V2 features in V1
- Do not use light mode as default
- Do not write AI-sounding copy — follow writing voice rules
- Do not name the cloud path "Cloud Security Azure" — it is "Azure Security Engineer"
- Do not skip loading or error states

---

## Key Context

- Target users: complete beginners, IT professionals pivoting, developers moving into security, existing practitioners
- Free and open source — keep all dependencies free or with generous free tiers
- Windows is the primary dev OS for this project
- Community contributes via GitHub PRs on MDX files
- Every decision: does this help someone land a cybersecurity job?
