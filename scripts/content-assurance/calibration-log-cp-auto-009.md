# CP-AUTO-009 Calibration Log

**Date:** 2026-09-30  
**Baseline artifact:** `scripts/content-assurance/calibration-baseline-cp-auto-009.json`  
**Live corpus:** 6 Foundation + 2 OT modules

---

## Baseline result

| Field | Value |
|---|---|
| status | PASS |
| filesChecked | 8 |
| modulesChecked | 8 |
| PASS | 355 |
| WARNING | 0 |
| NEEDS_HUMAN_REVIEW | 0 |
| FAIL | 0 |
| exitCode | 0 |
| actionable findings | 0 |

Classification of live baseline: **no actionable findings to review**. All live modules accepted as structurally valid reference corpus.

---

## Per-module calibration (production)

| Module | Frontmatter | Style | Scenario | Lab/Cabinet | Overall | Decision |
|---|---|---|---|---|---|---|
| how-the-internet-works | PASS | PASS | PASS | PASS | PASS | Accept |
| linux-fundamentals | PASS | PASS | PASS | PASS | PASS | Accept |
| windows-and-active-directory | PASS | PASS | PASS | PASS | PASS | Accept |
| security-fundamentals | PASS | PASS | PASS | PASS | PASS | Accept |
| cloud-fundamentals | PASS | PASS | PASS | PASS | PASS | Accept |
| python-for-security | PASS | PASS | PASS | PASS | PASS | Accept |
| module-01-what-ot-security-is | PASS | PASS | PASS | PASS | PASS | Accept |
| module-02-purdue-model-and-network-architecture | PASS | PASS | PASS | PASS | PASS | Accept |

Foundation structural variance (Before You Start / Scenario order / Portfolio Entry numbering) accepted. OT Section 3–5 structure accepted. No Foundation rules applied to OT.

---

## Findings reviewed during calibration

| Finding / behavior | Rule | Validator | Classification | Root cause | Resolution | Regression |
|---|---|---|---|---|---|---|
| Sparse temp fixture roots FAIL with many `CP-CONSIST-002` missing-mdx | CP-CONSIST-002 | consistency | Implementation bug / cascading noise | Registry completeness always compared TypeScript indexes to whatever `rootDir` contained, including sandbox fixture trees | Enforce missing-mdx only when the inspected tree already has ≥1 registry-aligned module for that family | `calibrate-cp-auto-009.ts` sparse + partial-corpus cases |
| Sparse Foundation-only sandboxes WARN for missing OT role MDX | CP-CONSIST-003 | consistency | Implementation bug / cascading noise | Role→MDX completeness always ran against live role metadata | Skip OT role completeness on Foundation-only fixture sandboxes; keep it for full/partial corpus | Covered by warning-only / human-review exit sandboxes |
| Missing `cabinetArtifact` emits both CP-FM-014 and CP-CAB-001 | CP-FM-014 / CP-CAB-001 | frontmatter + cabinet | Intentional/acceptable | Dual rule namespaces from CP-AUTO-005 and CP-AUTO-008 | Keep; child-field cascade still suppressed | Missing-artifact fixture asserts |
| Malformed `cabinetArtifact` string does not emit CAB-002/003/004 | CP-CAB-001 | cabinet | True positive / intentional | Cascade guard | Keep | Malformed artifact fixture |
| Unparseable frontmatter only emits CP-FILE-003 for that file | CP-FILE-003 | file-integrity | True positive / intentional | Runner skips dependent validators | Keep; also no sparse-registry cascade after fix | Malformed-frontmatter temp root |
| Em dash locations land on U+2014 | CP-STYLE-004 | style | True positive | Column-accurate scan | Keep | style-em-dash-prose |
| Hyphen / en dash not flagged | CP-STYLE-004 | style | True negative / intentional | Only U+2014 | Keep | style-hyphen-only, style-en-dash-only |
| Quorivane Banck typo → WARNING | CP-SCEN-001 | scenario | True positive | Deterministic typo heuristic | Keep | calibration-warning-only |
| Quorivane Financial → NEEDS_HUMAN_REVIEW | CP-SCEN-001 | scenario | True positive / intentional | Ambiguous org-suffix form | Keep | calibration-human-review |
| Delvara Energy vs Velorin Energy remain distinct | CP-SCEN-001 | scenario | True negative / intentional | No aliasing | Keep | scenario-energy-distinct |
| Vendors/tools not treated as fictional companies | CP-SCEN-001 | scenario | True negative / intentional | Allowlist / non-match | Keep | scenario-vendor-generic |
| Invalid nextModule → FAIL CP-FOUND-008 | CP-FOUND-008 | cabinet | True positive | In-family resolution | Keep | lab-cabinet-invalid-next |
| OT previousModule unresolved → FAIL CP-OT-008 | CP-OT-008 | cabinet | True positive | In-family resolution | Keep | lab-cabinet-invalid-previous-ot |
| CP-CAB-005 / CP-CAB-006 / CP-OT-007 / CP-SCEN-002 / CP-SCEN-003 silent | various | n/a | Intentional/acceptable | Semantic / later | Do not emit deterministic findings | Live deferred-rule assert |
| Duplicate PASS findings for overlapping FM/CAB metadata on clean modules | CP-FM-014..016 + CP-CAB-001..003 | frontmatter + cabinet | Intentional/acceptable | Dual coverage | Keep for rule-ID traceability | Live PASS counts |

---

## False positives

1. **Registry completeness on sparse fixture roots (fixed).** Would have been false positives relative to sandbox intent.
2. **OT role completeness on Foundation-only sandboxes (fixed).** Same class.

No remaining live-content false positives.

## False negatives

Controlled fixtures continue to detect:

- missing/malformed frontmatter
- empty title / missing slug / bad types / bad tools
- em dashes
- company typos / ambiguous forms
- missing/malformed cabinet metadata
- missing hands-on / cabinet sections
- invalid previous/next / self-ref / unlock

No additional false negatives found against the current deterministic rule set.

## Exit codes

| Case | Expected | Observed |
|---|---|---|
| Clean live run | 0 | 0 |
| Warning-only sandbox | 0 | 0 |
| Human-review-only sandbox | 0 | 0 |
| Blocking FAIL sandbox | 1 | 1 |
| Execution/configuration failure | 2 | 2 |

## Output contract

CP-AUTO-004 fields verified on live JSON and sandbox runs: `version`, `status`, `scope`, `summary`, `findings`, `exitCode`, and per-finding required keys including deterministic `source`.

## Production content issues

None requiring content edits. QA is green on the live corpus without modifying production modules for this ticket.

## Deferred (not bugs)

- Semantic lab/artifact quality (CP-CAB-005/006, CP-OT-007)
- Real-incident factuality (CP-SCEN-002/003)
- Exact artifact-name wording beyond structural CAB-007
