import type { RolePageContent } from "@/types/role";

import { OT_SECURITY_ANALYST_ENRICHED } from "@/lib/roles/enriched/ot-security-analyst";
import { OT_SECURITY_ANALYST_ROLE_SLUG } from "@/types/role-path";

export const OT_SECURITY_ANALYST_ROLE: RolePageContent = {
  slug: OT_SECURITY_ANALYST_ROLE_SLUG,
  name: "OT Security Analyst",
  domain: "Operational Technology and Industrial Control Systems Security",
  domainId: "ot-ics-security",
  level: "Entry to Mid",
  v1: true,
  cabinetPath: "ot-security",
  dayToDay:
    "You monitor industrial and building-control networks, analyse OT protocol traffic, and help the organisation understand whether IT incidents can reach physical systems. Most days mix alert triage, asset inventory work, and writing short briefs for managers who know IT security but not OT.",
  background:
    "SOC, network engineering, IT administration, or control systems engineering backgrounds fit well. This is rarely a career-zero role. Complete beginners should start with SOC Analyst or foundations before specialising in OT.",
  typicalWeek: [
    "Monday: Review weekend OT monitoring alerts and vendor remote-access log.",
    "Tuesday: Analyse Modbus or BACnet traffic from a new building segment.",
    "Wednesday: Update Purdue-level asset map after a controller change.",
    "Thursday: Work with IT on an IT/OT boundary rule review.",
    "Friday: Document findings and refine detection for unexpected write commands.",
  ],
  salaries: [
    {
      region: "United Kingdom",
      entry: "£38k–£55k",
      mid: "£55k–£80k",
      senior: "£80k+",
    },
    {
      region: "United States",
      entry: "$110k–$155k",
      mid: "$155k–$195k",
      senior: "$195k+",
    },
    {
      region: "European Union",
      entry: "€58k–€75k (inferred)",
      mid: "€75k–€100k (inferred)",
      senior: "€100k+ (inferred)",
    },
    {
      region: "Nigeria",
      entry: "Specialist role, see role page note",
      mid: "₦600k–₦1.5m/mo experienced",
      senior: "₦1.5m+/mo oil and gas sector",
    },
  ],
  industries: [
    "Energy and utilities",
    "Oil and gas",
    "Manufacturing",
    "Banking and data centres",
    "Healthcare campuses",
    "Critical infrastructure",
  ],
  toolsFree: [
    "Wireshark",
    "GRFICS",
    "Malcolm",
    "Zeek (OT analysis)",
    "diagrams.net",
  ],
  toolsEnterprise: [
    "Nozomi Networks",
    "Claroty",
    "Dragos",
    "Fortinet OT",
    "Palo Alto Networks",
  ],
  certs: [
    {
      name: "GIAC GICSP",
      note: "Global Industrial Cyber Security Professional. Strong OT-specific signal once you have IT security fundamentals.",
    },
    {
      name: "CompTIA Security+",
      note: "Useful baseline if you are transitioning from IT. Not OT-specific but employers still ask for it.",
    },
    {
      name: "IEC 62443 training",
      note: "Vendor-neutral OT security architecture knowledge. Valued in industrial and critical infrastructure hiring.",
    },
  ],
  careerProgression: [
    "OT Security Analyst",
    "Senior OT Security Analyst",
    "OT Security Engineer",
    "OT Security Architect or ICS Security Lead",
  ],
  modules: [
    {
      name: "What OT Security Actually Is, and Why IT Playbooks Break",
      slug: "module-01-what-ot-security-is",
      status: "available",
    },
    {
      name: "The Purdue Model and OT Network Architecture",
      slug: "module-02-purdue-model-and-network-architecture",
      status: "available",
    },
    {
      name: "Industrial Protocols on the Wire",
      status: "coming-soon",
    },
    {
      name: "OT Monitoring Lab with Malcolm",
      status: "coming-soon",
    },
    {
      name: "OT Asset Discovery and Inventory",
      status: "coming-soon",
    },
    {
      name: "OT Incident Response",
      status: "coming-soon",
    },
    {
      name: "OT Security Analyst Capstone",
      status: "coming-soon",
    },
  ],
  ...OT_SECURITY_ANALYST_ENRICHED,
};
