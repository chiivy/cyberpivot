import fs from "fs";

import { formatQaTerminal } from "@/lib/content-assurance/format";
import type {
  QaFinding,
  QaFindingStatus,
  QaRunResult,
} from "@/lib/content-assurance/types";
import { statusLabel } from "@/lib/content-assurance/run-qa";

/**
 * CI presentation layer for CP-AUTO-010.
 * Consumes CP-AUTO-004 JSON from `pnpm cyberpivot qa --json`.
 * Does not redefine rules, severities, or exit-code semantics.
 */

function formatLocation(finding: QaFinding): string {
  if (finding.location.line === null) {
    return finding.file;
  }
  if (finding.location.column === null) {
    return `${finding.file}:${finding.location.line}`;
  }
  return `${finding.file}:${finding.location.line}:${finding.location.column}`;
}

function headlineFor(status: QaRunResult["status"], qaExitCode: number): string {
  if (qaExitCode === 2) {
    return "CyberPivot Content QA could not complete.";
  }
  if (status === "FAIL" || qaExitCode === 1) {
    return "CyberPivot Content QA failed.";
  }
  if (status === "WARNING") {
    return "CyberPivot Content QA passed with warnings.";
  }
  if (status === "NEEDS_HUMAN_REVIEW") {
    return "CyberPivot Content QA passed, but human review is required.";
  }
  return "CyberPivot Content QA passed.";
}

function findingsByStatus(
  findings: QaFinding[],
  status: QaFindingStatus,
): QaFinding[] {
  return findings.filter((finding) => finding.status === status);
}

function renderFindingList(title: string, findings: QaFinding[]): string[] {
  const lines: string[] = [`### ${title}`, ""];
  if (findings.length === 0) {
    lines.push("_None._", "");
    return lines;
  }

  for (const finding of findings) {
    lines.push(`- \`${finding.ruleId}\` — ${finding.message}`);
    lines.push(`  - ${formatLocation(finding)}`);
    if (finding.remediation && finding.remediation !== "No action required.") {
      lines.push(`  - Fix: ${finding.remediation}`);
    }
  }
  lines.push("");
  return lines;
}

function buildMarkdownSummary(input: {
  result: QaRunResult;
  qaExitCode: number;
  changedContentFiles: string[];
}): string {
  const { result, qaExitCode, changedContentFiles } = input;
  const lines: string[] = [
    "## CyberPivot Content QA",
    "",
    `**Result:** ${statusLabel(result.status)}`,
    "",
  ];

  if (qaExitCode === 2) {
    lines.push(
      "This appears to be a QA execution/configuration failure rather than a content finding.",
      "",
      "Do not treat this as a CyberPivot content rule violation until the QA command can complete successfully.",
      "",
    );
  } else {
    lines.push(headlineFor(result.status, qaExitCode), "");
  }

  lines.push(
    "| Status | Count |",
    "|---|---:|",
    `| PASS | ${result.summary.pass} |`,
    `| WARNING | ${result.summary.warning} |`,
    `| NEEDS HUMAN REVIEW | ${result.summary.needsHumanReview} |`,
    `| FAIL | ${result.summary.fail} |`,
    "",
    "### Scope",
    "",
    `- Changed content files: ${changedContentFiles.length}`,
    `- Total content files checked: ${result.scope.filesChecked}`,
    `- Modules checked: ${result.scope.modulesChecked}`,
    `- QA exit code: ${qaExitCode}`,
    "",
  );

  if (changedContentFiles.length > 0) {
    lines.push("Changed content files:", "");
    for (const file of changedContentFiles) {
      lines.push(`- \`${file}\``);
    }
    lines.push("");
  }

  lines.push(
    ...renderFindingList(
      "Blocking findings",
      findingsByStatus(result.findings, "FAIL"),
    ),
  );
  lines.push(
    ...renderFindingList(
      "Warnings",
      findingsByStatus(result.findings, "WARNING"),
    ),
  );
  lines.push(
    ...renderFindingList(
      "Human review",
      findingsByStatus(result.findings, "NEEDS_HUMAN_REVIEW"),
    ),
  );

  lines.push(
    "### Local parity",
    "",
    "Reproduce locally with:",
    "",
    "```bash",
    "pnpm cyberpivot qa",
    "```",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function escapeAnnotationData(value: string): string {
  return value
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/:/g, "%3A")
    .replace(/,/g, "%2C");
}

function annotationCommand(
  level: "error" | "warning" | "notice",
  finding: QaFinding,
): string {
  const parts = [`file=${finding.file}`];
  if (finding.location.line !== null) {
    parts.push(`line=${finding.location.line}`);
  }
  if (finding.location.column !== null) {
    parts.push(`col=${finding.location.column}`);
  }
  parts.push(`title=${escapeAnnotationData(finding.ruleId)}`);
  const message = escapeAnnotationData(
    `${finding.message} Fix: ${finding.remediation}`,
  );
  return `::${level} ${parts.join(",")}::${message}`;
}

function emitAnnotations(findings: QaFinding[]): void {
  for (const finding of findings) {
    if (finding.status === "FAIL") {
      process.stdout.write(`${annotationCommand("error", finding)}\n`);
    } else if (finding.status === "WARNING") {
      process.stdout.write(`${annotationCommand("warning", finding)}\n`);
    } else if (finding.status === "NEEDS_HUMAN_REVIEW") {
      process.stdout.write(`${annotationCommand("notice", finding)}\n`);
    }
  }
}

function readChangedFiles(pathName: string | undefined): string[] {
  if (!pathName || !fs.existsSync(pathName)) {
    return [];
  }
  return fs
    .readFileSync(pathName, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.endsWith(".mdx"));
}

function readJsonText(pathName: string): string {
  const buffer = fs.readFileSync(pathName);
  // UTF-8 BOM
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xef &&
    buffer[1] === 0xbb &&
    buffer[2] === 0xbf
  ) {
    return buffer.slice(3).toString("utf8");
  }
  // UTF-16 LE BOM (PowerShell `>` redirection on Windows)
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.slice(2).toString("utf16le");
  }
  return buffer.toString("utf8");
}

function parseArgs(argv: string[]): {
  jsonPath: string;
  changedFilesPath?: string;
  qaExitCode: number;
} {
  const positional: string[] = [];
  let changedFilesPath: string | undefined;
  let qaExitCode = 0;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--changed-files") {
      changedFilesPath = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--qa-exit-code") {
      qaExitCode = Number(argv[index + 1] ?? "0");
      index += 1;
      continue;
    }
    if (arg && !arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  const jsonPath = positional[0];
  if (!jsonPath) {
    throw new Error(
      "Usage: tsx scripts/content-assurance/github-pr-summary.ts <qa-json> [--changed-files path] [--qa-exit-code N]",
    );
  }

  return { jsonPath, changedFilesPath, qaExitCode };
}

function main(argv: string[]): number {
  try {
    const args = parseArgs(argv.slice(2));
    if (!fs.existsSync(args.jsonPath)) {
      process.stderr.write(
        `QA JSON result not found at ${args.jsonPath}. This is a QA execution/configuration failure.\n`,
      );
      return 2;
    }

    const raw = readJsonText(args.jsonPath);
    const result = JSON.parse(raw) as QaRunResult;
    const changedContentFiles = readChangedFiles(args.changedFilesPath);
    const markdown = buildMarkdownSummary({
      result,
      qaExitCode: args.qaExitCode,
      changedContentFiles,
    });

    process.stdout.write(`${headlineFor(result.status, args.qaExitCode)}\n`);
    process.stdout.write(
      `PASS: ${result.summary.pass}  WARNING: ${result.summary.warning}  NEEDS HUMAN REVIEW: ${result.summary.needsHumanReview}  FAIL: ${result.summary.fail}\n`,
    );
    process.stdout.write(
      `Changed content files: ${changedContentFiles.length}  Total content files checked: ${result.scope.filesChecked}\n\n`,
    );
    process.stdout.write(`${formatQaTerminal(result)}\n\n`);

    const summaryFile = process.env.GITHUB_STEP_SUMMARY;
    if (summaryFile) {
      fs.appendFileSync(summaryFile, markdown, "utf8");
    } else {
      process.stdout.write(markdown);
    }

    emitAnnotations(result.findings);
    return 0;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown summary error";
    process.stderr.write(`GitHub QA summary error: ${message}\n`);
    return 2;
  }
}

process.exitCode = main(process.argv);
