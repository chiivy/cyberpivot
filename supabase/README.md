# Supabase

Database migrations and local development config.

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli)
2. Run `supabase init` if you need a full local stack (or link an existing project)
3. Add credentials to `.env` from `.env.example`
4. Generate types: `supabase gen types typescript --local > types/supabase.ts`

Migrations go in `migrations/`. Enable RLS on every table.
