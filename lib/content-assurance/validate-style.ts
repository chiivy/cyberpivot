import fs from "fs";

import { createFinding, passFinding } from "@/lib/content-assurance/findings";
import type {
  DiscoveredModule,
  QaFinding,
} from "@/lib/content-assurance/types";

/** Unicode EM DASH (U+2014). Not hyphen-minus (-) and not en dash (–). */
export const EM_DASH = "\u2014";

export interface EmDashOccurrence {
  line: number;
  column: number;
  excerpt: string;
}

/**
 * Find every U+2014 occurrence in raw MDX source.
 * Scans the complete file (frontmatter, prose, and fenced code blocks),
 * matching CP-AUTO-006's documented default for CP-STYLE-004.
 */
export function findEmDashOccurrences(raw: string): EmDashOccurrence[] {
  const lines = raw.split(/\r?\n/);
  const occurrences: EmDashOccurrence[] = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex] ?? "";
    for (let columnIndex = 0; columnIndex < line.length; columnIndex += 1) {
      if (line[columnIndex] !== EM_DASH) {
        continue;
      }

      occurrences.push({
        line: lineIndex + 1,
        column: columnIndex + 1,
        excerpt: buildExcerpt(line, columnIndex),
      });
    }
  }

  return occurrences;
}

function buildExcerpt(line: string, emDashIndex: number): string {
  const radius = 40;
  const start = Math.max(0, emDashIndex - radius);
  const end = Math.min(line.length, emDashIndex + 1 + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < line.length ? "…" : "";
  return `${prefix}${line.slice(start, end)}${suffix}`;
}

export function validateNoEmDash(module: DiscoveredModule): QaFinding[] {
  let raw: string;
  try {
    raw = fs.readFileSync(module.absolutePath, "utf8");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to read file";
    return [
      createFinding({
        ruleId: "CP-STYLE-004",
        status: "FAIL",
        message: `Unable to scan for em dashes: ${message}`,
        file: module.relativePath,
        evidence: { type: "file", actual: module.absolutePath },
        remediation: "Ensure the module file is readable and re-run QA.",
        validator: "style",
        idSuffix: "unreadable",
      }),
    ];
  }

  const occurrences = findEmDashOccurrences(raw);
  if (occurrences.length === 0) {
    return [
      passFinding({
        ruleId: "CP-STYLE-004",
        file: module.relativePath,
        message: "No Unicode em dash (U+2014) characters found.",
        validator: "style",
        evidence: { type: "text", value: "no U+2014" },
      }),
    ];
  }

  return occurrences.map((occurrence) =>
    createFinding({
      ruleId: "CP-STYLE-004",
      status: "FAIL",
      message: `Prohibited Unicode em dash (U+2014) found.`,
      file: module.relativePath,
      location: {
        line: occurrence.line,
        column: occurrence.column,
      },
      evidence: {
        type: "text",
        value: occurrence.excerpt,
      },
      remediation:
        "Replace the em dash with punctuation or sentence structure consistent with CyberPivot's writing standard.",
      validator: "style",
      idSuffix: `${occurrence.line}:${occurrence.column}`,
    }),
  );
}
