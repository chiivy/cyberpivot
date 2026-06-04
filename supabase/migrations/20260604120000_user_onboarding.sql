-- user_onboarding: stores onboarding assessment results per user
create extension if not exists "uuid-ossp";

create table if not exists public.user_onboarding (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  q1_background text,
  q2_linux text,
  q3_networking text,
  q4_path_known text,
  entry_point text,
  chosen_path text,
  completed_at timestamptz default now(),
  constraint user_onboarding_user_id_key unique (user_id)
);

alter table public.user_onboarding enable row level security;

create policy "Users can read own onboarding"
  on public.user_onboarding
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own onboarding"
  on public.user_onboarding
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own onboarding"
  on public.user_onboarding
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own onboarding"
  on public.user_onboarding
  for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists user_onboarding_user_id_idx on public.user_onboarding (user_id);
