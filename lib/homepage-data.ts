export interface RoleTag {
  name: string;
  slug: string;
  v1: boolean;
}

export interface SecurityDomain {
  id: string;
  name: string;
  description: string;
  roles: RoleTag[];
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface CabinetArtifact {
  name: string;
  role: string;
  domain: string;
}

export const problemStatements: readonly string[] = [
  "Most courses teach you to pass a quiz. Employers want someone who has used the tools, read the logs, and fixed something real. Watching videos does not get you there.",
  "CTF boxes and guided labs are useful. They are also not your job. When you start work, the environment looks different and nobody hands you hints.",
  "You can finish a path and still have nothing to show in an interview except a PDF certificate. Hiring managers want artifacts, not badges.",
  "Enterprise tools often stay invisible until your first week on the job. You should know what Splunk, Sentinel, or Burp look like before that conversation.",
] as const;

export const howItWorksSteps: readonly HowItWorksStep[] = [
  {
    number: "01",
    title: "Tell us where you're starting",
    description:
      "No IT background, IT pivot, or already in security. A short assessment points you at the right entry, not a generic syllabus.",
  },
  {
    number: "02",
    title: "Pick your role",
    description:
      "SOC analyst, pentester, cloud security, GRC, and more. Each role is an ordered set of modules built for that job, not a one-size-fits-all track.",
  },
  {
    number: "03",
    title: "Build real skills with real tools",
    description:
      "Scenarios first. You install open source tools in your lab and use them on real tasks. Each module also covers the enterprise tool you will see on the job.",
  },
  {
    number: "04",
    title: "Walk into interviews ready",
    description:
      "Your cabinet holds what you built. Interview prep and CV guidance are tied to your role, not generic security trivia.",
  },
] as const;

export const securityDomains: readonly SecurityDomain[] = [
  {
    id: "defensive-security",
    name: "Defensive Security",
    description: "Detect, respond, and hunt threats inside live environments.",
    roles: [
      { name: "SOC Analyst", slug: "soc-analyst", v1: true },
      { name: "Incident Responder", slug: "incident-responder", v1: false },
      { name: "Threat Hunter", slug: "threat-hunter", v1: false },
      { name: "EDR Analyst", slug: "edr-analyst", v1: false },
      { name: "DFIR Analyst", slug: "dfir-analyst", v1: false },
    ],
  },
  {
    id: "offensive-security",
    name: "Offensive Security",
    description: "Find weaknesses before attackers do, and report them clearly.",
    roles: [
      {
        name: "Vulnerability Assessment Analyst",
        slug: "vulnerability-assessment-analyst",
        v1: false,
      },
      { name: "Penetration Tester", slug: "penetration-tester", v1: true },
      { name: "Red Teamer", slug: "red-teamer", v1: false },
      { name: "Bug Bounty Hunter", slug: "bug-bounty-hunter", v1: false },
      { name: "Malware Analyst", slug: "malware-analyst", v1: false },
      { name: "AI Red Teamer", slug: "ai-red-teamer", v1: false },
    ],
  },
  {
    id: "application-product-security",
    name: "Application and Product Security",
    description: "Secure code, APIs, and pipelines before they reach production.",
    roles: [
      { name: "AppSec Engineer", slug: "appsec-engineer", v1: true },
      { name: "API Security Engineer", slug: "api-security-engineer", v1: true },
      { name: "DevSecOps Engineer", slug: "devsecops-engineer", v1: false },
      { name: "AI Security Engineer", slug: "ai-security-engineer", v1: false },
    ],
  },
  {
    id: "cloud-infrastructure-security",
    name: "Cloud and Infrastructure Security",
    description: "Protect identity, networks, and workloads across cloud platforms.",
    roles: [
      {
        name: "Azure Security Engineer",
        slug: "azure-security-engineer",
        v1: true,
      },
      { name: "AWS Security Engineer", slug: "aws-security-engineer", v1: false },
      { name: "GCP Security Engineer", slug: "gcp-security-engineer", v1: false },
      { name: "Network Security Engineer", slug: "network-security-engineer", v1: false },
      { name: "Identity Security Engineer", slug: "identity-security-engineer", v1: false },
      { name: "Email Security Engineer", slug: "email-security-engineer", v1: false },
      { name: "Security Engineer", slug: "security-engineer", v1: false },
    ],
  },
  {
    id: "governance-risk-compliance",
    name: "Governance, Risk and Compliance",
    description: "Frameworks, risk registers, policies, and audit evidence.",
    roles: [
      { name: "GRC Analyst", slug: "grc-analyst", v1: true },
      { name: "Compliance Analyst", slug: "compliance-analyst", v1: false },
      { name: "Risk Analyst", slug: "risk-analyst", v1: false },
      { name: "Security Auditor", slug: "security-auditor", v1: false },
      { name: "vCISO", slug: "vciso", v1: false },
      { name: "Privacy Analyst", slug: "privacy-analyst", v1: false },
    ],
  },
  {
    id: "ot-ics-security",
    name: "Operational Technology and Industrial Control Systems Security",
    description:
      "The people who secure the industrial systems and physical infrastructure behind power, water, manufacturing, and other critical services.",
    roles: [
      { name: "OT Security Analyst", slug: "ot-security-analyst", v1: false },
      { name: "OT Security Engineer", slug: "ot-security-engineer", v1: false },
    ],
  },
] as const;

export const cabinetArtifacts: readonly CabinetArtifact[] = [
  {
    name: "Working Microsoft Sentinel workspace",
    role: "Azure Security Engineer",
    domain: "Cloud and Infrastructure Security",
  },
  {
    name: "Completed penetration test report",
    role: "Penetration Tester",
    domain: "Offensive Security",
  },
  {
    name: "Running Wazuh SIEM with custom detection rules",
    role: "SOC Analyst",
    domain: "Defensive Security",
  },
  {
    name: "ISO 27001 gap analysis report",
    role: "GRC Analyst",
    domain: "Governance, Risk and Compliance",
  },
  {
    name: "Postman API security testing collection",
    role: "API Security Engineer",
    domain: "Application and Product Security",
  },
  {
    name: "Configured Entra ID tenant with documented policies",
    role: "Azure Security Engineer",
    domain: "Cloud and Infrastructure Security",
  },
] as const;

export const openSourceStats = {
  githubStars: "—",
  rolesAvailable: "30+",
  modulesAvailable: "50+",
} as const;

export const GITHUB_REPO_URL = "https://github.com/chiivy/cyberpivot" as const;
