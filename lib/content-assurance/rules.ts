import type { QaCategory, QaSeverity } from "@/lib/content-assurance/types";

export interface ContentAssuranceRule {
  ruleId: string;
  name: string;
  severity: QaSeverity;
  category: QaCategory;
  description: string;
}

export const CONTENT_ASSURANCE_RULES: readonly ContentAssuranceRule[] = [
  {
    ruleId: "CP-FILE-001",
    name: "Supported Content File Types",
    severity: "HARD",
    category: "file_integrity",
    description: "Only supported content MDX files are inspected.",
  },
  {
    ruleId: "CP-FILE-002",
    name: "Ignore Placeholder Path Directories",
    severity: "HARD",
    category: "file_integrity",
    description:
      "Directories containing only .gitkeep are not treated as completed modules.",
  },
  {
    ruleId: "CP-FILE-003",
    name: "Every Inspected Module Must Parse",
    severity: "HARD",
    category: "file_integrity",
    description: "Each inspected MDX module must have parseable frontmatter.",
  },
  {
    ruleId: "CP-FM-001",
    name: "Required Foundation Metadata",
    severity: "HARD",
    category: "frontmatter",
    description: "Foundation modules must include the live required metadata fields.",
  },
  {
    ruleId: "CP-FM-002",
    name: "Required OT Metadata",
    severity: "HARD",
    category: "frontmatter",
    description: "OT modules must include roleSlug and pathSlug.",
  },
  {
    ruleId: "CP-FM-003",
    name: "Slug Present and Non-Empty",
    severity: "HARD",
    category: "frontmatter",
    description: "slug must be present and non-empty.",
  },
  {
    ruleId: "CP-FM-004",
    name: "Slug Uniqueness",
    severity: "HARD",
    category: "frontmatter",
    description: "No two inspected modules may declare the same slug.",
  },
  {
    ruleId: "CP-FM-005",
    name: "Module Number Validity",
    severity: "HARD",
    category: "frontmatter",
    description:
      "module must be a positive integer unique within its module family.",
  },
  {
    ruleId: "CP-FM-006",
    name: "Title Present",
    severity: "HARD",
    category: "frontmatter",
    description: "title must be present and non-empty.",
  },
  {
    ruleId: "CP-FM-007",
    name: "Description Present",
    severity: "HARD",
    category: "frontmatter",
    description: "description must be present and non-empty.",
  },
  {
    ruleId: "CP-FM-008",
    name: "Reading Time Metadata",
    severity: "HARD",
    category: "frontmatter",
    description: "readingTime must be a non-empty string (live type).",
  },
  {
    ruleId: "CP-FM-009",
    name: "Lab Time Metadata",
    severity: "HARD",
    category: "frontmatter",
    description: "labTime must be a non-empty string (live type).",
  },
  {
    ruleId: "CP-FM-010",
    name: "Tools Is Structured Metadata",
    severity: "HARD",
    category: "frontmatter",
    description: "tools must be an array of objects, not string-only entries.",
  },
  {
    ruleId: "CP-FM-011",
    name: "Tool Name and Type",
    severity: "HARD",
    category: "frontmatter",
    description: "Each tool object must include non-empty name and type.",
  },
  {
    ruleId: "CP-FM-012",
    name: "Tool URL Format",
    severity: "HARD",
    category: "frontmatter",
    description: "When supplied, tool url must be a syntactically valid http(s) URL.",
  },
  {
    ruleId: "CP-FM-014",
    name: "Cabinet Artifact Object",
    severity: "HARD",
    category: "frontmatter",
    description: "cabinetArtifact must be an object using the live structure.",
  },
  {
    ruleId: "CP-FM-015",
    name: "Cabinet Artifact Name",
    severity: "HARD",
    category: "frontmatter",
    description: "cabinetArtifact.name must be present and non-empty.",
  },
  {
    ruleId: "CP-FM-016",
    name: "Cabinet Artifact Description",
    severity: "HARD",
    category: "frontmatter",
    description: "cabinetArtifact.description must be present and non-empty.",
  },
  {
    ruleId: "CP-FM-018",
    name: "Previous/Next References",
    severity: "HARD",
    category: "frontmatter",
    description:
      "previousModule and nextModule, when present as strings, must resolve in-family.",
  },
  {
    ruleId: "CP-FM-019",
    name: "No Self-Reference",
    severity: "HARD",
    category: "frontmatter",
    description: "A module must not reference itself via previousModule or nextModule.",
  },
  {
    ruleId: "CP-FM-020",
    name: "Navigation Consistency",
    severity: "HARD",
    category: "frontmatter",
    description: "Adjacent previous/next declarations must agree.",
  },
  {
    ruleId: "CP-FM-021",
    name: "Terminal Module Navigation",
    severity: "HARD",
    category: "frontmatter",
    description:
      "Explicit nextModule: null is valid terminal navigation and distinct from a missing field.",
  },
  {
    ruleId: "CP-FAMILY-001",
    name: "Foundation Family",
    severity: "HARD",
    category: "module_family",
    description: "Files under content/foundations/ use the Foundation schema.",
  },
  {
    ruleId: "CP-FAMILY-002",
    name: "OT Security Family",
    severity: "HARD",
    category: "module_family",
    description: "Files under content/paths/ot-security/ use the OT schema.",
  },
  {
    ruleId: "CP-FAMILY-003",
    name: "Do Not Apply Foundation Skeleton to OT",
    severity: "HARD",
    category: "module_family",
    description:
      "OT modules are not failed for missing Foundation-specific headings.",
  },
  {
    ruleId: "CP-FAMILY-004",
    name: "Do Not Require Identical Heading Order",
    severity: "HARD",
    category: "module_family",
    description:
      "Modules are not required to share identical heading order.",
  },
  {
    ruleId: "CP-CONSIST-001",
    name: "Frontmatter vs File Path",
    severity: "HARD",
    category: "internal_consistency",
    description:
      "Frontmatter identity fields must match the file location conventions.",
  },
  {
    ruleId: "CP-CONSIST-002",
    name: "Frontmatter vs Registry",
    severity: "HARD",
    category: "internal_consistency",
    description:
      "MDX identity must not conflict with the TypeScript module index.",
  },
  {
    ruleId: "CP-CONSIST-003",
    name: "Role Module List vs Existing MDX",
    severity: "WARNING",
    category: "internal_consistency",
    description:
      "Available role modules should correspond to real MDX modules.",
  },
  {
    ruleId: "CP-CONSIST-004",
    name: "Broken Internal References",
    severity: "HARD",
    category: "internal_consistency",
    description: "Internal module references must resolve to supported modules.",
  },
  {
    ruleId: "CP-STYLE-004",
    name: "No Em Dash",
    severity: "HARD",
    category: "style",
    description:
      "CyberPivot content must not contain the Unicode em dash character U+2014.",
  },
  {
    ruleId: "CP-SCEN-001",
    name: "Fictional Scenario Consistency",
    severity: "WARNING",
    category: "scenarios",
    description:
      "When a fictional organisation is used, its identity should remain consistent with the canonical CyberPivot company names.",
  },
  {
    ruleId: "CP-SCEN-002",
    name: "Real Incident Claims",
    severity: "HUMAN",
    category: "scenarios",
    description:
      "Real incident claims require human/AI verification against reliable sources. No deterministic evaluation yet.",
  },
  {
    ruleId: "CP-SCEN-003",
    name: "Do Not Present Fiction as Documented Fact",
    severity: "HUMAN",
    category: "scenarios",
    description:
      "Fictional scenario details must not be presented as real-company facts. Requires human judgment beyond name identity checks.",
  },
  {
    ruleId: "CP-FOUND-002",
    name: "Hands-On Component",
    severity: "HARD",
    category: "foundation_structure",
    description:
      "A Foundation module must contain a hands-on lab/exercise component.",
  },
  {
    ruleId: "CP-FOUND-004",
    name: "Enterprise Context",
    severity: "HARD",
    category: "foundation_structure",
    description:
      "A Foundation module must provide an enterprise/job-context section.",
  },
  {
    ruleId: "CP-FOUND-005",
    name: "Cabinet Portfolio Entry",
    severity: "HARD",
    category: "foundation_structure",
    description:
      "A Foundation module must contain a portfolio/Cabinet output section.",
  },
  {
    ruleId: "CP-FOUND-008",
    name: "Final Foundation Module Navigation",
    severity: "HARD",
    category: "foundation_structure",
    description:
      "The final Foundation module must not point to a nonexistent Foundation module.",
  },
  {
    ruleId: "CP-OT-003",
    name: "OT Hands-On Section",
    severity: "HARD",
    category: "ot_structure",
    description: "An OT module must contain its practical/hands-on component.",
  },
  {
    ruleId: "CP-OT-004",
    name: "OT Enterprise Section",
    severity: "HARD",
    category: "ot_structure",
    description: "An OT module must contain an enterprise/job-context component.",
  },
  {
    ruleId: "CP-OT-005",
    name: "OT Cabinet Section",
    severity: "HARD",
    category: "ot_structure",
    description: "An OT module must contain a Cabinet/artifact component.",
  },
  {
    ruleId: "CP-OT-006",
    name: "OT Step-Based Lab",
    severity: "WARNING",
    category: "ot_structure",
    description:
      "An OT hands-on section should contain identifiable practical steps. Exact step count is not required.",
  },
  {
    ruleId: "CP-OT-007",
    name: "OT Artifact Alignment",
    severity: "HUMAN",
    category: "ot_structure",
    description:
      "Semantic artifact/lab alignment requires human review. Structural cabinet presence is covered by CP-OT-005.",
  },
  {
    ruleId: "CP-OT-008",
    name: "OT Navigation Integrity",
    severity: "HARD",
    category: "ot_structure",
    description:
      "OT previous/next module references must resolve within the OT family.",
  },
  {
    ruleId: "CP-CAB-001",
    name: "Every Applicable Module Has an Artifact",
    severity: "HARD",
    category: "cabinet",
    description: "Modules that use Cabinet artifacts must declare cabinetArtifact metadata.",
  },
  {
    ruleId: "CP-CAB-002",
    name: "Artifact Has Name",
    severity: "HARD",
    category: "cabinet",
    description: "cabinetArtifact.name must be a non-empty string.",
  },
  {
    ruleId: "CP-CAB-003",
    name: "Artifact Has Description",
    severity: "HARD",
    category: "cabinet",
    description: "cabinetArtifact.description must be a non-empty string.",
  },
  {
    ruleId: "CP-CAB-004",
    name: "Artifact Has Unlock Condition",
    severity: "HARD",
    category: "cabinet",
    description:
      "cabinetArtifact.unlocksOn must use a supported live unlock value.",
  },
  {
    ruleId: "CP-CAB-005",
    name: "Artifact Is Produced by the Work",
    severity: "HUMAN",
    category: "cabinet",
    description:
      "Whether the artifact is produced by module work requires human review.",
  },
  {
    ruleId: "CP-CAB-006",
    name: "Artifact Is Not Merely a Template",
    severity: "HUMAN",
    category: "cabinet",
    description:
      "Whether the artifact is more than a downloadable template requires human review.",
  },
  {
    ruleId: "CP-CAB-007",
    name: "Body/Metadata Consistency",
    severity: "WARNING",
    category: "cabinet",
    description:
      "The artifact described in the body should correspond to the frontmatter artifact name.",
  },
] as const;

export function getRule(ruleId: string): ContentAssuranceRule {
  const rule = CONTENT_ASSURANCE_RULES.find((entry) => entry.ruleId === ruleId);
  if (!rule) {
    throw new Error(`Unknown content assurance rule: ${ruleId}`);
  }
  return rule;
}
