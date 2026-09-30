# Working with CyberPivot

CyberPivot is a proprietary paid cybersecurity learning platform. The Foundation layer is intentionally free and ungated, while role-path content and the Cabinet experience are part of the paid product unless explicitly marked otherwise.

This repository is maintained as the source of truth for the product. Contributions, content changes, and automation changes are accepted only where they fit the current product direction and maintainers' priorities.

## Before making a change

Read these documents in order when the change affects product, content, or architecture:

1. [DECISIONS.md](./DECISIONS.md) — current decisions and their reasoning
2. [PRD.md](./PRD.md) — product requirements
3. [CLAUDE.md](./CLAUDE.md) — engineering and content context
4. [ROADMAP.md](./ROADMAP.md) — current priorities and planned work
5. [content/TEMPLATE.mdx](./content/TEMPLATE.mdx) — module authoring guidance

If documents conflict, follow the current decision recorded in `DECISIONS.md` and confirm with the maintainer when the conflict is not clearly resolved.

## What can be proposed

Useful contributions may include:

- Bug fixes
- Security fixes
- Accessibility improvements
- Performance improvements
- Tests and validation tooling
- Content quality tooling and automation
- Documentation corrections
- Research or verified data that supports an existing product need

New product features, new role paths, major content areas, and changes to the learning architecture should be discussed before implementation.

## Content contributions

CyberPivot content is part of the product and is not treated as open community content by default.

Do not add or modify learning content simply because it appears technically useful. Content changes must fit the current curriculum, product model, and quality standards.

For approved content work:

- Use MDX where the repository expects MDX.
- Follow the live module structures rather than assuming every module has identical headings.
- Use [content/TEMPLATE.mdx](./content/TEMPLATE.mdx) as authoring guidance, not as a rigid universal schema.
- Keep the learner in a second-person, in-role narrative.
- Ground concepts in real-world relevance, job context, and hands-on work.
- Include a meaningful Cabinet artifact where the module requires one.
- Do not invent tools, URLs, lab environments, enterprise products, or technical behaviour.
- Flag technical uncertainty for human review rather than presenting it as fact.

Foundation and role-path modules may use different supported structures. Do not refactor existing content merely to make it match another module unless that change has been explicitly approved.

## Security and technical changes

Security-sensitive changes require particular care. At minimum:

- Do not commit secrets, credentials, tokens, or private keys.
- Do not weaken authentication, authorization, RLS, validation, or security headers to make a feature easier to implement.
- Follow the security requirements in `CLAUDE.md`.
- Run the relevant checks before submitting a change.
- Explain security implications in the pull request when a change affects authentication, authorization, data access, infrastructure, or security tooling.

## Data and market information

If proposing updates to salary, certification, job-market, regulatory, or other time-sensitive information, provide the source and date. Do not present old or unverified figures as current.

## Automation changes

CyberPivot is introducing automation to improve content quality, production speed, maintenance, and technical validation.

Automation must remain human-approved. Do not build workflows that autonomously publish content, merge pull requests, or make unreviewed product decisions.

For automation work, document:

- What problem the automation solves
- What inputs it can access
- What it is allowed to change
- What it must never change
- What output it produces
- Where human approval is required
- How failures are surfaced

The Content Assurance system is the first priority. Do not build an AI content-generation system before the deterministic quality foundation is in place.

## Local development

Use the package manager and commands defined by the repository. Do not introduce an alternative package manager or tooling convention without approval.

At minimum, run the relevant checks for your change, such as:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

For content, Content Assurance, or QA-engine changes, also run:

```bash
pnpm cyberpivot qa
pnpm test:content-assurance
```

CI runs the same Content QA command on relevant pull requests via the
`cyberpivot-content-qa` GitHub check (workflow:
`.github/workflows/cyberpivot-content-qa.yml`).

To require that gate before merge, add branch protection for the check named:

```text
cyberpivot-content-qa
```

That check blocks only deterministic HARD failures. Warnings and human-review
findings remain visible but non-blocking. The workflow does not edit content,
commit, approve, or merge pull requests.

## Pull requests

For approved changes:

1. Create a focused branch.
2. Make the smallest change that solves the stated problem.
3. Run the relevant checks.
4. Explain what changed and why.
5. Include testing performed and any known limitations.
6. Call out changes that affect product behaviour, content standards, security, or data.

Keep pull requests focused. Avoid bundling unrelated refactors with feature or content changes.

All changes require maintainer review before merge. AI-generated changes receive the same review requirement as manually written changes.

## Questions and proposals

For work that is not already represented in the roadmap or an existing issue, raise the proposal with the maintainer before implementation. Include the problem, proposed approach, expected benefit, and any relevant trade-offs.

## Conduct

Be direct, honest, and respectful. CyberPivot exists to help people build practical cybersecurity skills. Technical disagreement is expected; personal attacks and behaviour that undermines the project are not.

---

*Last updated: September 2026*
