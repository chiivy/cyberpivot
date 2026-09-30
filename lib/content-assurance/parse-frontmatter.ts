import fs from "fs";

import yaml from "js-yaml";

import type {
  FrontmatterParseResult,
  QaLocation,
} from "@/lib/content-assurance/types";

function findFrontmatterBounds(raw: string): {
  startLine: number;
  endLine: number;
  rawFrontmatter: string;
  body: string;
} | null {
  const lines = raw.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    return null;
  }

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index]?.trim() === "---") {
      const bodyLines = lines.slice(index + 1);
      // Preserve a leading blank line separation without inventing content.
      const body = bodyLines.join("\n").replace(/^\n/, "");
      return {
        startLine: 1,
        endLine: index + 1,
        rawFrontmatter: lines.slice(1, index).join("\n"),
        body,
      };
    }
  }

  return null;
}

/**
 * Locate the first line (1-based) where a top-level YAML key appears.
 */
export function locateFrontmatterField(
  rawFrontmatter: string,
  field: string,
  frontmatterStartLine: number,
): QaLocation {
  const lines = rawFrontmatter.split(/\r?\n/);
  const pattern = new RegExp(`^${escapeRegExp(field)}\\s*:`);
  for (let index = 0; index < lines.length; index += 1) {
    if (pattern.test(lines[index] ?? "")) {
      return {
        line: frontmatterStartLine + index + 1,
        column: 1,
      };
    }
  }

  return {
    line: frontmatterStartLine,
    column: 1,
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Parse module frontmatter deterministically with js-yaml.
 *
 * gray-matter is intentionally not used here: on malformed YAML it can throw
 * once and then silently return empty data on later parses in the same process,
 * which creates cascading false-positive frontmatter findings.
 */
export function parseModuleFrontmatter(
  absolutePath: string,
): FrontmatterParseResult {
  let raw: string;
  try {
    raw = fs.readFileSync(absolutePath, "utf8");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to read file";
    return {
      ok: false,
      error: message,
      location: { line: null, column: null },
    };
  }

  const bounds = findFrontmatterBounds(raw);
  if (!bounds) {
    return {
      ok: false,
      error: "Missing or unclosed YAML frontmatter block (expected opening ---).",
      location: { line: 1, column: 1 },
    };
  }

  try {
    const loaded = yaml.load(bounds.rawFrontmatter);
    if (loaded === null || typeof loaded !== "object" || Array.isArray(loaded)) {
      return {
        ok: false,
        error: "Frontmatter did not parse to a YAML object.",
        location: { line: bounds.startLine, column: 1 },
      };
    }

    return {
      ok: true,
      parsed: {
        data: loaded as Record<string, unknown>,
        content: bounds.body.trim(),
        frontmatterStartLine: bounds.startLine,
        frontmatterEndLine: bounds.endLine,
        rawFrontmatter: bounds.rawFrontmatter,
      },
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Frontmatter parse failed";
    return {
      ok: false,
      error: message,
      location: { line: bounds.startLine, column: 1 },
    };
  }
}

export function hasOwnField(
  data: Record<string, unknown>,
  field: string,
): boolean {
  return Object.prototype.hasOwnProperty.call(data, field);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}
