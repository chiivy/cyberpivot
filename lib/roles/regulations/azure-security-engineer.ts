import type { RoleRegulation } from "@/types/role";

export const AZURE_SECURITY_ENGINEER_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR and UK GDPR",
    description:
      "Your Azure configuration must support data residency requirements, encryption at rest and in transit, access logging, and the ability to respond to data subject access requests. Article 25 requires privacy by design. Your architecture decisions are compliance decisions.",
  },
  {
    name: "NDPR",
    description:
      "Nigerian organisations using Azure must ensure personal data of Nigerian residents is handled in compliance with NDPR. Cross-border transfer restrictions apply.",
  },
  {
    name: "NIS2",
    description:
      "Cloud infrastructure supporting critical sectors in the EU must meet NIS2 security requirements. Azure Security Engineers in these environments must understand what NIS2 requires at the infrastructure level.",
  },
  {
    name: "ISO 27001",
    description:
      "Azure Defender for Cloud and Secure Score map directly to ISO 27001 Annex A controls. Understanding this mapping lets you answer auditor questions and produce compliance evidence from tools you already use.",
  },
  {
    name: "Cyber Essentials",
    description:
      "The five controls map directly to Azure configuration. Firewalls map to NSGs and Azure Firewall. Patch management maps to Update Management. Understanding this mapping is practical knowledge for UK-focused roles.",
  },
  {
    name: "DORA",
    description:
      "EU financial services firms must meet specific cloud resilience and incident response requirements from January 2025. Azure Security Engineers in EU financial services configure their environments to meet these requirements.",
  },
  {
    name: "FCA and PRA operational resilience",
    description:
      "UK financial services cloud deployments must demonstrate operational resilience. Impact tolerances for important business services must be met. This affects how you architect for availability and recovery.",
  },
] as const;
