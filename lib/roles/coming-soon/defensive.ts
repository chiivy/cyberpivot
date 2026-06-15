import type { ComingSoonRoleContent } from "@/types/role";

import { CABINET_PREVIEW_BY_SLUG } from "@/lib/roles/coming-soon-cabinet";
import {
  SALARY_EDR_ANALYST,
  SALARY_INCIDENT_RESPONDER,
  SALARY_THREAT_HUNTER,
} from "@/lib/roles/coming-soon-salaries";

export const DEFENSIVE_COMING_SOON_ROLES: readonly ComingSoonRoleContent[] = [
  {
    slug: "incident-responder",
    name: "Incident Responder",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Mid",
    v1: false,
    dayToDay:
      "You get called when something is already wrong. Most of your day is containment, evidence collection, and keeping leadership informed while you figure out what happened. You work across SIEM, EDR, and sometimes disk images. Documentation is not optional. Every decision goes in the ticket.",
    differentiator:
      "SOC analysts triage alerts. You own the breach from first escalation through recovery. Threat hunters find problems quietly. You run the room when the pager goes off.",
    background:
      "Strong SOC experience helps. You need log analysis, endpoint triage, and calm under pressure. Scripting for repetitive collection tasks saves hours. GCIH or equivalent hands-on training is a common entry point from Tier 2 SOC.",
    salaryDisplay: { type: "table", salaries: SALARY_INCIDENT_RESPONDER },
    industries: [
      "Financial services",
      "Healthcare",
      "Managed security providers",
      "Government",
      "Technology",
      "Retail",
    ],
    toolsFree: [
      "Velociraptor",
      "Autopsy / Sleuth Kit",
      "Wireshark",
      "Volatility",
      "TheHive / Cortex",
    ],
    toolsEnterprise: [
      "CrowdStrike Falcon",
      "Microsoft Defender XDR",
      "Splunk or Sentinel",
      "EnCase or FTK",
      "ServiceNow SecOps",
    ],
    certs: [
      {
        name: "GCIH",
        note: "Proves you understand incident handling and attacker techniques. Common hire signal for IR roles.",
      },
      {
        name: "GCFA",
        note: "Forensics-focused. Worth it if your team does disk and memory analysis, not just log triage.",
      },
      {
        name: "BTL2",
        note: "Hands-on blue team cert at a lower cost than SANS. Good for building practical IR skills.",
      },
    ],
    careerProgression: [
      "Senior incident responder or IR team lead",
      "Threat hunter or detection engineering",
      "DFIR consultant or MSSP principal",
    ],
    relatedRoles: [
      {
        name: "SOC Analyst",
        note: "Where most IR specialists start. You learn triage before you run the breach.",
      },
      {
        name: "Threat Hunter",
        note: "If you prefer finding problems before they become incidents.",
      },
      {
        name: "EDR Analyst",
        note: "Deep endpoint focus without the full breach coordination load.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["incident-responder"],
  },
  {
    slug: "threat-hunter",
    name: "Threat Hunter",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Mid to Senior",
    v1: false,
    dayToDay:
      "You start with a hypothesis, not an alert. Most of your week is querying logs, correlating endpoint data, and proving or disproving that something is in the environment. When you find something, you hand off to IR or detection engineering. A lot of hunts end with nothing. That is still useful.",
    differentiator:
      "SOC analysts react to alerts. You go looking for attackers who never triggered a rule. Incident responders contain active breaches. You find the breach before it becomes one.",
    background:
      "You need strong log analysis and ATT&CK fluency. SOC Tier 2 experience or equivalent lab work is the usual path. Comfort with KQL, Sigma, or Splunk SPL matters more than certs at hire time.",
    salaryDisplay: { type: "table", salaries: SALARY_THREAT_HUNTER },
    industries: [
      "Banking and fintech",
      "Defence contractors",
      "Large enterprises",
      "MSSPs",
      "Critical infrastructure",
    ],
    toolsFree: [
      "Sigma rules",
      "Velociraptor",
      "MISP",
      "YARA",
      "Atomic Red Team",
    ],
    toolsEnterprise: [
      "Microsoft Sentinel / Defender",
      "Splunk Enterprise Security",
      "CrowdStrike Falcon",
      "Elastic Security",
      "Recorded Future or Mandiant intel feeds",
    ],
    certs: [
      {
        name: "BTL2",
        note: "Practical blue team skills including hunting workflows. Strong portfolio signal.",
      },
      {
        name: "GCTI",
        note: "Threat intelligence focus. Useful when your hunts lean on actor TTPs and campaigns.",
      },
      {
        name: "OSCP",
        note: "Not required, but hiring managers like hunters who understand how attacks actually work.",
      },
    ],
    careerProgression: [
      "Lead threat hunter or detection engineering lead",
      "Purple team specialist",
      "Threat intel analyst or CTI lead",
    ],
    relatedRoles: [
      {
        name: "SOC Analyst",
        note: "The usual starting point before you have enough log context to hunt well.",
      },
      {
        name: "Incident Responder",
        note: "When you find something real, IR takes over containment.",
      },
      {
        name: "EDR Analyst",
        note: "Overlaps on endpoint data, but EDR roles tune and respond more than hypothesise.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["threat-hunter"],
  },
  {
    slug: "edr-analyst",
    name: "EDR Analyst",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Entry to Mid",
    v1: false,
    dayToDay:
      "You live in the EDR console. Alerts from endpoints land in your queue. You investigate process trees, parent-child relationships, and network connections from a single host view. Tuning false positives and writing exclusions is a regular task. When something is real, you isolate the machine and escalate.",
    differentiator:
      "SOC analysts see alerts across the whole estate. You go deep on one endpoint platform. Incident responders coordinate the breach. You are the person who knows what CrowdStrike or Defender is actually showing on the host.",
    background:
      "SOC Tier 1 or IT support with security interest works. You need Windows and Linux basics, malware behaviour intuition, and patience for noisy consoles. Scripting helps but is not day-one required.",
    salaryDisplay: { type: "table", salaries: SALARY_EDR_ANALYST },
    industries: [
      "Enterprises with mature endpoint programmes",
      "MSSPs",
      "Healthcare",
      "Manufacturing",
      "Professional services",
    ],
    toolsFree: [
      "Wazuh",
      "Osquery",
      "Sysmon",
      "Velociraptor",
      "Flare VM or REMnux for malware triage",
    ],
    toolsEnterprise: [
      "CrowdStrike Falcon",
      "Microsoft Defender for Endpoint",
      "SentinelOne",
      "Carbon Black",
      "Tanium",
    ],
    certs: [
      {
        name: "BTL1",
        note: "Entry-level blue team cert. Covers endpoint and SOC fundamentals without SANS pricing.",
      },
      {
        name: "Microsoft SC-200",
        note: "Relevant if your shop runs Defender and Sentinel. Shows you can operate the Microsoft stack.",
      },
      {
        name: "CompTIA CySA+",
        note: "Broad defensive cert. Less EDR-specific but recognised at entry level.",
      },
    ],
    careerProgression: [
      "Senior EDR analyst or endpoint security engineer",
      "Incident responder",
      "Detection engineer",
    ],
    relatedRoles: [
      {
        name: "SOC Analyst",
        note: "Broader alert triage across SIEM and EDR. Common path into EDR specialisation.",
      },
      {
        name: "Incident Responder",
        note: "When endpoint findings become a full breach.",
      },
      {
        name: "Threat Hunter",
        note: "If you want proactive searches instead of reactive alert queues.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["edr-analyst"],
  },
] as const;
