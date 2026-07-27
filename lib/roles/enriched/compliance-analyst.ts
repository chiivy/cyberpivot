import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { COMPLIANCE_ANALYST_REGULATIONS } from "@/lib/roles/regulations/compliance-analyst";

export const COMPLIANCE_ANALYST_ENRICHED = {
  careerSwitcherNote:
    "Compliance is one of the most accessible security-adjacent roles for career switchers from business, law, or audit. You need attention to detail and clear writing more than terminal skills.",
  dayInTheLife:
    "Morning is evidence chase: three teams owe screenshots for the PCI audit and one vendor questionnaire is overdue. You update the regulatory applicability matrix after legal flags a new EU customer. Mid-morning you walk a project team through GDPR data mapping for a new feature. Afternoon is a gap review against PCI-DSS 4.0 requirement 8, documenting what is missing and who owns the fix. End of day you prep the audit pack: policies, training records, and control test results organised so an external auditor can follow the trail.",
  misconceptions: [
    {
      myth: "Compliance is just ticking boxes",
      reality:
        "Bad compliance work hides real gaps. Good compliance work makes risk visible and gives leadership decisions they can defend.",
    },
    {
      myth: "You need deep technical skills",
      reality:
        "You need to understand controls and ask the right questions of technical teams. You do not need to run exploits.",
    },
    {
      myth: "One framework covers everything",
      reality:
        "Most organisations juggle PCI, GDPR, SOC 2, and industry rules at once. Your job is knowing which applies and where they overlap.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Complete GDPR Article 30 records of processing for a simulated organisation",
    "PCI-DSS 4.0 gap analysis scoped to a card-processing environment",
    "Build a regulatory applicability matrix for a multi-region SaaS company",
    "Cyber Essentials self-assessment for a simulated UK organisation",
    "Collect and organise audit evidence for access management controls",
    "Draft a remediation plan prioritised by regulatory risk",
  ],
  labRequirements: {
    minimumSpecs: "4GB RAM",
    diskSpace: "Minimal. Document and spreadsheet work only.",
    installs: ["Microsoft Office or Google Workspace"],
    setupTime: "Under 30 minutes. No specialised lab environment needed.",
    osSupport: "Windows, macOS, and Linux. Any machine that runs a word processor works.",
    additionalNotes:
      "All work is document and spreadsheet based. You do not need Docker, VMs, or cloud accounts for this path.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "How would you prepare for a PCI-DSS audit?",
      goodAnswer:
        "Confirm scope and cardholder data flows. Map each requirement to evidence owners. Pre-test controls internally. Organise the audit pack with policies, configs, and test results. Track gaps with remediation dates.",
    },
    {
      question: "What is the difference between compliance and security?",
      goodAnswer:
        "Compliance checks you meet defined requirements. Security reduces actual risk. They overlap but compliant does not always mean secure. You explain both to stakeholders.",
    },
    {
      question: "How do you handle a control gap found close to an audit?",
      goodAnswer:
        "Document the gap honestly, assess risk, propose compensating controls or remediation timeline, and escalate to management. Hiding gaps makes audits worse.",
    },
    {
      question: "What are Article 30 records of processing?",
      goodAnswer:
        "GDPR requirement to document what personal data you process, why, legal basis, retention, and transfers. Core evidence for privacy compliance.",
    },
    {
      question: "How do you prioritise remediation when everything is a finding?",
      goodAnswer:
        "Regulatory deadlines and customer contract requirements first. Then likelihood and impact of the control failure. Document deferrals with management acceptance.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "GRC Analyst",
      note: "Broader role covering governance and risk alongside compliance.",
    },
    {
      name: "Security Auditor",
      note: "When you want to test controls instead of mapping them.",
    },
    {
      name: "Risk Analyst",
      note: "If quantifying risk interests you more than framework mapping.",
    },
    {
      name: "Privacy Analyst",
      note: "If GDPR and data protection law are your main focus.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "ISACA", note: "Professional body for audit and compliance" },
    { name: "IAPP", note: "Privacy and GDPR practitioner community" },
    { name: "PCI SSC documentation", note: "Official PCI-DSS resources" },
    { name: "ICO guidance", note: "UK GDPR regulator publications" },
    { name: "GRCWorld Podcast", note: "Practitioner conversations on compliance careers" },
    { name: "NIST publications", note: "Free framework and control guidance" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Security Fundamentals",
      reason: "Shared language for controls, incidents, and technical evidence requests.",
    },
    {
      module: "Risk Management",
      reason: "Compliance findings tie back to risk treatment and business priority.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: COMPLIANCE_ANALYST_REGULATIONS,
} as const;
