# CyberPivot — Pre-Launch and Later Checklist

This is a living list of small operational items that need to happen before public launch, or things flagged "do later" during a build session. Unlike DECISIONS.md (why we chose things) or ROADMAP.md (what features are coming), this file tracks loose threads that are easy to forget between sessions.

Add to this file the moment something is flagged as "later." Remove items once they are done, noting the date.

---

## Before Public Launch — Auth and Domains

- [ ] Update Google Cloud Console OAuth credentials — add production domain to Authorized redirect URIs (currently only `http://localhost:3000` and the Supabase callback are configured)
- [ ] Update GitHub OAuth App — change Homepage URL from `http://localhost:3000` to production domain, add production callback if needed
- [ ] Update Supabase Authentication → URL Configuration — change Site URL from `http://localhost:3000` to production domain, update Redirect URLs accordingly
- [ ] Confirm Google sign-in screen shows "CyberPivot" cleanly rather than just the raw Supabase project URL once custom domain is live — may resolve automatically once a custom domain replaces the Supabase default domain in the OAuth flow
- [ ] MFA (TOTP) enabled at the Supabase backend level. No optional/required enforcement setting was found in the dashboard — confirm whether Supabase enforces this automatically once enabled, or whether enforcement needs to be handled in app logic
- [ ] Build MFA enrollment UI in account settings so users can actually set up TOTP — backend is enabled but there is no frontend flow for users to add this yet. Hold off until there is a real user base; not urgent for solo testing.

**Quick wins, resolved this session rather than deferred:**
- [x] GitHub no-reply email confirmed properly set under Settings → Emails, "Keep my email addresses private" is enabled
- [x] Supabase password policy checked and explicitly set to a minimum of 8 characters server-side, matching what the signup form claims

## Before Public Launch — Legal and Licensing

- [ ] Finalise LICENSE — decide between MIT (code) + CC BY-NC 4.0 (content) as drafted in DECISIONS.md, or a different approach. Currently a placeholder saying "licensing terms being finalised."
- [ ] Once licence is finalised, restore the content contribution sections to CONTRIBUTING.md (Topic Library entries, Module content, Content Standards, Content Template) — these were deliberately removed until licensing is decided
- [ ] Decide whether to squash/clean early git history before public launch (optional — early commits show "cursoragent" as co-author, which is not a security issue but could be tidied for a clean public launch narrative). Low priority, not required.

## Before Public Launch — Infrastructure

- [ ] Deploy to Vercel production
- [ ] Set up production Supabase project (currently using a single project for dev — decide if dev/prod should be separated)
- [ ] Custom domain purchase and DNS configuration
- [ ] Re-test full onboarding → account creation → dashboard flow end to end on production domain
- [ ] Re-test Google and GitHub sign-in end to end on production domain

## Cabinet — Deferred Polish

Built this session: full data model (module_completions, cabinet_artifacts tables with RLS), private cabinet view at /cabinet, public shareable cabinet page, mark-as-complete flow requiring an account, Open Graph meta tags with a static fallback image, and a real layout pass on the public page designed for strangers viewing it, not reused dashboard styling.

- [ ] Dynamic, per-user generated preview image for the public cabinet page (e.g. an auto-rendered card showing name and artifact count) — deliberately deferred since this is a standalone feature with its own design problem, and it improves meaningfully once there is more content across multiple modules or role paths to actually showcase. A single well-designed static fallback image is in place in the meantime.

## Content and Platform — Not Yet Built

- [ ] Foundation Modules 2 through 6 (Linux, Windows/AD, Security Fundamentals, Cloud Fundamentals, Python)
- [ ] Resources section on dashboard — podcasts, communities, blogs (content identified in DECISIONS.md, not yet built). Nigerian/African cybersecurity podcast voices still need research.
- [x] Progress tracking and cabinet unlock logic wired to Supabase — resolved this session, real module_completions and cabinet_artifacts tables now back the cabinet for Foundation Modules 1 and 2. Extend to each new module and to role paths as they are built.
- [ ] First full role path content (SOC Analyst — 13 modules per DECISIONS.md)
- [ ] CV builder and interview prep tools — not started
- [ ] Certification roadmap pages per role — not started

## Open Questions — Revisit Later

- [ ] Multi-path support UX — the data model (content_area + module_slug per completion) already structurally supports a user completing modules across more than one role path with no schema change needed. What is missing is dashboard and cabinet UI design for this: should a user be able to actively pursue more than one path at once, how should the dashboard represent "primary path" versus others if at all, and how should the cabinet group artifacts across multiple paths once role paths exist. Deliberately not solved now, since it touches onboarding and dashboard design more than the cabinet bug-fix work done this session. Revisit once at least one full role path exists and this becomes a real scenario rather than a hypothetical.
- [ ] Business model execution — when to introduce premium features (AI CV builder, mock interview AI, verified certification) per DECISIONS.md strategy. Not before the platform has content depth and reputation.
- [ ] Employer partnership outreach — when the platform has enough real content and early users to make this credible (per DECISIONS.md employer partnership model, Nigerian banks/fintechs flagged as priority targets)
- [ ] Whether to add South Africa and Kenya salary data as separate rows once verified data is sourced (currently only Nigeria has verified African market data, deliberately not generalised to "Africa")

## Cabinet — Security and Trust Hardening (this session)

Several real issues were caught through manual testing of the cabinet feature and fixed in the same session: public share slugs decoupled from real names (random unique slugs instead, avoiding both collisions and forced identity exposure in URLs), link_url validation added (must be a real absolute http/https URL, previously producing broken relative-path links), explicit XSS verification performed on the public-facing summary field, clearer visual distinction added between "not started yet, available now" and "module not built yet" locked cabinet cards, persistent dashboard/cabinet navigation added so it does not rely solely on the header dropdown, account deletion added, and the ability to reset a single completed module added. Worth remembering as a pattern going forward: any user-generated content rendered on a page viewable by people other than its author (the public cabinet being the first example) needs this same level of scrutiny applied by default, not as an afterthought caught during testing.

---

*When in doubt about whether something belongs here or in DECISIONS.md: DECISIONS.md is for "why we chose X." This file is for "we still need to do Y." Update this file every session before ending it.*
