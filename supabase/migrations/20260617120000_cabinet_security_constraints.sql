-- Enforce absolute http/https URLs with a real domain name on cabinet artifact links

alter table public.cabinet_artifacts
  drop constraint if exists cabinet_artifacts_link_url_format;

-- Clear invalid links saved before stricter validation existed
-- (relative paths, scheme-only strings, localhost, missing domain dot, etc.)
update public.cabinet_artifacts
set
  link_url = null,
  updated_at = now()
where link_url is not null
  and (
    link_url !~ '^https?://[^/[:space:]@]+(\.[^/[:space:]@]+)+'
    or length(link_url) > 2048
    or link_url ~ '[[:space:]]'
  );

alter table public.cabinet_artifacts
  add constraint cabinet_artifacts_link_url_format
  check (
    link_url is null
    or (
      link_url ~ '^https?://[^/[:space:]@]+(\.[^/[:space:]@]+)+'
      and length(link_url) <= 2048
      and link_url !~ '[[:space:]]'
    )
  );
