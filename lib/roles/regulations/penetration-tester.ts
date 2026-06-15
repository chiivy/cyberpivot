import type { RoleRegulation } from "@/types/role";

export const PENTESTER_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "Computer Misuse Act 1990 (UK)",
    description:
      "Unauthorised access to computer systems is a criminal offence. Your written authorisation and scope document is your legal protection. Never test without it.",
  },
  {
    name: "Computer Fraud and Abuse Act (US)",
    description:
      "Same principle in the US. Scope creep can make a legitimate engagement illegal. Know your boundaries.",
  },
  {
    name: "Nigerian Cybercrime Act 2015",
    description:
      "Criminalises unauthorised system access in Nigeria. Nigerian pentesters must have documented authorisation for every engagement.",
  },
  {
    name: "PCI-DSS Requirement 11",
    description:
      "Organisations that process card payments must conduct penetration testing at least annually and after significant changes. Many pentest engagements are PCI-driven. Understanding the scope requirements for a PCI pentest is a real job skill.",
  },
  {
    name: "ISO 27001",
    description:
      "Organisations pursuing ISO 27001 certification need penetration test results as evidence for certain controls. You will write reports that go directly into audit packs.",
  },
  {
    name: "CREST accreditation",
    description:
      "UK government and critical national infrastructure work requires CREST-certified testers. Understand which firms are CREST-accredited and what the CHECK scheme requires.",
  },
  {
    name: "Cyber Essentials Plus",
    description:
      "The Plus variant requires independent verification including vulnerability scanning. Testers who understand Cyber Essentials can offer this as a service.",
  },
] as const;
