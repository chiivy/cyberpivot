export type QaSeverity = "HARD" | "WARNING" | "HUMAN" | "NOT_YET";

export type QaFindingStatus =
  | "PASS"
  | "WARNING"
  | "NEEDS_HUMAN_REVIEW"
  | "FAIL";

export type QaRunStatus =
  | "PASS"
  | "WARNING"
  | "NEEDS_HUMAN_REVIEW"
  | "FAIL";

export type QaCategory =
  | "file_integrity"
  | "frontmatter"
  | "module_family"
  | "internal_consistency"
  | "style"
  | "scenarios"
  | "foundation_structure"
  | "ot_structure"
  | "cabinet";

export type ContentFamily = "foundation" | "ot-security" | "unknown";

export interface QaLocation {
  line: number | null;
  column: number | null;
}

export interface QaEvidence {
  type: "metadata" | "text" | "relationship" | "file" | "scenario-company";
  field?: string;
  value?: unknown;
  expected?: string;
  actual?: string;
}

export interface QaFindingSource {
  type: "deterministic";
  validator: string;
}

export interface QaFinding {
  id: string;
  ruleId: string;
  severity: QaSeverity;
  status: QaFindingStatus;
  category: QaCategory;
  message: string;
  file: string;
  location: QaLocation;
  evidence: QaEvidence;
  remediation: string;
  source: QaFindingSource;
}

export interface QaRunSummary {
  pass: number;
  warning: number;
  needsHumanReview: number;
  fail: number;
}

export interface QaRunScope {
  filesChecked: number;
  modulesChecked: number;
}

export interface QaRunResult {
  version: "1";
  status: QaRunStatus;
  startedAt: string;
  completedAt: string;
  scope: QaRunScope;
  summary: QaRunSummary;
  findings: QaFinding[];
  exitCode: 0 | 1 | 2;
}

export interface DiscoveredModule {
  absolutePath: string;
  relativePath: string;
  family: ContentFamily;
  fileSlug: string;
}

export interface ParsedFrontmatter {
  data: Record<string, unknown>;
  content: string;
  /** 1-based line of the opening --- */
  frontmatterStartLine: number;
  /** 1-based line of the closing --- */
  frontmatterEndLine: number;
  rawFrontmatter: string;
}

export type FrontmatterParseResult =
  | { ok: true; parsed: ParsedFrontmatter }
  | { ok: false; error: string; location: QaLocation };
