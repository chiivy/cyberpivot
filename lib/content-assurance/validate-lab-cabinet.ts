import fs from "fs";

import { createFinding, passFinding } from "@/lib/content-assurance/findings";
import {
  hasOwnField,
  isNonEmptyString,
  locateFrontmatterField,
} from "@/lib/content-assurance/parse-frontmatter";
import type {
  DiscoveredModule,
  ParsedFrontmatter,
  QaFinding,
} from "@/lib/content-assurance/types";

/** Live content and TEMPLATE.mdx currently use this unlock value exclusively. */
export const SUPPORTED_UNLOCKS_ON = new Set(["completion"]);

interface HeadingInfo {
  level: number;
  title: string;
  line: number;
  body: string;
}

function extractHeadings(raw: string): HeadingInfo[] {
  const lines = raw.split(/\r?\n/);
  const headings: Array<{ level: number; title: string; line: number; start: number }> =
    [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = /^(#{1,3})\s+(.+?)\s*$/.exec(lines[index] ?? "");
    if (!match) {
      continue;
    }
    headings.push({
      level: match[1]?.length ?? 2,
      title: match[2]?.trim() ?? "",
      line: index + 1,
      start: index,
    });
  }

  return headings.map((heading, index) => {
    let end = lines.length;
    for (let nextIndex = index + 1; nextIndex < headings.length; nextIndex += 1) {
      const next = headings[nextIndex];
      if (next && next.level <= heading.level) {
        end = next.start;
        break;
      }
    }
    const body = lines.slice(heading.start + 1, end).join("\n");
    return {
      level: heading.level,
      title: heading.title,
      line: heading.line,
      body,
    };
  });
}

function findHeading(
  headings: HeadingInfo[],
  predicate: (title: string) => boolean,
): HeadingInfo | undefined {
  return headings.find((heading) => predicate(heading.title));
}

function hasFoundationHandsOn(headings: HeadingInfo[]): HeadingInfo | undefined {
  return findHeading(
    headings,
    (title) => /hands-?on/i.test(title) && /lab|exercise|task/i.test(title)
      || /^hands-?on lab$/i.test(title)
      || /^hands-?on$/i.test(title),
  ) ?? findHeading(headings, (title) => /hands-?on lab/i.test(title));
}

function hasFoundationEnterprise(headings: HeadingInfo[]): HeadingInfo | undefined {
  return findHeading(headings, (title) => /enterprise/i.test(title));
}

function hasFoundationPortfolio(headings: HeadingInfo[]): HeadingInfo | undefined {
  return findHeading(
    headings,
    (title) => /portfolio entry/i.test(title) || /cabinet artifact/i.test(title),
  );
}

function hasOtHandsOn(headings: HeadingInfo[]): HeadingInfo | undefined {
  return (
    findHeading(
      headings,
      (title) => /section\s*3/i.test(title) && /hands-?on/i.test(title),
    ) ?? findHeading(headings, (title) => /hands-?on/i.test(title))
  );
}

function hasOtEnterprise(headings: HeadingInfo[]): HeadingInfo | undefined {
  return (
    findHeading(
      headings,
      (title) => /section\s*4/i.test(title) && /enterprise/i.test(title),
    ) ?? findHeading(headings, (title) => /enterprise/i.test(title))
  );
}

function hasOtCabinet(headings: HeadingInfo[]): HeadingInfo | undefined {
  return (
    findHeading(
      headings,
      (title) =>
        /section\s*5/i.test(title) && /cabinet|artifact/i.test(title),
    ) ??
    findHeading(
      headings,
      (title) => /cabinet artifact|your cabinet artifact/i.test(title),
    )
  );
}

function countPracticalSteps(sectionBody: string): number {
  const stepHeading = sectionBody.match(/^#{1,3}\s+Step\s+\d+/gim) ?? [];
  const boldStep = sectionBody.match(/^\*\*Step\s+\d+/gim) ?? [];
  const plainStep = sectionBody.match(/^Step\s+\d+/gim) ?? [];
  return Math.max(stepHeading.length, boldStep.length, plainStep.length);
}

function fieldLocation(
  parsed: ParsedFrontmatter,
  field: string,
): { line: number | null; column: number | null } {
  return locateFrontmatterField(
    parsed.rawFrontmatter,
    field,
    parsed.frontmatterStartLine,
  );
}

function validateCabinetMetadata(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const file = module.relativePath;
  const value = parsed.data.cabinetArtifact;

  if (!hasOwnField(parsed.data, "cabinetArtifact")) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-001",
        status: "FAIL",
        message: "Required cabinetArtifact metadata is missing.",
        file,
        location: { line: parsed.frontmatterStartLine, column: 1 },
        evidence: { type: "metadata", field: "cabinetArtifact", value: null },
        remediation:
          "Add a cabinetArtifact object with name, description, and unlocksOn.",
        validator: "cabinet",
      }),
    );
    return findings;
  }

  if (typeof value === "string" || Array.isArray(value) || value === null) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-001",
        status: "FAIL",
        message:
          "cabinetArtifact is malformed; expected an object with name, description, and unlocksOn.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: { type: "metadata", field: "cabinetArtifact", value },
        remediation: "Replace cabinetArtifact with the live object structure.",
        validator: "cabinet",
      }),
    );
    return findings;
  }

  if (typeof value !== "object") {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-001",
        status: "FAIL",
        message: "cabinetArtifact has an invalid type.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: { type: "metadata", field: "cabinetArtifact", value },
        remediation: "Use a cabinetArtifact object.",
        validator: "cabinet",
      }),
    );
    return findings;
  }

  findings.push(
    passFinding({
      ruleId: "CP-CAB-001",
      file,
      message: "cabinetArtifact metadata object is present.",
      validator: "cabinet",
    }),
  );

  const artifact = value as Record<string, unknown>;

  if (!isNonEmptyString(artifact.name)) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-002",
        status: "FAIL",
        message: "cabinetArtifact.name is missing or empty.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: {
          type: "metadata",
          field: "cabinetArtifact.name",
          value: artifact.name ?? null,
        },
        remediation: "Set cabinetArtifact.name to a non-empty string.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-CAB-002",
        file,
        message: "cabinetArtifact.name is present and non-empty.",
        validator: "cabinet",
      }),
    );
  }

  if (!isNonEmptyString(artifact.description)) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-003",
        status: "FAIL",
        message: "cabinetArtifact.description is missing or empty.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: {
          type: "metadata",
          field: "cabinetArtifact.description",
          value: artifact.description ?? null,
        },
        remediation: "Set cabinetArtifact.description to a non-empty string.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-CAB-003",
        file,
        message: "cabinetArtifact.description is present and non-empty.",
        validator: "cabinet",
      }),
    );
  }

  if (!hasOwnField(artifact, "unlocksOn")) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-004",
        status: "FAIL",
        message: "cabinetArtifact.unlocksOn is missing.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: {
          type: "metadata",
          field: "cabinetArtifact.unlocksOn",
          value: null,
        },
        remediation: `Set unlocksOn to a supported value (${Array.from(SUPPORTED_UNLOCKS_ON).join(", ")}).`,
        validator: "cabinet",
      }),
    );
  } else if (!isNonEmptyString(artifact.unlocksOn)) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-004",
        status: "FAIL",
        message: "cabinetArtifact.unlocksOn must be a non-empty string.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: {
          type: "metadata",
          field: "cabinetArtifact.unlocksOn",
          value: artifact.unlocksOn ?? null,
        },
        remediation: `Set unlocksOn to a supported value (${Array.from(SUPPORTED_UNLOCKS_ON).join(", ")}).`,
        validator: "cabinet",
      }),
    );
  } else if (!SUPPORTED_UNLOCKS_ON.has(artifact.unlocksOn)) {
    findings.push(
      createFinding({
        ruleId: "CP-CAB-004",
        status: "FAIL",
        message: `cabinetArtifact.unlocksOn "${artifact.unlocksOn}" is not a supported live unlock value.`,
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: {
          type: "metadata",
          field: "cabinetArtifact.unlocksOn",
          value: artifact.unlocksOn,
          expected: Array.from(SUPPORTED_UNLOCKS_ON).join(", "),
        },
        remediation: `Use a supported unlocksOn value (${Array.from(SUPPORTED_UNLOCKS_ON).join(", ")}).`,
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-CAB-004",
        file,
        message: "cabinetArtifact.unlocksOn uses a supported live value.",
        validator: "cabinet",
        evidence: {
          type: "metadata",
          field: "cabinetArtifact.unlocksOn",
          value: artifact.unlocksOn,
        },
      }),
    );
  }

  return findings;
}

function significantNameTokens(name: string): string[] {
  return name
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

function nameAppearsInBody(name: string, body: string): boolean {
  const normalizedBody = body.toLowerCase();
  const normalizedName = name.toLowerCase().trim();
  if (normalizedName.length > 0 && normalizedBody.includes(normalizedName)) {
    return true;
  }

  const tokens = significantNameTokens(name);
  if (tokens.length === 0) {
    return false;
  }

  const matched = tokens.filter((token) => normalizedBody.includes(token));
  return matched.length >= Math.ceil(tokens.length * 0.5);
}

function hasCabinetOrPortfolioSection(
  module: DiscoveredModule,
  headings: HeadingInfo[],
): boolean {
  if (module.family === "foundation") {
    return Boolean(hasFoundationPortfolio(headings));
  }
  if (module.family === "ot-security") {
    return Boolean(hasOtCabinet(headings));
  }
  return Boolean(
    hasFoundationPortfolio(headings) || hasOtCabinet(headings),
  );
}

/**
 * Structural body/metadata consistency only.
 * Exact wording is not required; semantic alignment remains human review.
 */
function validateCabinetBodyConsistency(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
  body: string,
  headings: HeadingInfo[],
): QaFinding[] {
  const artifact = parsed.data.cabinetArtifact;
  if (
    artifact === null ||
    typeof artifact !== "object" ||
    Array.isArray(artifact)
  ) {
    return [];
  }

  const name = (artifact as Record<string, unknown>).name;
  if (!isNonEmptyString(name)) {
    return [];
  }

  if (nameAppearsInBody(name, body)) {
    return [
      passFinding({
        ruleId: "CP-CAB-007",
        file: module.relativePath,
        message:
          "Frontmatter cabinetArtifact.name is reflected in the module body.",
        validator: "cabinet",
      }),
    ];
  }

  if (hasCabinetOrPortfolioSection(module, headings)) {
    return [
      passFinding({
        ruleId: "CP-CAB-007",
        file: module.relativePath,
        message:
          "Cabinet/portfolio section is present for the declared artifact (exact name match not required).",
        validator: "cabinet",
      }),
    ];
  }

  return [
    createFinding({
      ruleId: "CP-CAB-007",
      status: "WARNING",
      message: `cabinetArtifact.name "${name}" has no corresponding Cabinet/portfolio section or body reference.`,
      file: module.relativePath,
      location: fieldLocation(parsed, "cabinetArtifact"),
      evidence: {
        type: "relationship",
        field: "cabinetArtifact.name",
        expected: "Cabinet/portfolio section or artifact name reference",
        actual: name,
      },
      remediation:
        "Add a Cabinet/portfolio section that produces the declared artifact, or align the artifact name with the body.",
      validator: "cabinet",
    }),
  ];
}

function validateFoundationStructure(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
  headings: HeadingInfo[],
  familySlugs: ReadonlySet<string>,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const file = module.relativePath;

  const handsOn = hasFoundationHandsOn(headings);
  if (!handsOn) {
    findings.push(
      createFinding({
        ruleId: "CP-FOUND-002",
        status: "FAIL",
        message: "Foundation module is missing a hands-on lab/exercise section.",
        file,
        evidence: {
          type: "text",
          expected: "Hands-On Lab (or equivalent)",
          actual: headings.map((heading) => heading.title).join(" | "),
        },
        remediation: "Add a hands-on lab section for the practical work.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FOUND-002",
        file,
        message: `Hands-on section present: "${handsOn.title}".`,
        validator: "cabinet",
      }),
    );
  }

  const enterprise = hasFoundationEnterprise(headings);
  if (!enterprise) {
    findings.push(
      createFinding({
        ruleId: "CP-FOUND-004",
        status: "FAIL",
        message: "Foundation module is missing an enterprise/job-context section.",
        file,
        evidence: {
          type: "text",
          expected: "Enterprise Equivalent (or equivalent)",
          actual: headings.map((heading) => heading.title).join(" | "),
        },
        remediation: "Add an enterprise equivalent/context section.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FOUND-004",
        file,
        message: `Enterprise section present: "${enterprise.title}".`,
        validator: "cabinet",
      }),
    );
  }

  const portfolio = hasFoundationPortfolio(headings);
  if (!portfolio) {
    findings.push(
      createFinding({
        ruleId: "CP-FOUND-005",
        status: "FAIL",
        message:
          "Foundation module is missing a portfolio/Cabinet output section.",
        file,
        evidence: {
          type: "text",
          expected: "Portfolio Entry / Cabinet artifact section",
          actual: headings.map((heading) => heading.title).join(" | "),
        },
        remediation:
          "Add a portfolio entry or Cabinet artifact section corresponding to cabinetArtifact.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FOUND-005",
        file,
        message: `Portfolio/Cabinet section present: "${portfolio.title}".`,
        validator: "cabinet",
      }),
    );
  }

  findings.push(
    ...validateFoundationNavigation(module, parsed, familySlugs),
  );

  return findings;
}

function validateFoundationNavigation(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
  familySlugs: ReadonlySet<string>,
): QaFinding[] {
  const file = module.relativePath;
  if (!hasOwnField(parsed.data, "nextModule")) {
    return [
      passFinding({
        ruleId: "CP-FOUND-008",
        file,
        message:
          "nextModule is omitted; Foundation terminal navigation is not claimed via null.",
        validator: "cabinet",
        idSuffix: "omitted",
      }),
    ];
  }

  const nextModule = parsed.data.nextModule;
  if (nextModule === null) {
    return [
      passFinding({
        ruleId: "CP-FOUND-008",
        file,
        message:
          "nextModule is explicitly null (valid terminal Foundation navigation).",
        validator: "cabinet",
      }),
    ];
  }

  if (typeof nextModule !== "string" || nextModule.trim() === "") {
    return [
      createFinding({
        ruleId: "CP-FOUND-008",
        status: "FAIL",
        message: "Foundation nextModule must be a slug string or null.",
        file,
        location: fieldLocation(parsed, "nextModule"),
        evidence: { type: "metadata", field: "nextModule", value: nextModule },
        remediation:
          "Set nextModule to an existing Foundation slug or null for the final module.",
        validator: "cabinet",
      }),
    ];
  }

  const ownSlug = isNonEmptyString(parsed.data.slug) ? parsed.data.slug : null;
  if (ownSlug && nextModule === ownSlug) {
    return [
      createFinding({
        ruleId: "CP-FOUND-008",
        status: "FAIL",
        message: `Foundation nextModule must not self-reference "${ownSlug}".`,
        file,
        location: fieldLocation(parsed, "nextModule"),
        evidence: {
          type: "relationship",
          field: "nextModule",
          actual: nextModule,
        },
        remediation: "Change nextModule so it does not point at this module.",
        validator: "cabinet",
      }),
    ];
  }

  if (!familySlugs.has(nextModule)) {
    return [
      createFinding({
        ruleId: "CP-FOUND-008",
        status: "FAIL",
        message: `Foundation nextModule "${nextModule}" does not resolve to an implemented Foundation module.`,
        file,
        location: fieldLocation(parsed, "nextModule"),
        evidence: {
          type: "relationship",
          field: "nextModule",
          expected: "existing Foundation module slug",
          actual: nextModule,
        },
        remediation:
          "Point nextModule at an implemented Foundation module or set null if this is final.",
        validator: "cabinet",
      }),
    ];
  }

  return [
    passFinding({
      ruleId: "CP-FOUND-008",
      file,
      message: "Foundation nextModule resolves within the Foundation family.",
      validator: "cabinet",
    }),
  ];
}

function validateOtStructure(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
  headings: HeadingInfo[],
  familySlugs: ReadonlySet<string>,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const file = module.relativePath;

  const handsOn = hasOtHandsOn(headings);
  if (!handsOn) {
    findings.push(
      createFinding({
        ruleId: "CP-OT-003",
        status: "FAIL",
        message: "OT module is missing a hands-on/practical section.",
        file,
        evidence: {
          type: "text",
          expected: "Section 3 hands-on (or equivalent)",
          actual: headings.map((heading) => heading.title).join(" | "),
        },
        remediation: "Add an OT hands-on section with practical work.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-OT-003",
        file,
        message: `OT hands-on section present: "${handsOn.title}".`,
        validator: "cabinet",
      }),
    );

    const stepCount = countPracticalSteps(handsOn.body);
    if (stepCount === 0) {
      findings.push(
        createFinding({
          ruleId: "CP-OT-006",
          status: "WARNING",
          message:
            "OT hands-on section has no identifiable numbered practical steps.",
          file,
          location: { line: handsOn.line, column: 1 },
          evidence: {
            type: "text",
            expected: "Step 1, Step 2, ...",
            actual: handsOn.title,
          },
          remediation:
            "Add numbered practical steps to the OT hands-on section when the lab is step-based.",
          validator: "cabinet",
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-OT-006",
          file,
          message: `OT hands-on section includes ${stepCount} identifiable practical step(s).`,
          validator: "cabinet",
        }),
      );
    }
  }

  const enterprise = hasOtEnterprise(headings);
  if (!enterprise) {
    findings.push(
      createFinding({
        ruleId: "CP-OT-004",
        status: "FAIL",
        message: "OT module is missing an enterprise/job-context section.",
        file,
        evidence: {
          type: "text",
          expected: "Section 4 enterprise (or equivalent)",
          actual: headings.map((heading) => heading.title).join(" | "),
        },
        remediation: "Add an OT enterprise equivalent/context section.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-OT-004",
        file,
        message: `OT enterprise section present: "${enterprise.title}".`,
        validator: "cabinet",
      }),
    );
  }

  const cabinet = hasOtCabinet(headings);
  if (!cabinet) {
    findings.push(
      createFinding({
        ruleId: "CP-OT-005",
        status: "FAIL",
        message: "OT module is missing a Cabinet/artifact section.",
        file,
        evidence: {
          type: "text",
          expected: "Section 5 Cabinet (or equivalent)",
          actual: headings.map((heading) => heading.title).join(" | "),
        },
        remediation: "Add an OT Cabinet/artifact section.",
        validator: "cabinet",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-OT-005",
        file,
        message: `OT Cabinet section present: "${cabinet.title}".`,
        validator: "cabinet",
      }),
    );
  }

  findings.push(...validateOtNavigation(module, parsed, familySlugs));
  return findings;
}

function validateOtNavigation(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
  familySlugs: ReadonlySet<string>,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const file = module.relativePath;
  const ownSlug = isNonEmptyString(parsed.data.slug) ? parsed.data.slug : null;

  for (const field of ["previousModule", "nextModule"] as const) {
    if (!hasOwnField(parsed.data, field)) {
      findings.push(
        passFinding({
          ruleId: "CP-OT-008",
          file,
          message: `${field} omitted (valid for first/final OT modules).`,
          validator: "cabinet",
          idSuffix: `${field}-omitted`,
        }),
      );
      continue;
    }

    const value = parsed.data[field];
    if (field === "nextModule" && value === null) {
      findings.push(
        passFinding({
          ruleId: "CP-OT-008",
          file,
          message: "nextModule is explicitly null (valid terminal OT navigation).",
          validator: "cabinet",
          idSuffix: "next-null",
        }),
      );
      continue;
    }

    if (typeof value !== "string" || value.trim() === "") {
      findings.push(
        createFinding({
          ruleId: "CP-OT-008",
          status: "FAIL",
          message: `OT ${field} must be a module slug string${field === "nextModule" ? " or null" : ""}.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: { type: "metadata", field, value },
          remediation: `Set ${field} to an existing OT module slug.`,
          validator: "cabinet",
          idSuffix: field,
        }),
      );
      continue;
    }

    if (ownSlug && value === ownSlug) {
      findings.push(
        createFinding({
          ruleId: "CP-OT-008",
          status: "FAIL",
          message: `OT ${field} must not self-reference "${ownSlug}".`,
          file,
          location: fieldLocation(parsed, field),
          evidence: { type: "relationship", field, actual: value },
          remediation: `Change ${field} so it does not point at this module.`,
          validator: "cabinet",
          idSuffix: `${field}-self`,
        }),
      );
      continue;
    }

    if (!familySlugs.has(value)) {
      findings.push(
        createFinding({
          ruleId: "CP-OT-008",
          status: "FAIL",
          message: `OT ${field} "${value}" does not resolve to an implemented OT module.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: {
            type: "relationship",
            field,
            expected: "existing OT module slug",
            actual: value,
          },
          remediation: `Point ${field} at an implemented OT module slug.`,
          validator: "cabinet",
          idSuffix: field,
        }),
      );
      continue;
    }

    findings.push(
      passFinding({
        ruleId: "CP-OT-008",
        file,
        message: `OT ${field} resolves within the OT family.`,
        validator: "cabinet",
        idSuffix: field,
      }),
    );
  }

  return findings;
}

export function validateLabCabinetArtifact(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
  familySlugs: ReadonlySet<string>,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const raw = fs.readFileSync(module.absolutePath, "utf8");
  const headings = extractHeadings(raw);

  findings.push(...validateCabinetMetadata(module, parsed));

  const artifactOk = findings.every(
    (finding) =>
      !(
        finding.ruleId === "CP-CAB-001" &&
        finding.status === "FAIL"
      ),
  );

  if (module.family === "foundation") {
    findings.push(
      ...validateFoundationStructure(module, parsed, headings, familySlugs),
    );
  } else if (module.family === "ot-security") {
    findings.push(
      ...validateOtStructure(module, parsed, headings, familySlugs),
    );
  }

  if (artifactOk) {
    findings.push(
      ...validateCabinetBodyConsistency(
        module,
        parsed,
        parsed.content,
        headings,
      ),
    );
  }

  return findings;
}
