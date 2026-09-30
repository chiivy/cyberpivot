import { FOUNDATION_MODULES } from "@/lib/foundations/foundation-modules-index";
import { createFinding, passFinding } from "@/lib/content-assurance/findings";
import { locateFrontmatterField } from "@/lib/content-assurance/parse-frontmatter";
import { OT_SECURITY_MODULES } from "@/lib/roles/ot-security/ot-modules-index";
import { OT_SECURITY_ANALYST_ROLE } from "@/lib/roles/ot-security/ot-security-analyst-role";
import type {
  ContentFamily,
  DiscoveredModule,
  ParsedFrontmatter,
  QaFinding,
} from "@/lib/content-assurance/types";
import { isNonEmptyString } from "@/lib/content-assurance/parse-frontmatter";

export interface IndexedModuleSnapshot {
  module: DiscoveredModule;
  parsed: ParsedFrontmatter;
  slug: string | null;
  moduleNumber: number | null;
  previousModule: string | null | undefined;
  nextModule: string | null | undefined;
  hasPreviousField: boolean;
  hasNextField: boolean;
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

export function validateSlugUniqueness(
  snapshots: IndexedModuleSnapshot[],
): QaFinding[] {
  const findings: QaFinding[] = [];
  const bySlug = new Map<string, IndexedModuleSnapshot[]>();

  for (const snapshot of snapshots) {
    if (!snapshot.slug) {
      continue;
    }
    const existing = bySlug.get(snapshot.slug) ?? [];
    existing.push(snapshot);
    bySlug.set(snapshot.slug, existing);
  }

  Array.from(bySlug.entries()).forEach(([slug, group]) => {
    if (group.length === 1) {
      const only = group[0];
      if (!only) {
        return;
      }
      findings.push(
        passFinding({
          ruleId: "CP-FM-004",
          file: only.module.relativePath,
          message: `slug '${slug}' is unique across inspected modules.`,
          validator: "frontmatter",
          evidence: { type: "metadata", field: "slug", value: slug },
        }),
      );
      return;
    }

    for (const snapshot of group) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-004",
          status: "FAIL",
          message: `slug '${slug}' is declared by ${group.length} inspected modules.`,
          file: snapshot.module.relativePath,
          location: fieldLocation(snapshot.parsed, "slug"),
          evidence: {
            type: "relationship",
            field: "slug",
            actual: group
              .map((entry: IndexedModuleSnapshot) => entry.module.relativePath)
              .join(", "),
            expected: "unique slug",
          },
          remediation: "Give each module a unique slug.",
          validator: "frontmatter",
        }),
      );
    }
  });

  return findings;
}

export function validateModuleNumberUniqueness(
  snapshots: IndexedModuleSnapshot[],
): QaFinding[] {
  const findings: QaFinding[] = [];
  const byFamily = new Map<ContentFamily, Map<number, IndexedModuleSnapshot[]>>();

  for (const snapshot of snapshots) {
    if (snapshot.moduleNumber === null) {
      continue;
    }
    if (
      snapshot.module.family !== "foundation" &&
      snapshot.module.family !== "ot-security"
    ) {
      continue;
    }

    const familyMap =
      byFamily.get(snapshot.module.family) ??
      new Map<number, IndexedModuleSnapshot[]>();
    const group = familyMap.get(snapshot.moduleNumber) ?? [];
    group.push(snapshot);
    familyMap.set(snapshot.moduleNumber, group);
    byFamily.set(snapshot.module.family, familyMap);
  }

  Array.from(byFamily.values()).forEach((familyMap) => {
    Array.from(familyMap.entries()).forEach(([moduleNumber, group]) => {
      if (group.length === 1) {
        const only = group[0];
        if (!only) {
          return;
        }
        findings.push(
          passFinding({
            ruleId: "CP-FM-005",
            file: only.module.relativePath,
            message: `module ${moduleNumber} is unique within its family.`,
            validator: "frontmatter",
            idSuffix: "unique",
            evidence: {
              type: "metadata",
              field: "module",
              value: moduleNumber,
            },
          }),
        );
        return;
      }

      for (const snapshot of group) {
        findings.push(
          createFinding({
            ruleId: "CP-FM-005",
            status: "FAIL",
            message: `module number ${moduleNumber} is used by ${group.length} modules in the same family.`,
            file: snapshot.module.relativePath,
            location: fieldLocation(snapshot.parsed, "module"),
            evidence: {
              type: "relationship",
              field: "module",
              actual: group
                .map((entry: IndexedModuleSnapshot) => entry.module.relativePath)
                .join(", "),
              expected: "unique module number within family",
            },
            remediation:
              "Use a unique module number within the Foundation or OT family.",
            validator: "frontmatter",
            idSuffix: "unique",
          }),
        );
      }
    });
  });

  return findings;
}

export function validateNavigationConsistency(
  snapshots: IndexedModuleSnapshot[],
): QaFinding[] {
  const findings: QaFinding[] = [];
  const bySlug = new Map<string, IndexedModuleSnapshot>();

  for (const snapshot of snapshots) {
    if (snapshot.slug) {
      bySlug.set(snapshot.slug, snapshot);
    }
  }

  for (const snapshot of snapshots) {
    const file = snapshot.module.relativePath;

    if (
      snapshot.hasNextField &&
      typeof snapshot.nextModule === "string" &&
      snapshot.nextModule.trim() !== ""
    ) {
      const next = bySlug.get(snapshot.nextModule);
      if (next && next.hasPreviousField) {
        if (next.previousModule !== snapshot.slug) {
          findings.push(
            createFinding({
              ruleId: "CP-FM-020",
              status: "FAIL",
              message: `Navigation contradiction: ${snapshot.slug} nextModule='${snapshot.nextModule}' but target previousModule='${String(next.previousModule)}'.`,
              file,
              location: fieldLocation(snapshot.parsed, "nextModule"),
              evidence: {
                type: "relationship",
                expected: `previousModule: ${snapshot.slug}`,
                actual: `previousModule: ${String(next.previousModule)}`,
              },
              remediation:
                "Make previous/next declarations agree between adjacent modules.",
              validator: "frontmatter",
              idSuffix: "next",
            }),
          );
        } else {
          findings.push(
            passFinding({
              ruleId: "CP-FM-020",
              file,
              message: "nextModule relationship agrees with the target previousModule.",
              validator: "frontmatter",
              idSuffix: `next:${snapshot.nextModule}`,
            }),
          );
        }
      } else if (next && !next.hasPreviousField) {
        // Target omits previousModule; not a contradiction if optional on first modules
        findings.push(
          passFinding({
            ruleId: "CP-FM-020",
            file,
            message:
              "nextModule target exists; target omits previousModule (allowed when optional).",
            validator: "frontmatter",
            idSuffix: `next:${snapshot.nextModule}`,
          }),
        );
      }
    }

    if (
      snapshot.hasPreviousField &&
      typeof snapshot.previousModule === "string" &&
      snapshot.previousModule.trim() !== ""
    ) {
      const previous = bySlug.get(snapshot.previousModule);
      if (previous && previous.hasNextField) {
        if (previous.nextModule !== snapshot.slug) {
          findings.push(
            createFinding({
              ruleId: "CP-FM-020",
              status: "FAIL",
              message: `Navigation contradiction: ${snapshot.slug} previousModule='${snapshot.previousModule}' but source nextModule='${String(previous.nextModule)}'.`,
              file,
              location: fieldLocation(snapshot.parsed, "previousModule"),
              evidence: {
                type: "relationship",
                expected: `nextModule: ${snapshot.slug}`,
                actual: `nextModule: ${String(previous.nextModule)}`,
              },
              remediation:
                "Make previous/next declarations agree between adjacent modules.",
              validator: "frontmatter",
              idSuffix: "previous",
            }),
          );
        } else {
          findings.push(
            passFinding({
              ruleId: "CP-FM-020",
              file,
              message:
                "previousModule relationship agrees with the source nextModule.",
              validator: "frontmatter",
              idSuffix: `previous:${snapshot.previousModule}`,
            }),
          );
        }
      }
    }
  }

  return findings;
}

interface RegistryEntry {
  slug: string;
  title: string;
  module: number;
  nextModule: string | null;
  previousModule?: string | null;
  status: "available" | "coming-soon";
  family: ContentFamily;
}

function registryEntries(): RegistryEntry[] {
  return [
    ...FOUNDATION_MODULES.map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      module: entry.module,
      nextModule: entry.nextModule,
      status: entry.status,
      family: "foundation" as const,
    })),
    ...OT_SECURITY_MODULES.map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      module: entry.module,
      nextModule: entry.nextModule,
      previousModule: entry.previousModule,
      status: entry.status,
      family: "ot-security" as const,
    })),
  ];
}

export function validateRegistryConsistency(
  snapshots: IndexedModuleSnapshot[],
): QaFinding[] {
  const findings: QaFinding[] = [];
  const bySlug = new Map(
    snapshots
      .filter((snapshot) => snapshot.slug)
      .map((snapshot) => [snapshot.slug as string, snapshot]),
  );

  const registry = registryEntries();
  const registrySlugs = new Set(
    registry
      .filter((entry) => entry.status === "available")
      .map((entry) => entry.slug),
  );

  /**
   * Completeness (registry → disk) only runs when the inspected tree already
   * contains at least one registry-aligned module for that family.
   * Sparse fixture/sandbox roots must not cascade into "all modules missing".
   */
  const familyHasRegistryAlignedDiscovery = {
    foundation: snapshots.some(
      (snapshot) =>
        snapshot.module.family === "foundation" &&
        snapshot.slug !== null &&
        registrySlugs.has(snapshot.slug),
    ),
    "ot-security": snapshots.some(
      (snapshot) =>
        snapshot.module.family === "ot-security" &&
        snapshot.slug !== null &&
        registrySlugs.has(snapshot.slug),
    ),
    unknown: false,
  } as const;

  for (const entry of registry) {
    if (entry.status !== "available") {
      continue;
    }

    const snapshot = bySlug.get(entry.slug);
    if (!snapshot) {
      if (!familyHasRegistryAlignedDiscovery[entry.family]) {
        continue;
      }
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-002",
          status: "FAIL",
          message: `Registry lists available module '${entry.slug}' but no matching MDX was discovered.`,
          file:
            entry.family === "foundation"
              ? `content/foundations/${entry.slug}.mdx`
              : `content/paths/ot-security/${entry.slug}.mdx`,
          evidence: {
            type: "relationship",
            expected: "discovered MDX module",
            actual: "missing",
            field: "slug",
          },
          remediation:
            "Add the MDX file or mark the registry entry as coming-soon.",
          validator: "consistency",
          idSuffix: "missing-mdx",
        }),
      );
      continue;
    }

    const mismatches: string[] = [];
    if (
      isNonEmptyString(snapshot.parsed.data.title) &&
      snapshot.parsed.data.title !== entry.title
    ) {
      mismatches.push(
        `title ('${String(snapshot.parsed.data.title)}' vs '${entry.title}')`,
      );
    }
    if (
      snapshot.moduleNumber !== null &&
      snapshot.moduleNumber !== entry.module
    ) {
      mismatches.push(
        `module (${snapshot.moduleNumber} vs ${entry.module})`,
      );
    }

    const fmNext = snapshot.hasNextField
      ? snapshot.nextModule
      : undefined;
    if (fmNext !== undefined) {
      const normalizedFmNext = fmNext === null ? null : fmNext;
      if (normalizedFmNext !== entry.nextModule) {
        mismatches.push(
          `nextModule ('${String(normalizedFmNext)}' vs '${String(entry.nextModule)}')`,
        );
      }
    }

    if (entry.family === "ot-security" && entry.previousModule !== undefined) {
      const fmPrev = snapshot.hasPreviousField
        ? snapshot.previousModule
        : undefined;
      if (fmPrev !== undefined && fmPrev !== entry.previousModule) {
        mismatches.push(
          `previousModule ('${String(fmPrev)}' vs '${String(entry.previousModule)}')`,
        );
      }
    }

    if (mismatches.length > 0) {
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-002",
          status: "FAIL",
          message: `Frontmatter conflicts with module registry for '${entry.slug}': ${mismatches.join("; ")}.`,
          file: snapshot.module.relativePath,
          location: { line: snapshot.parsed.frontmatterStartLine, column: 1 },
          evidence: {
            type: "relationship",
            expected: "registry identity fields",
            actual: mismatches.join("; "),
          },
          remediation:
            "Align MDX frontmatter with the TypeScript module index (single source of truth).",
          validator: "consistency",
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-CONSIST-002",
          file: snapshot.module.relativePath,
          message: "Frontmatter identity aligns with the module registry.",
          validator: "consistency",
        }),
      );
    }
  }

  return findings;
}

export function validateRoleModuleListConsistency(
  snapshots: IndexedModuleSnapshot[],
): QaFinding[] {
  const findings: QaFinding[] = [];
  const otSlugs = new Set(
    snapshots
      .filter((snapshot) => snapshot.module.family === "ot-security")
      .map((snapshot) => snapshot.slug)
      .filter((slug): slug is string => Boolean(slug)),
  );

  const registryOtSlugs = new Set(
    OT_SECURITY_MODULES.filter((entry) => entry.status === "available").map(
      (entry) => entry.slug,
    ),
  );
  const hasRegistryAlignedOt = Array.from(otSlugs).some((slug) =>
    registryOtSlugs.has(slug),
  );
  const hasRegistryAlignedFoundation = snapshots.some((snapshot) => {
    if (snapshot.module.family !== "foundation" || !snapshot.slug) {
      return false;
    }
    return FOUNDATION_MODULES.some(
      (entry) =>
        entry.status === "available" && entry.slug === snapshot.slug,
    );
  });

  /**
   * Role→MDX completeness is meaningful for full/partial corpus runs.
   * Skip "missing OT MDX" noise on Foundation-only fixture sandboxes.
   */
  const enforceOtRoleCompleteness =
    hasRegistryAlignedOt || hasRegistryAlignedFoundation;

  const roleFile = "lib/roles/ot-security/ot-security-analyst-role.ts";

  for (const item of OT_SECURITY_ANALYST_ROLE.modules) {
    if (item.status !== "available") {
      continue;
    }

    if (!item.slug) {
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-003",
          status: "WARNING",
          message: `Role module '${item.name}' is available but has no slug.`,
          file: roleFile,
          evidence: {
            type: "metadata",
            field: "modules",
            value: item.name,
          },
          remediation: "Add a slug that matches the OT MDX basename.",
          validator: "consistency",
          idSuffix: item.name,
        }),
      );
      continue;
    }

    if (!otSlugs.has(item.slug)) {
      if (!enforceOtRoleCompleteness) {
        continue;
      }
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-003",
          status: "WARNING",
          message: `Role lists available module '${item.slug}' but no matching OT MDX was discovered.`,
          file: roleFile,
          evidence: {
            type: "relationship",
            field: "modules",
            expected: `content/paths/ot-security/${item.slug}.mdx`,
            actual: "missing",
          },
          remediation: "Add the MDX module or mark the role module coming-soon.",
          validator: "consistency",
          idSuffix: item.slug,
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-CONSIST-003",
          file: roleFile,
          message: `Available role module '${item.slug}' has matching OT MDX.`,
          validator: "consistency",
          idSuffix: item.slug,
        }),
      );
    }
  }

  return findings;
}

export function buildSnapshot(
  module: DiscoveredModule,
  parsed: ParsedFrontmatter,
): IndexedModuleSnapshot {
  const data = parsed.data;
  const slug = isNonEmptyString(data.slug) ? data.slug : null;
  const moduleNumber =
    typeof data.module === "number" && Number.isInteger(data.module)
      ? data.module
      : null;

  const hasPreviousField = Object.prototype.hasOwnProperty.call(
    data,
    "previousModule",
  );
  const hasNextField = Object.prototype.hasOwnProperty.call(data, "nextModule");

  return {
    module,
    parsed,
    slug,
    moduleNumber,
    previousModule: hasPreviousField
      ? (data.previousModule as string | null)
      : undefined,
    nextModule: hasNextField ? (data.nextModule as string | null) : undefined,
    hasPreviousField,
    hasNextField,
  };
}
