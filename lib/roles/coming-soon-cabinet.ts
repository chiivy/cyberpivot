import type { CabinetPreviewItem } from "@/types/onboarding";

export const CABINET_PREVIEW_BY_SLUG: Record<
  string,
  readonly CabinetPreviewItem[]
> = {
  "incident-responder": [
    {
      name: "Chain of custody and forensic acquisition report",
      description:
        "Evidence handling documented from seizure through imaging, with hashes verified and custody forms completed. Courts and insurers care about this paper trail as much as the technical findings.",
      unlocksInModule: "Digital Forensics Foundations",
    },
    {
      name: "Incident investigation report",
      description:
        "Attack timeline, evidence chain, root cause, containment steps, and lessons learned documented end to end. This is what leadership reads when the breach is over.",
      unlocksInModule: "Incident Response",
    },
    {
      name: "Cloud incident response runbook",
      description:
        "Detection, investigation, and containment playbooks for identity compromise and data exfiltration in cloud environments. You need a plan before the pager goes off.",
      unlocksInModule: "Cloud Incident Response",
    },
    {
      name: "e-Discovery response playbook",
      description:
        "Legal hold process, evidence preservation steps, and stakeholder communication templates for litigation or regulatory inquiry. IR teams increasingly overlap with legal.",
      unlocksInModule: "e-Discovery and Legal Hold",
    },
  ],
  "threat-hunter": [
    {
      name: "MITRE ATT&CK mapped threat hunting report",
      description:
        "A hypothesis, data sources queried, KQL or Sigma queries, and findings tied to ATT&CK techniques. Shows you can hunt, not only wait for alerts.",
      unlocksInModule: "Threat Hunting",
    },
    {
      name: "IOC enrichment report",
      description:
        "IPs, domains, and hashes enriched via VirusTotal, AbuseIPDB, and WHOIS, mapped to threat actor TTPs. Turns raw indicators into context you can brief with.",
      unlocksInModule: "Threat Intelligence",
    },
    {
      name: "Custom hunting queries library",
      description:
        "Sigma, KQL, or Splunk queries for living-off-the-land techniques, credential access, and persistence. Reusable queries beat one-off investigations.",
      unlocksInModule: "Detection Engineering",
    },
    {
      name: "Endpoint triage checklists",
      description:
        "First responder reference cards built from real investigation steps. You keep these when the clock is ticking and someone asks what to pull first.",
      unlocksInModule: "Endpoint Triage",
    },
  ],
  "edr-analyst": [
    {
      name: "EDR detection tuning report",
      description:
        "False positives documented, exclusions justified, and high-value detections enabled with before and after alert volume. Tuning is half the EDR job.",
      unlocksInModule: "EDR Operations",
    },
    {
      name: "Host-based investigation report",
      description:
        "Process tree, network connections, persistence mechanisms, and remediation steps documented from a single endpoint alert. Shows you can work without a full SIEM.",
      unlocksInModule: "Endpoint Investigation",
    },
    {
      name: "Linux and Windows triage checklists",
      description:
        "First responder reference cards for live response on both platforms. EDR consoles do not replace knowing what to collect on the host.",
      unlocksInModule: "Endpoint Triage",
    },
    {
      name: "Malware containment playbook",
      description:
        "Isolation steps, evidence preservation, and recovery procedures tested against a simulated infection. Speed matters when ransomware is moving.",
      unlocksInModule: "Malware Response",
    },
  ],
  "vulnerability-assessment-analyst": [
    {
      name: "Vulnerability assessment report",
      description:
        "Scan results reviewed, false positives cut, findings CVSS scored and prioritised by exploitability and impact. Clients pay for judgement, not raw scanner output.",
      unlocksInModule: "Vulnerability Assessment",
    },
    {
      name: "Vulnerability management programme design",
      description:
        "SLAs, exception process, and remediation ownership documented for a realistic estate. Scanning without a programme is just a list that nobody fixes.",
      unlocksInModule: "Vulnerability Management",
    },
    {
      name: "CIS benchmark compliance report",
      description:
        "Baseline posture captured, high severity misconfigurations fixed, and before and after scores compared. Shows measurable improvement, not checkbox compliance.",
      unlocksInModule: "Configuration Assessment",
    },
    {
      name: "Assessment strategy document",
      description:
        "When to use credentialed scans, agent-based assessment, or manual review. Explains trade-offs to stakeholders who want everything scanned yesterday.",
      unlocksInModule: "Assessment Planning",
    },
  ],
  "red-teamer": [
    {
      name: "Red team engagement report",
      description:
        "Objectives, attack path, TTPs used, detection gaps found, and remediation priorities for blue team. Stealth and storytelling matter as much as the exploit.",
      unlocksInModule: "Red Team Reporting",
    },
    {
      name: "Post-exploitation report",
      description:
        "What an attacker could access, simulated data exfiltration, and persistence mechanisms documented. Scope and impact matter as much as the initial foothold.",
      unlocksInModule: "Post-Exploitation",
    },
    {
      name: "Adversary emulation plan",
      description:
        "Threat actor profile, mapped TTPs, and phased execution timeline aligned to MITRE ATT&CK. Shows you think like an operator, not a scanner.",
      unlocksInModule: "Adversary Emulation",
    },
    {
      name: "C2 infrastructure lab notes",
      description:
        "Command and control setup, evasion techniques tested, and detection opportunities documented. Red teamers need to understand what defenders actually see.",
      unlocksInModule: "Command and Control",
    },
  ],
  "bug-bounty-hunter": [
    {
      name: "Responsible disclosure write-up",
      description:
        "Finding documented with clear repro steps, impact assessment, and remediation guidance for a programme submission. Quality reports get paid and get you invited back.",
      unlocksInModule: "Bug Bounty Reporting",
    },
    {
      name: "Burp Suite project",
      description:
        "SQL injection, XSS, IDOR, and broken authentication documented with request and response evidence. Web apps are still where most bounties live.",
      unlocksInModule: "Web Application Testing",
    },
    {
      name: "Reconnaissance report",
      description:
        "OSINT, subdomains, tech fingerprinting, and exposed services from public scopes. Good recon saves hours of blind testing on programmes with wide attack surfaces.",
      unlocksInModule: "Reconnaissance",
    },
    {
      name: "Bug bounty programme tracker",
      description:
        "Scopes, rules, past submissions, and payout history organised for repeat hunting. Treating it like a portfolio beats chasing every new programme blindly.",
      unlocksInModule: "Programme Selection",
    },
  ],
  "devsecops-engineer": [
    {
      name: "CI/CD security pipeline",
      description:
        "GitHub Actions running Semgrep, OWASP Dependency Check, Trivy, and Gitleaks with pass/fail gates. Security in the pipeline beats security in a slide deck.",
      unlocksInModule: "Pipeline Security",
    },
    {
      name: "Semgrep custom rule set",
      description:
        "Ten or more rules targeting OWASP Top 10 in a chosen language, tested on vulnerable and safe samples. You ship repeatable detection developers can run in CI.",
      unlocksInModule: "Static Application Security Testing",
    },
    {
      name: "Security-enhanced user stories",
      description:
        "Acceptance criteria with security requirements embedded for sprint planning. Shifts left without blocking every release with a manual review gate.",
      unlocksInModule: "Secure SDLC",
    },
    {
      name: "Infrastructure as Code security review",
      description:
        "Terraform or CloudFormation scanned with Checkov or tfsec, findings triaged, and fixes applied. Cloud misconfigurations ship through pipelines too.",
      unlocksInModule: "IaC Security",
    },
  ],
  "ai-security-engineer": [
    {
      name: "LLM threat model",
      description:
        "STRIDE applied to an LLM-powered app with MITRE ATLAS techniques mapped and mitigations listed. You show you can threat model systems that are not traditional web stacks.",
      unlocksInModule: "AI Threat Modeling",
    },
    {
      name: "Prompt injection research report",
      description:
        "Direct and indirect injection attacks documented, payloads catalogued, and detection or prevention strategies tested. This is the vulnerability everyone talks about and few test properly.",
      unlocksInModule: "LLM Attack Techniques",
    },
    {
      name: "RAG system security assessment",
      description:
        "Retrieval pipeline assessed for data poisoning, prompt leakage, and unauthorised data access. RAG is where many production AI apps hide their real risk.",
      unlocksInModule: "RAG Security",
    },
    {
      name: "AI governance policy",
      description:
        "Policy for responsible AI use, risk assessment for new tools, and EU AI Act considerations documented. Security teams are being asked to govern AI whether they feel ready or not.",
      unlocksInModule: "AI Governance",
    },
  ],
  "aws-security-engineer": [
    {
      name: "AWS Security Hub posture report",
      description:
        "Findings aggregated across services, critical issues remediated, and before and after scores compared. Shows you can operate AWS native security tooling, not just read docs.",
      unlocksInModule: "AWS Security Services",
    },
    {
      name: "IAM least privilege review",
      description:
        "Overprivileged roles identified, policies tightened, and break-glass access documented. Identity is where most cloud breaches start.",
      unlocksInModule: "AWS Identity and Access",
    },
    {
      name: "Cloud incident response runbook",
      description:
        "Detection via GuardDuty or Security Hub, investigation steps, and containment playbooks for compromised credentials and data exfiltration.",
      unlocksInModule: "AWS Incident Response",
    },
    {
      name: "CIS AWS benchmark compliance report",
      description:
        "Baseline posture captured, high severity misconfigurations fixed, and gaps prioritised. Auditors and customers ask for this on day one.",
      unlocksInModule: "AWS Compliance",
    },
  ],
  "gcp-security-engineer": [
    {
      name: "Security Command Center findings report",
      description:
        "Misconfigurations and threats aggregated, critical issues remediated, and improvement tracked over time. GCP security starts in SCC, not spreadsheets.",
      unlocksInModule: "GCP Security Services",
    },
    {
      name: "GCP IAM and organisation policy review",
      description:
        "Overprivileged service accounts identified, org policies enforced, and workload identity configured. Same identity problems as other clouds, different console.",
      unlocksInModule: "GCP Identity and Access",
    },
    {
      name: "Chronicle or SIEM integration lab",
      description:
        "Log sources connected, detection rules written, and a sample investigation documented. GCP shops often pair native tools with Chronicle or third-party SIEM.",
      unlocksInModule: "GCP Detection and Response",
    },
    {
      name: "CIS GCP benchmark compliance report",
      description:
        "Baseline posture captured, high severity misconfigurations fixed, and gaps prioritised for remediation sprints.",
      unlocksInModule: "GCP Compliance",
    },
  ],
  "network-security-engineer": [
    {
      name: "TLS configuration audit report",
      description:
        "Weak ciphers, expired certificates, and misconfigured protocols identified with before and after hardening documented. TLS mistakes are still common and easy to find.",
      unlocksInModule: "Cryptography and TLS",
    },
    {
      name: "Network segmentation architecture diagram",
      description:
        "VLANs, firewalls, zero trust zones, and traffic flows drawn clearly. Architects and auditors ask for this on day one of a network review.",
      unlocksInModule: "Network Architecture",
    },
    {
      name: "Firewall rule review report",
      description:
        "Overly permissive rules identified, shadow rules removed, and change process documented. Firewall sprawl is how lateral movement stays invisible.",
      unlocksInModule: "Firewall Management",
    },
    {
      name: "IDS/IPS tuning report",
      description:
        "Signature updates reviewed, false positives tuned, and coverage gaps mapped to MITRE ATT&CK. Detection on the wire still matters when endpoints go dark.",
      unlocksInModule: "Network Detection",
    },
  ],
  "identity-security-engineer": [
    {
      name: "Federated identity implementation guide",
      description:
        "SAML or OIDC integration documented with security review of token handling, session lifetime, and logout behaviour. SSO breaks in subtle ways.",
      unlocksInModule: "Federated Identity",
    },
    {
      name: "Privileged access management review",
      description:
        "Standing admin access removed, JIT elevation configured, and session recording enabled where required. PAM is identity security at its most critical.",
      unlocksInModule: "Privileged Access Management",
    },
    {
      name: "Access control model decision document",
      description:
        "RBAC vs ABAC evaluated for a realistic organisation with role matrix and exception process. Identity teams own the model everyone else lives inside.",
      unlocksInModule: "Access Control Design",
    },
    {
      name: "MFA rollout and gap analysis",
      description:
        "Coverage measured, bypass risks identified, and phishing-resistant methods prioritised. MFA without coverage gaps is just security theatre.",
      unlocksInModule: "Authentication Security",
    },
  ],
  "email-security-engineer": [
    {
      name: "DMARC, SPF, and DKIM implementation report",
      description:
        "Authentication records configured, alignment tested, and spoofing attempts blocked with evidence. Email security starts at DNS, not the gateway.",
      unlocksInModule: "Email Authentication",
    },
    {
      name: "Phishing investigation report",
      description:
        "Email header analysis, URL sandbox detonation, affected users identified, and containment documented. Phishing is still the most common way in.",
      unlocksInModule: "Email Threat Analysis",
    },
    {
      name: "Secure email gateway tuning report",
      description:
        "False positives reduced, targeted attack detection enabled, and quarantine workflow documented. Gateways generate noise until someone tunes them.",
      unlocksInModule: "Email Gateway Operations",
    },
    {
      name: "Business email compromise playbook",
      description:
        "Wire transfer fraud indicators, executive impersonation response, and legal notification steps. BEC losses dwarf most other email threats.",
      unlocksInModule: "BEC Response",
    },
  ],
  "compliance-analyst": [
    {
      name: "GDPR Article 30 records of processing",
      description:
        "Data flows mapped, processing activities documented, legal bases identified. Required for any organisation handling EU or UK personal data at scale.",
      unlocksInModule: "GDPR Compliance",
    },
    {
      name: "PCI-DSS 4.0 gap analysis report",
      description:
        "Scoped to a card-processing environment. All 12 requirements assessed, gaps prioritised by risk. This is what auditors expect before remediation starts.",
      unlocksInModule: "PCI-DSS 4.0",
    },
    {
      name: "Regulatory applicability matrix",
      description:
        "Maps an organisation profile to every applicable regulation with obligations, gaps, and priorities. Overlapping regimes are the hard part.",
      unlocksInModule: "Regulatory Mapping",
    },
    {
      name: "Cyber Essentials self-assessment",
      description:
        "All five controls assessed and documented for a simulated UK organisation. Mandatory stepping stone for UK government contract work.",
      unlocksInModule: "Cyber Essentials",
    },
  ],
  "risk-analyst": [
    {
      name: "Information security risk register",
      description:
        "Fifteen or more risks scored with treatment plans assigned. The document boards and auditors expect to see maintained.",
      unlocksInModule: "Risk Management",
    },
    {
      name: "Business impact analysis",
      description:
        "Critical assets, RTO, RPO, and recovery priorities documented. BIA work feeds business continuity and incident planning.",
      unlocksInModule: "Business Continuity",
    },
    {
      name: "Third party risk assessment",
      description:
        "Completed questionnaire, risk rating, and recommendation documented. Third-party risk is where most data breaches start.",
      unlocksInModule: "Third-Party Risk",
    },
    {
      name: "Risk treatment plan",
      description:
        "Accept, mitigate, transfer, or avoid decisions documented with owners and deadlines. A register without treatment plans is just a list of worries.",
      unlocksInModule: "Risk Treatment",
    },
  ],
  "security-auditor": [
    {
      name: "ISO 27001 internal audit report",
      description:
        "Findings documented, evidence referenced, management responses drafted. Shows you can run an internal audit, not just read the standard.",
      unlocksInModule: "ISO 27001",
    },
    {
      name: "SOC 2 readiness assessment",
      description:
        "Trust Service Criteria mapped, gaps identified, remediation priorities set. SaaS companies need this before their first Type II audit.",
      unlocksInModule: "SOC 2 Readiness",
    },
    {
      name: "Control testing evidence pack",
      description:
        "Samples pulled, tests performed, and pass/fail results documented with audit trail. Auditors live on evidence, not assertions.",
      unlocksInModule: "Control Testing",
    },
    {
      name: "Audit finding remediation tracker",
      description:
        "Findings assigned, deadlines set, and retest results recorded. Closing findings is where many audit programmes stall.",
      unlocksInModule: "Audit Follow-Up",
    },
  ],
  vciso: [
    {
      name: "Information security policy suite",
      description:
        "Acceptable Use, BYOD, Incident Response, Password, and Data Classification policies written for a real organisation context.",
      unlocksInModule: "Policy and Standards",
    },
    {
      name: "NIST CSF 2.0 current state assessment",
      description:
        "Scored across all five functions with target state and improvement roadmap. Gives leadership a maturity picture they can fund.",
      unlocksInModule: "Security Programme Design",
    },
    {
      name: "Board-ready security briefing",
      description:
        "Risk posture, incident summary, and investment priorities written for non-technical executives. vCISO work is communication as much as strategy.",
      unlocksInModule: "Executive Communication",
    },
    {
      name: "Security roadmap and budget proposal",
      description:
        "Twelve-month priorities, resource requirements, and ROI framing for leadership approval. Fractional CISOs are hired to move programmes forward.",
      unlocksInModule: "Programme Leadership",
    },
  ],
};
