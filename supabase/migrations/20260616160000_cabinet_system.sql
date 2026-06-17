-- Cabinet system: module completions, artifacts, profiles, and public share view

create extension if not exists "pgcrypto";

-- Stable public username for shareable cabinet URLs
create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cabinet_username text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_profiles_cabinet_username_key unique (cabinet_username),
  constraint user_profiles_cabinet_username_format check (
    cabinet_username ~ '^[a-z0-9]([a-z0-9-]{0,28}[a-z0-9])?$'
  )
);

create index if not exists user_profiles_cabinet_username_idx
  on public.user_profiles (cabinet_username);

alter table public.user_profiles enable row level security;

create policy "Users can read own profile"
  on public.user_profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.user_profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Module completion records
create table if not exists public.module_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content_area text not null,
  module_slug text not null,
  completed_at timestamptz not null default now(),
  constraint module_completions_user_content_module_key
    unique (user_id, content_area, module_slug)
);

create index if not exists module_completions_user_id_idx
  on public.module_completions (user_id);

alter table public.module_completions enable row level security;

create policy "Users can read own module completions"
  on public.module_completions
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own module completions"
  on public.module_completions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own module completions"
  on public.module_completions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own module completions"
  on public.module_completions
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Cabinet artifacts unlocked by module completion
create table if not exists public.cabinet_artifacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content_area text not null,
  module_slug text not null,
  artifact_name text not null,
  summary text,
  link_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cabinet_artifacts_user_content_module_key
    unique (user_id, content_area, module_slug)
);

create index if not exists cabinet_artifacts_user_id_idx
  on public.cabinet_artifacts (user_id);

alter table public.cabinet_artifacts enable row level security;

create policy "Users can read own cabinet artifacts"
  on public.cabinet_artifacts
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own cabinet artifacts"
  on public.cabinet_artifacts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own cabinet artifacts"
  on public.cabinet_artifacts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own cabinet artifacts"
  on public.cabinet_artifacts
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Public read-only view for shareable cabinets (no internal identifiers)
create or replace view public.public_cabinet_artifacts as
select
  up.cabinet_username,
  up.display_name,
  ca.content_area,
  ca.module_slug,
  ca.artifact_name,
  ca.summary,
  ca.link_url,
  ca.created_at
from public.cabinet_artifacts ca
inner join public.user_profiles up on up.user_id = ca.user_id;

grant select on public.public_cabinet_artifacts to anon;
grant select on public.public_cabinet_artifacts to authenticated;
