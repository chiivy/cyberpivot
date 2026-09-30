import {
  discoverContentModules,
  listPlaceholderPathDirectories,
} from "@/lib/content-assurance/discover";
import { createFinding, passFinding } from "@/lib/content-assurance/findings";
import { parseModuleFrontmatter } from "@/lib/content-assurance/parse-frontmatter";
import type {
  QaFinding,
  QaFindingStatus,
  QaRunResult,
  QaRunStatus,
} from "@/lib/content-assurance/types";
import {
  buildSnapshot,
  validateModuleNumberUniqueness,
  validateNavigationConsistency,
  validateRegistryConsistency,
  validateRoleModuleListConsistency,
  validateSlugUniqueness,
  type IndexedModuleSnapshot,
} from "@/lib/content-assurance/validate-consistency";
import {
  validateFamilyRules,
  validateFrontmatterFields,
  validatePathConsistency,
} from "@/lib/content-assurance/validate-frontmatter";
import { validateNoEmDash } from "@/lib/content-assurance/validate-style";
import { validateScenarioCompanies } from "@/lib/content-assurance/validate-scenario";
import { validateLabCabinetArtifact } from "@/lib/content-assurance/validate-lab-cabinet";

export interface RunContentAssuranceOptions {
  rootDir: string;
}

function summarize(findings: QaFinding[]): {
  summary: QaRunResult["summary"];
  status: QaRunStatus;
  exitCode: 0 | 1;
} {
  const summary = {
    pass: 0,
    warning: 0,
    needsHumanReview: 0,
    fail: 0,
  };

  for (const finding of findings) {
    if (finding.status === "PASS") {
      summary.pass += 1;
    } else if (finding.status === "WARNING") {
      summary.warning += 1;
    } else if (finding.status === "NEEDS_HUMAN_REVIEW") {
      summary.needsHumanReview += 1;
    } else if (finding.status === "FAIL") {
      summary.fail += 1;
    }
  }

  let status: QaRunStatus = "PASS";
  if (summary.fail > 0) {
    status = "FAIL";
  } else if (summary.needsHumanReview > 0) {
    status = "NEEDS_HUMAN_REVIEW";
  } else if (summary.warning > 0) {
    status = "WARNING";
  }

  return {
    summary,
    status,
    exitCode: summary.fail > 0 ? 1 : 0,
  };
}

function actionableFindings(findings: QaFinding[]): QaFinding[] {
  return findings.filter((finding) => finding.status !== "PASS");
}

function collectFindings(rootDir: string): {
  findings: QaFinding[];
  filesChecked: number;
} {
  const findings: QaFinding[] = [];
  const modules = discoverContentModules(rootDir);
  const placeholders = listPlaceholderPathDirectories(rootDir);

  findings.push(
    passFinding({
      ruleId: "CP-FILE-002",
      file: "content/paths",
      message:
        placeholders.length === 0
          ? "No placeholder-only path directories were present."
          : `Ignored ${placeholders.length} placeholder path director${placeholders.length === 1 ? "y" : "ies"} (${placeholders.join(", ")}).`,
      validator: "file-integrity",
      evidence: { type: "file", value: placeholders },
    }),
  );

  const familySlugSets = {
    foundation: new Set<string>(),
    "ot-security": new Set<string>(),
    unknown: new Set<string>(),
  };
  const parseable: IndexedModuleSnapshot[] = [];

  for (const discovered of modules) {
    findings.push(
      passFinding({
        ruleId: "CP-FILE-001",
        file: discovered.relativePath,
        message: "File is a supported content MDX module path.",
        validator: "file-integrity",
      }),
    );

    findings.push(...validateFamilyRules(discovered));
    findings.push(...validateNoEmDash(discovered));
    findings.push(...validateScenarioCompanies(discovered));

    const parsedResult = parseModuleFrontmatter(discovered.absolutePath);
    if (!parsedResult.ok) {
      findings.push(
        createFinding({
          ruleId: "CP-FILE-003",
          status: "FAIL",
          message: `Frontmatter could not be parsed. Dependent frontmatter checks were not evaluated for this file. ${parsedResult.error}`,
          file: discovered.relativePath,
          location: parsedResult.location,
          evidence: { type: "text", value: parsedResult.error },
          remediation:
            "Fix the YAML frontmatter block so it opens and closes with --- and contains valid YAML.",
          validator: "file-integrity",
        }),
      );
      continue;
    }

    findings.push(
      passFinding({
        ruleId: "CP-FILE-003",
        file: discovered.relativePath,
        message: "Frontmatter parsed successfully.",
        validator: "file-integrity",
      }),
    );

    const snapshot = buildSnapshot(discovered, parsedResult.parsed);
    parseable.push(snapshot);
    if (snapshot.slug) {
      familySlugSets[discovered.family].add(snapshot.slug);
    }
  }

  for (const snapshot of parseable) {
    const familySlugs = familySlugSets[snapshot.module.family];
    findings.push(
      ...validateFrontmatterFields({
        module: snapshot.module,
        parsed: snapshot.parsed,
        familySlugs,
      }),
    );
    findings.push(
      ...validatePathConsistency({
        module: snapshot.module,
        parsed: snapshot.parsed,
        familySlugs,
      }),
    );
    findings.push(
      ...validateLabCabinetArtifact(
        snapshot.module,
        snapshot.parsed,
        familySlugs,
      ),
    );
  }

  findings.push(...validateSlugUniqueness(parseable));
  findings.push(...validateModuleNumberUniqueness(parseable));
  findings.push(...validateNavigationConsistency(parseable));
  findings.push(...validateRegistryConsistency(parseable));
  findings.push(...validateRoleModuleListConsistency(parseable));

  return { findings, filesChecked: modules.length };
}

export function runContentAssuranceDetailed(
  options: RunContentAssuranceOptions,
): { result: QaRunResult; allFindings: QaFinding[] } {
  const startedAt = new Date().toISOString();

  try {
    const { findings, filesChecked } = collectFindings(options.rootDir);
    const { summary, status, exitCode } = summarize(findings);
    const completedAt = new Date().toISOString();

    return {
      allFindings: findings,
      result: {
        version: "1",
        status,
        startedAt,
        completedAt,
        scope: {
          filesChecked,
          modulesChecked: filesChecked,
        },
        summary,
        findings: actionableFindings(findings),
        exitCode,
      },
    };
  } catch (error) {
    const completedAt = new Date().toISOString();
    const message =
      error instanceof Error ? error.message : "Unknown QA execution error";
    const finding = createFinding({
      ruleId: "CP-FILE-001",
      status: "FAIL",
      message: `QA execution error: ${message}`,
      file: ".",
      evidence: { type: "text", value: message },
      remediation: "Fix the QA configuration or environment and re-run.",
      validator: "runner",
      idSuffix: "execution",
    });

    return {
      allFindings: [finding],
      result: {
        version: "1",
        status: "FAIL",
        startedAt,
        completedAt,
        scope: { filesChecked: 0, modulesChecked: 0 },
        summary: { pass: 0, warning: 0, needsHumanReview: 0, fail: 1 },
        findings: [finding],
        exitCode: 2,
      },
    };
  }
}

export function runContentAssurance(
  options: RunContentAssuranceOptions,
): QaRunResult {
  return runContentAssuranceDetailed(options).result;
}

export function statusLabel(status: QaFindingStatus | QaRunStatus): string {
  if (status === "NEEDS_HUMAN_REVIEW") {
    return "NEEDS HUMAN REVIEW";
  }
  return status;
}
