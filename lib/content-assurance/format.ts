import type { QaFinding, QaRunResult } from "@/lib/content-assurance/types";
import { statusLabel } from "@/lib/content-assurance/run-qa";

function formatLocation(finding: QaFinding): string {
  if (finding.location.line === null) {
    return finding.file;
  }
  if (finding.location.column === null) {
    return `${finding.file}:${finding.location.line}`;
  }
  return `${finding.file}:${finding.location.line}:${finding.location.column}`;
}

function symbolFor(status: QaFinding["status"]): string {
  if (status === "FAIL") {
    return "x";
  }
  if (status === "WARNING") {
    return "!";
  }
  if (status === "NEEDS_HUMAN_REVIEW") {
    return "?";
  }
  return "+";
}

export function formatQaTerminal(result: QaRunResult): string {
  const lines: string[] = [
    "CyberPivot Content Assurance",
    "----------------------------------------",
    "",
    "Scope",
    `  Files checked: ${result.scope.filesChecked}`,
    `  Modules checked: ${result.scope.modulesChecked}`,
    "",
    "Result",
    `  ${statusLabel(result.status)}`,
    "",
    "Summary",
    `  PASS: ${result.summary.pass}`,
    `  WARNING: ${result.summary.warning}`,
    `  NEEDS HUMAN REVIEW: ${result.summary.needsHumanReview}`,
    `  FAIL: ${result.summary.fail}`,
  ];

  if (result.findings.length > 0) {
    lines.push("", "Findings", "");
    for (const finding of result.findings) {
      lines.push(
        `${symbolFor(finding.status)} ${statusLabel(finding.status)}  ${finding.ruleId}`,
      );
      lines.push(`  ${formatLocation(finding)}`);
      lines.push(`  ${finding.message}`);
      lines.push(`  Fix: ${finding.remediation}`);
      lines.push("");
    }
  } else {
    lines.push("", "No actionable findings.", "");
  }

  lines.push("----------------------------------------");
  lines.push(`${result.summary.fail} blocking failures`);
  lines.push(`${result.summary.warning} warnings`);
  lines.push(`${result.summary.needsHumanReview} human-review findings`);
  lines.push("----------------------------------------");

  return lines.join("\n");
}

export function formatQaJson(result: QaRunResult): string {
  return `${JSON.stringify(result, null, 2)}\n`;
}
