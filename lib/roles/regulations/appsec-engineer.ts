import type { RoleRegulation } from "@/types/role";

export const APPSEC_ENGINEER_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR Article 25",
    description:
      "Privacy by design and by default. You are required to implement appropriate technical measures from the start of development. This is not the GRC team's job alone. AppSec engineers implement it in code.",
  },
  {
    name: "UK GDPR and NDPR",
    description:
      "Same privacy by design obligations in the UK and Nigeria. Applications handling personal data of residents in these jurisdictions must be built accordingly.",
  },
  {
    name: "PCI-DSS Requirement 6",
    description:
      "Secure development lifecycle requirements for organisations handling card payment data. Code review, vulnerability management, and change control processes all fall under this requirement.",
  },
  {
    name: "OWASP",
    description:
      "Not a regulation but treated as the standard of care by courts, regulators, and auditors. The OWASP Top 10 is referenced in FTC actions in the US and ICO investigations in the UK. Failure to address known OWASP Top 10 vulnerabilities in a breached application is difficult to defend.",
  },
  {
    name: "NIS2",
    description:
      "Software supply chain security is explicitly addressed in NIS2. AppSec engineers in EU-regulated organisations must understand supply chain risk and implement appropriate controls.",
  },
  {
    name: "UK Product Security and Telecommunications Infrastructure Act 2022",
    description:
      "Requires security by design in connected products sold in the UK. Relevant for AppSec engineers working on IoT or connected device software.",
  },
  {
    name: "DORA",
    description:
      "Financial services software development in the EU must meet specific resilience and testing requirements. AppSec engineers in EU fintech encounter this directly.",
  },
] as const;
