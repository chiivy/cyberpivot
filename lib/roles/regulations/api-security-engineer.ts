import type { RoleRegulation } from "@/types/role";

export const API_SECURITY_ENGINEER_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR and UK GDPR",
    description:
      "APIs that expose personal data are in scope for data protection obligations. Data minimisation, purpose limitation, access controls, and logging requirements all apply. An API data breach is a personal data breach with notification obligations.",
  },
  {
    name: "NDPR",
    description:
      "APIs handling personal data of Nigerian residents must comply with NDPR requirements including data minimisation and security obligations.",
  },
  {
    name: "PCI-DSS Requirements 6 and 8",
    description:
      "APIs in payment flows are in-scope for PCI. Requirement 6 covers secure development. Requirement 8 covers authentication requirements for API access. APIs that touch cardholder data must be tested as part of the annual pentest.",
  },
  {
    name: "PSD2 and Open Banking",
    description:
      "EU Payment Services Directive 2 mandates API access for account information and payment initiation services. The UK Open Banking Standard defines security requirements for financial APIs. API security engineers in fintech work to these standards directly.",
  },
  {
    name: "FAPI",
    description:
      "Financial-grade API Security Profile. Required for Open Banking compliance. Defines specific OAuth 2.0 implementation requirements. If you work on financial APIs you need to know FAPI.",
  },
  {
    name: "FCA operational resilience",
    description:
      "UK financial services APIs must meet resilience requirements. Availability, recovery time, and incident response for APIs in important business services.",
  },
  {
    name: "OWASP API Security",
    description:
      "Referenced by regulators and auditors as the standard of care for API security. The OWASP API Top 10 is the baseline for any API security assessment.",
  },
] as const;
