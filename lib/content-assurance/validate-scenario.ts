import fs from "fs";

import {
  CANONICAL_FICTIONAL_COMPANIES,
  getCanonicalCompanyNames,
  type CanonicalFictionalCompany,
} from "@/lib/content-assurance/canonical-fictional-companies";
import { createFinding, passFinding } from "@/lib/content-assurance/findings";
import type {
  DiscoveredModule,
  QaFinding,
} from "@/lib/content-assurance/types";

function levenshtein(a: string, b: string): number {
  if (a === b) {
    return 0;
  }
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = Array.from({ length: b.length + 1 }, () => 0);

  for (let i = 0; i < a.length; i += 1) {
    current[0] = i + 1;
    for (let j = 0; j < b.length; j += 1) {
      const cost = a[i] === b[j] ? 0 : 1;
      current[j + 1] = Math.min(
        (previous[j + 1] ?? 0) + 1,
        (current[j] ?? 0) + 1,
        (previous[j] ?? 0) + cost,
      );
    }
    for (let j = 0; j < previous.length; j += 1) {
      previous[j] = current[j] ?? 0;
    }
  }

  return previous[b.length] ?? 0;
}

function isObviousTypo(candidate: string, expected: string): boolean {
  if (candidate === expected) {
    return false;
  }
  if (Math.abs(candidate.length - expected.length) > 1) {
    return false;
  }
  return levenshtein(candidate, expected) === 1;
}

function stripPossessive(token: string): string {
  return token.replace(/['’]s$/i, "");
}

function isPossessiveForm(token: string): boolean {
  return /['’]s$/i.test(token);
}

/**
 * Continuations that look like alternate organization name suffixes.
 * Technical acronyms (IT, OT) and ordinary sentence words are excluded so
 * phrases like "Quorivane's IT manager" are not treated as company names.
 */
const AMBIGUOUS_ORG_SUFFIXES = new Set([
  "Financial",
  "Finance",
  "Banking",
  "Corp",
  "Corporation",
  "Inc",
  "Ltd",
  "LLC",
  "Group",
  "Holdings",
  "Utilities",
  "Services",
  "Company",
  "Partners",
  "Capital",
]);

function tokenizeWithOffsets(
  line: string,
): Array<{ token: string; column: number }> {
  const results: Array<{ token: string; column: number }> = [];
  const pattern = /[A-Za-z][A-Za-z0-9'’-]*/g;
  let match: RegExpExecArray | null = pattern.exec(line);
  while (match) {
    results.push({
      token: match[0],
      column: (match.index ?? 0) + 1,
    });
    match = pattern.exec(line);
  }
  return results;
}

function findCompanyByStem(
  stem: string,
): CanonicalFictionalCompany | undefined {
  return CANONICAL_FICTIONAL_COMPANIES.find(
    (company) => company.stem === stem,
  );
}

/**
 * Deterministic CP-SCEN-001 checks for fictional company identity.
 *
 * CP-SCEN-002 and CP-SCEN-003 have no currently evaluable deterministic
 * repository signals beyond name identity, so they are not auto-failed here.
 */
export function validateScenarioCompanies(
  module: DiscoveredModule,
): QaFinding[] {
  let raw: string;
  try {
    raw = fs.readFileSync(module.absolutePath, "utf8");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to read file";
    return [
      createFinding({
        ruleId: "CP-SCEN-001",
        status: "WARNING",
        message: `Unable to scan scenario companies: ${message}`,
        file: module.relativePath,
        evidence: { type: "file", actual: module.absolutePath },
        remediation: "Ensure the module file is readable and re-run QA.",
        validator: "scenario",
        idSuffix: "unreadable",
      }),
    ];
  }

  const findings: QaFinding[] = [];
  const lines = raw.split(/\r?\n/);
  const seenIssueKeys = new Set<string>();

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex] ?? "";
    const tokens = tokenizeWithOffsets(line);

    for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 1) {
      const current = tokens[tokenIndex];
      if (!current) {
        continue;
      }

      const bare = stripPossessive(current.token);
      const company = findCompanyByStem(bare);

      if (!company) {
        if (!/^[A-Z]/.test(bare)) {
          continue;
        }
        for (const candidate of CANONICAL_FICTIONAL_COMPANIES) {
          if (!isObviousTypo(bare, candidate.stem)) {
            continue;
          }
          const key = `stem-typo:${lineIndex}:${current.column}:${bare}`;
          if (seenIssueKeys.has(key)) {
            continue;
          }
          seenIssueKeys.add(key);
          findings.push(
            createFinding({
              ruleId: "CP-SCEN-001",
              status: "WARNING",
              message: `Possible misspelling of fictional organization stem "${candidate.stem}" as "${bare}".`,
              file: module.relativePath,
              location: { line: lineIndex + 1, column: current.column },
              evidence: {
                type: "scenario-company",
                value: bare,
                expected: getCanonicalCompanyNames().join(", "),
                field: candidate.name,
              },
              remediation:
                "Verify the fictional organization name against the CyberPivot scenario registry.",
              validator: "scenario",
              idSuffix: `${lineIndex + 1}:${current.column}`,
            }),
          );
        }
        continue;
      }

      const next = tokens[tokenIndex + 1];
      if (!next) {
        continue;
      }

      // Possessive short forms ("Quorivane's IT", "Delvara's OT") are accepted
      // references to the organization, not alternate company names.
      if (isPossessiveForm(current.token)) {
        continue;
      }

      const nextBare = stripPossessive(next.token);
      const expected = company.expectedContinuations[0];
      if (!expected) {
        continue;
      }

      if (nextBare === expected) {
        if (company.stem === "Candrel") {
          const third = tokens[tokenIndex + 2];
          const thirdBare = third ? stripPossessive(third.token) : null;
          if (thirdBare !== "Services") {
            const key = `candrel-water:${lineIndex}:${current.column}`;
            if (!seenIssueKeys.has(key)) {
              seenIssueKeys.add(key);
              findings.push(
                createFinding({
                  ruleId: "CP-SCEN-001",
                  status: "NEEDS_HUMAN_REVIEW",
                  message: `Possible variation of "${company.name}" detected as "Candrel Water". Confirm whether this is intentionally distinct from the canonical name.`,
                  file: module.relativePath,
                  location: { line: lineIndex + 1, column: current.column },
                  evidence: {
                    type: "scenario-company",
                    value: "Candrel Water",
                    expected: company.name,
                    field: company.name,
                  },
                  remediation:
                    "Confirm the intended fictional organization name. Do not auto-normalize partial names.",
                  validator: "scenario",
                  idSuffix: `${lineIndex + 1}:${current.column}`,
                }),
              );
            }
          }
        }
        continue;
      }

      if (isObviousTypo(nextBare, expected)) {
        const key = `cont-typo:${lineIndex}:${current.column}:${nextBare}`;
        if (seenIssueKeys.has(key)) {
          continue;
        }
        seenIssueKeys.add(key);
        findings.push(
          createFinding({
            ruleId: "CP-SCEN-001",
            status: "WARNING",
            message: `Scenario company "${bare} ${nextBare}" does not match canonical "${company.name}".`,
            file: module.relativePath,
            location: { line: lineIndex + 1, column: current.column },
            evidence: {
              type: "scenario-company",
              value: `${bare} ${nextBare}`,
              expected: company.name,
              field: company.name,
            },
            remediation:
              "Verify the fictional organization name against the CyberPivot scenario registry.",
            validator: "scenario",
            idSuffix: `${lineIndex + 1}:${current.column}`,
          }),
        );
        continue;
      }

      if (AMBIGUOUS_ORG_SUFFIXES.has(nextBare)) {
        const key = `ambiguous:${lineIndex}:${current.column}:${nextBare}`;
        if (seenIssueKeys.has(key)) {
          continue;
        }
        seenIssueKeys.add(key);
        findings.push(
          createFinding({
            ruleId: "CP-SCEN-001",
            status: "NEEDS_HUMAN_REVIEW",
            message: `Possible variation of a known scenario organization detected. Review whether "${bare} ${nextBare}" is intentionally distinct from "${company.name}".`,
            file: module.relativePath,
            location: { line: lineIndex + 1, column: current.column },
            evidence: {
              type: "scenario-company",
              value: `${bare} ${nextBare}`,
              expected: company.name,
              field: company.name,
            },
            remediation:
              "Review whether this name is intentionally distinct from the canonical CyberPivot fictional organization.",
            validator: "scenario",
            idSuffix: `${lineIndex + 1}:${current.column}`,
          }),
        );
      }
    }
  }

  if (findings.length === 0) {
    return [
      passFinding({
        ruleId: "CP-SCEN-001",
        file: module.relativePath,
        message:
          "No deterministic fictional-company identity issues detected.",
        validator: "scenario",
        evidence: {
          type: "scenario-company",
          value: "ok",
          expected: getCanonicalCompanyNames().join(", "),
        },
      }),
    ];
  }

  return findings;
}
