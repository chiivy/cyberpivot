import type { RoleRegulation } from "@/types/role";

export const SOC_ANALYST_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR and UK GDPR",
    description:
      "When your SOC confirms a personal data breach you have 72 hours to notify the ICO. That clock starts the moment you have reasonable belief a breach occurred, not when you have full certainty. Your incident documentation directly feeds the notification.",
  },
  {
    name: "NDPR",
    description:
      "Nigeria's data protection regulation has the same 72 hour breach notification requirement to the NDPC. Nigerian SOC analysts need to know this workflow cold.",
  },
  {
    name: "NIS2",
    description:
      "If you work in critical infrastructure in the EU, NIS2 imposes specific incident classification and reporting obligations. Significant incidents must be reported to national authorities within 24 hours of awareness.",
  },
  {
    name: "PCI-DSS",
    description:
      "If your organisation processes card payments, certain alerts in your SIEM are in-scope for PCI. A cardholder data environment breach has specific containment and notification requirements beyond standard incident response.",
  },
  {
    name: "DORA",
    description:
      "Financial services firms in the EU must classify and report ICT-related incidents to their regulator under specific timelines from January 2025. SOC analysts in EU financial services encounter this directly.",
  },
  {
    name: "ISO 27001",
    description:
      "Your SOC provides evidence for multiple Annex A controls. Alert logs, incident records, and response documentation are all audit evidence.",
  },
] as const;
