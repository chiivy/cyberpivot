import type { CabinetPreviewItem, PathSlug } from "@/types/onboarding";

export const PATH_LABELS: Record<PathSlug, string> = {
  soc: "SOC Analyst",
  pentest: "Penetration Tester",
  azure: "Azure Security Engineer",
  grc: "GRC Analyst",
  appsec: "AppSec Engineer",
  "api-security": "API Security Engineer",
  "ai-security": "AI Security Engineer",
  "ot-security": "OT Security Analyst",
};

export const PATH_COMING_SOON: Partial<Record<PathSlug, boolean>> = {
  "ai-security": true,
  "ot-security": true,
};

export const CABINET_BY_PATH: Record<PathSlug, readonly CabinetPreviewItem[]> = {
  soc: [
    {
      name: "Wazuh SIEM deployment",
      description:
        "Windows Event logs, Sysmon, Linux auth logs, and network flow ingested and dashboarded. This is your live alert pipeline before you touch a corporate SIEM.",
      unlocksInModule: "SIEM Fundamentals",
    },
    {
      name: "Custom detection rules",
      description:
        "Rules for brute force logins, suspicious PowerShell, PsExec lateral movement, and new local admin creation. You write detections someone would actually tune in production.",
      unlocksInModule: "Detection Engineering",
    },
    {
      name: "Incident investigation report",
      description:
        "Attack timeline, evidence chain, root cause, containment steps, and lessons learned documented end to end. Hiring managers want to see you can run an investigation, not just close tickets.",
      unlocksInModule: "Incident Response",
    },
    {
      name: "MITRE ATT&CK mapped threat hunting report",
      description:
        "A hypothesis, data sources queried, KQL or Sigma queries, and findings tied to ATT&CK techniques. Shows you can hunt, not only wait for alerts.",
      unlocksInModule: "Threat Hunting",
    },
    {
      name: "Phishing investigation report",
      description:
        "Email header analysis, URL sandbox detonation, affected users identified, and containment documented. Phishing is still the most common way in. You need this workflow cold.",
      unlocksInModule: "Email Threat Analysis",
    },
    {
      name: "IOC enrichment report",
      description:
        "IPs, domains, and hashes enriched via VirusTotal, AbuseIPDB, and WHOIS, mapped to threat actor TTPs. Turns raw indicators into context you can brief with.",
      unlocksInModule: "Threat Intelligence for SOC",
    },
    {
      name: "Alert triage log",
      description:
        "Twenty alerts triaged with false positive vs true positive calls and reasoning recorded. Proves you can prioritize noise without panicking on every Sev 3.",
      unlocksInModule: "SOC Operations",
    },
    {
      name: "Linux and Windows triage checklists",
      description:
        "First responder reference cards built from real investigation steps. You keep these when the clock is ticking and someone asks what to pull first.",
      unlocksInModule: "Endpoint Triage",
    },
  ],
  pentest: [
    {
      name: "Kali Linux environment",
      description:
        "Custom tool aliases, organised wordlists, VPN configs, and structured note-taking ready for engagements. A messy lab slows every test. This one is built to work.",
      unlocksInModule: "Pentest Lab Setup",
    },
    {
      name: "Reconnaissance report",
      description:
        "OSINT, subdomains, tech fingerprinting, exposed services, and employee data from public sources. Good recon saves hours of blind scanning later.",
      unlocksInModule: "Reconnaissance and Enumeration",
    },
    {
      name: "Vulnerability assessment report",
      description:
        "Scan results reviewed, false positives cut, findings CVSS scored and prioritised by exploitability and impact. Clients pay for judgement, not raw scanner output.",
      unlocksInModule: "Vulnerability Assessment",
    },
    {
      name: "Professional penetration test report",
      description:
        "Executive summary for non-technical readers, technical findings with repro steps, screenshots, CVSS scores, and remediation ordered by risk. This is what gets you hired or renewed.",
      unlocksInModule: "Reporting and Communication",
    },
    {
      name: "Burp Suite project",
      description:
        "SQL injection, XSS, IDOR, and broken authentication documented with request and response evidence. Web apps are still where most external findings live.",
      unlocksInModule: "Web Application Testing",
    },
    {
      name: "Custom nmap NSE scripts",
      description:
        "Targeted service enumeration scripts for environments where default scans miss the point. Shows you understand the protocol, not just the flag.",
      unlocksInModule: "Network Scanning",
    },
    {
      name: "Exploitation notes",
      description:
        "Privilege escalation from low user to SYSTEM or root with each step evidenced. Anyone can run an exploit. Fewer can explain the path cleanly.",
      unlocksInModule: "Exploitation",
    },
    {
      name: "Post-exploitation report",
      description:
        "What an attacker could access, simulated data exfiltration, and persistence mechanisms documented. Scope and impact matter as much as the initial foothold.",
      unlocksInModule: "Post-Exploitation",
    },
  ],
  azure: [
    {
      name: "Entra ID tenant",
      description:
        "MFA enforced, Conditional Access for compliant devices, named locations and sign-in risk, plus a documented break-glass account. Identity is where most cloud breaches start.",
      unlocksInModule: "Identity and Access Management",
    },
    {
      name: "PIM configuration",
      description:
        "Privileged roles require JIT activation, approvals are active, and activation audit logs are reviewed and documented. Stops standing admin access from becoming normal.",
      unlocksInModule: "Privileged Identity Management",
    },
    {
      name: "Microsoft Sentinel workspace",
      description:
        "Five or more data connectors, ten or more custom KQL analytics rules, and a MITRE ATT&CK coverage map. You prove you can operate a cloud SIEM, not just click through setup wizards.",
      unlocksInModule: "Microsoft Sentinel",
    },
    {
      name: "Defender for Cloud",
      description:
        "Secure Score baseline captured, high severity recommendations fixed, and before and after scores compared. Shows measurable improvement, not checkbox compliance.",
      unlocksInModule: "Defender for Cloud",
    },
    {
      name: "Azure network security architecture diagram",
      description:
        "VNets, NSG rules, Azure Firewall, Private Endpoints, and hub-spoke topology drawn clearly. Architects and auditors ask for this on day one of a cloud review.",
      unlocksInModule: "Network Security in Azure",
    },
    {
      name: "Cloud incident response runbook",
      description:
        "Detection via Sentinel, investigation steps, and containment playbooks for identity compromise and data exfiltration. You need a plan before the pager goes off at 2am.",
      unlocksInModule: "Cloud Incident Response",
    },
    {
      name: "Regulatory compliance report",
      description:
        "CIS Azure Benchmark or NIST 800-53 posture exported and documented with gaps called out. Bridges technical controls to what auditors actually ask for.",
      unlocksInModule: "Compliance and Governance",
    },
    {
      name: "Azure workload threat model",
      description:
        "Assets, trust boundaries, STRIDE analysis, and mitigations mapped. You show you can think about design flaws before attackers find them.",
      unlocksInModule: "Cloud Security Capstone",
    },
  ],
  grc: [
    {
      name: "PCI-DSS 4.0 gap analysis report",
      description:
        "Scoped to a card-processing environment. All 12 requirements assessed, gaps prioritised by risk. This is what auditors and QSAs expect before remediation work starts.",
      unlocksInModule: "PCI-DSS 4.0",
    },
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
      name: "GDPR Article 30 records of processing",
      description:
        "Data flows mapped, processing activities documented, legal bases identified. Required for any organisation handling EU or UK personal data at scale.",
      unlocksInModule: "GDPR Compliance",
    },
    {
      name: "NIST CSF 2.0 current state assessment",
      description:
        "Scored across all five functions with target state and improvement roadmap. Gives leadership a maturity picture they can fund.",
      unlocksInModule: "NIST Cybersecurity Framework",
    },
    {
      name: "Cyber Essentials self-assessment",
      description:
        "All five controls assessed and documented for a simulated UK organisation. Mandatory stepping stone for UK government contract work.",
      unlocksInModule: "Cyber Essentials",
    },
    {
      name: "NDPR compliance review",
      description:
        "Nigerian data protection obligations assessed, gaps identified, remediation plan produced. Nigerian GRC roles need this on the portfolio.",
      unlocksInModule: "NDPR Compliance",
    },
    {
      name: "Regulatory applicability matrix",
      description:
        "Maps a Nigerian fintech profile to every applicable regulation with obligations, gaps, and priorities. Overlapping regimes are the hard part. This proves you can handle them.",
      unlocksInModule: "Regulatory Mapping",
    },
    {
      name: "CBN Cybersecurity Framework assessment",
      description:
        "Nigerian banking cybersecurity requirements assessed and documented. Required knowledge for GRC roles in Nigerian financial services.",
      unlocksInModule: "CBN Cybersecurity Framework",
    },
    {
      name: "Vendor risk assessment",
      description:
        "Completed questionnaire, risk rating, and recommendation documented. Third-party risk is where most data breaches start.",
      unlocksInModule: "Third-Party Risk",
    },
    {
      name: "Business impact analysis",
      description:
        "Critical assets, RTO, RPO, and recovery priorities documented. BIA work feeds business continuity and incident planning.",
      unlocksInModule: "Business Continuity",
    },
    {
      name: "Information security risk register",
      description:
        "Fifteen or more risks scored with treatment plans assigned. The document boards and auditors expect to see maintained.",
      unlocksInModule: "Risk Management",
    },
    {
      name: "Information security policy suite",
      description:
        "Acceptable Use, BYOD, Incident Response, Password, and Data Classification policies written for a real organisation context.",
      unlocksInModule: "Policy and Standards",
    },
  ],
  appsec: [
    {
      name: "Semgrep custom rule set",
      description:
        "Ten or more rules targeting OWASP Top 10 in a chosen language, tested on vulnerable and safe samples. You ship repeatable detection developers can run in CI.",
      unlocksInModule: "Static Application Security Testing",
    },
    {
      name: "OWASP ZAP authenticated scan report",
      description:
        "Active scan findings by severity with false positives removed and remediation guidance added. DAST catches what code review misses when auth and sessions matter.",
      unlocksInModule: "Dynamic Application Security Testing",
    },
    {
      name: "Web application threat model",
      description:
        "Data flow diagram, trust boundaries, STRIDE per component, mitigations and residual risk documented. You catch design flaws before they become CVEs in prod.",
      unlocksInModule: "Threat Modeling",
    },
    {
      name: "Secure code review report",
      description:
        "A real PR reviewed with vulnerable snippet, risk explained, and remediated example provided. Interviewers ask how you review code. This is the answer on paper.",
      unlocksInModule: "Secure Code Review",
    },
    {
      name: "CI/CD security pipeline",
      description:
        "GitHub Actions running Semgrep, OWASP Dependency Check, Trivy, and Gitleaks with pass/fail gates. Security in the pipeline beats security in a slide deck.",
      unlocksInModule: "DevSecOps Foundations",
    },
    {
      name: "OWASP Top 10 exploitation lab notes",
      description:
        "Each vulnerability exploited in a controlled environment with root cause and fix demonstrated. You understand attacks well enough to prevent them, not just name them.",
      unlocksInModule: "OWASP Top 10",
    },
    {
      name: "Secure development guidelines",
      description:
        "Language-specific secure coding standards written for a development team. Turns one-off reviews into habits engineers can follow without you in every PR.",
      unlocksInModule: "Secure SDLC",
    },
  ],
  "api-security": [
    {
      name: "Postman security testing collection",
      description:
        "Auth, injection, BOLA/BFLA, rate limiting, and business logic abuse tests with results documented. APIs are the attack surface most teams forget until something breaks in prod.",
      unlocksInModule: "API Security Testing",
    },
    {
      name: "OWASP API Top 10 findings report",
      description:
        "Each issue demonstrated against a target API with technical evidence and remediation steps. Shows you test APIs as products, not as afterthoughts on a web app.",
      unlocksInModule: "OWASP API Top 10",
    },
    {
      name: "API threat model",
      description:
        "Endpoints mapped, auth flows diagrammed, trust boundaries and attack surface documented. You find design flaws before scanners ever run.",
      unlocksInModule: "API Threat Modeling",
    },
    {
      name: "JWT security lab",
      description:
        "Algorithm confusion, weak secret cracking, none algorithm bypass, and proper implementation documented side by side. Broken auth on APIs still tops real breach reports.",
      unlocksInModule: "API Authentication",
    },
    {
      name: "OAuth 2.0 misconfiguration lab",
      description:
        "Redirect URI manipulation, state bypass, and token leakage scenarios with fixes applied. OAuth mistakes are subtle and expensive.",
      unlocksInModule: "OAuth Security",
    },
    {
      name: "API security checklist",
      description:
        "Covers auth, input validation, rate limiting, logging, error handling, and versioning in one reusable checklist. Good for reviews when you do not have a week for a full test.",
      unlocksInModule: "API Security Review",
    },
  ],
  "ai-security": [
    {
      name: "OWASP LLM Top 10 exploitation lab",
      description:
        "Prompt injection, insecure output handling, training data poisoning, model denial of service, and sensitive disclosure demonstrated in a lab. LLM features ship faster than security keeps up.",
      unlocksInModule: "OWASP LLM Top 10",
    },
    {
      name: "Prompt injection research report",
      description:
        "Direct and indirect injection attacks documented, payloads catalogued, and detection or prevention strategies tested. This is the vulnerability everyone talks about and few test properly.",
      unlocksInModule: "LLM Attack Techniques",
    },
    {
      name: "LLM threat model",
      description:
        "STRIDE applied to an LLM-powered app with MITRE ATLAS techniques mapped and mitigations listed. You show you can threat model systems that are not traditional web stacks.",
      unlocksInModule: "AI Threat Modeling",
    },
    {
      name: "AI red team report",
      description:
        "Structured adversarial testing with jailbreak attempts, guardrail bypasses found, and remediation recommended. Red teaming models is different from red teaming networks.",
      unlocksInModule: "AI Red Teaming",
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
    {
      name: "Agentic AI security review",
      description:
        "Multi-agent system reviewed for tool misuse, excessive permissions, and trust boundary violations. Agents amplify impact when permissions are too broad.",
      unlocksInModule: "Agentic AI Security",
    },
  ],
  "ot-security": [
    {
      name: "ICS network visibility baseline",
      description:
        "Passive discovery of PLCs, HMIs, and engineering workstations on a lab OT segment with asset inventory and protocol notes. You cannot protect what you cannot see on the plant floor.",
      unlocksInModule: "OT Network Discovery",
    },
    {
      name: "Purdue model segmentation review",
      description:
        "Lab topology mapped to Purdue levels with documented gaps between IT and OT zones. Segmentation failures are how ransomware reaches production.",
      unlocksInModule: "OT Architecture",
    },
    {
      name: "Modbus traffic anomaly report",
      description:
        "Baseline and deviation analysis on industrial protocol traffic with suspicious write commands flagged. OT attacks often look like normal automation until you know the patterns.",
      unlocksInModule: "ICS Protocol Analysis",
    },
  ],
};
