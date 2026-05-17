# Contributing to CyberPivot

Thank you for helping learners land cybersecurity jobs.

## Before you start

1. Read [PRD.md](./PRD.md) for V1 scope — do not build V2 features (community, job board, threat feed) in V1 PRs.
2. Read [CLAUDE.md](./CLAUDE.md) for stack and conventions.
3. Use **pnpm** only. TypeScript strict, no `any`.

## Content contributions

- All learning content lives in `/content` as **MDX**.
- Copy [content/TEMPLATE.mdx](./content/TEMPLATE.mdx) for new modules.
- **Scenario first**, then hands-on tools, then theory.
- Every module must end with a **cabinet artifact**.

## Code contributions

- shadcn/ui before custom UI.
- Server Components by default; `'use client'` only when needed.
- `loading.tsx` and `error.tsx` for new route segments.
- Supabase: RLS on all tables; never expose the service role key to the client.

## Pull requests

- One focused change per PR when possible.
- Describe what you tested.
- Link related issues if any.

## Good first issues

Look for GitHub issues tagged `good first issue` — often MDX modules, copy, or small UI fixes.
