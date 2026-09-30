# CyberPivot — Roadmap

This roadmap shows the current product direction, what is implemented, what is actively being built, and what is planned. CyberPivot is a proprietary paid cybersecurity learning platform with a deliberately free Foundation experience. It is no longer positioned as an open-source project.

The repository and current product decisions are the source of truth for implementation status. See `DECISIONS.md` for authoritative product and architecture decisions.

---

## Status Key

- ✅ Done — implemented and present in the current product/repository
- 🔄 In progress — actively being built
- 📋 Planned — defined but not yet implemented
- 💡 Considering — possible future direction, not yet scoped

> Statuses in this file should describe the actual current state, not historical intentions. When this roadmap conflicts with the repository or `DECISIONS.md`, update the roadmap rather than assuming the older status is correct.

---

# Current Product State

## Product Model

- CyberPivot is a **paid cybersecurity learning platform**.
- The Foundation experience is intentionally free and ungated.
- Selected introduction or sample content may also be free.
- Role-path content is paid unless explicitly marked as free.
- The Cabinet is part of the practical learning experience and is intended to capture tangible learner outputs.
- CyberPivot is **not currently positioned or released as an open-source product**.

## Current Content Architecture

The implemented repository structure is the current source of truth for content:

- `content/foundations/` — Foundation modules
- `content/paths/` — role-path modules
- `content/TEMPLATE.mdx` — content reference/template, not a rigid universal schema
- `lib/foundations/` — Foundation content registration/loading
- `lib/roles/` — role definitions and role metadata
- `lib/cabinet/` — Cabinet functionality

Foundation and role-path modules may use different supported structures. The roadmap therefore describes learning outcomes and module scope rather than requiring every module to have identical headings.

## Content Currently in the Repository

- ✅ 6 Foundation modules are present:
  - How the Internet Actually Works
  - Linux Fundamentals
  - Windows and Active Directory
  - Security Fundamentals
  - Cloud Fundamentals
  - Python for Security
- ✅ 2 OT Security modules are present:
  - What OT Security Actually Is, and Why IT Playbooks Break
  - The Purdue Model and OT Network Architecture
- 🔄 Additional role-path content remains under development.
- 📋 SOC Analyst, Azure Security, Penetration Testing, GRC, AppSec, and API Security remain planned curriculum areas unless a module is explicitly present in the repository.

---

# V1 — Foundation and Core Learning Experience

## Platform Shell

The platform shell remains part of the V1 product scope. Individual UI, onboarding, authentication, role-page, dashboard, and database features should be considered complete only when verified against the current repository/product rather than inherited from the historical roadmap.

Planned/maintained V1 areas include:

- 📋 Homepage and core product experience
- 📋 Onboarding assessment and role recommendation
- 📋 Role/path discovery pages
- 📋 Account and authentication flows
- 📋 Dashboard and learning progress experience
- 📋 Cabinet experience
- 📋 Supabase-backed application data and authentication

---

## Free Foundation Experience

### Foundation Curriculum

- ✅ Module 1 — How the Internet Actually Works
- ✅ Module 2 — Linux Fundamentals
- ✅ Module 3 — Windows and Active Directory
- ✅ Module 4 — Security Fundamentals
- ✅ Module 5 — Cloud Fundamentals
- ✅ Module 6 — Python for Security

### Introduction

- 🔄 Introduction content — practical, ungated entry content covering cybersecurity fundamentals, career context, and how security teams operate.

The Foundation should remain useful as a standalone free learning experience while also preparing learners for paid role paths.

---

# V1 — Role-Based Learning Paths

## OT Security Analyst Path

Current implemented content:

- ✅ Module 1 — What OT Security Actually Is, and Why IT Playbooks Break
- ✅ Module 2 — The Purdue Model and OT Network Architecture

Planned continuation:

- 📋 Module 3 — Industrial Protocols on the Wire
- 📋 Module 4 — OT Monitoring Lab with Malcolm
- 📋 Module 5 — OT Asset Discovery and Inventory
- 📋 Module 6 — OT Incident Response
- 📋 Module 7 — OT Security Analyst Capstone

The OT path should continue to emphasize realistic environments, practical analysis, enterprise context, and tangible learner artifacts.

---

## SOC Analyst Path

Planned curriculum:

- 📋 Module 1 — SOC Fundamentals
- 📋 Module 2 — Security Data Collection
- 📋 Module 3 — SIEM Fundamentals
- 📋 Module 4 — Detection Engineering
- 📋 Module 5 — Alert Triage and Analysis
- 📋 Module 6 — Log Analysis and Investigation
- 📋 Module 7 — Incident Response
- 📋 Module 8 — Threat Hunting
- 📋 Module 9 — Email Threat Analysis
- 📋 Module 10 — Endpoint Triage
- 📋 Module 11 — Malware Analysis Introduction
- 📋 Module 12 — SOC Automation
- 📋 Module 13 — SOC Capstone

Specific tools and environments should be confirmed during module development rather than treated as permanently fixed requirements. Where a module depends on a changing tool version or environment, the content should flag that uncertainty for review.

---

## Azure Security Engineer Path

Planned curriculum:

- 📋 Module 1 — Azure Fundamentals for Security
- 📋 Module 2 — Identity and Access Management
- 📋 Module 3 — Privileged Identity Management
- 📋 Module 4 — Network Security in Azure
- 📋 Module 5 — Microsoft Defender for Cloud
- 📋 Module 6 — Microsoft Sentinel
- 📋 Module 7 — Microsoft Defender for Endpoint
- 📋 Module 8 — Microsoft 365 Security
- 📋 Module 9 — Compliance and Governance
- 📋 Module 10 — Cloud Incident Response
- 📋 Module 11 — Azure Security Architecture
- 📋 Module 12 — Azure Security Capstone

---

## Penetration Tester Path

Planned curriculum:

- 📋 Module 1 — Penetration Testing Methodology
- 📋 Module 2 — Passive Reconnaissance
- 📋 Module 3 — Active Reconnaissance
- 📋 Module 4 — Scanning and Enumeration
- 📋 Module 5 — Vulnerability Assessment
- 📋 Module 6 — Exploitation Fundamentals
- 📋 Module 7 — Web Application Penetration Testing
- 📋 Module 8 — Active Directory Attacks
- 📋 Module 9 — Post-Exploitation
- 📋 Module 10 — Cloud Penetration Testing
- 📋 Module 11 — Social Engineering
- 📋 Module 12 — Penetration Test Reporting
- 📋 Module 13 — Penetration Testing Capstone

---

## GRC Analyst Path

Planned curriculum:

- 📋 Module 1 — GRC Fundamentals
- 📋 Module 2 — Information Security Risk Management
- 📋 Module 3 — Security Frameworks Overview
- 📋 Module 4 — ISO 27001 Implementation
- 📋 Module 5 — Regulatory Compliance
- 📋 Module 6 — Policy and Procedure Development
- 📋 Module 7 — Security Control Assessment
- 📋 Module 8 — Audit Management
- 📋 Module 9 — Vendor and Third Party Risk
- 📋 Module 10 — Business Continuity and Disaster Recovery
- 📋 Module 11 — Data Protection and Privacy
- 📋 Module 12 — Security Awareness Programme Design
- 📋 Module 13 — GRC Capstone

---

## AppSec Engineer Path

- 📋 Curriculum to be developed and implemented.

## API Security Engineer Path

- 📋 Curriculum to be developed and implemented.

The role-path list should expand only as curriculum is actually designed and implemented. A role definition or placeholder page does not mean that a complete learning path exists.

---

# V1 — Learning and Career Features

These features support the role-path experience and should be implemented around the actual learner workflow rather than as isolated feature work.

- 📋 Progress tracking
- 📋 Cabinet artifact tracking and display
- 📋 Interview preparation
- 📋 CV support based on completed work and artifacts
- 📋 Certification roadmaps
- 📋 Shareable progress/profile experience

---

# V1 — Content Quality and Automation

Automation is now a dedicated product-engineering workstream. The objective is to improve content quality, production speed, maintenance, and learner experience without removing human approval.

## Milestone 1 — Content Assurance Engine

- 📋 Create a deterministic content QA CLI
- 📋 Validate MDX and frontmatter
- 📋 Validate supported metadata and references
- 📋 Validate slugs and module/path relationships
- 📋 Validate links and resource references
- 📋 Validate required learning components
- 📋 Validate fictional-company/scenario conventions
- 📋 Validate Cabinet artifact expectations
- 📋 Validate labs and practical-work references
- 📋 Produce clear PASS / WARNING / NEEDS HUMAN REVIEW output

The first version should be deterministic and should not depend on an AI model.

## Milestone 2 — GitHub Quality Gate

- 📋 Run content QA automatically on pull requests
- 📋 Block merges on defined hard failures
- 📋 Surface warnings and human-review items clearly
- 📋 Keep final merge approval with a human

## Milestone 3 — Repo-Aware Content Copilot

- 📋 Understand current repository structure and content standards
- 📋 Draft modules, labs, scenarios, and Cabinet artifacts
- 📋 Detect duplication and gaps against existing content
- 📋 Open proposed changes through pull requests
- 📋 Never auto-merge or autonomously publish content

## Milestone 4 — Job Role Intelligence

- 📋 Periodically research current cybersecurity job postings
- 📋 Extract recurring responsibilities, tools, technologies, and skills
- 📋 Compare market signals against CyberPivot curriculum
- 📋 Produce curriculum gap reports for human review

## Milestone 5 — Technical Validation

- 📋 Validate selected hands-on scenarios in controlled environments
- 📋 Start with one Wazuh/SOC scenario as the initial validation target
- 📋 Expand only after the validation workflow is reliable

## Milestone 6 — Skill and Cabinet Intelligence

- 📋 Map modules to demonstrated skills
- 📋 Improve Cabinet artifact relevance and evidence of practical ability
- 📋 Identify curriculum-to-skill gaps
- 📋 Explore change-impact automation when external tools or requirements change

### Automation Principle

Automation should remain subordinate to CyberPivot's product goals. It should not become a second product or an autonomous content publisher.

Human approval remains required for material curriculum, technical, product, and publishing decisions.

---

# V1 Launch Readiness

Launch readiness should be based on actual product state rather than the existence of a roadmap item.

- 📋 Production deployment
- 📋 Production Supabase configuration
- 📋 Custom domain
- 📋 Core authentication and account flows verified
- 📋 Core learning experience verified
- 📋 Content QA running against the production-bound content set
- 📋 Core paid-access behaviour verified
- 📋 README and CONTRIBUTING.md aligned with the current proprietary product model
- 📋 Pre-launch checklist reconciled with the actual repository
- 📋 Launch communications and distribution plan

---

# V2 — Expansion

V2 expands the number of role paths and specialist learning areas after the core learning and content-production system is reliable.

## Potential Role Paths

- 💡 Incident Responder
- 💡 Threat Hunter
- 💡 EDR Analyst
- 💡 Vulnerability Assessment Analyst
- 💡 Red Teamer
- 💡 DevSecOps Engineer
- 💡 AI Security Engineer
- 💡 AWS Security Engineer
- 💡 Network Security Engineer
- 💡 Identity Security Engineer
- 💡 Email Security Engineer
- 💡 GRC — Compliance Analyst
- 💡 GRC — Risk Analyst
- 💡 GRC — Security Auditor
- 💡 DFIR Analyst
- 💡 Security Engineer
- 💡 Malware Analyst
- 💡 Privacy Analyst
- 💡 AI Red Teamer
- 💡 OT Security Engineer

## Specialist Modules

- 💡 M365 Security
- 💡 Endpoint Security and EDR
- 💡 Database Security and Activity Monitoring
- 💡 PAM and CyberArk Deep Dive
- 💡 AI Security Testing
- 💡 AI Governance and EU AI Act
- 💡 Physical Security and Social Engineering
- 💡 Digital Forensics and DFIR
- 💡 Threat Intelligence and CTI
- 💡 OT/ICS Security
- 💡 Mobile Application Security
- 💡 Cryptography in Practice
- 💡 Zero Trust Architecture
- 💡 Cloud Forensics and IR
- 💡 Purple Teaming
- 💡 Container and Kubernetes Security
- 💡 GDPR in Practice
- 💡 SOX IT General Controls
- 💡 PCI-DSS Implementation
- 💡 HIPAA Security Rule
- 💡 Bug Bounty and Responsible Disclosure

## Platform Features

- 💡 Topic Library
- 💡 Tools Directory
- 💡 Community/study features
- 💡 Curated job board
- 💡 Threat intelligence feed mapped to learning content
- 💡 Mentor matching

These remain future possibilities rather than commitments until they are explicitly scoped.

---

# V3 — Premium and Advanced Features

- 💡 AI-assisted CV generation based on verified Cabinet artifacts
- 💡 Mock interview AI with role-specific practice and feedback
- 💡 Team accounts for bootcamps, universities, and corporate training

These features should follow the core content, QA, and learner-outcome systems rather than precede them.

---

# Roadmap Principles

1. **Repository reality over historical documentation.** If the codebase and roadmap disagree, verify the repository and update the roadmap.
2. **Quality before scale.** Build the content assurance system before aggressively increasing module production.
3. **Practical outcomes over content volume.** Modules should produce useful skills and tangible learner artifacts.
4. **Human approval remains central.** AI may research, draft, validate, and propose changes, but material product/content decisions remain human-approved.
5. **Do not build everything at once.** Complete the current milestone before expanding into unrelated future features.
6. **Do not invent implementation status.** A planned role, definition, or placeholder is not the same as a completed learning path.

---

## Documentation Alignment

The documentation set should remain aligned in this order:

1. `DECISIONS.md` — authoritative product and architecture decisions
2. `PRD.md` — product requirements and scope
3. `CLAUDE.md` — implementation guidance for coding agents
4. `ROADMAP.md` — sequencing and delivery status
5. `content/TEMPLATE.mdx` — content reference/template
6. `README.md` / `CONTRIBUTING.md` — repository-facing documentation

---

*Last updated: September 2026*
