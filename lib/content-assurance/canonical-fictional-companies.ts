/**
 * Canonical CyberPivot fictional organizations for Content Assurance.
 *
 * There is no separate machine-readable scenario registry in the repository yet.
 * This explicit list is the smallest configuration required by CP-AUTO-007 and is
 * derived from:
 * - CP-AUTO-002 Content Rule Inventory (documented fictional organisations)
 * - DECISIONS.md (Quorivane Bank primary; Velorin Energy / Candrel Water Services secondary)
 * - live module usage (Delvara Energy in OT Security MDX; Quorivane / Delvara short forms)
 *
 * Do not treat this file as a place to invent new companies or aliases.
 */

export interface CanonicalFictionalCompany {
  /** Exact canonical full name. */
  name: string;
  /** Distinctive first token used for typo / variation detection. */
  stem: string;
  /**
   * Exact accepted reference strings already used or documented for this company.
   * Short forms are included only where live content already uses them as the
   * same organization (for example "Delvara" for "Delvara Energy").
   */
  acceptedReferences: readonly string[];
  /** Expected continuation token(s) after the stem for the full canonical name. */
  expectedContinuations: readonly string[];
}

export const CANONICAL_FICTIONAL_COMPANIES: readonly CanonicalFictionalCompany[] =
  [
    {
      name: "Quorivane Bank",
      stem: "Quorivane",
      acceptedReferences: ["Quorivane Bank", "Quorivane"],
      expectedContinuations: ["Bank"],
    },
    {
      name: "Delvara Energy",
      stem: "Delvara",
      acceptedReferences: ["Delvara Energy", "Delvara"],
      expectedContinuations: ["Energy"],
    },
    {
      name: "Velorin Energy",
      stem: "Velorin",
      acceptedReferences: ["Velorin Energy", "Velorin"],
      expectedContinuations: ["Energy"],
    },
    {
      name: "Candrel Water Services",
      stem: "Candrel",
      acceptedReferences: ["Candrel Water Services", "Candrel"],
      expectedContinuations: ["Water"],
    },
  ] as const;

export function getCanonicalCompanyNames(): readonly string[] {
  return CANONICAL_FICTIONAL_COMPANIES.map((company) => company.name);
}
