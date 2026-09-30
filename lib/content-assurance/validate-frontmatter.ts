import { validateExternalLinkUrl } from "@/lib/cabinet/validate-link-url";
import { createFinding, passFinding } from "@/lib/content-assurance/findings";
import {
  hasOwnField,
  isNonEmptyString,
  isPositiveInteger,
  locateFrontmatterField,
} from "@/lib/content-assurance/parse-frontmatter";
import type {
  ContentFamily,
  DiscoveredModule,
  ParsedFrontmatter,
  QaFinding,
} from "@/lib/content-assurance/types";
import {
  OT_SECURITY_ANALYST_ROLE_SLUG,
  OT_SECURITY_PATH_SLUG,
} from "@/types/role-path";

const ALLOWED_TOOL_TYPES = new Set(["free", "enterprise"]);

const FOUNDATION_REQUIRED_FIELDS = [
  "title",
  "slug",
  "module",
  "level",
  "description",
  "readingTime",
  "labTime",
  "tools",
  "cabinetArtifact",
] as const;

export interface ModuleValidationContext {
  module: DiscoveredModule;
  parsed: ParsedFrontmatter;
  familySlugs: ReadonlySet<string>;
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

function missingOrEmptyStringFinding(input: {
  ruleId: string;
  field: string;
  file: string;
  parsed: ParsedFrontmatter;
  validator?: string;
}): QaFinding {
  const { data } = input.parsed;
  const present = hasOwnField(data, input.field);
  const value = data[input.field];
  let message: string;
  if (!present) {
    message = `Required field '${input.field}' is missing.`;
  } else if (typeof value !== "string") {
    message = `Required field '${input.field}' has invalid type ${describeType(value)}; expected a non-empty string.`;
  } else {
    message = `Required field '${input.field}' is empty.`;
  }

  return createFinding({
    ruleId: input.ruleId,
    status: "FAIL",
    message,
    file: input.file,
    location: fieldLocation(input.parsed, input.field),
    evidence: {
      type: "metadata",
      field: input.field,
      value: present ? value : null,
    },
    remediation: `Add a non-empty '${input.field}' string to the module frontmatter.`,
    validator: input.validator ?? "frontmatter",
    idSuffix: input.field,
  });
}

function describeType(value: unknown): string {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  return typeof value;
}

export function validateFamilyRules(
  module: DiscoveredModule,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const file = module.relativePath;

  if (module.family === "foundation") {
    findings.push(
      passFinding({
        ruleId: "CP-FAMILY-001",
        file,
        message: "Module classified as Foundation from repository path.",
        validator: "module-family",
        evidence: {
          type: "metadata",
          field: "family",
          value: "foundation",
        },
      }),
    );
  } else if (module.family === "ot-security") {
    findings.push(
      passFinding({
        ruleId: "CP-FAMILY-002",
        file,
        message: "Module classified as OT Security from repository path.",
        validator: "module-family",
        evidence: {
          type: "metadata",
          field: "family",
          value: "ot-security",
        },
      }),
    );
    findings.push(
      passFinding({
        ruleId: "CP-FAMILY-003",
        file,
        message:
          "OT module is not evaluated against Foundation-only heading skeletons.",
        validator: "module-family",
      }),
    );
  } else {
    findings.push(
      createFinding({
        ruleId: "CP-FAMILY-001",
        status: "FAIL",
        message:
          "Module path is not under a supported Foundation or OT Security content family.",
        file,
        evidence: {
          type: "file",
          actual: module.relativePath,
          expected: "content/foundations/ or content/paths/ot-security/",
        },
        remediation:
          "Place the module under content/foundations/ or content/paths/ot-security/, or extend the QA family support intentionally.",
        validator: "module-family",
      }),
    );
  }

  findings.push(
    passFinding({
      ruleId: "CP-FAMILY-004",
      file,
      message:
        "Identical heading order is not required; CP-AUTO-005 does not enforce a rigid heading template.",
      validator: "module-family",
    }),
  );

  return findings;
}

export function validateFrontmatterFields(
  ctx: ModuleValidationContext,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const { module, parsed, familySlugs } = ctx;
  const file = module.relativePath;
  const { data } = parsed;

  if (module.family === "foundation") {
    const missing = FOUNDATION_REQUIRED_FIELDS.filter(
      (field) => !hasOwnField(data, field),
    );
    if (missing.length > 0) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-001",
          status: "FAIL",
          message: `Required Foundation metadata missing: ${missing.join(", ")}.`,
          file,
          location: { line: parsed.frontmatterStartLine, column: 1 },
          evidence: {
            type: "metadata",
            field: missing.join(","),
            value: null,
          },
          remediation:
            "Add the missing Foundation frontmatter fields used by the live module schema.",
          validator: "frontmatter",
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-FM-001",
          file,
          message: "Required Foundation metadata fields are present.",
          validator: "frontmatter",
        }),
      );
    }
  }

  if (module.family === "ot-security") {
    const otMissing = (["roleSlug", "pathSlug"] as const).filter(
      (field) => !hasOwnField(data, field),
    );
    if (otMissing.length > 0) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-002",
          status: "FAIL",
          message: `Required OT metadata missing: ${otMissing.join(", ")}.`,
          file,
          location: { line: parsed.frontmatterStartLine, column: 1 },
          evidence: {
            type: "metadata",
            field: otMissing.join(","),
            value: null,
          },
          remediation: "Add non-empty roleSlug and pathSlug to OT module frontmatter.",
          validator: "frontmatter",
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-FM-002",
          file,
          message: "Required OT role/path metadata fields are present.",
          validator: "frontmatter",
        }),
      );
    }
  }

  // CP-FM-003 slug
  if (!isNonEmptyString(data.slug)) {
    findings.push(
      missingOrEmptyStringFinding({
        ruleId: "CP-FM-003",
        field: "slug",
        file,
        parsed,
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FM-003",
        file,
        message: "slug is present and non-empty.",
        validator: "frontmatter",
        evidence: { type: "metadata", field: "slug", value: data.slug },
      }),
    );
  }

  // CP-FM-006 title
  if (!isNonEmptyString(data.title)) {
    findings.push(
      missingOrEmptyStringFinding({
        ruleId: "CP-FM-006",
        field: "title",
        file,
        parsed,
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FM-006",
        file,
        message: "title is present and non-empty.",
        validator: "frontmatter",
      }),
    );
  }

  // CP-FM-007 description
  if (!isNonEmptyString(data.description)) {
    findings.push(
      missingOrEmptyStringFinding({
        ruleId: "CP-FM-007",
        field: "description",
        file,
        parsed,
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FM-007",
        file,
        message: "description is present and non-empty.",
        validator: "frontmatter",
      }),
    );
  }

  // CP-FM-005 module number
  findings.push(...validateModuleNumber(module.family, file, parsed));

  // CP-FM-008 / CP-FM-009 string times (live type is string)
  findings.push(...validateTimeField("CP-FM-008", "readingTime", file, parsed));
  findings.push(...validateTimeField("CP-FM-009", "labTime", file, parsed));

  // tools
  findings.push(...validateTools(file, parsed));

  // cabinet artifact
  findings.push(...validateCabinetArtifact(file, parsed));

  // navigation refs (per-module portion)
  findings.push(...validateNavigationFields(file, parsed, familySlugs, data.slug));

  return findings;
}

function validateModuleNumber(
  family: ContentFamily,
  file: string,
  parsed: ParsedFrontmatter,
): QaFinding[] {
  const value = parsed.data.module;
  if (!hasOwnField(parsed.data, "module")) {
    return [
      createFinding({
        ruleId: "CP-FM-005",
        status: "FAIL",
        message: "Required field 'module' is missing.",
        file,
        location: fieldLocation(parsed, "module"),
        evidence: { type: "metadata", field: "module", value: null },
        remediation:
          "Add a positive integer 'module' field matching the family module index.",
        validator: "frontmatter",
      }),
    ];
  }

  if (!isPositiveInteger(value)) {
    return [
      createFinding({
        ruleId: "CP-FM-005",
        status: "FAIL",
        message: `Field 'module' has invalid type/value ${JSON.stringify(value)}; expected a positive integer.`,
        file,
        location: fieldLocation(parsed, "module"),
        evidence: { type: "metadata", field: "module", value },
        remediation:
          "Set module to a positive integer consistent with the module family index.",
        validator: "frontmatter",
      }),
    ];
  }

  if (family === "unknown") {
    return [
      createFinding({
        ruleId: "CP-FM-005",
        status: "FAIL",
        message: "Cannot validate module number for an unsupported content family.",
        file,
        location: fieldLocation(parsed, "module"),
        evidence: { type: "metadata", field: "module", value },
        remediation: "Place the module in a supported family directory.",
        validator: "frontmatter",
      }),
    ];
  }

  return [
    passFinding({
      ruleId: "CP-FM-005",
      file,
      message: "module is a positive integer.",
      validator: "frontmatter",
      evidence: { type: "metadata", field: "module", value },
      idSuffix: "type",
    }),
  ];
}

function validateTimeField(
  ruleId: "CP-FM-008" | "CP-FM-009",
  field: "readingTime" | "labTime",
  file: string,
  parsed: ParsedFrontmatter,
): QaFinding[] {
  const value = parsed.data[field];
  if (!isNonEmptyString(value)) {
    return [
      missingOrEmptyStringFinding({
        ruleId,
        field,
        file,
        parsed,
      }),
    ];
  }

  return [
    passFinding({
      ruleId,
      file,
      message: `${field} is a non-empty string matching the live type.`,
      validator: "frontmatter",
      evidence: { type: "metadata", field, value },
    }),
  ];
}

function validateTools(file: string, parsed: ParsedFrontmatter): QaFinding[] {
  const findings: QaFinding[] = [];
  const value = parsed.data.tools;

  if (!hasOwnField(parsed.data, "tools")) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-010",
        status: "FAIL",
        message: "Required field 'tools' is missing.",
        file,
        location: fieldLocation(parsed, "tools"),
        evidence: { type: "metadata", field: "tools", value: null },
        remediation:
          "Add a tools array of objects with name and type (free|enterprise).",
        validator: "frontmatter",
      }),
    );
    return findings;
  }

  if (!Array.isArray(value)) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-010",
        status: "FAIL",
        message: `Field 'tools' has invalid type ${describeType(value)}; expected an array of tool objects.`,
        file,
        location: fieldLocation(parsed, "tools"),
        evidence: { type: "metadata", field: "tools", value },
        remediation:
          "Replace string-only tools with the live structured tools array.",
        validator: "frontmatter",
      }),
    );
    return findings;
  }

  if (value.length === 0) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-010",
        status: "FAIL",
        message: "Field 'tools' is an empty array.",
        file,
        location: fieldLocation(parsed, "tools"),
        evidence: { type: "metadata", field: "tools", value },
        remediation: "Include at least one structured tool object.",
        validator: "frontmatter",
      }),
    );
    return findings;
  }

  let structuredOk = true;
  value.forEach((entry, index) => {
    if (typeof entry === "string") {
      structuredOk = false;
      findings.push(
        createFinding({
          ruleId: "CP-FM-010",
          status: "FAIL",
          message: `tools[${index}] uses the old string-only representation.`,
          file,
          location: fieldLocation(parsed, "tools"),
          evidence: { type: "metadata", field: `tools[${index}]`, value: entry },
          remediation:
            "Use an object with name and type instead of a bare string.",
          validator: "frontmatter",
          idSuffix: String(index),
        }),
      );
      return;
    }

    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      structuredOk = false;
      findings.push(
        createFinding({
          ruleId: "CP-FM-010",
          status: "FAIL",
          message: `tools[${index}] is not an object.`,
          file,
          location: fieldLocation(parsed, "tools"),
          evidence: { type: "metadata", field: `tools[${index}]`, value: entry },
          remediation: "Each tools entry must be an object with name and type.",
          validator: "frontmatter",
          idSuffix: String(index),
        }),
      );
      return;
    }

    const tool = entry as Record<string, unknown>;

    if (!isNonEmptyString(tool.name) || !isNonEmptyString(tool.type)) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-011",
          status: "FAIL",
          message: `tools[${index}] must contain non-empty name and type.`,
          file,
          location: fieldLocation(parsed, "tools"),
          evidence: {
            type: "metadata",
            field: `tools[${index}]`,
            value: { name: tool.name ?? null, type: tool.type ?? null },
          },
          remediation:
            "Set tools[].name and tools[].type to non-empty strings (type: free|enterprise).",
          validator: "frontmatter",
          idSuffix: String(index),
        }),
      );
    } else if (!ALLOWED_TOOL_TYPES.has(tool.type)) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-011",
          status: "FAIL",
          message: `tools[${index}].type '${tool.type}' is not an allowed live value (free|enterprise).`,
          file,
          location: fieldLocation(parsed, "tools"),
          evidence: {
            type: "metadata",
            field: `tools[${index}].type`,
            value: tool.type,
          },
          remediation: "Use type: free or type: enterprise.",
          validator: "frontmatter",
          idSuffix: `${index}-type`,
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-FM-011",
          file,
          message: `tools[${index}] has name and type.`,
          validator: "frontmatter",
          idSuffix: String(index),
        }),
      );
    }

    if (hasOwnField(tool, "url") && tool.url !== undefined && tool.url !== null) {
      if (typeof tool.url !== "string" || tool.url.trim() === "") {
        findings.push(
          createFinding({
            ruleId: "CP-FM-012",
            status: "FAIL",
            message: `tools[${index}].url is present but empty or not a string.`,
            file,
            location: fieldLocation(parsed, "tools"),
            evidence: {
              type: "metadata",
              field: `tools[${index}].url`,
              value: tool.url,
            },
            remediation: "Provide a valid http(s) URL or omit url.",
            validator: "frontmatter",
            idSuffix: `${index}-url`,
          }),
        );
      } else {
        const urlCheck = validateExternalLinkUrl(tool.url);
        if (!urlCheck.valid) {
          findings.push(
            createFinding({
              ruleId: "CP-FM-012",
              status: "FAIL",
              message: `tools[${index}].url is not a valid http(s) URL.`,
              file,
              location: fieldLocation(parsed, "tools"),
              evidence: {
                type: "metadata",
                field: `tools[${index}].url`,
                value: tool.url,
              },
              remediation:
                urlCheck.error ?? "Use a full http:// or https:// URL.",
              validator: "frontmatter",
              idSuffix: `${index}-url`,
            }),
          );
        } else {
          findings.push(
            passFinding({
              ruleId: "CP-FM-012",
              file,
              message: `tools[${index}].url has valid syntax.`,
              validator: "frontmatter",
              idSuffix: `${index}-url`,
            }),
          );
        }
      }
    }
  });

  if (structuredOk) {
    findings.push(
      passFinding({
        ruleId: "CP-FM-010",
        file,
        message: "tools uses the live structured object representation.",
        validator: "frontmatter",
      }),
    );
  }

  return findings;
}

function validateCabinetArtifact(
  file: string,
  parsed: ParsedFrontmatter,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const value = parsed.data.cabinetArtifact;

  if (!hasOwnField(parsed.data, "cabinetArtifact")) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-014",
        status: "FAIL",
        message: "Required field 'cabinetArtifact' is missing.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: { type: "metadata", field: "cabinetArtifact", value: null },
        remediation:
          "Add a cabinetArtifact object with name and description.",
        validator: "frontmatter",
      }),
    );
    return findings;
  }

  if (typeof value === "string") {
    findings.push(
      createFinding({
        ruleId: "CP-FM-014",
        status: "FAIL",
        message:
          "cabinetArtifact uses the old string representation; live schema requires an object.",
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: { type: "metadata", field: "cabinetArtifact", value },
        remediation:
          "Replace the string with an object containing name and description.",
        validator: "frontmatter",
      }),
    );
    return findings;
  }

  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-014",
        status: "FAIL",
        message: `cabinetArtifact has invalid type ${describeType(value)}; expected an object.`,
        file,
        location: fieldLocation(parsed, "cabinetArtifact"),
        evidence: { type: "metadata", field: "cabinetArtifact", value },
        remediation: "Use a cabinetArtifact object.",
        validator: "frontmatter",
      }),
    );
    return findings;
  }

  findings.push(
    passFinding({
      ruleId: "CP-FM-014",
      file,
      message: "cabinetArtifact is an object.",
      validator: "frontmatter",
    }),
  );

  const artifact = value as Record<string, unknown>;

  if (!isNonEmptyString(artifact.name)) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-015",
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
        validator: "frontmatter",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FM-015",
        file,
        message: "cabinetArtifact.name is present and non-empty.",
        validator: "frontmatter",
      }),
    );
  }

  if (!isNonEmptyString(artifact.description)) {
    findings.push(
      createFinding({
        ruleId: "CP-FM-016",
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
        validator: "frontmatter",
      }),
    );
  } else {
    findings.push(
      passFinding({
        ruleId: "CP-FM-016",
        file,
        message: "cabinetArtifact.description is present and non-empty.",
        validator: "frontmatter",
      }),
    );
  }

  return findings;
}

function validateNavigationFields(
  file: string,
  parsed: ParsedFrontmatter,
  familySlugs: ReadonlySet<string>,
  slugValue: unknown,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const ownSlug = isNonEmptyString(slugValue) ? slugValue : null;
  const { data } = parsed;

  for (const field of ["previousModule", "nextModule"] as const) {
    if (!hasOwnField(data, field)) {
      continue;
    }

    const value = data[field];

    if (field === "nextModule" && value === null) {
      findings.push(
        passFinding({
          ruleId: "CP-FM-021",
          file,
          message:
            "nextModule is explicitly null (terminal navigation; distinct from a missing field).",
          validator: "frontmatter",
          evidence: { type: "metadata", field: "nextModule", value: null },
        }),
      );
      continue;
    }

    if (value === null) {
      // previousModule: null is unusual but treat as empty reference failure when present
      findings.push(
        createFinding({
          ruleId: "CP-FM-018",
          status: "FAIL",
          message: `${field} is null; omit the field or set a valid in-family slug.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: { type: "metadata", field, value: null },
          remediation: `Set ${field} to a valid module slug or remove the field.`,
          validator: "frontmatter",
          idSuffix: field,
        }),
      );
      continue;
    }

    if (typeof value !== "string" || value.trim() === "") {
      findings.push(
        createFinding({
          ruleId: "CP-FM-018",
          status: "FAIL",
          message: `${field} must be a non-empty slug string when present.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: { type: "metadata", field, value },
          remediation: `Set ${field} to a valid in-family module slug.`,
          validator: "frontmatter",
          idSuffix: field,
        }),
      );
      continue;
    }

    if (ownSlug && value === ownSlug) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-019",
          status: "FAIL",
          message: `${field} must not reference the module's own slug.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: { type: "metadata", field, value },
          remediation: `Change ${field} so it does not self-reference.`,
          validator: "frontmatter",
          idSuffix: field,
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-FM-019",
          file,
          message: `${field} does not self-reference.`,
          validator: "frontmatter",
          idSuffix: field,
        }),
      );
    }

    if (!familySlugs.has(value)) {
      findings.push(
        createFinding({
          ruleId: "CP-FM-018",
          status: "FAIL",
          message: `${field} '${value}' does not resolve to a module in the same family.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: {
            type: "relationship",
            field,
            expected: "slug of an implemented in-family module",
            actual: value,
          },
          remediation: `Point ${field} at an existing module slug in the same family.`,
          validator: "frontmatter",
          idSuffix: field,
        }),
      );
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-004",
          status: "FAIL",
          message: `Internal reference ${field}='${value}' does not resolve.`,
          file,
          location: fieldLocation(parsed, field),
          evidence: {
            type: "relationship",
            field,
            expected: "existing supported module",
            actual: value,
          },
          remediation: "Fix or remove the broken module reference.",
          validator: "consistency",
          idSuffix: field,
        }),
      );
    } else {
      findings.push(
        passFinding({
          ruleId: "CP-FM-018",
          file,
          message: `${field} resolves within the module family.`,
          validator: "frontmatter",
          idSuffix: field,
        }),
      );
      findings.push(
        passFinding({
          ruleId: "CP-CONSIST-004",
          file,
          message: `Internal reference ${field} resolves.`,
          validator: "consistency",
          idSuffix: field,
        }),
      );
    }
  }

  return findings;
}

export function validatePathConsistency(
  ctx: ModuleValidationContext,
): QaFinding[] {
  const findings: QaFinding[] = [];
  const { module, parsed } = ctx;
  const file = module.relativePath;
  const slug = parsed.data.slug;

  if (isNonEmptyString(slug) && slug !== module.fileSlug) {
    findings.push(
      createFinding({
        ruleId: "CP-CONSIST-001",
        status: "FAIL",
        message: `Frontmatter slug '${slug}' does not match filename slug '${module.fileSlug}'.`,
        file,
        location: fieldLocation(parsed, "slug"),
        evidence: {
          type: "relationship",
          expected: module.fileSlug,
          actual: slug,
          field: "slug",
        },
        remediation:
          "Set slug to the MDX basename (repository loader convention).",
        validator: "consistency",
      }),
    );
  } else if (isNonEmptyString(slug)) {
    findings.push(
      passFinding({
        ruleId: "CP-CONSIST-001",
        file,
        message: "Frontmatter slug matches the file basename.",
        validator: "consistency",
        idSuffix: "slug",
      }),
    );
  }

  if (module.family === "ot-security") {
    const pathSlug = parsed.data.pathSlug;
    const roleSlug = parsed.data.roleSlug;

    if (isNonEmptyString(pathSlug) && pathSlug !== OT_SECURITY_PATH_SLUG) {
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-001",
          status: "FAIL",
          message: `pathSlug '${pathSlug}' does not match OT path '${OT_SECURITY_PATH_SLUG}'.`,
          file,
          location: fieldLocation(parsed, "pathSlug"),
          evidence: {
            type: "relationship",
            field: "pathSlug",
            expected: OT_SECURITY_PATH_SLUG,
            actual: pathSlug,
          },
          remediation: `Set pathSlug to '${OT_SECURITY_PATH_SLUG}'.`,
          validator: "consistency",
          idSuffix: "pathSlug",
        }),
      );
    } else if (isNonEmptyString(pathSlug)) {
      findings.push(
        passFinding({
          ruleId: "CP-CONSIST-001",
          file,
          message: "pathSlug matches the OT path convention.",
          validator: "consistency",
          idSuffix: "pathSlug",
        }),
      );
    }

    if (
      isNonEmptyString(roleSlug) &&
      roleSlug !== OT_SECURITY_ANALYST_ROLE_SLUG
    ) {
      findings.push(
        createFinding({
          ruleId: "CP-CONSIST-001",
          status: "FAIL",
          message: `roleSlug '${roleSlug}' does not match '${OT_SECURITY_ANALYST_ROLE_SLUG}'.`,
          file,
          location: fieldLocation(parsed, "roleSlug"),
          evidence: {
            type: "relationship",
            field: "roleSlug",
            expected: OT_SECURITY_ANALYST_ROLE_SLUG,
            actual: roleSlug,
          },
          remediation: `Set roleSlug to '${OT_SECURITY_ANALYST_ROLE_SLUG}'.`,
          validator: "consistency",
          idSuffix: "roleSlug",
        }),
      );
    } else if (isNonEmptyString(roleSlug)) {
      findings.push(
        passFinding({
          ruleId: "CP-CONSIST-001",
          file,
          message: "roleSlug matches the OT role convention.",
          validator: "consistency",
          idSuffix: "roleSlug",
        }),
      );
    }
  }

  return findings;
}
