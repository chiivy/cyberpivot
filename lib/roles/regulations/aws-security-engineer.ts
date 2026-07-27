import type { RoleRegulation } from "@/types/role";

export const AWS_SECURITY_ENGINEER_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR and UK GDPR",
    description:
      "Your AWS configuration must support data residency requirements, encryption at rest and in transit, access logging, and the ability to respond to data subject access requests. Article 25 requires privacy by design. Your architecture decisions are compliance decisions.",
  },
  {
    name: "NDPR",
    description:
      "Nigerian organisations using AWS must ensure personal data of Nigerian residents is handled in compliance with NDPR. Cross-border transfer restrictions apply.",
  },
  {
    name: "NIS2",
    description:
      "Cloud infrastructure supporting critical sectors in the EU must meet NIS2 security requirements. AWS Security Engineers in these environments must understand what NIS2 requires at the infrastructure level.",
  },
  {
    name: "ISO 27001",
    description:
      "AWS Security Hub and Config rules map directly to ISO 27001 Annex A controls. Understanding this mapping lets you answer auditor questions and produce compliance evidence from tools you already use.",
  },
  {
    name: "Cyber Essentials",
    description:
      "The five controls map directly to AWS configuration. Firewalls map to security groups and NACLs. Patch management maps to Systems Manager. Understanding this mapping is practical knowledge for UK-focused roles.",
  },
  {
    name: "DORA",
    description:
      "Financial services firms in the EU must meet Digital Operational Resilience Act requirements. AWS security controls for logging, access management, and incident response feed directly into DORA evidence.",
  },
] as const;
