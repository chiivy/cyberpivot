import type { RoleRegulation } from "@/types/role";

export const COMPLIANCE_ANALYST_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR and UK GDPR",
    description:
      "You map processing activities, legal bases, and data subject rights. Article 30 records of processing are a core deliverable. Breach notification timelines are non-negotiable.",
  },
  {
    name: "PCI-DSS 4.0",
    description:
      "Card data environments require scoped controls, evidence collection, and annual assessment. You translate the 12 requirements into what teams must actually do.",
  },
  {
    name: "SOX",
    description:
      "Financial reporting controls require IT general controls documentation and audit evidence. You work with auditors on access, change management, and logging controls.",
  },
  {
    name: "HIPAA",
    description:
      "Healthcare data in the US requires administrative, physical, and technical safeguards. You map policies and evidence to the Security Rule.",
  },
  {
    name: "Cyber Essentials",
    description:
      "UK baseline certification with five technical controls. You complete self-assessments and gap analyses for organisations bidding for government contracts.",
  },
  {
    name: "NDPR",
    description:
      "Nigerian data protection law with registration, consent, and breach notification requirements. You assess applicability and evidence gaps for Nigerian operations.",
  },
] as const;
