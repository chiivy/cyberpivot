-- Cabinet artifact summaries: trimmed, non-empty when set, max 500 characters

alter table public.cabinet_artifacts
  drop constraint if exists cabinet_artifacts_summary_format;

update public.cabinet_artifacts
set
  summary = null,
  updated_at = now()
where summary is not null
  and (
    trim(summary) = ''
    or length(trim(summary)) > 500
  );

update public.cabinet_artifacts
set
  summary = trim(summary),
  updated_at = now()
where summary is not null
  and summary <> trim(summary);

alter table public.cabinet_artifacts
  add constraint cabinet_artifacts_summary_format
  check (
    summary is null
    or (
      summary = trim(summary)
      and length(summary) > 0
      and length(summary) <= 500
    )
  );
