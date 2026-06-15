import type { ComingSoonRoleContent } from "@/types/role";

import { CABINET_PREVIEW_BY_SLUG } from "@/lib/roles/coming-soon-cabinet";
import {
  BUG_BOUNTY_SALARY_NOTE,
  SALARY_RED_TEAMER,
  SALARY_VA_ANALYST,
} from "@/lib/roles/coming-soon-salaries";

export const OFFENSIVE_COMING_SOON_ROLES: readonly ComingSoonRoleContent[] = [
  {
    slug: "vulnerability-assessment-analyst",
    name: "Vulnerability Assessment Analyst",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Entry to Mid",
    v1: false,
    dayToDay:
      "You run scans, review results, and decide what actually matters. Most days are Nessus or Qualys output, false positive triage, and writing up findings for system owners. You rarely exploit anything. Your job is coverage, prioritisation, and keeping the vulnerability backlog honest.",
    differentiator:
      "Penetration testers exploit and chain findings into attack paths. You assess breadth across the estate and feed remediation programmes. Red teamers simulate adversaries. You measure exposure.",
    background:
      "IT or networking background helps. You need to read scan output critically and talk to sysadmins without alienating them. Basic Linux and networking are enough to start. Pentest skills are a plus but not the job.",
    salaryDisplay: { type: "table", salaries: SALARY_VA_ANALYST },
    industries: [
      "Large enterprises",
      "Banks and insurers",
      "Government",
      "MSSPs",
      "Retail and hospitality",
    ],
    toolsFree: [
      "OpenVAS / Greenbone",
      "Nmap",
      "Nikto",
      "Lynis",
      "OpenSCAP",
    ],
    toolsEnterprise: [
      "Tenable Nessus / Tenable.io",
      "Qualys VMDR",
      "Rapid7 InsightVM",
      "Microsoft Defender Vulnerability Management",
      "ServiceNow VR",
    ],
    certs: [
      {
        name: "CompTIA Security+",
        note: "Baseline hire signal. Shows you understand vulnerability concepts and risk.",
      },
      {
        name: "CEH",
        note: "Common in VA job posts. Less respected than hands-on work, but gets past HR filters.",
      },
      {
        name: "CompTIA CySA+",
        note: "Bridges assessment and defensive operations. Useful if you want to move toward SOC later.",
      },
    ],
    careerProgression: [
      "Vulnerability management lead",
      "Penetration tester",
      "Security engineer with VM programme ownership",
    ],
    relatedRoles: [
      {
        name: "Penetration Tester",
        note: "When you want to go beyond scanning into exploitation and reporting.",
      },
      {
        name: "GRC Analyst",
        note: "If you prefer compliance mapping over technical scanning.",
      },
      {
        name: "Cloud Security Engineer",
        note: "Cloud posture assessment overlaps heavily with modern VA work.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["vulnerability-assessment-analyst"],
  },
  {
    slug: "red-teamer",
    name: "Red Teamer",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Mid to Senior",
    v1: false,
    dayToDay:
      "You run simulated attacks over weeks, not hours. Most of your time is planning, maintaining access, and avoiding detection while you work toward an objective. Reporting happens at the end. Between engagements you build tooling, refine TTPs, and brief blue team on what they missed.",
    differentiator:
      "Penetration testers find and report vulnerabilities in a scoped test. Red teamers emulate real adversaries with stealth and persistence as goals. Bug bounty hunters work alone on public scopes. You work as part of an internal or consulting team with defined objectives.",
    background:
      "Strong pentest background is expected. OSCP or equivalent practical experience, comfort with C2 frameworks, and understanding of blue team detection are baseline. You need discretion and good written communication for debriefs.",
    salaryDisplay: { type: "table", salaries: SALARY_RED_TEAMER },
    industries: [
      "Banks and defence",
      "Large technology companies",
      "Consultancies",
      "Critical infrastructure",
      "Insurance and pharma",
    ],
    toolsFree: [
      "Kali Linux",
      "Sliver or Havoc C2",
      "BloodHound",
      "Impacket",
      "Caldera",
    ],
    toolsEnterprise: [
      "Cobalt Strike (licensed)",
      "Mandiant Advantage",
      "Palo Alto Cortex XDR (for purple team)",
      "SafeBreach or AttackIQ",
      "Internal purple team platforms",
    ],
    certs: [
      {
        name: "OSCP",
        note: "Still the baseline practical offensive cert. Red team hires expect it or something equivalent.",
      },
      {
        name: "CRTO",
        note: "Red team operations focus. Cheaper than advanced SANS and well regarded in the community.",
      },
      {
        name: "OSEP",
        note: "Evasion and advanced exploitation. Natural step after OSCP for red team work.",
      },
    ],
    careerProgression: [
      "Lead red team operator",
      "Purple team lead bridging offensive and defensive",
      "Adversary emulation consultant",
    ],
    relatedRoles: [
      {
        name: "Penetration Tester",
        note: "The usual path in. Scoped tests before long-running adversary simulations.",
      },
      {
        name: "Threat Hunter",
        note: "Blue team side of the same coin. Some operators move between both.",
      },
      {
        name: "Bug Bounty Hunter",
        note: "Independent hunting on programmes. Different economics, overlapping skills.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["red-teamer"],
  },
  {
    slug: "bug-bounty-hunter",
    name: "Bug Bounty Hunter",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Entry to Senior",
    v1: false,
    dayToDay:
      "You pick programmes, read scopes, and hunt alone. There is no standup and no guaranteed paycheque. Good days are valid findings and payouts. Bad days are duplicates, out-of-scope rejections, and hours spent on nothing. You live in Burp, notes, and platform dashboards.",
    differentiator:
      "Penetration testers work on contracted engagements with defined scope and deadlines. You work independently on public programmes with outcome-based pay. Red teamers emulate adversaries internally. You compete with other hunters on the same targets.",
    background:
      "Web application testing skills are essential. OSCP or strong self-taught web hacking background helps. You need discipline, thick skin for rejections, and another income source while you build a track record. This is rarely a first security job.",
    salaryDisplay: { type: "note", note: BUG_BOUNTY_SALARY_NOTE },
    industries: [
      "Independent / self-employed",
      "Technology companies with public programmes",
      "Fintech and crypto platforms",
      "SaaS vendors",
      "Consultancies that sponsor hunter time",
    ],
    toolsFree: [
      "Burp Suite Community",
      "OWASP ZAP",
      "ffuf / feroxbuster",
      "nuclei",
      "HackerOne / Bugcrowd platforms",
    ],
    toolsEnterprise: [
      "Burp Suite Professional",
      "Cobalt Strike (for advanced web)",
      "Nessus (for scope recon)",
      "Private programme access",
      "Custom automation pipelines",
    ],
    certs: [
      {
        name: "OSCP",
        note: "Not required for bounties, but proves baseline offensive skills to platforms and sponsors.",
      },
      {
        name: "BSCP",
        note: "Burp-focused web testing cert. Directly relevant to how most bounties are found.",
      },
      {
        name: "PNPT",
        note: "Practical network and web testing at lower cost. Good portfolio builder before going full-time.",
      },
    ],
    careerProgression: [
      "Full-time independent hunter",
      "Penetration tester at a consultancy",
      "AppSec engineer with offensive background",
    ],
    relatedRoles: [
      {
        name: "Penetration Tester",
        note: "Stable salary and structured engagements. Common move when bounty income is inconsistent.",
      },
      {
        name: "AppSec Engineer",
        note: "Defensive side of the same vulnerabilities you find in programmes.",
      },
      {
        name: "Red Teamer",
        note: "If you want team-based adversary simulation instead of solo hunting.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["bug-bounty-hunter"],
  },
] as const;
