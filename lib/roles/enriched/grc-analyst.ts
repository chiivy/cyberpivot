import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { GRC_ANALYST_REGULATIONS } from "@/lib/roles/regulations/grc-analyst";

export const GRC_ANALYST_ENRICHED = {
  careerSwitcherNote:
    "This role does not require coding or deep technical skills. It requires clear thinking, attention to detail, and an understanding of how risk affects a business. It is one of the most accessible entry points into cybersecurity for career switchers from any background.",
  dayInTheLife:
    "Morning is email triage: audit requests, vendor questionnaires, policy review comments from last week. You update the risk register with a new finding the IT team sent over. Mid-morning you draft one section of an information security policy, usually access control or acceptable use. Afternoon is a stakeholder meeting where you present risk findings in plain language and answer questions from project owners who do not live in security. End of day you collect evidence for an upcoming audit: screenshots, signed approvals, training completion reports. A normal two-hour block might be mapping ten controls to ISO 27001 Annex A and noting three gaps that need remediation owners.",
  misconceptions: [
    {
      myth: "GRC is just paperwork",
      reality:
        "Risk decisions have real business impact. A bad control design or missed vendor risk can cost more than a missed alert.",
    },
    {
      myth: "You need to be deeply technical",
      reality:
        "Clear thinking and communication matter more than coding. You must understand how systems fail, not how to exploit them.",
    },
    {
      myth: "GRC is boring",
      reality:
        "In the right organisation you influence security strategy at board level. The work is only dull when leadership treats compliance as a checkbox.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "PCI-DSS 4.0 gap analysis scoped to a simulated e-commerce company processing card payments. Walk all 12 requirements, identify gaps, produce a prioritised remediation plan",
    "ISO 27001 internal audit: plan the audit, select controls to test, collect and document evidence, write findings and management responses in the correct format",
    "SOC 2 readiness assessment: map Trust Service Criteria to a simulated SaaS company, identify gaps, produce a readiness report",
    "GDPR Article 30 records of processing: map data flows for a simulated organisation, document all processing activities, identify legal bases, flag gaps",
    "NIST CSF 2.0 assessment: score a simulated organisation against all five functions, produce current state vs target state report with maturity scores",
    "Cyber Essentials self-assessment: walk all five controls for a simulated UK organisation, complete the questionnaire, identify gaps",
    "NDPR compliance review: assess a simulated Nigerian organisation against NDPR requirements, identify gaps, produce a remediation plan",
    "Regulatory applicability mapping: given a simulated Nigerian fintech with UK and EU customers, identify every regulation that applies, why it applies, and what the key obligations are",
    "Vendor risk assessment: complete a tier 1 vendor assessment end to end, produce a risk rating and recommendation",
    "Business impact analysis: identify critical assets, define RTO and RPO, document recovery priorities",
    "CBN Cybersecurity Framework review: assess a simulated Nigerian bank against CBN requirements, identify gaps",
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
      question: "Walk me through how you would conduct a risk assessment",
      goodAnswer:
        "Identify assets and threats, assess likelihood and impact, score risks, propose treatment options (accept, mitigate, transfer, avoid), and assign owners with deadlines.",
    },
    {
      question: "What is the difference between a threat, vulnerability, and risk?",
      goodAnswer:
        "A threat is something that could cause harm. A vulnerability is a weakness that could be exploited. Risk is the combination of threat, vulnerability, and impact on the business.",
    },
    {
      question: "How would you explain ISO 27001 to a non-technical CEO?",
      goodAnswer:
        "It is an internationally recognised standard for managing information security. It means we identify our risks, put controls in place, and prove we maintain them through regular review and audit.",
    },
    {
      question: "What is the difference between a policy and a procedure?",
      goodAnswer:
        "A policy states what we require and why. A procedure describes step by step how people do it. Policy is the rule. Procedure is the playbook.",
    },
    {
      question: "How do you prioritise which risks to treat first?",
      goodAnswer:
        "Use a consistent scoring matrix. Focus on high likelihood and high impact first, especially where regulatory or customer impact is involved. Document why you deferred lower items.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "Compliance Analyst",
      note: "If regulatory compliance (PCI, HIPAA, SOX) is your main focus.",
    },
    {
      name: "Security Auditor",
      note: "If you want to validate controls rather than build the programme.",
    },
    {
      name: "Risk Analyst",
      note: "If quantitative risk modelling and FAIR interest you.",
    },
    {
      name: "vCISO",
      note: "Long-term leadership path if you want to run security strategy for multiple clients.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "ISACA", note: "Professional body for governance, risk, and audit" },
    { name: "(ISC)² community", note: "Forums and resources across security disciplines" },
    { name: "GRCWorld Podcast", note: "Practitioner conversations on GRC careers" },
    { name: "r/ITCareerQuestions", note: "Career advice including GRC transitions" },
    { name: "LinkedIn GRC communities", note: "Networking and job market insight" },
    { name: "NIST website", note: "Free framework guidance and publications" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Security Fundamentals",
      reason: "You need shared language for threats, controls, and incidents when talking to technical teams.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: GRC_ANALYST_REGULATIONS,
} as const;
