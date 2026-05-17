# CyberPivot

Free, open source, lifecycle-based cybersecurity learning. **Start where you are.**

Build real skills, a real home lab, and a real portfolio — not passive courses.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (Auth, PostgreSQL, Realtime)
- [pnpm](https://pnpm.io/)

## Getting started

```bash
pnpm install
cp .env.example .env.local
# Add Supabase URL and anon key to .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project docs

- [PRD.md](./PRD.md) — product requirements (single source of truth for V1)
- [CLAUDE.md](./CLAUDE.md) — AI / contributor context
- [.cursorrules](./.cursorrules) — Cursor conventions

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start dev server         |
| `pnpm build`   | Production build         |
| `pnpm lint`    | ESLint                   |
| `pnpm typecheck` | TypeScript check       |

## Structure

```
app/           Next.js routes (marketing, auth, dashboard, api)
components/    UI (shadcn), layout, modules
content/       MDX modules and labs
lib/           Utilities and Supabase clients
hooks/         React hooks
types/         TypeScript types (incl. generated Supabase types)
cli/           Python lab companion
supabase/      Migrations and DB config
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Content contributions are MDX pull requests under `/content`.

## License

Open source — see repository license file when added.
