import type { ComingSoonRoleContent } from "@/types/role";

import { CABINET_PREVIEW_BY_SLUG } from "@/lib/roles/coming-soon-cabinet";
import {
  SALARY_RISK,
  SALARY_SECURITY_AUDITOR,
  VCISO_SALARY_NOTE,
} from "@/lib/roles/coming-soon-salaries";

export const GRC_COMING_SOON_ROLES: readonly ComingSoonRoleContent[] = [
  {
    slug: "risk-analyst",
    name: "Risk Analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Entry to Mid",
    v1: false,
    dayToDay:
      "You score risks, maintain registers, and explain trade-offs to people who want certainty. Workshops with business owners, treatment plan follow-ups, and board slides take most of your time. You translate technical findings from security teams into language leadership can fund or accept.",
    differentiator:
      "Compliance analysts check boxes against frameworks. You quantify what could go wrong and what it costs to fix. Security auditors test whether controls work. You decide which risks matter most to the business.",
    background:
      "Business analysis, finance, or security background all work. You need numeracy, clear writing, and comfort with ambiguity. ISO 27005 or NIST risk framing knowledge helps. You do not need deep technical skills but must understand what security teams report.",
    salaryDisplay: { type: "table", salaries: SALARY_RISK },
    industries: [
      "Banking and insurance",
      "Healthcare",
      "Energy and utilities",
      "Large enterprises",
      "Consultancies",
    ],
    toolsFree: [
      "Spreadsheets with risk scoring models",
      "OWASP risk rating methodology",
      "FAIR resources",
      "NIST RMF publications",
      "Draw.io for risk diagrams",
    ],
    toolsEnterprise: [
      "Archer GRC",
      "ServiceNow IRM",
      "LogicManager",
      "Resolver",
      "RiskLens (FAIR)",
    ],
    certs: [
      {
        name: "CRISC",
        note: "The standard cert for IT risk roles. Shows you understand risk identification and treatment.",
      },
      {
        name: "ISO 27005 Risk Manager",
        note: "Framework-aligned risk management. Common in UK and EU hiring.",
      },
      {
        name: "CISA",
        note: "Useful when risk work includes control assurance and audit liaison.",
      },
    ],
    careerProgression: [
      "Senior risk analyst or risk manager",
      "Third-party risk lead",
      "CISO track with strong business acumen",
    ],
    relatedRoles: [
      {
        name: "GRC Analyst",
        note: "Combined governance, risk, and compliance in one role.",
      },
      {
        name: "Compliance Analyst",
        note: "Framework mapping instead of risk quantification.",
      },
      {
        name: "vCISO",
        note: "Long-term path if you add strategy and executive communication.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["risk-analyst"],
  },
  {
    slug: "security-auditor",
    name: "Security Auditor",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Entry to Mid",
    v1: false,
    dayToDay:
      "You test whether controls actually work, not whether the policy exists. Interviews, sample testing, and evidence review fill your engagements. You write findings with severity ratings and watch teams argue about remediation timelines. External auditors have busy season. Internal auditors have recurring cycles.",
    differentiator:
      "Compliance analysts map requirements to controls on paper. You verify controls in practice. Penetration testers break systems. You assess whether the control environment would catch or prevent issues.",
    background:
      "Accounting, IT audit, or security operations background works. CISA or similar audit training helps. You need scepticism, documentation discipline, and enough technical literacy to follow an evidence trail.",
    salaryDisplay: { type: "table", salaries: SALARY_SECURITY_AUDITOR },
    industries: [
      "Big Four and consultancies",
      "Internal audit functions",
      "Financial services",
      "Healthcare",
      "Government",
    ],
    toolsFree: [
      "OpenSCAP for control scanning",
      "NIST audit guides",
      "Sampling spreadsheets",
      "ISO 27001 audit checklists",
      "Public SOC 2 criteria",
    ],
    toolsEnterprise: [
      "TeamMate or AuditBoard",
      "ServiceNow Audit Management",
      "Archer",
      "Workiva for external reporting",
      "GRC platforms with workflow",
    ],
    certs: [
      {
        name: "CISA",
        note: "The hire signal for IT audit roles. Expected for external audit positions.",
      },
      {
        name: "ISO 27001 Lead Auditor",
        note: "Required for many ISO certification audit engagements.",
      },
      {
        name: "CISM",
        note: "Management-level cert. Useful for internal audit leads liaising with security leadership.",
      },
    ],
    careerProgression: [
      "Senior IT auditor or audit manager",
      "Compliance manager",
      "Consulting manager at a Big Four practice",
    ],
    relatedRoles: [
      {
        name: "Compliance Analyst",
        note: "Policy and framework mapping instead of control testing.",
      },
      {
        name: "GRC Analyst",
        note: "Broader programme work across governance, risk, and compliance.",
      },
      {
        name: "Penetration Tester",
        note: "If you want technical testing instead of control assurance.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["security-auditor"],
  },
  {
    slug: "vciso",
    name: "vCISO",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Senior",
    v1: false,
    dayToDay:
      "You are security leadership for organisations that cannot afford or do not need a full-time CISO. Board briefings, programme design, vendor selection, and incident escalation land on you. You work across multiple clients or one fractional engagement. Politics and communication take as much time as technical decisions.",
    differentiator:
      "GRC analysts execute frameworks. Risk analysts maintain registers. You set direction, represent security to executives, and own outcomes. This is a consulting and leadership role, not a hands-on technical job.",
    background:
      "Ten or more years across security operations, GRC, or consulting. CISSP or CISM is common. You need executive presence, programme management, and enough technical depth to spot when vendors or teams are bluffing. Nigerian and UK markets increasingly hire fractional CISOs for fintech and mid-market firms.",
    salaryDisplay: { type: "note", note: VCISO_SALARY_NOTE },
    industries: [
      "Mid-market companies",
      "Fintech and startups preparing for audit",
      "Healthcare and legal firms",
      "Non-profits and NGOs",
      "Private equity portfolio companies",
    ],
    toolsFree: [
      "NIST CSF and CIS Controls",
      "Policy templates and frameworks",
      "Risk register spreadsheets",
      "Open source GRC references",
      "Board deck structures",
    ],
    toolsEnterprise: [
      "ServiceNow GRC",
      "Vanta / Drata for client readiness",
      "Gartner or Forrester briefings",
      "MSSP and vendor management platforms",
      "Executive reporting dashboards",
    ],
    certs: [
      {
        name: "CISSP",
        note: "Expected at this level. Signals broad security leadership credibility.",
      },
      {
        name: "CISM",
        note: "Management-focused. Aligns with programme ownership and executive communication.",
      },
      {
        name: "CCISO",
        note: "Executive training cert. Less universal than CISSP but marketed toward vCISO paths.",
      },
    ],
    careerProgression: [
      "Full-time CISO at a larger organisation",
      "Security consulting practice owner",
      "Portfolio CISO across multiple engagements",
    ],
    relatedRoles: [
      {
        name: "GRC Analyst",
        note: "Where many vCISOs built their framework and policy foundation.",
      },
      {
        name: "Risk Analyst",
        note: "Risk programme ownership feeds directly into executive security leadership.",
      },
      {
        name: "Incident Responder",
        note: "Operational depth helps when clients have active incidents during your engagement.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["vciso"],
  },
] as const;
