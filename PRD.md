# CyberPivot — Product Requirements Document (PRD)
**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2026

---

## 1. Vision

CyberPivot is a free, open source, lifecycle-based cybersecurity learning platform built for anyone who wants to break into or level up in cybersecurity — regardless of where they're starting from.

The core philosophy: **Start where you are.**

Not everyone begins at zero. Not everyone wants the same career. CyberPivot meets you at your current level, puts you on the right path, and walks you through building real skills, a real home lab, and a real portfolio — the kind you can show an employer.

This is not a course platform. This is not a CTF platform. This is the structured, practical, tool-first journey that actually prepares people for cybersecurity careers.

---

## 2. The Problem We're Solving

The cybersecurity learning landscape is broken in specific ways:

- **Passive learning dominates** — videos, MCQs, reading. Nobody learns security by watching.
- **Sandboxed platforms** — TryHackMe, HackTheBox are great but not real. Skills don't transfer to real environments.
- **No path awareness** — a GRC analyst and a pentester need completely different journeys. Most platforms treat everyone the same.
- **No tangible output** — you finish a course with a certificate but nothing to show. No lab, no artifacts, no portfolio.
- **Assumes your hardware** — most guides assume you have a powerful machine or specific OS. Real beginners get lost immediately.
- **Theory before tools** — people learn what a firewall is before ever touching one. CyberPivot flips this.

---

## 3. Core Philosophy

- **Tool-first** — you touch the tool before you read theory about it
- **Scenario-first** — every concept introduced through a real-world situation
- **Start where you are** — three entry points based on your background
- **Build as you learn** — every module produces a tangible artifact
- **Honest guidance** — we tell you what certs matter, what jobs pay, what interviews actually look like
- **Open source** — free forever, community can contribute paths and modules

---

## 4. Target Audience

### Entry Point A — Complete Beginner
No IT background. Curious about cybersecurity. Doesn't know where to start.
- Starts at absolute foundations
- Full hand-holding with explanations of everything
- Scenario: *"You just heard about cybersecurity as a career. Let's figure out if it's for you and how to get there."*

### Entry Point B — IT Background
Already in helpdesk, networking, sysadmin, or development. Wants to pivot into security.
- Skips basic IT concepts
- Light security-specific foundations refresh
- Gets into a specialization path faster
- Scenario: *"You've been in IT for 2 years. Here's how you translate that into a security career."*

### Entry Point C — Already in Security
Working in security or self-studying. Wants structure, interview prep, certs, or a specific skill gap filled.
- Skip foundations entirely
- Jump into any path, module, or resource directly
- Use platform for interview prep, CV builder, cert roadmap, labs
- Scenario: *"You're a SOC Tier 1 analyst. Here's how you get to Tier 2 and beyond."*

---

## 5. Platform Structure

### 5.1 Onboarding Flow

When a user first arrives they answer a short honest assessment:

1. Do you have any IT background? (Yes / Some / No)
2. Have you worked in tech professionally? (Yes / No)
3. Do you understand basic networking? e.g. IP addresses, DNS (Yes / Somewhat / No)
4. Have you used Linux before? (Yes / A little / No)
5. Do you have a career path in mind? (Yes — show paths / Not yet — help me choose)

Based on answers → platform recommends an entry point and starting module. User can override at any time.

---

### 5.2 Foundation Layer (Entry Point A & B)

Everyone who needs it starts here. Taught through real scenarios, not lectures.

**Module 1 — How the Internet Actually Works**
- IP addressing, subnetting basics, DNS, HTTP/S
- Tool: Wireshark — capture and read your first packet
- Scenario: *"You're a new IT hire. Your manager asks you to find out why a website isn't loading."*

**Module 2 — Operating Systems for Security**
- Windows fundamentals — Active Directory basics, file permissions, registry
- Linux fundamentals — CLI, file system, users, permissions, processes
- Tool: Windows Sandbox, WSL2 (Windows friendly)
- Scenario: *"A user's machine is behaving strangely. Navigate it to find out why."*

**Module 3 — Security Fundamentals**
- CIA Triad, threat modeling, attack surface
- Types of attacks — phishing, malware, MITM, social engineering
- Defense concepts — least privilege, defense in depth, zero trust intro
- Scenario: *"You're a new security analyst. Here's your first threat briefing."*

**Module 4 — Networking for Security**
- Ports and protocols, firewalls, VPNs, proxies
- Network topology — DMZ, segmentation
- Tool: nmap — your first network scan (on your own machine)
- Scenario: *"Map your home network. Understand what's actually on it."*

**Module 5 — Security Tools Orientation**
- Introduction to the tooling ecosystem
- Open source vs enterprise tools — what exists, what's used where
- Setting up your first lab environment (Docker on Windows)
- Scenario: *"A security team uses these tools daily. Here's what each one does and why."*

---

### 5.3 Specialization Paths

#### ☁️ Path 1 — Azure Security

**Who it's for:** Cloud-focused roles, Azure administrators moving into security, anyone targeting AZ-500 or SC-200.

**Tools:** Azure Free Tier, Microsoft Defender for Cloud (trial), Microsoft Sentinel (trial), Entra ID

**Modules:**

1. **Azure Fundamentals for Security** — Resource groups, subscriptions, management hierarchy, the shared responsibility model
2. **Identity & Access Management** — Entra ID, users/groups/roles, MFA setup, Conditional Access policies, Privileged Identity Management (PIM)
3. **Network Security in Azure** — NSGs, Azure Firewall, Private Endpoints, VNet peering, DDoS protection
4. **Defender for Cloud** — Secure Score, recommendations, workload protections, alerts
5. **Microsoft Sentinel** — Workspace setup, data connectors, analytics rules, incidents, KQL basics, playbooks
6. **Compliance & Governance** — Azure Policy, Blueprints, regulatory compliance dashboard, RBAC deep dive
7. **Incident Response on Azure** — End to end IR scenario using Sentinel + Defender
8. **Capstone** — *"A startup just migrated to Azure with zero security controls. Lock it down."*

**Cabinet Artifacts:**
- Configured Entra ID tenant with documented policies
- Working Sentinel workspace with detection rules
- Secure Score improvement report
- Azure security architecture diagram
- Incident response runbook

**Cert Alignment:** AZ-500, SC-200, SC-300

---

#### 🔴 Path 2 — Penetration Testing

**Who it's for:** Offensive security, ethical hacking, red team aspirants.

**Tools:** Kali Linux (WSL2 or VM), Burp Suite Community, Metasploit, nmap, Gobuster

**Modules:**

1. **Pentest Methodology** — Phases, rules of engagement, legal framework, report structure
2. **Reconnaissance** — Passive recon (OSINT), active recon, footprinting, Google dorking
3. **Scanning & Enumeration** — nmap, service enumeration, vulnerability scanning with OpenVAS
4. **Exploitation Basics** — Metasploit framework, manual exploitation concepts, payload types
5. **Web Application Testing** — OWASP Top 10 hands-on, Burp Suite, SQLi, XSS, IDOR
6. **Post-Exploitation** — Privilege escalation, persistence, lateral movement concepts
7. **Reporting** — Writing a real pentest report, executive summary vs technical findings, CVSS scoring
8. **Capstone** — *"You've been hired for a black-box web app test. Here's your scope. Go."*

**Cabinet Artifacts:**
- Configured Kali environment (WSL2)
- Custom nmap scan scripts
- Burp Suite project with findings
- Full pentest report (template + completed example)
- Personal methodology notes

**Cert Alignment:** CompTIA PenTest+, eJPT, OSCP (foundation)

---

#### 🛡️ Path 3 — SOC / Security Operations

**Who it's for:** SOC analysts (Tier 1, 2, 3), incident responders, threat hunters.

**Tools:** Wazuh (OSS SIEM), Splunk Free Trial, Elastic SIEM, TheHive, MISP

**Modules:**

1. **SOC Fundamentals** — How a SOC works, tiers, tools, shift life, alert fatigue reality
2. **Log Analysis** — Windows event logs, syslog, auth logs, what to look for
3. **SIEM Fundamentals** — Setting up Wazuh, ingesting logs, creating dashboards
4. **Alert Triage** — Real alert scenarios, false positive vs true positive, escalation decisions
5. **Incident Response** — IR lifecycle, playbooks, containment, eradication, recovery
6. **Threat Hunting** — Hypothesis-driven hunting, MITRE ATT&CK framework, hunting in logs
7. **Malware Analysis Intro** — Static vs dynamic analysis, sandboxing, IOCs
8. **Capstone** — *"Here's 48 hours of logs from a compromised environment. Find the breach."*

**Cabinet Artifacts:**
- Running Wazuh SIEM instance
- Custom detection rules library
- IR playbook collection
- Threat hunting hypothesis log
- Incident report (completed example)

**Cert Alignment:** CompTIA Security+, CySA+, BTL1, GCIH

---

#### 📋 Path 4 — GRC (Governance, Risk & Compliance)

**Who it's for:** GRC analysts, compliance officers, risk managers, auditors.

**Tools:** No lab required — real templates, real frameworks, real documents

**Modules:**

1. **GRC Fundamentals** — What GRC is, why it exists, how it fits the business
2. **Frameworks Deep Dive** — NIST CSF, ISO 27001, SOC 2, CIS Controls, GDPR overview
3. **Risk Management** — Risk identification, assessment, scoring, treatment, risk register
4. **Policy Writing** — Information security policy, AUP, BYOD, incident response policy — real templates
5. **Control Frameworks** — Control design, implementation, testing, evidence collection
6. **Audit Preparation** — What auditors look for, evidence mapping, gap analysis
7. **Vendor Risk Management** — Third party risk, questionnaires, tiering vendors
8. **Capstone** — *"Your company is going for ISO 27001 certification. Build the program from scratch."*

**Cabinet Artifacts:**
- Complete risk register (template + example)
- Information security policy suite
- Control mapping spreadsheet
- Gap analysis report
- Audit evidence folder structure
- Vendor risk questionnaire

**Cert Alignment:** CompTIA Security+, CISM, CRISC, ISO 27001 Lead Implementer

---

#### 🔌 Path 5 — API Security

**Who it's for:** Developers moving into security, AppSec engineers, anyone working with APIs.

**Tools:** Postman, OWASP crAPI, Burp Suite, OWASP ZAP, jwt.io

**Modules:**

1. **API Fundamentals for Security** — REST, GraphQL, gRPC, authentication patterns
2. **OWASP API Top 10** — Each vulnerability explained with hands-on exploitation
3. **Authentication & Authorization Flaws** — Broken JWT, OAuth misconfig, API key exposure
4. **API Reconnaissance** — Finding undocumented endpoints, fuzzing, Swagger abuse
5. **Rate Limiting & Business Logic** — Bypassing limits, abusing workflows
6. **API Gateway Security** — WAF, rate limiting, authentication at the gateway layer
7. **Secure API Design** — Building security in from the start, threat modeling APIs
8. **Capstone** — *"Audit this fintech API before it goes to production. Find everything."*

**Cabinet Artifacts:**
- Postman security testing collection
- OWASP API Top 10 findings report
- API threat model document
- Personal API security checklist

**Cert Alignment:** BSCP, GWEB, APIsec University certifications

---

#### 💻 Path 6 — Application Security (AppSec)

**Who it's for:** Developers wanting to move into security, AppSec engineers, secure code reviewers.

**Tools:** Semgrep, OWASP ZAP, SonarQube Community, Burp Suite, GitHub Advanced Security (free tier)

**Modules:**

1. **Secure SDLC** — Where security fits in development, DevSecOps intro, shift left concept
2. **OWASP Top 10** — Web application vulnerabilities hands-on
3. **Code Review Fundamentals** — Reading code for security flaws, common patterns
4. **SAST & DAST** — Setting up Semgrep, running ZAP, interpreting results
5. **Threat Modeling for Applications** — STRIDE, data flow diagrams, abuse cases
6. **Dependency & Supply Chain Security** — SCA tools, CVE triage, license issues
7. **Security in CI/CD** — Adding security gates to pipelines, secrets scanning
8. **Capstone** — *"Here's a pull request. Security review it before it merges."*

**Cabinet Artifacts:**
- Semgrep custom rules
- ZAP scan report
- Threat model document
- Secure code review checklist
- CI/CD security pipeline config

**Cert Alignment:** GWEB, CSSLP, BSCP

---

### 5.4 Labs & Challenges

Standalone practice available throughout the platform.

- Each lab is scenario-based with a real world context
- Difficulty rated: Beginner / Intermediate / Advanced
- Time estimated per lab
- Three modes: Guided (full walkthrough) / Assisted (hints only) / Independent (no help)
- Completion tracked on progress dashboard
- New labs added regularly by community contributors

---

### 5.5 Certification Roadmap

Per-path certification guidance:

- Which certs actually matter for this path (honest assessment)
- Recommended order — don't waste money doing them wrong
- Difficulty rating, study time estimate, exam cost
- Free study resources linked for each cert
- Community pass rate and tips

---

### 5.6 Interview Prep

**General Section (all paths):**
- Behavioral questions — STAR method, common scenarios
- "Tell me about yourself" for career switchers
- How to talk about your lab work as real experience
- What hiring managers actually look for
- Salary ranges by role, level, and region

**Path-Specific Technical Prep:**
- SOC: Alert triage scenarios, log analysis questions, tool knowledge
- Pentest: Methodology questions, explain-this-vulnerability scenarios
- GRC: Framework knowledge, risk scenario walkthroughs, policy questions
- Azure Security: Architecture questions, Sentinel/Defender scenarios
- AppSec: Code review exercises, SDLC questions, tool knowledge
- API Security: Auth flaw scenarios, OWASP API Top 10 deep questions

**Mock Interview Scenarios:**
- Full simulated interview flows
- Question → your answer → feedback and model answer
- Recorded so you can review your responses

---

### 5.7 CV / Resume Builder

- Path-specific templates — pentest CV looks nothing like GRC CV
- Guided section by section build
- Translates your cabinet artifacts into CV bullet points
- ATS optimization tips
- LinkedIn profile guidance per path
- Cover letter templates per path
- Before/after examples — what a weak vs strong entry-level CV looks like

---

### 5.8 Progress Dashboard

- Visual journey map — where you are, what's next
- Cabinet display — everything you've built so far
- Time invested tracking
- Streak and consistency tracking
- Shareable progress profile — send to employers or mentors
- Completion percentages per module and path

---

### 5.9 Community Layer (V2)

- Discord integration
- Study group finder — connect with people on same path
- Peer CV reviews
- "Ask a practitioner" — real professionals answer questions
- Community-contributed modules and labs

---

### 5.10 Job Board (V2)

- Curated entry-level and junior cybersecurity roles
- Filtered by path
- "You're ready for this" indicator based on progress
- Application tips per role type

---

### 5.11 Threat Intel Feed (V2)

- Weekly curated real-world incidents
- Mapped to relevant platform modules
- "This breach happened because of X — here's the module that covers prevention"

---

## 6. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Best OSS community, self-hostable, excellent performance |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent, accessible components |
| Backend / Auth / DB | Supabase | Auth + PostgreSQL + real-time, generous free tier |
| Content / Modules | MDX files | Markdown + components, community can contribute via GitHub PR |
| Lab CLI Companion | Python | Cross-platform, Windows friendly, easy to distribute |
| Hosting (managed) | Vercel | Free tier covers early stage, excellent Next.js integration |
| Hosting (self-hosted) | Docker Compose | Full self-host option for privacy-conscious users |
| Package Manager | pnpm | Faster than npm, better monorepo support |
| Version Control | GitHub | Public repo, open source, community contributions |

---

## 7. V1 Scope

Build this first. Prove the model. Ship it.

**In V1:**
- Onboarding assessment flow
- Foundation Layer (all 5 modules)
- Azure Security Path (all 8 modules, complete end to end)
- Progress Dashboard (basic)
- Cabinet display (basic)
- Certification Roadmap (Azure path)
- Interview Prep (general + Azure path specific)
- CV Builder (Azure path template)
- Basic lab challenges (5-10 labs)

**Not in V1 (V2 and beyond):**
- All other specialization paths (added progressively)
- Community / Discord integration
- Job Board
- Threat Intel Feed
- Mock interview recording
- Mobile app

---

## 8. Folder Structure (Proposed)

```
cyberpivot/
├── app/                          # Next.js app router
│   ├── (auth)/                   # Auth pages
│   ├── (dashboard)/              # Logged in experience
│   │   ├── dashboard/            # Progress dashboard
│   │   ├── paths/                # Specialization paths
│   │   ├── labs/                 # Standalone labs
│   │   ├── interview/            # Interview prep
│   │   ├── cv/                   # CV builder
│   │   └── cabinet/              # Portfolio/cabinet
│   ├── (marketing)/              # Public landing pages
│   └── api/                      # API routes
├── components/                   # Shared UI components
│   ├── ui/                       # shadcn/ui components
│   ├── modules/                  # Module-specific components
│   └── layout/                   # Layout components
├── content/                      # MDX content files
│   ├── foundations/              # Foundation modules
│   ├── paths/
│   │   ├── azure-security/       # Azure path modules
│   │   ├── pentest/              # Pentest path modules
│   │   ├── soc/                  # SOC path modules
│   │   ├── grc/                  # GRC path modules
│   │   ├── api-security/         # API Security modules
│   │   └── appsec/               # AppSec path modules
│   ├── labs/                     # Lab content
│   └── interview/                # Interview questions
├── lib/                          # Utilities and helpers
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript types
├── cli/                          # Python CLI companion
│   ├── setup/                    # Lab environment setup scripts
│   └── checks/                   # System check utilities
├── public/                       # Static assets
├── supabase/                     # Supabase config and migrations
├── PRD.md                        # This document
├── CLAUDE.md                     # AI context file
├── .cursorrules                  # Cursor conventions
├── CONTRIBUTING.md               # How to contribute
└── README.md                     # Project readme
```

---

## 9. Design Principles

- **Dark mode first** — cybersecurity tools are dark mode. Our platform should feel native to that world.
- **Clean and focused** — no distractions, content is the hero
- **Progress is visible** — users should always know where they are and what's next
- **Mobile responsive** — readable on any device, though lab work is desktop
- **Accessible** — WCAG 2.1 AA minimum
- **Fast** — static generation where possible, optimistic UI updates

---

## 10. Open Source Contribution Model

- All content lives in `/content` as MDX files
- Community contributes new paths, modules, labs via GitHub Pull Requests
- Each module has a standard template to follow
- Maintainers review for accuracy and quality
- Contributors credited in the platform and README
- Issues tagged "good first issue" for new contributors

---

## 11. Success Metrics (V1)

- GitHub stars as community signal
- Monthly active users
- Module completion rates
- Path completion rates
- CV builder usage
- Community contributions (PRs merged)
- User-reported job placements

---

## 12. What Makes CyberPivot Different

| Feature | CyberPivot | TryHackMe | HTB | Udemy | YouTube |
|---|---|---|---|---|---|
| Free & open source | ✅ | Partial | Partial | ❌ | ✅ |
| Path-aware journey | ✅ | Partial | ❌ | ❌ | ❌ |
| Real tool experience | ✅ | Partial | ✅ | ❌ | ❌ |
| Tangible portfolio output | ✅ | ❌ | ❌ | ❌ | ❌ |
| CV builder | ✅ | ❌ | ❌ | ❌ | ❌ |
| Interview prep | ✅ | ❌ | ❌ | Partial | Partial |
| Cert roadmap | ✅ | Partial | ❌ | ❌ | ❌ |
| Self-hostable | ✅ | ❌ | ❌ | ❌ | ❌ |
| Start where you are | ✅ | ❌ | ❌ | ❌ | ❌ |

---

*This document is the single source of truth for CyberPivot v1. All building decisions reference this PRD.*
