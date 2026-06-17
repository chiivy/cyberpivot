export const CABINET_SUMMARY_MAX_LENGTH = 500;

export interface SummaryValidationResult {
  valid: boolean;
  normalized: string | null;
  error: string | null;
}

export function normalizeCabinetSummary(
  value: string | null | undefined,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function validateCabinetSummary(
  value: string | null | undefined,
): SummaryValidationResult {
  if (value === null || value === undefined || value.trim() === "") {
    return { valid: true, normalized: null, error: null };
  }

  const normalized = value.trim();

  if (normalized.length > CABINET_SUMMARY_MAX_LENGTH) {
    return {
      valid: false,
      normalized: null,
      error: `Summary must be ${CABINET_SUMMARY_MAX_LENGTH} characters or fewer`,
    };
  }

  return { valid: true, normalized, error: null };
}
