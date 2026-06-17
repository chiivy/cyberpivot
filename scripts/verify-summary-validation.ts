import {
  CABINET_SUMMARY_MAX_LENGTH,
  normalizeCabinetSummary,
  validateCabinetSummary,
} from "../lib/cabinet/validate-summary";

const whitespaceCases = ["   ", "\n\t  ", ""] as const;

for (const value of whitespaceCases) {
  const normalized = normalizeCabinetSummary(value);
  const validation = validateCabinetSummary(value);
  if (normalized !== null || validation.normalized !== null) {
    throw new Error(`Expected null for whitespace-only summary: ${JSON.stringify(value)}`);
  }
}

const validSummary = "Captured DNS and HTTP traffic in Wireshark.";
const valid = validateCabinetSummary(validSummary);
if (!valid.valid || valid.normalized !== validSummary) {
  throw new Error("Expected valid summary to pass");
}

const overLimit = "a".repeat(CABINET_SUMMARY_MAX_LENGTH + 1);
const tooLong = validateCabinetSummary(overLimit);
if (tooLong.valid) {
  throw new Error("Expected summary over 500 characters to be rejected");
}

const trimmedEdge = `  ${"b".repeat(CABINET_SUMMARY_MAX_LENGTH)}  `;
const edge = validateCabinetSummary(trimmedEdge);
if (!edge.valid || edge.normalized?.length !== CABINET_SUMMARY_MAX_LENGTH) {
  throw new Error("Expected exactly 500 trimmed characters to pass");
}

console.log("Summary validation checks passed.");
