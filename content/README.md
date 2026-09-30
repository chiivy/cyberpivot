# CyberPivot

Practical, role-based cybersecurity learning built around real skills, hands-on work, and portfolio artifacts. **Start where you are.**

CyberPivot is a paid cybersecurity learning platform with a deliberately free Foundation experience. Foundation content is free and ungated. Role-path learning and the Cabinet artifact system are part of the paid platform unless a specific item is explicitly marked free.

This is not a passive course library. The goal is to help you build practical skills you can explain, demonstrate, and take into an interview.

## What you build

CyberPivot is organised around a progression from shared fundamentals into role-based learning:

- **Introduction** — free, ungated orientation to cybersecurity and career paths.
- **Foundation** — shared technical fundamentals for learners who need them.
- **Role Paths** — structured learning journeys toward specific cybersecurity roles.
- **Specialist Modules** — focused deep dives that can support a role path or fill a specific skill gap.
- **Cabinet** — tangible artifacts produced through hands-on learning and used as evidence of practical work.

Foundation and role-path modules can use different content structures. They share the same quality standard: real-world context, practical work, job relevance, and a tangible output where appropriate.

## Current build state

The repository currently contains:

- 6 Foundation modules under `content/foundations/`
- 2 completed OT Security role-path modules under `content/paths/ot-security/`
- Introduction content under `content/intro/`
- Role definitions and path metadata under `lib/roles/`
- Foundation registries and loaders under `lib/foundations/`
- Cabinet definitions under `lib/cabinet/`
- Placeholder directories for additional role paths that are planned but do not yet contain completed module content

The repository is still under active development. Do not treat a role or module as available simply because it appears in a roadmap or role definition. The implemented repository is the source of truth for current availability.

## Content standard

CyberPivot content is written in a direct practitioner voice and addresses the learner in the second person.

Modules should provide, as appropriate:

1. Context or scenario
2. Concepts and explanation
3. Hands-on work
4. Job or enterprise context
5. A Cabinet artifact or other tangible output

Modules may also include setup instructions, analysis tasks, answer guides, checks, troubleshooting, environment options, prerequisites, or additional theory. There is no requirement for every module to use identical headings.

Technical claims, tools, URLs, environments, and product behaviour must be verified. Uncertain details should be flagged for review rather than invented.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (Auth, PostgreSQL, Realtime)
- [pnpm](https://pnpm.io/)
- MDX for learning content
- Python for the lab/CLI companion
- GitHub as the source of truth for code and content changes

## Getting started

```bash
pnpm install
cp .env.example .env.local
# Add Supabase URL and anon key to .env.local
pnpm dev
```

Open `http://localhost:3000`.

Before making product or content changes, read the current project documentation. The decision log takes precedence when documents conflict.

## Project documentation

- [DECISIONS.md](./DECISIONS.md) — current and historical product and technical decisions
- [PRD.md](./PRD.md) — product requirements and current product model
- [ROADMAP.md](./ROADMAP.md) — current build roadmap and priorities
- [CLAUDE.md](./CLAUDE.md) — AI and engineering context
- [CONTRIBUTING.md](./CONTRIBUTING.md) — contribution and development guidance
- [content/TEMPLATE.mdx](./content/TEMPLATE.mdx) — module authoring guide

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run the TypeScript check |

A dedicated Content Assurance CLI and GitHub quality gate are planned. They are not yet part of the current repository workflow.

## Structure

```text
app/                    Next.js routes and application pages
components/             UI, layout, and module components
content/
  intro/                Introduction content
  foundations/          Foundation modules
  paths/                Role-path modules
  TEMPLATE.mdx          Module authoring guide
lib/
  foundations/          Foundation registries and loaders
  roles/                Role definitions and role-path metadata
  cabinet/              Cabinet definitions and logic
hooks/                  React hooks
types/                  TypeScript types
cli/                    Python lab/CLI companion
supabase/               Database migrations and configuration
scripts/                Project verification and utility scripts
```

Do not assume older paths such as `content/modules/` or `content/roles/*.json` exist. The repository architecture evolved from the original design.

## Quality and automation direction

Content quality is a first-class product concern. The planned automation sequence is:

1. Content Assurance and deterministic QA
2. GitHub pull-request quality gate
3. Repo-aware Content Copilot
4. Job Role Intelligence
5. Technical Validation
6. Skill/Cabinet intelligence and change-impact automation

Automation is human-approved. It must not autonomously publish or merge content.

## Contributing

CyberPivot is a proprietary paid product and is no longer positioned as an open-source project. See `CONTRIBUTING.md` for the current development and contribution rules. Do not assume that the old public-fork, community-content, or open-source licensing model still applies.

## License

CyberPivot is proprietary software. The exact legal licensing terms are maintained separately from the project decision log and should not be inferred from this README.

---

*Last updated: September 2026*
QA gate test - temporary line.