# CyberPivot — Content Assurance Engine PRD

**Version:** 1.0  
**Status:** Draft for implementation  
**Workstream:** Content Quality and Automation  
**Milestone:** 1 — Content Assurance Engine

---

## 1. Purpose

CyberPivot is moving from manually checking every module to having a repeatable content quality system.

The first automation milestone is a **deterministic Content Assurance Engine**.

It should catch content problems before they reach production. It should make quality checks repeatable. It should give the person writing or reviewing content a clear result and a useful reason when something fails.

The first version must not depend on an AI model.

AI-assisted review comes later, after the deterministic foundation is reliable.

---

## 2. Problem

CyberPivot content is becoming a product rather than a collection of notes.

The current repository already contains six Foundation modules and two OT Security role-path modules. Those modules are useful, but they do not all use an identical structure. Future content will also vary by learning objective and role.

The existing repository has some runtime validation and a few Cabinet-specific verification scripts. It does not yet have a dedicated content QA pipeline.

That creates several risks:

- Broken or incomplete frontmatter can reach production.
- Module references can point to modules that do not exist.
- Slugs and paths can drift apart.
- Links and resource references can become invalid.
- A module can look complete while missing practical work or its intended Cabinet artifact.
- Fictional organisations can be named inconsistently.
- Content can accidentally introduce unsupported claims about tools, products, environments, or technical behaviour.
- A contributor can follow an old template or historical architecture instead of the current repository standard.
- Human reviewers spend time checking mechanical issues instead of reviewing learning quality.

The QA system exists to reduce these problems without pretending that technical accuracy and teaching quality can all be reduced to rules.

---

## 3. Goals

### Primary goals

1. Validate CyberPivot MDX content before publication.
2. Validate frontmatter against the **actual supported content schemas**.
3. Validate references between modules, roles, paths, and Cabinet artifacts.
4. Detect broken or malformed resource links.
5. Detect missing core learning components where they are required by the module type or learning objective.
6. Detect obvious violations of CyberPivot content conventions.
7. Produce actionable results that distinguish deterministic failures from items requiring human review.
8. Make the same checks runnable locally and later in GitHub pull requests.
9. Keep the implementation small enough to maintain alongside the main CyberPivot product.

### Secondary goals

- Create a machine-readable QA result that later automation can consume.
- Establish a stable rule catalogue that AI-assisted content tools can use later.
- Provide a regression suite using the existing Foundation and OT modules.

---

## 4. Non-Goals for V1

The first version will **not**:

- Generate or rewrite content.
- Use an LLM to judge technical accuracy.
- Automatically publish content.
- Automatically merge pull requests.
- Decide whether a module is pedagogically excellent.
- Decide whether a technical claim is factually correct when the claim requires expert interpretation or external research.
- Execute arbitrary labs or security tooling.
- Research current job postings.
- Compare CyberPivot against external curricula.
- Replace human content review.
- Enforce one universal heading structure across every module.
- Require every possible optional section in every module.

These belong to later milestones or human review.

---

## 5. Current Repository Context

The implementation must be based on the repository as it exists now, not the original planning architecture.

### Current content

Foundation modules:

- `content/foundations/how-the-internet-works.mdx`
- `content/foundations/linux-fundamentals.mdx`
- `content/foundations/windows-and-active-directory.mdx`
- `content/foundations/security-fundamentals.mdx`
- `content/foundations/cloud-fundamentals.mdx`
- `content/foundations/python-for-security.mdx`

OT Security role-path modules:

- `content/paths/ot-security/module-01-what-ot-security-is.mdx`
- `content/paths/ot-security/module-02-purdue-model-and-network-architecture.mdx`

Other role-path directories currently contain placeholders rather than completed module libraries.

### Current supporting code

- Foundation registry and loader: `lib/foundations/`
- OT registry and loader: `lib/roles/ot-security/`
- Role definitions: `lib/roles/`
- Cabinet definitions: `lib/cabinet/`
- Content types: `types/`
- Existing Cabinet verification scripts: `scripts/verify-*.ts`

The QA engine must use the existing implementation as evidence of the supported schema rather than assuming the older `content/TEMPLATE.mdx` structure is the runtime schema.

---

## 6. Content Quality Model

The QA system uses three levels of assessment.

### Level 1 — PASS

The rule is satisfied.

### Level 2 — WARNING

Something deserves attention but should not automatically block a merge.

Examples:

- A link could not be checked because the external service was unavailable.
- A module has unusually little hands-on content relative to its stated learning objective.
- A resource is present but needs a human to confirm that it is still appropriate.

### Level 3 — NEEDS HUMAN REVIEW

The system cannot safely make the decision itself.

Examples:

- A technical claim requires expert verification.
- A real-world incident is referenced and the accuracy of the description needs checking.
- A product capability is described in a way that may have changed.
- A module appears to satisfy the structural rules but the exercise may not actually teach the intended skill.

### Hard failure

A deterministic violation that should eventually block a production-bound PR.

Examples:

- Invalid frontmatter.
- Duplicate slug.
- Missing referenced module.
- Malformed internal link.
- Invalid Cabinet artifact metadata.
- Invalid module/path relationship.

The CLI should distinguish **severity** from **confidence**. A hard structural error is not the same thing as an uncertain technical claim.

---

## 7. Rules to Automate

### 7.1 File and MDX validation

The engine should detect:

- Invalid or unreadable MDX files.
- Missing frontmatter where frontmatter is required.
- Malformed YAML/frontmatter.
- Duplicate files that create conflicting module identities where detectable.
- Invalid file naming where a supported naming convention exists.

### 7.2 Frontmatter validation

Validate the actual supported fields for each content family.

Foundation modules currently use fields including:

- `title`
- `slug`
- `module`
- `level`
- `description`
- `readingTime`
- `labTime`
- `tools`
- `cabinetArtifact`

OT role-path modules additionally use role/path metadata such as:

- `roleSlug`
- `pathSlug`

Tool metadata and Cabinet artifact metadata must be validated according to the current TypeScript types and live module examples.

Do not silently add fields simply because they appear useful.

### 7.3 Slugs and references

Validate:

- Slugs are present where required.
- Slugs are unique within their supported namespace.
- `previousModule` references resolve.
- `nextModule` references resolve.
- Role/path references resolve.
- Registry entries correspond to real content files.
- Content files do not exist without the metadata required for the loader to understand them, where such metadata is required.

### 7.4 Link and resource validation

Validate:

- Internal links resolve.
- Relative resource paths resolve.
- URLs are syntactically valid.
- Resource URLs are associated with the correct metadata where the schema requires it.

For external URLs, distinguish:

**URL existence:** the URL can be reached.

from:

**Resource appropriateness:** the linked resource is actually suitable for the learning objective.

The first can be automated. The second requires human or later AI-assisted review.

External network failures should not automatically be treated as broken resources.

### 7.5 Core learning components

The engine should check for evidence of the core CyberPivot content outcomes:

1. Context or scenario.
2. Concepts.
3. Hands-on work where applicable.
4. Job context where applicable.
5. Cabinet artifact where the module is intended to produce one.

The engine must not require exact headings.

For example, these are both valid concepts:

- `## Hands-On Lab`
- `## Section 3 — Hands-On`

The validator should use supported structural signals and content markers rather than a single rigid heading skeleton.

### 7.6 Cabinet artifact validation

Where a module has a Cabinet artifact:

- Frontmatter artifact metadata must be valid.
- Artifact name must be present.
- Artifact description must be present.
- Unlock information must be valid.
- Previous/next artifact relationships must resolve where specified.
- The body should contain evidence of the corresponding portfolio/artifact section.

The system should flag a mismatch between declared artifact metadata and the body rather than assuming the artifact exists simply because frontmatter says it does.

### 7.7 Practical work validation

Where a module is intended to be hands-on, validate that the content contains identifiable practical instructions or tasks.

Possible signals include:

- numbered steps
- task headings
- commands
- configuration examples
- analysis tasks
- reproducible exercises
- tool-specific actions

The validator should not require commands in every lab. Some exercises are analytical rather than command-driven.

### 7.8 Fictional organisation and scenario rules

CyberPivot uses approved fictional organisations in scenarios.

The QA system should eventually maintain a controlled list of approved fictional organisations and detect likely inconsistencies such as:

- misspelled organisation names
- accidental changes to established fictional names
- inconsistent naming within one module
- references to an organisation that has not been approved

This rule should be deterministic where possible.

The engine must not assume that every real organisation reference is invalid. Real incidents are allowed when clearly identified as real-world examples.

### 7.9 Writing conventions

Automate only rules that are reliable.

Initial deterministic checks may include:

- em dash detection, because CyberPivot explicitly does not use em dashes
- obvious placeholder text
- unfinished TODO markers where they should not exist
- common accidental template remnants
- empty sections
- malformed Markdown constructs where detectable

Do not attempt to prove that the writing "sounds human" using simple regex rules. That belongs in later AI-assisted review.

### 7.10 Technical and security-sensitive content

The deterministic engine may detect obvious patterns such as:

- malformed commands
- obviously incomplete code blocks
- placeholder credentials
- suspicious secret-like strings
- invalid URLs
- missing code fences where syntax clearly requires them

It must not claim that a security command, configuration, detection rule, or technical explanation is correct merely because it parses successfully.

Technical correctness is a later human/AI-assisted validation layer.

---

## 8. Rules That Should Remain Human or AI-Assisted

The following should not be treated as deterministic V1 rules:

### Technical accuracy

Does the module accurately explain the technology?

### Real-world claim accuracy

Is the description of an incident, breach, product, framework, regulation, or market fact accurate and current?

### Learning quality

Does the exercise actually teach the intended skill?

### Difficulty calibration

Is the module appropriate for the stated level?

### Redundancy and padding

Does the module repeat material unnecessarily?

### Practitioner realism

Does the job context resemble actual practitioner work?

### Enterprise equivalence

Is the enterprise tool or workflow a reasonable equivalent to the free/open-source track?

### Artifact quality

Does completing the exercise genuinely produce useful evidence of skill?

These are candidates for the later Repo-aware Content Copilot and AI-assisted Content Assurance layer.

---

## 9. CLI Design

The first user-facing interface should be simple.

Proposed command:

```bash
pnpm cyberpivot qa
```

Useful future variants:

```bash
pnpm cyberpivot qa --changed
pnpm cyberpivot qa --file content/foundations/linux-fundamentals.mdx
pnpm cyberpivot qa --json
pnpm cyberpivot qa --strict
```

Only implement the minimum command set needed for the first milestone. Do not build a large CLI framework prematurely.

### Expected terminal output

Example:

```text
CyberPivot Content Assurance

Scanned: 8 modules

PASS     74
WARNING   3
REVIEW    4
FAIL      0

Warnings:
  content/foundations/cloud-fundamentals.mdx
  External URL could not be verified. Network request failed.

Human review:
  content/paths/ot-security/module-02-purdue-model-and-network-architecture.mdx
  Technical claims detected that require expert verification.

Result: PASS WITH REVIEW ITEMS
```

The exact wording can change during implementation.

---

## 10. Machine-Readable Output

The engine should support a structured result format once the core CLI is working.

Minimum conceptual schema:

```json
{
  "status": "pass | warning | review | fail",
  "summary": {
    "filesScanned": 8,
    "passes": 74,
    "warnings": 3,
    "reviews": 4,
    "failures": 0
  },
  "findings": [
    {
      "ruleId": "frontmatter.slug.required",
      "severity": "error",
      "status": "fail",
      "file": "content/example.mdx",
      "message": "Missing required slug field"
    }
  ]
}
```

The implementation should use proper TypeScript types. Do not use `any`.

The exact schema can be refined during implementation, but the result must be stable enough for GitHub integration later.

---

## 11. Rule IDs

Every automated rule should have a stable ID.

Suggested namespaces:

- `file.*`
- `frontmatter.*`
- `slug.*`
- `reference.*`
- `link.*`
- `structure.*`
- `scenario.*`
- `artifact.*`
- `lab.*`
- `style.*`
- `security.*`

Examples:

- `frontmatter.required`
- `frontmatter.slug.required`
- `slug.duplicate`
- `reference.next-module.missing`
- `link.internal.broken`
- `artifact.metadata.incomplete`
- `structure.hands-on.missing`
- `style.em-dash`

Stable rule IDs matter because later GitHub checks and AI agents will need to understand the same findings.

---

## 12. Exit Codes

The CLI should support CI use.

Suggested behaviour:

- `0` = no blocking failures
- `1` = one or more blocking failures
- warnings and human-review findings alone should not fail the first version

A future `--strict` mode may make review findings blocking, but this should not be part of the initial default behaviour.

---

## 13. Baseline and Regression Strategy

The existing eight modules should form the initial regression corpus.

The implementation must run against:

- all six Foundation modules
- both OT Security modules

The goal is not to make the current content pass by creating special exceptions for individual files.

If a current module reveals a genuine schema or rule difference, the rule should model that supported difference explicitly.

The QA engine should not contain file-specific hacks such as:

```text
if file == "module-x.mdx" then ignore rule
```

unless there is a documented, intentional exception with a clear reason.

---

## 14. Testing Requirements

The QA engine itself needs tests.

At minimum:

### Valid fixtures

- valid Foundation module
- valid OT module
- valid module with optional sections
- valid module with different supported heading structures

### Invalid fixtures

- missing frontmatter
- malformed frontmatter
- missing required field
- duplicate slug
- broken module reference
- malformed internal link
- invalid Cabinet artifact
- missing practical work where required
- missing artifact section where required
- em dash
- unfinished placeholder text

### Regression test

Run the engine against the real current content set and confirm the expected baseline.

---

## 15. Proposed Repository Changes

The first implementation should be small.

Likely changes:

```text
package.json
scripts/content-qa.ts
scripts/content-qa/
  rules/
  types/
  utils/
tests/content-qa/
```

The exact structure is an implementation decision after inspecting the current repository.

Do not create a new package or monorepo layer unless the repository actually needs it.

Use the existing TypeScript stack and `pnpm`.

---

## 16. Implementation Sequence

### CP-AUTO-001 — Content Assurance PRD

This document.

### CP-AUTO-002 — Inventory content rules

Extract the actual rules from the current repository, DECISIONS.md, CLAUDE.md, PRD.md, TEMPLATE.mdx, and existing modules.

Deliverable: a rule catalogue showing:

- rule ID
- rule description
- deterministic / AI-assisted / human
- severity
- applicable content types
- evidence source

### CP-AUTO-003 — Classify rules

Confirm which rules belong in V1 deterministic QA and which are deferred.

### CP-AUTO-004 — Define QA output

Freeze the result structure and exit-code behaviour.

### CP-AUTO-005 — Build MDX/frontmatter validator

Start with parsing, schema validation, slugs, references, and basic structure.

### CP-AUTO-006 — Add style and convention rules

Add safe deterministic rules such as em dash detection and placeholder detection.

### CP-AUTO-007 — Add scenario/company rules

Add controlled fictional-company validation.

### CP-AUTO-008 — Add artifact/lab checks

Validate Cabinet metadata and practical-work signals.

### CP-AUTO-009 — Run against the current content set

Fix genuine content/schema problems exposed by the QA engine. Do not weaken the rules simply to get green output.

### CP-AUTO-010 — Prepare GitHub integration

This becomes Milestone 2. The engine should be stable before CI enforcement is added.

---

## 17. Acceptance Criteria for Milestone 1

Milestone 1 is complete when:

- [ ] A developer can run the QA engine locally with one simple command.
- [ ] The engine scans the current Foundation and OT module sets.
- [ ] Frontmatter is validated against supported schemas.
- [ ] Duplicate slugs are detected.
- [ ] Module references are checked.
- [ ] Internal links are checked.
- [ ] External link failures are distinguishable from confirmed broken links.
- [ ] Core learning-component checks exist without requiring one universal module structure.
- [ ] Cabinet artifact metadata is validated.
- [ ] Hands-on content is checked where applicable.
- [ ] Fictional-company conventions have a defined validation approach.
- [ ] Deterministic style checks exist for agreed rules.
- [ ] Findings have stable rule IDs.
- [ ] Findings have severity and actionable messages.
- [ ] Exit codes support future CI use.
- [ ] Tests cover valid and invalid fixtures.
- [ ] The real current content set has a documented baseline.
- [ ] No AI model is required for the first version.
- [ ] No automatic publishing or merging is performed.

---

## 18. Success Measure

The first success measure is not the number of rules.

It is whether the system reliably catches mechanical content defects before human review and reduces the amount of manual checking required.

A good first version should be boring.

If a content author writes a broken slug, missing artifact field, dead internal reference, or unfinished placeholder, the system should catch it immediately and explain what needs fixing.

That is enough for Milestone 1.

---

## 19. Future Extensions

After the deterministic engine is stable:

### Milestone 2 — GitHub Quality Gate

Run QA automatically on pull requests and block defined hard failures.

### Milestone 3 — Repo-aware Content Copilot

Use the repository, rule catalogue, existing modules, and QA findings to help draft and maintain content.

### Milestone 4 — Job Role Intelligence

Research current cybersecurity job postings and identify curriculum gaps.

### Milestone 5 — Technical Validation

Execute selected labs in controlled environments, starting with one Wazuh/SOC scenario.

### Milestone 6 — Skill and Cabinet Intelligence

Map demonstrated work to skills and improve the evidence represented by Cabinet artifacts.

AI should be added only where it provides value that deterministic rules cannot provide.

---

## 20. Decision Principles

1. **Quality before scale.** Build the assurance layer before aggressively increasing content production.
2. **Deterministic before generative.** Catch objective failures before asking AI to judge subjective quality.
3. **Current repository over historical plans.** The implementation must reflect what CyberPivot actually supports today.
4. **Flexible structure, strict outcomes.** Modules can differ in layout, but required learning outcomes still matter.
5. **No hallucinated validation.** The system must not claim technical correctness it cannot establish.
6. **Human approval remains required.** Automation assists review. It does not replace ownership.
7. **Small enough to maintain.** CyberPivot is the product. The automation exists to improve it, not become a second product.
