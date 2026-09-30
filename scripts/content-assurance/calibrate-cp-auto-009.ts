/**
 * CP-AUTO-009 — Full Content Assurance calibration.
 *
 * Captures a machine-readable baseline, verifies Foundation/OT isolation,
 * cascading behavior, locations, exit codes, and output contract.
 */
import fs from "fs";
import os from "os";
import path from "path";

import { formatQaJson } from "@/lib/content-assurance/format";
import { parseModuleFrontmatter } from "@/lib/content-assurance/parse-frontmatter";
import {
  runContentAssurance,
  runContentAssuranceDetailed,
} from "@/lib/content-assurance/run-qa";
import type {
  DiscoveredModule,
  QaFinding,
  QaRunResult,
} from "@/lib/content-assurance/types";
import {
  buildSnapshot,
  validateRegistryConsistency,
} from "@/lib/content-assurance/validate-consistency";
import { validateFrontmatterFields } from "@/lib/content-assurance/validate-frontmatter";
import { validateLabCabinetArtifact } from "@/lib/content-assurance/validate-lab-cabinet";
import { validateScenarioCompanies } from "@/lib/content-assurance/validate-scenario";
import { validateNoEmDash } from "@/lib/content-assurance/validate-style";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
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

function foundationModule(
  relativePath: string,
  absolutePath: string,
): DiscoveredModule {
  return {
    absolutePath,
    relativePath,
    family: "foundation",
    fileSlug: path.basename(relativePath, ".mdx"),
  };
}

function otModule(
  relativePath: string,
  absolutePath: string,
): DiscoveredModule {
  return {
    absolutePath,
    relativePath,
    family: "ot-security",
    fileSlug: path.basename(relativePath, ".mdx"),
  };
}

function requiredFindingKeys(finding: QaFinding): string[] {
  const required = [
    "id",
    "ruleId",
    "severity",
    "status",
    "category",
    "message",
    "file",
    "location",
    "evidence",
    "remediation",
    "source",
  ] as const;
  return required.filter((key) => !(key in finding));
}

function assertOutputContract(result: QaRunResult): void {
  assert(result.version === "1", "QA result version must be 1");
  assert(typeof result.status === "string", "QA result must include status");
  assert(
    typeof result.startedAt === "string" &&
      typeof result.completedAt === "string",
    "QA result must include timestamps",
  );
  assert(
    typeof result.scope.filesChecked === "number" &&
      typeof result.scope.modulesChecked === "number",
    "QA result must include scope counts",
  );
  assert(
    typeof result.summary.pass === "number" &&
      typeof result.summary.warning === "number" &&
      typeof result.summary.needsHumanReview === "number" &&
      typeof result.summary.fail === "number",
    "QA result must include summary counts",
  );
  assert(Array.isArray(result.findings), "findings must be an array");
  assert(
    result.exitCode === 0 || result.exitCode === 1 || result.exitCode === 2,
    `Unexpected exitCode ${result.exitCode}`,
  );

  for (const finding of result.findings) {
    const missing = requiredFindingKeys(finding);
    assert(
      missing.length === 0,
      `Finding missing CP-AUTO-004 keys: ${missing.join(", ")} (${finding.id})`,
    );
    assert(
      finding.source.type === "deterministic",
      `source.type must be deterministic (${finding.id})`,
    );
    assert(
      typeof finding.source.validator === "string" &&
        finding.source.validator.length > 0,
      `source.validator must be set (${finding.id})`,
    );
    assert(
      result.findings.every((entry) => entry.status !== "PASS"),
      "Actionable findings array must not include PASS entries",
    );
  }
}

function withTempContentRoot(
  setup: (rootDir: string) => void,
  run: (rootDir: string) => void,
): void {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cp-auto-009-"));
  try {
    setup(tmp);
    run(tmp);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function copyFixtureInto(
  rootDir: string,
  fixtureName: string,
  relativeDest: string,
): void {
  const dest = path.join(rootDir, relativeDest);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(fixturePath(fixtureName), dest);
}

export function runCpAuto009Calibration(): void {
  const repoRoot = process.cwd();

  // -------------------------------------------------------------------------
  // A. Live baseline (all Foundation + OT modules)
  // -------------------------------------------------------------------------
  const liveDetailed = runContentAssuranceDetailed({ rootDir: repoRoot });
  const live = liveDetailed.result;
  assertOutputContract(live);
  assert(live.scope.filesChecked === 8, "Expected 8 live modules");
  assert(live.scope.modulesChecked === 8, "Expected modulesChecked === 8");
  assert(live.exitCode === 0, `Live exitCode expected 0, got ${live.exitCode}`);
  assert(live.status === "PASS", `Live status expected PASS, got ${live.status}`);
  assert(
    live.findings.length === 0,
    `Live actionable findings must be empty, got ${JSON.stringify(live.findings)}`,
  );

  const baselinePath = path.join(
    repoRoot,
    "scripts",
    "content-assurance",
    "calibration-baseline-cp-auto-009.json",
  );
  fs.writeFileSync(baselinePath, formatQaJson(live), "utf8");

  for (const finding of liveDetailed.allFindings) {
    if (finding.file.startsWith("content/paths/ot-security/")) {
      assert(
        !finding.ruleId.startsWith("CP-FOUND-"),
        `OT module hit Foundation rule ${finding.ruleId} on ${finding.file}`,
      );
      assert(
        finding.ruleId !== "CP-FM-001",
        `OT module hit CP-FM-001 on ${finding.file}`,
      );
    }
    if (finding.file.startsWith("content/foundations/")) {
      assert(
        !finding.ruleId.startsWith("CP-OT-"),
        `Foundation module hit OT rule ${finding.ruleId} on ${finding.file}`,
      );
      assert(
        finding.ruleId !== "CP-FM-002",
        `Foundation module hit CP-FM-002 on ${finding.file}`,
      );
    }
  }

  for (const ruleId of [
    "CP-CAB-005",
    "CP-CAB-006",
    "CP-OT-007",
    "CP-SCEN-002",
    "CP-SCEN-003",
  ]) {
    assert(
      !liveDetailed.allFindings.some((finding) => finding.ruleId === ruleId),
      `Deferred semantic rule ${ruleId} must not emit live findings`,
    );
  }

  // -------------------------------------------------------------------------
  // B. Cascading: unparseable frontmatter must not invent FM/CAB failures
  // -------------------------------------------------------------------------
  withTempContentRoot(
    (root) => {
      copyFixtureInto(
        root,
        "malformed-frontmatter.mdx",
        "content/foundations/malformed-frontmatter.mdx",
      );
    },
    (rootDir) => {
      const result = runContentAssurance({ rootDir });
      assertOutputContract(result);
      assert(result.exitCode === 1, "Malformed frontmatter should exit 1");
      const fails = result.findings.filter(
        (finding) => finding.status === "FAIL",
      );
      assert(
        fails.length === 1 && fails[0]?.ruleId === "CP-FILE-003",
        `Parse failure must only FAIL CP-FILE-003 for the bad file, got ${fails
          .map((finding) => finding.ruleId)
          .join(", ")}`,
      );
      assert(
        !fails.some((finding) => finding.ruleId.startsWith("CP-FM-")),
        "Parse failure must not cascade into frontmatter FAILs",
      );
      assert(
        !fails.some((finding) => finding.ruleId.startsWith("CP-CAB-")),
        "Parse failure must not cascade into cabinet FAILs",
      );
      assert(
        !fails.some((finding) => finding.ruleId === "CP-CONSIST-002"),
        "Sparse fixture root must not cascade into registry-completeness FAILs",
      );
    },
  );

  // -------------------------------------------------------------------------
  // C. Registry completeness regression (sparse vs partial corpus)
  // -------------------------------------------------------------------------
  {
    const abs = fixturePath("lab-cabinet-valid-foundation.mdx");
    const parsed = parseModuleFrontmatter(abs);
    assert(parsed.ok, "valid foundation fixture must parse");
    if (parsed.ok) {
      const snapshot = buildSnapshot(
        foundationModule(
          "content/foundations/lab-cabinet-valid-foundation.mdx",
          abs,
        ),
        parsed.parsed,
      );
      const findings = validateRegistryConsistency([snapshot]);
      assert(
        !findings.some(
          (finding) =>
            finding.ruleId === "CP-CONSIST-002" && finding.status === "FAIL",
        ),
        "Non-registry fixture sandbox must not FAIL registry completeness",
      );
    }
  }

  withTempContentRoot(
    (root) => {
      // Partial real corpus: one live Foundation module present, one missing.
      const destDir = path.join(root, "content", "foundations");
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(
        path.join(
          repoRoot,
          "content",
          "foundations",
          "how-the-internet-works.mdx",
        ),
        path.join(destDir, "how-the-internet-works.mdx"),
      );
    },
    (rootDir) => {
      const result = runContentAssurance({ rootDir });
      assert(
        result.findings.some(
          (finding) =>
            finding.ruleId === "CP-CONSIST-002" &&
            finding.status === "FAIL" &&
            String(finding.message).includes("linux-fundamentals"),
        ),
        "Partial real corpus must still FAIL when a registry module MDX is missing",
      );
    },
  );

  // -------------------------------------------------------------------------
  // D. FM + CAB overlap on missing artifact (no child-field cascade)
  // -------------------------------------------------------------------------
  {
    const abs = fixturePath("lab-cabinet-missing-artifact.mdx");
    const parsed = parseModuleFrontmatter(abs);
    assert(parsed.ok, "missing artifact fixture must parse");
    if (parsed.ok) {
      const module = foundationModule(
        "content/foundations/lab-cabinet-missing-artifact.mdx",
        abs,
      );
      const familySlugs = new Set(["lab-cabinet-missing-artifact"]);
      const fmFails = validateFrontmatterFields({
        module,
        parsed: parsed.parsed,
        familySlugs,
      }).filter((finding) => finding.status === "FAIL");
      const cabFails = validateLabCabinetArtifact(
        module,
        parsed.parsed,
        familySlugs,
      ).filter((finding) => finding.status === "FAIL");

      assert(
        fmFails.some((finding) => finding.ruleId === "CP-FM-014"),
        "Expected CP-FM-014",
      );
      assert(
        cabFails.some((finding) => finding.ruleId === "CP-CAB-001"),
        "Expected CP-CAB-001",
      );
      // Intentional dual coverage across FM/CAB namespaces for the same object.
      assert(
        !cabFails.some((finding) =>
          ["CP-CAB-002", "CP-CAB-003", "CP-CAB-004"].includes(finding.ruleId),
        ),
        "CAB child fields must not cascade when object is missing",
      );
      assert(
        !fmFails.some((finding) =>
          ["CP-FM-015", "CP-FM-016"].includes(finding.ruleId),
        ),
        "FM child fields must not cascade when object is missing",
      );
    }
  }

  // -------------------------------------------------------------------------
  // E. Location accuracy
  // -------------------------------------------------------------------------
  {
    const abs = fixturePath("style-em-dash-prose.mdx");
    const fail = validateNoEmDash(
      foundationModule("content/foundations/style-em-dash-prose.mdx", abs),
    ).find((finding) => finding.status === "FAIL");
    assert(fail !== undefined, "Expected style FAIL");
    if (fail) {
      const line = fs.readFileSync(abs, "utf8").split(/\r?\n/)[
        (fail.location.line ?? 1) - 1
      ] ?? "";
      assert(
        fail.location.line !== null && fail.location.column !== null,
        "Style finding needs line and column",
      );
      assert(
        line[(fail.location.column ?? 1) - 1] === "\u2014",
        "Style column must land on U+2014",
      );
    }
  }

  {
    const abs = fixturePath("empty-title.mdx");
    const parsed = parseModuleFrontmatter(abs);
    assert(parsed.ok, "empty-title must parse");
    if (parsed.ok) {
      const fail = validateFrontmatterFields({
        module: foundationModule(
          "content/foundations/empty-title.mdx",
          abs,
        ),
        parsed: parsed.parsed,
        familySlugs: new Set(["empty-title"]),
      }).find(
        (finding) =>
          finding.ruleId === "CP-FM-006" && finding.status === "FAIL",
      );
      assert(fail !== undefined, "Expected CP-FM-006");
      if (fail) {
        const line = fs.readFileSync(abs, "utf8").split(/\r?\n/)[
          (fail.location.line ?? 1) - 1
        ] ?? "";
        assert(/^\s*title\s*:/.test(line), "Frontmatter location must hit title");
      }
    }
  }

  {
    const abs = fixturePath("scenario-company-typo.mdx");
    const fail = validateScenarioCompanies(
      foundationModule(
        "content/foundations/scenario-company-typo.mdx",
        abs,
      ),
    ).find((finding) => finding.status !== "PASS");
    assert(fail !== undefined, "Expected scenario typo finding");
    if (fail && fail.location.line !== null) {
      const line = fs.readFileSync(abs, "utf8").split(/\r?\n/)[
        fail.location.line - 1
      ] ?? "";
      assert(/Quorivane/i.test(line), "Scenario location must hit company text");
    }
  }

  {
    const abs = fixturePath("lab-cabinet-invalid-next.mdx");
    const parsed = parseModuleFrontmatter(abs);
    assert(parsed.ok, "invalid-next must parse");
    if (parsed.ok) {
      const fail = validateLabCabinetArtifact(
        foundationModule(
          "content/foundations/lab-cabinet-invalid-next.mdx",
          abs,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-invalid-next"]),
      ).find(
        (finding) =>
          finding.ruleId === "CP-FOUND-008" && finding.status === "FAIL",
      );
      assert(fail !== undefined, "Expected CP-FOUND-008");
      if (fail) {
        const line = fs.readFileSync(abs, "utf8").split(/\r?\n/)[
          (fail.location.line ?? 1) - 1
        ] ?? "";
        assert(
          /^\s*nextModule\s*:/.test(line),
          "Cabinet location must hit nextModule",
        );
      }
    }
  }

  // -------------------------------------------------------------------------
  // F. Exit codes
  // -------------------------------------------------------------------------
  withTempContentRoot(
    (root) => {
      copyFixtureInto(
        root,
        "calibration-warning-only.mdx",
        "content/foundations/calibration-warning-only.mdx",
      );
    },
    (rootDir) => {
      const result = runContentAssurance({ rootDir });
      assertOutputContract(result);
      assert(result.exitCode === 0, `Warning-only must exit 0, got ${result.exitCode}`);
      assert(result.status === "WARNING", `Expected WARNING status, got ${result.status}`);
      assert(result.summary.fail === 0, "Warning-only must have zero FAILs");
      assert(result.summary.warning > 0, "Warning-only must have warnings");
    },
  );

  withTempContentRoot(
    (root) => {
      copyFixtureInto(
        root,
        "calibration-human-review.mdx",
        "content/foundations/calibration-human-review.mdx",
      );
    },
    (rootDir) => {
      const result = runContentAssurance({ rootDir });
      assertOutputContract(result);
      assert(
        result.exitCode === 0,
        `Human-review-only must exit 0, got ${result.exitCode}`,
      );
      assert(
        result.status === "NEEDS_HUMAN_REVIEW",
        `Expected NEEDS_HUMAN_REVIEW, got ${result.status}`,
      );
      assert(result.summary.fail === 0, "Human-review-only must have zero FAILs");
      assert(
        result.summary.needsHumanReview > 0,
        "Human-review-only must have needsHumanReview > 0",
      );
    },
  );

  withTempContentRoot(
    (root) => {
      copyFixtureInto(
        root,
        "lab-cabinet-invalid-next.mdx",
        "content/foundations/lab-cabinet-invalid-next.mdx",
      );
    },
    (rootDir) => {
      const result = runContentAssurance({ rootDir });
      assertOutputContract(result);
      assert(result.exitCode === 1, `Blocking FAIL must exit 1, got ${result.exitCode}`);
      assert(result.status === "FAIL", "Blocking status must be FAIL");
    },
  );

  withTempContentRoot(
    (root) => {
      // Force an execution error: content/paths as a file makes readdir throw.
      fs.mkdirSync(path.join(root, "content"), { recursive: true });
      fs.writeFileSync(path.join(root, "content", "paths"), "not-a-directory");
    },
    (rootDir) => {
      const result = runContentAssurance({ rootDir });
      assert(result.exitCode === 2, `Execution failure must exit 2, got ${result.exitCode}`);
      assert(result.status === "FAIL", "Execution failure status must be FAIL");
      assertOutputContract(result);
    },
  );

  // -------------------------------------------------------------------------
  // G. Structure variance / hyphen-en-dash / OT isolation
  // -------------------------------------------------------------------------
  {
    const abs = fixturePath("lab-cabinet-valid-ot.mdx");
    const parsed = parseModuleFrontmatter(abs);
    assert(parsed.ok, "valid OT fixture must parse");
    if (parsed.ok) {
      const findings = validateLabCabinetArtifact(
        otModule(
          "content/paths/ot-security/lab-cabinet-valid-ot.mdx",
          abs,
        ),
        parsed.parsed,
        new Set(["lab-cabinet-valid-ot"]),
      );
      assert(
        !findings.some((finding) => finding.ruleId.startsWith("CP-FOUND-")),
        "OT fixture must not receive Foundation structure rules",
      );
      assert(
        findings.every((finding) => finding.status === "PASS"),
        "Valid OT fixture must fully PASS",
      );
    }
  }

  for (const name of ["style-hyphen-only.mdx", "style-en-dash-only.mdx"]) {
    const findings = validateNoEmDash(
      foundationModule(`content/foundations/${name}`, fixturePath(name)),
    );
    assert(
      findings.every((finding) => finding.status === "PASS"),
      `${name} must not FAIL CP-STYLE-004`,
    );
  }

  // -------------------------------------------------------------------------
  // H. JSON round-trip
  // -------------------------------------------------------------------------
  {
    const parsed = JSON.parse(formatQaJson(live)) as QaRunResult;
    assert(parsed.version === "1", "JSON round-trip version");
    assert(parsed.exitCode === 0, "JSON round-trip exitCode");
    assert(Array.isArray(parsed.findings), "JSON round-trip findings");
  }

  console.log("CP-AUTO-009 calibration checks passed.");
  console.log(`Baseline written: ${baselinePath}`);
  console.log(
    `Live: status=${live.status} pass=${live.summary.pass} fail=${live.summary.fail} warnings=${live.summary.warning} exit=${live.exitCode}`,
  );
}

const executedAsScript =
  typeof require !== "undefined" &&
  typeof module !== "undefined" &&
  require.main === module;

if (executedAsScript) {
  runCpAuto009Calibration();
}
