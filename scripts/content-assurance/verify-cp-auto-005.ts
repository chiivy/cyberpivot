import fs from "fs";
import os from "os";
import path from "path";

import { parseModuleFrontmatter } from "@/lib/content-assurance/parse-frontmatter";
import {
  runContentAssurance,
  runContentAssuranceDetailed,
} from "@/lib/content-assurance/run-qa";
import {
  buildSnapshot,
  validateNavigationConsistency,
} from "@/lib/content-assurance/validate-consistency";
import {
  validateFamilyRules,
  validateFrontmatterFields,
  validatePathConsistency,
} from "@/lib/content-assurance/validate-frontmatter";
import {
  EM_DASH,
  findEmDashOccurrences,
  validateNoEmDash,
} from "@/lib/content-assurance/validate-style";
import { validateScenarioCompanies } from "@/lib/content-assurance/validate-scenario";
import { validateLabCabinetArtifact } from "@/lib/content-assurance/validate-lab-cabinet";
import type { DiscoveredModule, QaFinding } from "@/lib/content-assurance/types";
import { runCpAuto009Calibration } from "@/scripts/content-assurance/calibrate-cp-auto-009";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function foundationModule(relativePath: string, absolutePath: string): DiscoveredModule {
  return {
    absolutePath,
    relativePath,
    family: "foundation",
    fileSlug: path.basename(relativePath, ".mdx"),
  };
}

function otModule(relativePath: string, absolutePath: string): DiscoveredModule {
  return {
    absolutePath,
    relativePath,
    family: "ot-security",
    fileSlug: path.basename(relativePath, ".mdx"),
  };
}

function fixturePath(name: string): string {
  return path.join(
    process.cwd(),
    "scripts",
    "content-assurance",
    "fixtures",
    name,
  );
}

function main(): void {
  const repoRoot = process.cwd();

  // 1) Clean repository run
  const live = runContentAssurance({ rootDir: repoRoot });
  assert(live.scope.filesChecked === 8, `Expected 8 live modules, got ${live.scope.filesChecked}`);
  assert(
    live.exitCode === 0 || live.exitCode === 1,
    `Unexpected live exit code ${live.exitCode}`,
  );
  console.log(
    `Live content QA: status=${live.status} pass=${live.summary.pass} fail=${live.summary.fail} warnings=${live.summary.warning}`,
  );

  // 2) Missing frontmatter
  {
    const absolutePath = fixturePath("missing-frontmatter.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(!parsed.ok, "Expected missing frontmatter to fail parse");
  }

  // 3) Malformed frontmatter — including repeated parses in one process
  {
    const absolutePath = fixturePath("malformed-frontmatter.mdx");
    const first = parseModuleFrontmatter(absolutePath);
    const second = parseModuleFrontmatter(absolutePath);
    assert(!first.ok, "Expected malformed frontmatter to fail parse (first call)");
    assert(
      !second.ok,
      "Expected malformed frontmatter to fail parse (second call; no silent empty data)",
    );
  }

  // 4) Empty title
  {
    const absolutePath = fixturePath("empty-title.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "empty-title fixture should parse");
    if (parsed.ok) {
      const module = foundationModule(
        "content/foundations/empty-title.mdx",
        absolutePath,
      );
      const findings = validateFrontmatterFields({
        module,
        parsed: parsed.parsed,
        familySlugs: new Set(["empty-title"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-006" && finding.status === "FAIL",
        ),
        "Expected CP-FM-006 FAIL for empty title",
      );
    }
  }

  // 5) Missing slug
  {
    const absolutePath = fixturePath("missing-slug.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing-slug fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/missing-slug.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-003" && finding.status === "FAIL",
        ),
        "Expected CP-FM-003 FAIL for missing slug",
      );
    }
  }

  // 6) Wrong types / string tools / string cabinetArtifact
  {
    const absolutePath = fixturePath("wrong-types.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "wrong-types fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/wrong-types.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["wrong-types"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-005" && finding.status === "FAIL",
        ),
        "Expected CP-FM-005 FAIL for non-integer module",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-008" && finding.status === "FAIL",
        ),
        "Expected CP-FM-008 FAIL for numeric readingTime",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-010" && finding.status === "FAIL",
        ),
        "Expected CP-FM-010 FAIL for string tools",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-014" && finding.status === "FAIL",
        ),
        "Expected CP-FM-014 FAIL for string cabinetArtifact",
      );
    }
  }

  // 7) Bad tools structure / URL / type
  {
    const absolutePath = fixturePath("bad-tools.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "bad-tools fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/bad-tools.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["bad-tools"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-010" && finding.status === "FAIL",
        ),
        "Expected CP-FM-010 FAIL for string tool entry",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-011" && finding.status === "FAIL",
        ),
        "Expected CP-FM-011 FAIL for empty name / invalid type",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-012" && finding.status === "FAIL",
        ),
        "Expected CP-FM-012 FAIL for invalid URL",
      );
    }
  }

  // 8) Self-reference
  {
    const absolutePath = fixturePath("self-ref.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "self-ref fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/self-ref.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["self-ref"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-019" && finding.status === "FAIL",
        ),
        "Expected CP-FM-019 FAIL for self-reference",
      );
    }
  }

  // 9) Broken internal nextModule
  {
    const absolutePath = fixturePath("broken-nav.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "broken-nav fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/broken-nav.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["broken-nav"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-018" && finding.status === "FAIL",
        ),
        "Expected CP-FM-018 FAIL for unresolved nextModule",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-CONSIST-004" && finding.status === "FAIL",
        ),
        "Expected CP-CONSIST-004 FAIL for broken internal reference",
      );
    }
  }

  // 10) Family classification for OT path
  {
    const otModule: DiscoveredModule = {
      absolutePath: path.join(
        repoRoot,
        "content/paths/ot-security/module-01-what-ot-security-is.mdx",
      ),
      relativePath: "content/paths/ot-security/module-01-what-ot-security-is.mdx",
      family: "ot-security",
      fileSlug: "module-01-what-ot-security-is",
    };
    const familyFindings = validateFamilyRules(otModule);
    assert(
      familyFindings.some(
        (finding) =>
          finding.ruleId === "CP-FAMILY-002" && finding.status === "PASS",
      ),
      "Expected CP-FAMILY-002 PASS for OT module",
    );
    assert(
      familyFindings.some(
        (finding) =>
          finding.ruleId === "CP-FAMILY-003" && finding.status === "PASS",
      ),
      "Expected CP-FAMILY-003 PASS for OT module",
    );
  }

  // 11) Unreadable / nonexistent file handling
  {
    const parsed = parseModuleFrontmatter(
      path.join(os.tmpdir(), "cyberpivot-does-not-exist.mdx"),
    );
    assert(!parsed.ok, "Expected nonexistent file parse to fail");
  }

  // 12) Duplicate slug detection via temporary mini content tree
  {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cp-qa-"));
    try {
      const foundations = path.join(tempRoot, "content", "foundations");
      fs.mkdirSync(foundations, { recursive: true });
      fs.mkdirSync(path.join(tempRoot, "content", "paths"), { recursive: true });

      const body = `---
title: "Dup A"
slug: "duplicate-slug"
module: 1
level: "Foundation"
description: "A"
readingTime: "1 min"
labTime: "1 min"
tools:
  - name: "Wireshark"
    type: "free"
cabinetArtifact:
  name: "A"
  description: "A"
  unlocksOn: "completion"
nextModule: null
---

## Scenario

A.
`;
      fs.writeFileSync(path.join(foundations, "dup-a.mdx"), body);
      fs.writeFileSync(
        path.join(foundations, "dup-b.mdx"),
        body.replace('title: "Dup A"', 'title: "Dup B"').replace(
          'description: "A"',
          'description: "B"',
        ),
      );

      // Registry consistency will fail because these slugs are not in the live index.
      // That is expected for an isolated tree. We only assert duplicate slug detection.
      const result = runContentAssurance({ rootDir: tempRoot });
      assert(
        result.findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-004" && finding.status === "FAIL",
        ),
        "Expected CP-FM-004 FAIL for duplicate slugs in temp tree",
      );
      assert(result.exitCode === 1, "Expected exit code 1 for blocking FAIL findings");
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  }

  // 13) Cascading failure resistance: malformed frontmatter must not flood FM findings
  {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cp-qa-cascade-"));
    try {
      const foundations = path.join(tempRoot, "content", "foundations");
      fs.mkdirSync(foundations, { recursive: true });
      fs.mkdirSync(path.join(tempRoot, "content", "paths"), { recursive: true });
      const relativePath = "content/foundations/cascade-malformed.mdx";
      fs.copyFileSync(
        fixturePath("malformed-frontmatter.mdx"),
        path.join(foundations, "cascade-malformed.mdx"),
      );
      const copiedAbsolute = path.join(foundations, "cascade-malformed.mdx");
      const copiedParse = parseModuleFrontmatter(copiedAbsolute);
      assert(
        !copiedParse.ok,
        `Expected copied malformed fixture to fail parse, got ${JSON.stringify(copiedParse)}`,
      );

      const { result, allFindings } = runContentAssuranceDetailed({
        rootDir: tempRoot,
      });
      const fileFindings = allFindings.filter(
        (finding) => finding.file === relativePath,
      );
      const failFindings = fileFindings.filter(
        (finding) => finding.status === "FAIL",
      );
      assert(
        failFindings.length === 1,
        `Expected exactly 1 FAIL for malformed file, got ${failFindings.length}: ${JSON.stringify(failFindings.map((finding) => ({ ruleId: finding.ruleId, file: finding.file, status: finding.status })))}`,
      );
      assert(
        failFindings[0]?.ruleId === "CP-FILE-003",
        "Expected only CP-FILE-003 FAIL for malformed frontmatter",
      );
      assert(
        !failFindings.some((finding) => finding.ruleId.startsWith("CP-FM-")),
        "Malformed frontmatter must not emit dependent CP-FM FAIL findings",
      );
      assert(result.exitCode === 1, "Expected exit code 1 for malformed content");
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  }

  // 14) CP-FM-002 OT required metadata
  {
    const absolutePath = fixturePath("missing-ot-metadata.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing-ot-metadata fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: otModule(
          "content/paths/ot-security/missing-ot-metadata.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["missing-ot-metadata"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-002" && finding.status === "FAIL",
        ),
        "Expected CP-FM-002 FAIL when roleSlug/pathSlug are missing",
      );
    }
  }

  // 15) CP-CONSIST-001 slug vs filename
  {
    const absolutePath = fixturePath("slug-mismatch.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "slug-mismatch fixture should parse");
    if (parsed.ok) {
      const discovered = foundationModule(
        "content/foundations/slug-mismatch.mdx",
        absolutePath,
      );
      const findings = validatePathConsistency({
        module: discovered,
        parsed: parsed.parsed,
        familySlugs: new Set(["not-the-filename"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-CONSIST-001" && finding.status === "FAIL",
        ),
        "Expected CP-CONSIST-001 FAIL for slug/filename mismatch",
      );
    }
  }

  // 16) CP-FM-015 / CP-FM-016 empty cabinet fields
  {
    const absolutePath = fixturePath("empty-cabinet-fields.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "empty-cabinet-fields fixture should parse");
    if (parsed.ok) {
      const findings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/empty-cabinet-fields.mdx",
          absolutePath,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["empty-cabinet-fields"]),
      });
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-015" && finding.status === "FAIL",
        ),
        "Expected CP-FM-015 FAIL for empty cabinetArtifact.name",
      );
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-016" && finding.status === "FAIL",
        ),
        "Expected CP-FM-016 FAIL for empty cabinetArtifact.description",
      );
    }
  }

  // 17) CP-FM-021 distinguishes explicit null from omitted nextModule
  {
    const terminalPath = fixturePath("terminal-null.mdx");
    const omittedPath = fixturePath("missing-next-module.mdx");
    const terminalParsed = parseModuleFrontmatter(terminalPath);
    const omittedParsed = parseModuleFrontmatter(omittedPath);
    assert(terminalParsed.ok, "terminal-null fixture should parse");
    assert(omittedParsed.ok, "missing-next-module fixture should parse");
    if (terminalParsed.ok && omittedParsed.ok) {
      const terminalFindings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/terminal-null.mdx",
          terminalPath,
        ),
        parsed: terminalParsed.parsed,
        familySlugs: new Set(["terminal-null"]),
      });
      const omittedFindings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/missing-next-module.mdx",
          omittedPath,
        ),
        parsed: omittedParsed.parsed,
        familySlugs: new Set(["missing-next-module"]),
      });
      assert(
        terminalFindings.some(
          (finding) =>
            finding.ruleId === "CP-FM-021" && finding.status === "PASS",
        ),
        "Expected CP-FM-021 PASS for explicit nextModule: null",
      );
      assert(
        !omittedFindings.some((finding) => finding.ruleId === "CP-FM-021"),
        "Omitted nextModule must not be treated as CP-FM-021 null terminal marker",
      );
    }
  }

  // 18) CP-FM-020 navigation contradiction
  {
    const aPath = fixturePath("nav-a.mdx");
    const bPath = fixturePath("nav-b.mdx");
    const aParsed = parseModuleFrontmatter(aPath);
    const bParsed = parseModuleFrontmatter(bPath);
    assert(aParsed.ok && bParsed.ok, "nav fixtures should parse");
    if (aParsed.ok && bParsed.ok) {
      const snapshots = [
        buildSnapshot(
          foundationModule("content/foundations/nav-a.mdx", aPath),
          aParsed.parsed,
        ),
        buildSnapshot(
          foundationModule("content/foundations/nav-b.mdx", bPath),
          bParsed.parsed,
        ),
      ];
      const findings = validateNavigationConsistency(snapshots);
      assert(
        findings.some(
          (finding) =>
            finding.ruleId === "CP-FM-020" && finding.status === "FAIL",
        ),
        "Expected CP-FM-020 FAIL for contradictory previous/next declarations",
      );
    }
  }

  // 19) Valid live Foundation and OT modules do not emit frontmatter FAILs
  {
    const foundationPath = path.join(
      repoRoot,
      "content/foundations/linux-fundamentals.mdx",
    );
    const otPath = path.join(
      repoRoot,
      "content/paths/ot-security/module-01-what-ot-security-is.mdx",
    );
    const foundationParsed = parseModuleFrontmatter(foundationPath);
    const otParsed = parseModuleFrontmatter(otPath);
    assert(foundationParsed.ok && otParsed.ok, "Live modules must parse");
    if (foundationParsed.ok && otParsed.ok) {
      const foundationFindings = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/linux-fundamentals.mdx",
          foundationPath,
        ),
        parsed: foundationParsed.parsed,
        familySlugs: new Set([
          "how-the-internet-works",
          "linux-fundamentals",
          "windows-and-active-directory",
        ]),
      });
      const otFindings = validateFrontmatterFields({
        module: otModule(
          "content/paths/ot-security/module-01-what-ot-security-is.mdx",
          otPath,
        ),
        parsed: otParsed.parsed,
        familySlugs: new Set([
          "module-01-what-ot-security-is",
          "module-02-purdue-model-and-network-architecture",
        ]),
      });
      assert(
        !foundationFindings.some((finding) => finding.status === "FAIL"),
        "Valid Foundation module must not produce frontmatter FAIL findings",
      );
      assert(
        !otFindings.some((finding) => finding.status === "FAIL"),
        "Valid OT module must not produce frontmatter FAIL findings",
      );
    }
  }

  // 20) Live repository: CP-AUTO-005 integrity remains clean; style may report content debt
  const nonStyleFails = live.findings.filter(
    (finding) =>
      finding.status === "FAIL" &&
      !finding.ruleId.startsWith("CP-STYLE-") &&
      !finding.ruleId.startsWith("CP-SCEN-"),
  );
  assert(
    nonStyleFails.length === 0,
    `Expected no non-style FAIL findings on live content, got ${JSON.stringify(nonStyleFails.map((finding) => finding.ruleId))}`,
  );
  const styleFails = live.findings.filter(
    (finding) =>
      finding.ruleId === "CP-STYLE-004" && finding.status === "FAIL",
  );
  console.log(
    `Live CP-STYLE-004 findings: ${styleFails.length} (reported, production content not auto-fixed)`,
  );

  // 21) CP-STYLE-004 fixtures
  {
    const prosePath = fixturePath("style-em-dash-prose.mdx");
    const proseFindings = validateNoEmDash(
      foundationModule("content/foundations/style-em-dash-prose.mdx", prosePath),
    );
    assert(
      proseFindings.some(
        (finding) =>
          finding.ruleId === "CP-STYLE-004" &&
          finding.status === "FAIL" &&
          finding.location.line !== null &&
          finding.location.column !== null,
      ),
      "Expected CP-STYLE-004 FAIL with line/column for prose em dash",
    );
  }

  {
    const multiplePath = fixturePath("style-em-dash-multiple.mdx");
    const occurrences = findEmDashOccurrences(
      fs.readFileSync(multiplePath, "utf8"),
    );
    assert(
      occurrences.length === 2,
      `Expected 2 em dash occurrences, got ${occurrences.length}`,
    );
    const findings = validateNoEmDash(
      foundationModule(
        "content/foundations/style-em-dash-multiple.mdx",
        multiplePath,
      ),
    );
    const fails = findings.filter(
      (finding) =>
        finding.ruleId === "CP-STYLE-004" && finding.status === "FAIL",
    );
    assert(fails.length === 2, `Expected 2 CP-STYLE-004 FAILs, got ${fails.length}`);
  }

  {
    const hyphenPath = fixturePath("style-hyphen-only.mdx");
    const raw = fs.readFileSync(hyphenPath, "utf8");
    assert(raw.includes("-"), "Hyphen fixture must contain hyphen-minus");
    assert(!raw.includes(EM_DASH), "Hyphen fixture must not contain em dash");
    const findings = validateNoEmDash(
      foundationModule("content/foundations/style-hyphen-only.mdx", hyphenPath),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      "Hyphen-minus must not trigger CP-STYLE-004",
    );
  }

  {
    const enDashPath = fixturePath("style-en-dash-only.mdx");
    const raw = fs.readFileSync(enDashPath, "utf8");
    assert(raw.includes("\u2013"), "En dash fixture must contain U+2013");
    assert(!raw.includes(EM_DASH), "En dash fixture must not contain em dash");
    const findings = validateNoEmDash(
      foundationModule("content/foundations/style-en-dash-only.mdx", enDashPath),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      "En dash must not trigger CP-STYLE-004",
    );
  }

  {
    const cleanPath = fixturePath("style-clean.mdx");
    const findings = validateNoEmDash(
      foundationModule("content/foundations/style-clean.mdx", cleanPath),
    );
    assert(
      findings.some(
        (finding) =>
          finding.ruleId === "CP-STYLE-004" && finding.status === "PASS",
      ),
      "Clean fixture must PASS CP-STYLE-004",
    );
  }

  {
    const fencePath = fixturePath("style-em-dash-code-fence.mdx");
    const findings = validateNoEmDash(
      foundationModule(
        "content/foundations/style-em-dash-code-fence.mdx",
        fencePath,
      ),
    );
    assert(
      findings.some(
        (finding) =>
          finding.ruleId === "CP-STYLE-004" && finding.status === "FAIL",
      ),
      "Em dash inside fenced code must FAIL because CP-STYLE-004 scans the complete MDX source",
    );
  }

  console.log("CP-AUTO-005 fixture checks passed.");
  console.log("CP-AUTO-006 style fixture checks passed.");

  // 22) CP-AUTO-007 scenario/company fixtures
  {
    const pathName = fixturePath("scenario-canonical-company.mdx");
    const findings = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-canonical-company.mdx",
        pathName,
      ),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      "Canonical Quorivane Bank must PASS CP-SCEN-001",
    );
  }

  {
    const pathName = fixturePath("scenario-all-canonical.mdx");
    const findings = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-all-canonical.mdx",
        pathName,
      ),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      "All canonical fictional companies must PASS together",
    );
  }

  {
    const pathName = fixturePath("scenario-company-typo.mdx");
    const findings = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-company-typo.mdx",
        pathName,
      ),
    );
    assert(
      findings.some(
        (finding) =>
          finding.ruleId === "CP-SCEN-001" &&
          finding.status === "WARNING" &&
          String(finding.evidence.value).includes("Banck"),
      ),
      "Obvious typo Quorivane Banck must WARNING under CP-SCEN-001",
    );
    assert(
      !findings.some((finding) => finding.status === "FAIL"),
      "Company typos must not invent HARD FAIL beyond CP-SCEN-001 classification",
    );
  }

  {
    const pathName = fixturePath("scenario-company-ambiguous.mdx");
    const findings = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-company-ambiguous.mdx",
        pathName,
      ),
    );
    assert(
      findings.some(
        (finding) =>
          finding.ruleId === "CP-SCEN-001" &&
          finding.status === "NEEDS_HUMAN_REVIEW" &&
          String(finding.evidence.value).includes("Financial"),
      ),
      "Quorivane Financial must be NEEDS_HUMAN_REVIEW, not an automatic FAIL",
    );
  }

  {
    const pathName = fixturePath("scenario-energy-distinct.mdx");
    const findings = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-energy-distinct.mdx",
        pathName,
      ),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      "Delvara Energy and Velorin Energy must remain distinct without aliasing findings",
    );
  }

  {
    const pathName = fixturePath("scenario-vendor-generic.mdx");
    const findings = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-vendor-generic.mdx",
        pathName,
      ),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      "Real vendors/tools and generic nouns must not trigger fictional-company findings",
    );
  }

  {
    const liveScenarioFails = live.findings.filter(
      (finding) =>
        finding.ruleId.startsWith("CP-SCEN-") && finding.status === "FAIL",
    );
    assert(
      liveScenarioFails.length === 0,
      `Live content must not produce CP-SCEN FAIL findings, got ${JSON.stringify(liveScenarioFails)}`,
    );
  }

  console.log("CP-AUTO-007 scenario fixture checks passed.");

  runLabCabinetFixtureChecks();
}

function assertRuleStatus(
  findings: QaFinding[],
  ruleId: string,
  status: "PASS" | "FAIL" | "WARNING" | "NEEDS_HUMAN_REVIEW",
  message: string,
): void {
  assert(
    findings.some(
      (finding) => finding.ruleId === ruleId && finding.status === status,
    ),
    message,
  );
}

function runLabCabinetFixtureChecks(): void {
  {
    const absolutePath = fixturePath("lab-cabinet-valid-foundation.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "valid Foundation fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-valid-foundation.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-valid-foundation"]),
      );
      assert(
        findings.every((finding) => finding.status === "PASS"),
        `Valid Foundation fixture must fully PASS, got ${JSON.stringify(
          findings.filter((finding) => finding.status !== "PASS"),
        )}`,
      );
      assertRuleStatus(
        findings,
        "CP-CAB-001",
        "PASS",
        "Expected CP-CAB-001 PASS for valid Foundation artifact",
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-002",
        "PASS",
        "Expected CP-FOUND-002 PASS for hands-on section",
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-005",
        "PASS",
        "Expected CP-FOUND-005 PASS for portfolio section",
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-008",
        "PASS",
        "Expected CP-FOUND-008 PASS for terminal nextModule null",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-valid-ot.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "valid OT fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        otModule(
          "content/paths/ot-security/lab-cabinet-valid-ot.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-valid-ot"]),
      );
      assert(
        findings.every((finding) => finding.status === "PASS"),
        `Valid OT fixture must fully PASS, got ${JSON.stringify(
          findings.filter((finding) => finding.status !== "PASS"),
        )}`,
      );
      assertRuleStatus(
        findings,
        "CP-OT-003",
        "PASS",
        "Expected CP-OT-003 PASS for OT hands-on",
      );
      assertRuleStatus(
        findings,
        "CP-OT-005",
        "PASS",
        "Expected CP-OT-005 PASS for OT cabinet section",
      );
      assertRuleStatus(
        findings,
        "CP-OT-006",
        "PASS",
        "Expected CP-OT-006 PASS for multiple practical steps",
      );
      assertRuleStatus(
        findings,
        "CP-OT-008",
        "PASS",
        "Expected CP-OT-008 PASS for first module with omitted previousModule",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-missing-artifact.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing artifact fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-missing-artifact.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-missing-artifact"]),
      );
      assertRuleStatus(
        findings,
        "CP-CAB-001",
        "FAIL",
        "Expected CP-CAB-001 FAIL for missing cabinetArtifact",
      );
      assert(
        !findings.some(
          (finding) =>
            finding.ruleId === "CP-CAB-002" && finding.status === "FAIL",
        ),
        "Missing cabinetArtifact must not cascade into CP-CAB-002 FAIL",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-malformed-artifact.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "malformed artifact fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-malformed-artifact.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-malformed-artifact"]),
      );
      assertRuleStatus(
        findings,
        "CP-CAB-001",
        "FAIL",
        "Expected CP-CAB-001 FAIL for malformed cabinetArtifact",
      );
      assert(
        !findings.some(
          (finding) =>
            (finding.ruleId === "CP-CAB-002" ||
              finding.ruleId === "CP-CAB-003" ||
              finding.ruleId === "CP-CAB-004") &&
            finding.status === "FAIL",
        ),
        "Malformed cabinetArtifact must not cascade into child-field FAILs",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-missing-name.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing name fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-missing-name.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-missing-name"]),
      );
      assertRuleStatus(
        findings,
        "CP-CAB-002",
        "FAIL",
        "Expected CP-CAB-002 FAIL for missing artifact name",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-missing-description.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing description fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-missing-description.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-missing-description"]),
      );
      assertRuleStatus(
        findings,
        "CP-CAB-003",
        "FAIL",
        "Expected CP-CAB-003 FAIL for missing artifact description",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-invalid-unlock.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "invalid unlock fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-invalid-unlock.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-invalid-unlock"]),
      );
      assertRuleStatus(
        findings,
        "CP-CAB-004",
        "FAIL",
        "Expected CP-CAB-004 FAIL for unsupported unlocksOn",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-invalid-next.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "invalid next fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-invalid-next.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-invalid-next"]),
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-008",
        "FAIL",
        "Expected CP-FOUND-008 FAIL for unresolved nextModule",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-invalid-previous-ot.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "invalid previous OT fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        otModule(
          "content/paths/ot-security/lab-cabinet-invalid-previous-ot.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-invalid-previous-ot"]),
      );
      assertRuleStatus(
        findings,
        "CP-OT-008",
        "FAIL",
        "Expected CP-OT-008 FAIL for unresolved previousModule",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-self-ref.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "self-ref fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-self-ref.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-self-ref"]),
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-008",
        "FAIL",
        "Expected CP-FOUND-008 FAIL for self-referencing nextModule",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-missing-hands-on.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing hands-on fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-missing-hands-on.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-missing-hands-on"]),
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-002",
        "FAIL",
        "Expected CP-FOUND-002 FAIL for missing hands-on section",
      );
    }
  }

  {
    const absolutePath = fixturePath("lab-cabinet-missing-cabinet-section.mdx");
    const parsed = parseModuleFrontmatter(absolutePath);
    assert(parsed.ok, "missing cabinet section fixture should parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-missing-cabinet-section.mdx",
          absolutePath,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-missing-cabinet-section"]),
      );
      assertRuleStatus(
        findings,
        "CP-FOUND-005",
        "FAIL",
        "Expected CP-FOUND-005 FAIL for missing portfolio/Cabinet section",
      );
      assertRuleStatus(
        findings,
        "CP-CAB-007",
        "WARNING",
        "Expected CP-CAB-007 WARNING when artifact lacks body correspondence",
      );
    }
  }

  {
    // Unresolved relationship must not crash the whole QA run.
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cp-auto-008-"));
    try {
      const foundationsDir = path.join(tmpRoot, "content", "foundations");
      fs.mkdirSync(foundationsDir, { recursive: true });
      fs.copyFileSync(
        fixturePath("lab-cabinet-invalid-next.mdx"),
        path.join(foundationsDir, "lab-cabinet-invalid-next.mdx"),
      );
      const result = runContentAssurance({ rootDir: tmpRoot });
      assert(
        result.exitCode === 0 || result.exitCode === 1,
        `Unresolved relationship must not crash QA (exit ${result.exitCode})`,
      );
      assert(
        result.findings.some(
          (finding) =>
            finding.ruleId === "CP-FOUND-008" && finding.status === "FAIL",
        ),
        "Temp-root QA must surface unresolved nextModule as CP-FOUND-008 FAIL",
      );
    } finally {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    }
  }

  {
    const live = runContentAssuranceDetailed({ rootDir: process.cwd() });
    const labCabinetFails = live.allFindings.filter(
      (finding) =>
        (finding.ruleId.startsWith("CP-CAB-") ||
          finding.ruleId.startsWith("CP-FOUND-") ||
          finding.ruleId.startsWith("CP-OT-")) &&
        finding.status === "FAIL",
    );
    assert(
      labCabinetFails.length === 0,
      `Live content must not produce lab/cabinet FAIL findings, got ${JSON.stringify(labCabinetFails)}`,
    );
    assert(
      !live.allFindings.some(
        (finding) =>
          (finding.ruleId === "CP-CAB-005" ||
            finding.ruleId === "CP-CAB-006" ||
            finding.ruleId === "CP-OT-007") &&
          finding.status !== "PASS",
      ),
      "Semantic CAB-005/CAB-006/OT-007 rules must not emit deterministic findings yet",
    );
  }

  console.log("CP-AUTO-008 lab/cabinet fixture checks passed.");

  runCpAuto009Calibration();
}

main();
