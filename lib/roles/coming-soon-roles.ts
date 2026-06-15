import type { ComingSoonRoleContent } from "@/types/role";

export const COMING_SOON_ROLE_PAGES: readonly ComingSoonRoleContent[] = [
  {
    slug: "incident-responder",
    name: "Incident Responder",
    domain: "Defensive Security",
    domainId: "defensive-security",
    oneLiner:
      "Contains breaches, removes threats, and documents what happened so the business can recover and learn.",
  },
  {
    slug: "threat-hunter",
    name: "Threat Hunter",
    domain: "Defensive Security",
    domainId: "defensive-security",
    oneLiner:
      "Hunts for attackers who did not trip an alert, using hypotheses, logs, and patience.",
  },
  {
    slug: "edr-analyst",
    name: "EDR Analyst",
    domain: "Defensive Security",
    domainId: "defensive-security",
    oneLiner:
      "Lives in endpoint telemetry: CrowdStrike, Defender, or SentinelOne, tuning detections and responding on hosts.",
  },
  {
    slug: "vulnerability-assessment-analyst",
    name: "Vulnerability Assessment Analyst",
    domain: "Offensive Security",
    domainId: "offensive-security",
    oneLiner:
      "Finds and prioritises vulnerabilities across estates without full exploitation engagements.",
  },
  {
    slug: "red-teamer",
    name: "Red Teamer",
    domain: "Offensive Security",
    domainId: "offensive-security",
    oneLiner:
      "Simulates long-running adversary campaigns with stealth, persistence, and clear objectives.",
  },
  {
    slug: "bug-bounty-hunter",
    name: "Bug Bounty Hunter",
    domain: "Offensive Security",
    domainId: "offensive-security",
    oneLiner:
      "Finds bugs in public scopes for bounties. Independent, self-paced, and outcome-driven.",
  },
  {
    slug: "devsecops-engineer",
    name: "DevSecOps Engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    oneLiner:
      "Embeds security in CI/CD: pipeline gates, secrets scanning, container security, and IaC checks.",
  },
  {
    slug: "ai-security-engineer",
    name: "AI Security Engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    oneLiner:
      "Secures LLM features, agents, and RAG pipelines: prompt injection, model abuse, and AI governance.",
  },
  {
    slug: "aws-security-engineer",
    name: "AWS Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    oneLiner:
      "Secures AWS accounts: IAM, GuardDuty, Security Hub, VPC controls, and cloud IR.",
  },
  {
    slug: "gcp-security-engineer",
    name: "GCP Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    oneLiner:
      "Secures Google Cloud workloads, IAM, Security Command Center, and Chronicle where used.",
  },
  {
    slug: "network-security-engineer",
    name: "Network Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    oneLiner:
      "Owns firewalls, segmentation, IDS/IPS, and zero trust networking between sites and cloud.",
  },
  {
    slug: "identity-security-engineer",
    name: "Identity Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    oneLiner:
      "Focuses on IAM, PAM, SSO, MFA, and directory security across the estate.",
  },
  {
    slug: "email-security-engineer",
    name: "Email Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    oneLiner:
      "SPF, DKIM, DMARC, gateway tuning, phishing analysis, and email-based incident work.",
  },
  {
    slug: "compliance-analyst",
    name: "Compliance Analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    oneLiner:
      "Maps controls to GDPR, HIPAA, PCI-DSS, and industry rules, and keeps evidence current.",
  },
  {
    slug: "risk-analyst",
    name: "Risk Analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    oneLiner:
      "Quantifies risk, runs registers, and reports to leadership with treatment plans.",
  },
  {
    slug: "security-auditor",
    name: "Security Auditor",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    oneLiner:
      "Tests whether controls work, collects evidence, and produces audit findings.",
  },
  {
    slug: "vciso",
    name: "vCISO",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    oneLiner:
      "Fractional security leadership: strategy, board communication, and programme design for smaller organisations.",
  },
] as const;
