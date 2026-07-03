# CyberPivot — Product Requirements Document
**Version:** 3.0
**Status:** Active
**Last Updated:** June 2026

---

## 1. Vision

CyberPivot is a free, open source cybersecurity learning platform built for anyone who wants to break into or level up in cybersecurity — regardless of where they are starting from.

Note: the free platform model described here was superseded by the Paid Platform Launch Model decision logged in DECISIONS.md in July 2026. The platform now operates on a paid subscription model with free Foundation modules. Open source status of the codebase remains under review.

Core philosophy: **Start where you are.**

Not everyone begins at zero. Not everyone wants the same role. CyberPivot meets you at your current level, puts you on the right path, and walks you through building real skills using real tools — the same ones used on the job. By the time you are done you have a working home lab, a portfolio of real artifacts, and the knowledge to back it up in an interview.

This is not a course platform. Not a CTF platform. Not another place to watch videos and collect badges. It is the structured, practical, tool-first journey that actually prepares people for cybersecurity careers.

---

## 2. The Problem We Are Solving

- Passive learning dominates. Videos, MCQs, reading. You do not learn security by watching.
- Sandboxed platforms are useful but not real. Skills do not transfer cleanly to actual job environments.
- No role awareness. A GRC analyst and a penetration tester need completely different journeys. Most platforms treat everyone the same.
- No tangible output. You finish a course with a certificate but nothing to show. No lab, no artifacts, no portfolio.
- Enterprise tools are invisible until day one on the job. Platforms teach open source tools only. You walk in and see CrowdStrike or Splunk for the first time.
- Theory before tools. You learn what a firewall is before ever touching one.
- No honest career guidance. What does the job actually pay? What do interviews look like? Which certs actually matter?

---

## 3. Core Philosophy

- Tool-first. You touch the tool before you read theory about it.
- Scenario-first. Every concept introduced through a real situation using real examples — not hypothetical organisations.
- Start where you are. Entry points based on your actual background.
- Build as you learn. Every module produces a tangible artifact.
- Free and enterprise. Learn on open source tools, understand the enterprise equivalents.
- Honest. What certs matter, what jobs pay, what interviews actually look like.
- Open source. Free forever. Community can contribute modules, paths, topics and tools.

Note: superseded by the Paid Platform Launch Model decision in DECISIONS.md, July 2026.

---

## 4. Content Writing Standards

All content on this platform — modules, intro sections, role descriptions, interview prep, CV builder, tooltips, error messages — follows these rules without exception.

**Voice:** A knowledgeable security practitioner who is also a good teacher. Someone who has done the job, seen real incidents, used real tools, and can explain things to someone intelligent but new.

**Real examples always:**
- Use real incidents. WannaCry, the SolarWinds attack, the Uber breach, the NHS ransomware incident. Not "consider a hypothetical organisation."
- Use relatable analogies before technical concepts. "A firewall is like a bouncer at a club. They check who is coming in but cannot always see what someone is carrying."
- Treat the reader as intelligent, just new to this. Do not condescend. Do not oversimplify to the point of inaccuracy.

**Writing rules:**
- Short sentences. Say the thing. Move on.
- No em dashes.
- No "delve into", "leverage", "comprehensive", "in today's landscape", "it's worth noting", "in conclusion."
- No announcing what you are about to say. Just say it.
- No rhetorical questions.
- Explain the why, not just the what.
- Dry humour is fine. Forced enthusiasm is not.

**Bad:** "In today's ever-evolving cybersecurity landscape, it's worth noting that understanding network fundamentals is a comprehensive first step in your journey."

**Good:** "This module is about how traffic moves across a network. Start here before anything else."

---

## 5. Target Audience

### Entry Point A — Complete Beginner
No IT background. Curious about cybersecurity. Does not know where to start.
Starts at the Introduction section then Foundation Layer.

### Entry Point B — IT Background
Already in helpdesk, networking, sysadmin, or development. Wants to move into security.
Light foundations refresh then straight into a role path.

### Entry Point C — Developer
Writes code, wants to move into security. AppSec, DevSecOps or AI Security natural fits.
Skips IT fundamentals, light security orientation, directed toward application security domain.

### Entry Point D — Already in Security
Working in security or self-studying. Wants structure, specific skills, interview prep, or cert guidance.
Skip foundations. Jump into any role, specialist module, or topic directly.

---

## 6. Platform Content Structure

### Level 0 — Introduction (free, ungated, no account needed)

Not a path. Not gated. Anyone can read this before deciding if cybersecurity is for them.

**Section 1 — What is Cybersecurity**
- The simple definition and why it is bigger than most people think
- Why cybersecurity exists — the threat landscape in plain terms
- Real breach statistics and real impact on real organisations and people
- Why this is a career with genuine long-term demand
- What cybersecurity is not — dispelling myths, hacker stereotypes, the lone genius narrative

**Section 2 — Core Concepts Everyone Must Know**
- CIA Triad — Confidentiality, Integrity, Availability with real world examples for each
- Authenticity and Non-repudiation — the two concepts often added to CIA
- Threats vs Vulnerabilities vs Risk — the difference with examples
- Assets — what we are actually protecting and why
- Controls — preventive, detective, corrective, deterrent, compensating
- Defence in depth — why one control is never enough
- Least privilege — give access only to what is needed
- Zero trust — never trust, always verify, assume breach
- Attack surface — everything that could be targeted
- Encryption basics — what it is, symmetric vs asymmetric, why it matters

**Section 3 — How Attacks Actually Work**
- The attacker mindset — how adversaries think and plan
- The Cyber Kill Chain — all seven stages with real examples
- MITRE ATT&CK — what it is and why the industry uses it everywhere
- Common attack types — phishing, malware, ransomware, MITM, SQL injection, social engineering
- Who attacks organisations — script kiddies, cybercriminals, nation states, insiders, hacktivists, each with real motivation
- How a real breach unfolds — narrative walkthrough of a realistic attack from initial access to detection

**Section 4 — The Security Industry**
- How security teams are structured — what roles exist and how they work together
- Red, Blue, Purple, White, Yellow, Green, Gold teams — what each means and how they interact
- Offensive vs defensive security — the difference in mindset and daily work
- In-house security vs MSSP vs consultancy — the three career environments
- How security fits into a business — why companies invest, what regulations drive it
- Security maturity — why a startup's security looks nothing like a bank's

**Section 5 — Compliance and Regulation Overview**
- Why compliance exists and what it actually means
- The difference between compliance and security — you can be compliant and insecure
- Overview of major frameworks — GDPR, HIPAA, SOX, PCI-DSS, ISO 27001, NIST CSF, SOC 2
- Regulatory bodies — ICO, FCA, SEC, CMS, CISA — what they do and why they matter
- How organisations get certified or audited

**Section 6 — Career Realities**
- What security jobs actually look like day to day — honest, not glamorised
- Entry level realities — what junior roles actually involve
- How people get into security — common routes, not just university degrees
- Certifications — what they are, which matter, which are marketing
- Salary ranges globally — honest numbers
- Communities, conferences, and continuous learning

**Section 7 — Team Structures Explained**
- Red Team — simulating a real adversary, not just finding vulnerabilities
- Blue Team — the defenders. SOC, IR, threat hunters
- Purple Team — collaborative exercises where red and blue work together in real time
- White Team — the referees in a security exercise. Rules of engagement, arbitration
- Yellow Team — builders, developers, architects
- Orange Team — red plus yellow. Developers learning offensive techniques
- Green Team — blue plus yellow. Developers building security in from the start
- Gold Team — crisis management and executive leadership during a major incident

**Section 8 — How CyberPivot Works**
- The platform structure explained
- How to use the onboarding assessment
- How the cabinet works and why it matters
- How to use the platform if you already have experience
- How to contribute as an open source contributor

---

### Level 1 — Foundation Layer

Required for Entry Points A and B. Optional review for C and D.

- Networking Fundamentals — TCP/IP, DNS, subnetting, how traffic moves, Wireshark hands-on
- Linux Fundamentals — CLI, file system, users, permissions, processes, scripting basics
- Windows and Active Directory — file permissions, registry, AD basics, Group Policy
- Security Fundamentals — controls, cryptography, authentication, PKI, common protocols
- Cloud Fundamentals — shared responsibility model, cloud service models, major providers overview
- Python for Security — scripting basics, automating tasks, writing simple security tools

---

### Level 2 — Role Paths

Structured journeys. Modules in a specific order. Cabinet artifacts built throughout.

#### DOMAIN 1 — Defensive Security
People in this domain detect threats, respond to incidents, and protect environments in real time.

**SOC Analyst** — V1
Entry level to senior. Monitors alerts, triages incidents, escalates confirmed threats. Most common entry point into cybersecurity.
Level: Entry to Mid

**Incident Responder** — Coming Soon
Called when something bad has already happened. Contains damage, removes threat, recovers systems, documents everything.
Level: Mid to Senior

**Threat Hunter** — Coming Soon
Proactively looks for threats that have not triggered alerts. Hypothesis-driven, deep log analysis.
Level: Mid to Senior

**EDR Analyst** — Coming Soon
Specialises in endpoint telemetry and response. Deep expertise in CrowdStrike, SentinelOne, Microsoft Defender.
Level: Entry to Mid

**DFIR Analyst** — Coming Soon
Digital forensics and incident response across endpoints, networks, and cloud. Evidence handling, malware triage, breach investigation.
Level: Mid to Senior

---

#### DOMAIN 2 — Offensive Security
People in this domain find weaknesses before attackers do.

**Vulnerability Assessment Analyst** — Coming Soon
Scans, identifies and prioritises vulnerabilities without full exploitation. Good entry point into offensive security.
Level: Entry to Mid

**Penetration Tester** — V1
Authorised attacks on systems, networks and applications. Delivers a formal report of findings.
Level: Mid to Senior

**Red Teamer** — Coming Soon
Simulates a full adversary campaign. Stealth, persistence, lateral movement, objective achievement. Requires solid pentest experience first.
Level: Senior

**Bug Bounty Hunter** — Coming Soon
Finds vulnerabilities in companies public-facing assets for monetary rewards. Freelance and independent.
Level: Entry to Senior (self-paced)

**Malware Analyst** — Coming Soon
Reverse engineers and analyses malicious code. Static and dynamic analysis, sandboxing, reporting.
Level: Mid to Senior

**AI Red Teamer** — Coming Soon
Adversarial testing of AI systems. Prompt injection, jailbreaking, and agentic security testing.
Level: Mid to Senior

---

#### DOMAIN 3 — Application and Product Security
People in this domain make sure software is built and shipped securely.

**AppSec Engineer** — V1
Embedded in development teams. Reviews code, runs SAST and DAST, builds security into the development lifecycle.
Level: Mid to Senior

**API Security Engineer** — V1
Specialises in API attack surface. Authentication flaws, OWASP API Top 10, gateway security.
Level: Mid

**DevSecOps Engineer** — Coming Soon
Security embedded in the pipeline. CI/CD gates, secrets management, container security, IaC scanning.
Level: Mid to Senior

**AI Security Engineer** — Coming Soon
Securing AI systems and LLM-powered applications. Prompt injection, model poisoning, OWASP LLM Top 10, MITRE ATLAS.
Level: Mid to Senior

---

#### DOMAIN 4 — Cloud and Infrastructure Security
People in this domain secure the environments everything else runs on.

**Azure Security Engineer** — V1
Secures Microsoft Azure infrastructure. Entra ID, Sentinel, Defender, PIM, network controls, compliance.
Level: Mid to Senior

**AWS Security Engineer** — Coming Soon
Secures Amazon Web Services. IAM, GuardDuty, Security Hub, VPC security, CloudTrail, Macie.
Level: Mid to Senior

**GCP Security Engineer** — Coming Soon
Secures Google Cloud Platform. IAM, Security Command Center, Chronicle, VPC controls.
Level: Mid to Senior

**Network Security Engineer** — Coming Soon
Firewalls, IDS/IPS, network segmentation, zero trust networking, traffic analysis.
Level: Mid to Senior

**Identity Security Engineer** — Coming Soon
IAM, PAM, directory services, SSO, MFA, zero trust identity. CyberArk, BeyondTrust, Okta, Entra ID.
Level: Mid to Senior

**Email Security Engineer** — Coming Soon
SPF, DKIM, DMARC, email gateway management, phishing analysis, email-based IR.
Level: Entry to Mid

**Security Engineer** — Coming Soon
Broad cloud and infrastructure security engineering across platforms, networks, and identity systems.
Level: Mid to Senior

---

#### DOMAIN 5 — Governance, Risk and Compliance
People in this domain manage security as a business function.

**GRC Analyst** — V1
Frameworks, risk registers, controls, audits, policy writing. NIST, ISO 27001, SOC 2, GDPR and more.
Level: Entry to Mid

**Compliance Analyst** — Coming Soon
Focused on regulatory compliance. GDPR, HIPAA, PCI-DSS, industry-specific regulations.
Level: Entry to Mid

**Risk Analyst** — Coming Soon
Quantifies and manages security risk. Risk registers, treatment plans, board-level reporting.
Level: Mid

**Security Auditor** — Coming Soon
Validates controls are working. Evidence collection, gap analysis, audit reports. Internal or external.
Level: Mid to Senior

**vCISO** — Coming Soon
Fractional or consulting CISO. Strategy, program building, board communication.
Level: Senior

**Privacy Analyst** — Coming Soon
Data protection, privacy impact assessments, consent management, regulatory privacy obligations.
Level: Entry to Mid

---

#### DOMAIN 6 — Operational Technology and Industrial Control Systems Security
The people who secure the industrial systems and physical infrastructure behind power, water, manufacturing, and other critical services.

**OT Security Analyst** — Coming Soon
Monitors and supports industrial control systems and SCADA environments. Entry point into OT/ICS security.
Level: Entry to Mid

**OT Security Engineer** — Coming Soon
Designs and implements security for SCADA systems, PLCs, and industrial networks.
Level: Mid to Senior

---

### Level 3 — Specialist Modules

Deep dives available standalone or embedded inside role paths. Someone already working in security can take just the module they need without doing a full path.

- M365 Security — Defender for Office 365, Purview, Intune, M365 Defender, Defender for Cloud Apps
- Endpoint Security and EDR — how EDR works, telemetry, detection tuning, evasion awareness
- Database Security and Activity Monitoring — IBM Guardium, Imperva, pgAudit, hardening, compliance
- PAM and CyberArk Deep Dive — CyberArk architecture, BeyondTrust, HashiCorp Vault, JIT access, session recording
- PIM Deep Dive — Microsoft PIM, JIT activation, approval workflows, audit logs
- AI Security Testing — prompt injection for pentesters, testing LLM features in application scope
- AI Governance and EU AI Act — policy writing, risk assessment for AI tools, regulatory compliance
- Physical Security and Social Engineering — tailgating, badge cloning, pretexting, vishing, physical pentest engagements
- OPSEC for Security Professionals — protecting sensitive information through behaviour and process
- Digital Forensics and DFIR — disk forensics, memory forensics, network forensics, chain of custody, Autopsy, Volatility
- Threat Intelligence and CTI — MITRE ATT&CK, STIX/TAXII, threat feeds, dark web monitoring, threat actor profiles
- OT/ICS/SCADA Security — industrial control systems, Purdue model, Modbus, DNP3, critical infrastructure
- Mobile Application Security — iOS and Android app security, MDM, OWASP Mobile Top 10, MobSF, Frida
- Cryptography in Practice — TLS configuration, PKI, certificate management, key management, common crypto failures
- Security Architecture and Design — zero trust architecture, defence in depth, security patterns, reference architectures
- Software Supply Chain Security — SBOM, dependency security, build pipeline integrity, SolarWinds-style attack awareness
- Privacy Engineering — privacy by design, data minimisation, pseudonymisation, DPIA, cookie consent implementation
- Purple Teaming — collaborative red and blue exercises, detection improvement, real-time tuning
- Bug Bounty and Responsible Disclosure — VDP programs, writing good bug reports, working with vendor security teams
- Kerberos and Active Directory Attacks — Kerberoasting, Pass the Hash, DCSync, Golden Ticket, defence strategies
- Container and Kubernetes Security — Docker hardening, Kubernetes RBAC, image scanning, runtime security
- GDPR in Practice — data subject rights, breach notification, DPA relationships, privacy notices, Article 30 records
- SOX IT General Controls — ITGC framework, change management, access controls, financial system audit
- PCI-DSS Implementation — cardholder data environment, 12 requirements, SAQ vs full audit, tokenisation
- HIPAA Security Rule — covered entities, business associates, technical safeguards, risk analysis
- FedRAMP Overview — US government cloud security, ATO process, continuous monitoring
- Zero Trust Architecture — never trust always verify, microsegmentation, identity as perimeter, NIST 800-207
- Cloud Forensics and IR — cloud-specific investigation techniques, log preservation, evidence collection in Azure/AWS/GCP

---

### Level 4 — Topic Library

Short, focused explainers. No cabinet artifact. No progress tracking required. Community contributed and grows over time.

Examples:
- What is prompt injection
- How DMARC works
- Understanding CVSS scoring
- What is a SOC 2 audit
- How Kerberoasting works
- What is a SIEM
- How TLS handshake works
- What is lateral movement
- How ransomware spreads
- What is a zero day

---

### Level 5 — Tools Directory (V2)

Filterable reference page. Select by role, category, or free vs enterprise. Each tool card shows:
- What it is in plain language
- What role uses it and why
- Free or open source alternative if one exists
- How to get started — trial link, free download, or setup guide
- Which CyberPivot modules use this tool

Categories: SIEM, EDR/XDR, Vulnerability Management, Penetration Testing, Web Application Testing, Network Security, Cloud Security, Identity and PAM, GRC and Compliance, Forensics and IR, Threat Intelligence, Email Security, AppSec and DevSecOps, AI Security, OT/ICS Security.

Tools in the OT/ICS Security category include Claroty, Nozomi Networks, Dragos, and similar industrial security platforms.

---

## 7. Role Page Structure

Every role has a dedicated page the user reads before committing to a path. Each page covers:

- What the role actually does day to day — honest, no marketing language
- Entry, mid, or senior level
- What background suits this role
- What a typical week looks like
- Salary range by region — honest numbers
- Industries that hire for this role
- Tools used on the job — free and enterprise both listed
- Certs that actually matter — honest assessment, no fluff
- Where this role leads — career progression
- Full module list with availability status
- Cabinet artifacts they will build

---

## 8. Module Structure

Every module follows this structure:

1. **Scenario** — a real situation that makes the concept relevant. A real incident, a real job task, a real problem.
2. **Concept** — concise, plain language explanation. The why before the what.
3. **Free tool hands-on** — actual lab work. Install it, use it, break something, fix something.
4. **Enterprise equivalent** — what the job version looks like. Trial link where available. Screenshots and walkthrough where not. Why organisations pay for it.
5. **Cabinet artifact** — something tangible produced by completing the module. You built it, you own it.

---

## 9. Cabinet Artifacts — Full Detail

### SOC Analyst
- Wazuh SIEM — Windows Event logs, Sysmon, Linux auth logs and network flow ingested and dashboarded
- Custom detection rules — brute force login, suspicious PowerShell, lateral movement via PsExec, new local admin creation
- Incident investigation report — attack timeline reconstructed, evidence chain documented, root cause, containment, lessons learned
- MITRE ATT&CK mapped threat hunting report — hypothesis, data sources, KQL/Sigma queries, findings
- Phishing investigation report — full email header analysis, URL sandbox detonation, affected users, containment
- IOC enrichment report — IPs, domains, hashes enriched via VirusTotal, AbuseIPDB, WHOIS, mapped to threat actor TTPs
- Alert triage log — 20 alerts triaged, false positive vs true positive decisions with reasoning
- Linux and Windows triage checklists — first responder reference cards built from real investigation work

### Penetration Tester
- Kali Linux environment — custom tool aliases, organised wordlists, VPN configs, structured note-taking
- Reconnaissance report — OSINT findings, subdomain enumeration, technology fingerprinting, exposed services, employee data from public sources
- Vulnerability assessment report — scan results analysed, false positives removed, findings CVSS scored and prioritised
- Professional penetration test report — executive summary for non-technical audience, technical findings with reproduction steps, evidence screenshots, CVSS scores, remediation prioritised by risk
- Burp Suite project — documented SQL injection, XSS, IDOR and broken authentication findings with request/response evidence
- Custom nmap NSE scripts for targeted service enumeration
- Exploitation notes — privilege escalation path from low privilege to SYSTEM/root, each step evidenced
- Post-exploitation report — what an attacker could have accessed, data exfiltration simulation, persistence mechanisms documented

### Azure Security Engineer
- Entra ID tenant — MFA enforced, Conditional Access policies for compliant device, named location and sign-in risk, break-glass account documented
- PIM configuration — all privileged roles require JIT activation, approval workflows active, activation audit log reviewed
- Microsoft Sentinel workspace — 5+ data connectors, 10+ custom KQL analytics rules, MITRE ATT&CK coverage map
- Defender for Cloud — Secure Score baseline documented, high severity recommendations remediated, before and after comparison
- Azure network security architecture diagram — VNets, NSG rules, Azure Firewall, Private Endpoints, hub-spoke topology
- Cloud incident response runbook — detection via Sentinel, investigation steps, containment for identity compromise and data exfiltration
- Regulatory compliance report — CIS Azure Benchmark or NIST 800-53 posture exported and documented
- Azure workload threat model — assets, trust boundaries, STRIDE analysis, mitigations mapped

### GRC Analyst
- Information security risk register — 15+ risks across people, process and technology, scored on likelihood and impact, treatment plans assigned
- ISO 27001 gap analysis — all 93 Annex A controls assessed, gaps documented with remediation priorities and effort estimates
- Information security policy suite — Information Security Policy, Acceptable Use Policy, BYOD Policy, Password Policy, Data Classification Policy, Incident Response Policy
- NIST CSF control mapping — controls mapped to all five CSF functions, maturity level assessed per category
- Audit evidence folder — structured evidence pack indexed per control domain, ready for external auditor
- Vendor risk assessments — tiering matrix, questionnaire template, two completed assessments with risk ratings and treatment decisions
- Security exceptions register — formal exception process, three examples with business justification, compensating controls, review dates
- Business impact analysis — critical assets, RTO and RPO defined, recovery priorities documented
- Regulatory compliance matrix — organisation's controls mapped to GDPR, SOX, PCI-DSS or HIPAA requirements depending on industry scenario

### AppSec Engineer
- Semgrep custom rule set — 10+ rules targeting OWASP Top 10 in a chosen language, tested against vulnerable and safe code samples
- OWASP ZAP authenticated scan report — active scan findings categorised by severity, false positives removed, remediation guidance
- Web application threat model — data flow diagram, trust boundaries, STRIDE analysis per component, mitigations and residual risk
- Secure code review report — real PR reviewed, vulnerable code snippet shown, risk explained, remediated example provided
- CI/CD security pipeline — GitHub Actions with Semgrep, OWASP Dependency Check, Trivy container scan, Gitleaks secrets scanning with pass/fail gates
- OWASP Top 10 exploitation lab notes — each vulnerability exploited in controlled environment, root cause explained, fix demonstrated
- Secure development guidelines — language-specific secure coding standards written for a development team

### API Security Engineer
- Postman security testing collection — auth tests, injection tests, BOLA/BFLA tests, rate limiting tests, business logic abuse tests with documented results
- OWASP API Top 10 findings report — each vulnerability demonstrated against a target API, technical evidence and remediation
- API threat model — all endpoints mapped, auth flows diagrammed, trust boundaries and attack surface documented
- JWT security lab — algorithm confusion attack, weak secret cracking, none algorithm bypass, proper implementation documented
- OAuth 2.0 misconfiguration lab — redirect URI manipulation, state parameter bypass, token leakage scenarios with fixes
- API security checklist — covers auth, input validation, rate limiting, logging, error handling and versioning

### AI Security Engineer (Coming Soon — cabinet shown)
- OWASP LLM Top 10 exploitation lab — each vulnerability demonstrated: prompt injection, insecure output handling, training data poisoning, model denial of service, sensitive information disclosure
- Prompt injection research report — direct and indirect injection attacks documented, payloads catalogued, detection and prevention strategies tested
- LLM threat model — STRIDE applied to an LLM-powered application, MITRE ATLAS techniques mapped, mitigations documented
- AI red team report — structured adversarial testing, jailbreak attempts documented, guardrail bypasses found, remediation recommended
- RAG system security assessment — retrieval-augmented generation pipeline assessed for data poisoning, prompt leakage and unauthorised data access
- AI governance policy — organisational policy for responsible AI use, risk assessment process for new AI tools, EU AI Act compliance considerations
- Agentic AI security review — multi-agent system assessed for tool misuse, excessive permissions and trust boundary violations

### OT Security Analyst and OT Security Engineer (Coming Soon — cabinet to be defined)
OT Security Analyst and OT Security Engineer cabinet artifacts: TO BE DEFINED during OT content development. Will follow the same structure as other role cabinet artifacts once module content is planned.

---

## 10. Onboarding Flow

**Welcome screen** — one line, one button, nothing else.

**5+1 questions — five core questions on every path, plus an optional sixth follow-up when the answer to Q3 points at cloud, SOC, or application security:**

Q1: Where are you starting from?
- No IT or tech background
- IT or tech background — helpdesk, networking, sysadmin
- I work as a developer or engineer
- I already work in cybersecurity

Q2: When something goes wrong in a system, what is your instinct?
- Investigate it — find out exactly what happened and who did it
- Fix it before it gets worse — contain the damage fast
- Figure out how it could have been prevented — process and policy
- Try to replicate it — understand how an attacker would have done it
- Make sure the system was built to handle it — secure by design

Q3: Where do you imagine yourself working most?
- Inside cloud platforms — dashboards, policies, configurations
- Inside code and applications — reviewing, testing, securing software
- Inside a security operations centre — monitoring, alerts, investigations
- Across the business — policies, audits, risk conversations
- On the attack side — finding weaknesses before attackers do

Q4: How comfortable are you working in a terminal or command line?
- Very comfortable — I live in the terminal
- Somewhat — I can get by
- Not really — I prefer GUIs and dashboards
- Never used one

Q5: What does success look like for you in 12 months?
- I have a job in cybersecurity — starting from scratch
- I have moved from IT into a security role
- I have levelled up — more senior or more specialised
- I understand this field well enough to make a decision

Q6 (conditional, shown only when Q3 is cloud, SOC, or code): Follow-up question specific to that environment — cloud platform preference, SOC focus area, or application security focus area.

**Recommendation logic using all answers:**
- Q1 Complete beginner → Entry A, Foundation Module 1
- Q1 IT background → Entry B, Foundation Module 3 (or Module 2 when terminal comfort is low)
- Q1 Developer → Entry C, Application and Product Security paths highlighted
- Q1 Already in security → Entry D, straight to role selection
- Q2–Q5 and conditional Q6 refine role and path recommendation via `lib/onboarding/recommendation-engine.ts`

**Cabinet preview** — locked artifact cards for chosen or recommended role.

**Account prompt** — not blocking. Google, GitHub, email, or skip.

---

## 11. Supporting Features

### Interview Prep
- General section — behavioral questions, STAR method, salary ranges, what hiring managers look for
- Role-specific technical prep — questions, scenario walkthroughs, common gotchas, what good answers look like
- Mock interview flows — question, answer space, model answer and feedback

### CV Builder
- Role-specific templates
- Guided section by section
- Pulls cabinet artifacts and formats as CV bullet points
- ATS optimisation tips
- LinkedIn profile guidance per role
- Cover letter templates
- Before and after examples

### Certification Roadmap (per role)
- Which certs actually matter — honest
- Order to do them in and why
- Difficulty, study time, cost
- Free study resources
- What each cert signals to an employer

### Progress Dashboard
- Visual journey map
- Cabinet display — locked and unlocked
- Time invested and streak tracking
- Shareable progress profile

---

## 12. Security Requirements

The platform must be secure by design. A cybersecurity learning platform that is not secure is an embarrassment.

- Input sanitisation on all user input before processing or storage
- Secure HTTP headers — CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy
- OAuth state parameter validated on all SSO flows
- Auth errors never reveal whether an email exists — generic messages only
- JWT tokens handled entirely by Supabase, never manually stored or exposed
- Rate limiting on all auth endpoints
- Environment variables validated at startup
- RLS enforced on every Supabase table — no exceptions
- CSRF protection on all form submissions
- No sensitive data in localStorage beyond onboarding answers

---

## 13. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 14 App Router | OSS, self-hostable, excellent performance |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent, accessible |
| Backend/Auth/DB | Supabase | Auth + PostgreSQL + Realtime, generous free tier |
| Content | MDX files | Markdown + components, community contributes via PR |
| Lab CLI | Python | Cross-platform, Windows friendly |
| Hosting (managed) | Vercel | Free tier, excellent Next.js integration |
| Hosting (self-hosted) | Docker Compose | Full self-host option |
| Package Manager | pnpm | Faster, better monorepo support |
| Analytics | Plausible | Open source, privacy friendly, no cookie banner |
| Version Control | GitHub | Public repo, community contributions |

---

## 14. V1 Scope

Build this first. Prove the model. Ship it.

**In V1:**
- Homepage
- Introduction section (all 8 parts)
- Onboarding assessment flow
- Foundation Layer (6 modules)
- Azure Security Engineer path (full)
- SOC Analyst path (full)
- Penetration Tester path (full)
- GRC Analyst path (full)
- Progress dashboard
- Cabinet display
- Cert roadmap per role
- Interview prep — general and per role
- CV builder — per role templates
- All role pages (V1 roles full, Coming Soon roles visible with basic info)

**V2 and beyond:**
- All Coming Soon roles
- Specialist modules
- Topic Library
- Tools Directory
- Community layer
- Job board
- Threat intel feed
- Mobile app

---

## 15. Open Source Model

- All content lives in MDX files in the /content directory
- Community contributes new paths, modules, labs, topics via GitHub Pull Requests
- Each module follows the standard template in /content/TEMPLATE.mdx
- Maintainers review for accuracy and quality
- Contributors credited in the platform and README
- Issues tagged "good first issue" for new contributors
- Topic Library is the easiest contribution — focused explainer, submit a PR

---

*This document is the single source of truth for CyberPivot. All building decisions reference this PRD. When in doubt, also check DECISIONS.md.*
