import type {
  QaEvidence,
  QaFinding,
  QaFindingStatus,
  QaLocation,
} from "@/lib/content-assurance/types";
import { getRule } from "@/lib/content-assurance/rules";

export function createFinding(input: {
  ruleId: string;
  status: QaFindingStatus;
  message: string;
  file: string;
  location?: QaLocation;
  evidence: QaEvidence;
  remediation: string;
  validator: string;
  idSuffix?: string;
}): QaFinding {
  const rule = getRule(input.ruleId);
  const suffix = input.idSuffix ? `:${input.idSuffix}` : "";
  return {
    id: `${input.ruleId}:${input.file}${suffix}`,
    ruleId: input.ruleId,
    severity: rule.severity,
    status: input.status,
    category: rule.category,
    message: input.message,
    file: input.file,
    location: input.location ?? { line: null, column: null },
    evidence: input.evidence,
    remediation: input.remediation,
    source: {
      type: "deterministic",
      validator: input.validator,
    },
  };
}

export function passFinding(input: {
  ruleId: string;
  file: string;
  message: string;
  evidence?: QaEvidence;
  validator: string;
  idSuffix?: string;
}): QaFinding {
  return createFinding({
    ruleId: input.ruleId,
    status: "PASS",
    message: input.message,
    file: input.file,
    evidence: input.evidence ?? { type: "metadata", value: "ok" },
    remediation: "No action required.",
    validator: input.validator,
    idSuffix: input.idSuffix,
  });
}
