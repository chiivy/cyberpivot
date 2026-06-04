# CyberPivot — Decision Log

Every significant product, content, or technical decision is recorded here with the reasoning behind it. When in doubt, refer to this document before making changes.

Read this alongside PRD.md and CLAUDE.md at the start of every session.

---

## Platform Name

**Decision:** CyberPivot
**Reason:** Cybersecurity + pivot. Career pivot into security. Lateral movement in pentesting. Double meaning that fits the platform perfectly.
**Date:** June 2026

---

## Core Philosophy

**Decision:** "Start where you are" as the central philosophy
**Reason:** Every other platform assumes a starting point. Some assume zero knowledge, others assume IT background. CyberPivot meets people at their actual level — complete beginner, IT professional, developer, or existing security practitioner. The onboarding assessment determines entry point, not a fixed curriculum.
**Date:** June 2026

---

## Content Architecture — Three Levels

**Decision:** Modules are the building blocks. Roles are curated collections of modules. Some modules appear in multiple role paths — written once, used everywhere.
**Reason:** The original design had content locked inside specific paths. A GRC analyst and a cloud security engineer both need identity and access management content. Building it twice wastes effort and creates inconsistency. Central module library with role definitions as JSON files pointing to module slugs in order solves this cleanly.
**Date:** June 2026

---

## Five Content Levels

**Decision:** Introduction → Foundation → Role Paths → Specialist Modules → Topic Library (plus Tools Directory as V2)
**Reason:**
- Introduction: answers "is cybersecurity for me" before asking anyone to commit to a path. Free, ungated, no account.
- Foundation: shared technical prerequisites for people who need them.
- Role Paths: structured journeys for people building toward a specific job.
- Specialist Modules: deep dives for people filling specific skill gaps without doing a full path.
- Topic Library: short focused explainers for anyone wanting to understand one thing quickly. Community contributed, grows fast.
- Tools Directory: reference layer for discovering and comparing tools. V2 because it is useful but not core to learning.
**Date:** June 2026

---

## Cloud Path Naming

**Decision:** "Azure Security Engineer" not "Cloud Security Azure"
**Reason:** Cloud & Infrastructure Security is the domain. Azure is one role inside it. Naming it "Cloud Security Azure" implied Azure was the whole domain which is wrong. The role is named after the job title, not the platform.
**Date:** June 2026

---

## Team Structures in Introduction

**Decision:** Red, Blue, Purple, White, Yellow, Green, Orange, Gold teams all explained in the Introduction section
**Reason:** Most platforms either ignore team structures or only mention red and blue. Understanding how teams interact — especially purple teaming which is increasingly common — helps people understand what kind of work they are moving toward. White, Yellow, Orange, Green and Gold teams exist in real organisations and practitioners encounter them.
**Date:** June 2026

---

## AI Security — Separate Path Plus Cross-Path Modules

**Decision:** AI Security Engineer is a standalone role path under Application and Product Security. AI security content also appears as specialist modules inside other paths.
**Reason:** AI Security Engineer is a real and rapidly growing role with its own dedicated skills — OWASP LLM Top 10, MITRE ATLAS, prompt injection, model poisoning, agentic AI security. It deserves its own path. But other roles also need AI security context — pentesters need to know how to test LLM features in application scope, GRC analysts need AI governance and EU AI Act, SOC analysts need to detect AI-based attacks. These are specialist modules inside those paths, not the full AI Security Engineer curriculum.
**Date:** June 2026

---

## Incident Response Placement

**Decision:** IR is not a standalone path. It lives inside SOC Analyst (core), Cloud paths (platform-specific), and GRC (governance and policy angle).
**Reason:** IR is a discipline that touches multiple roles. A SOC analyst does IR as part of their daily work. A cloud security engineer does cloud-specific IR. A GRC analyst owns the IR policy and regulatory notification obligations. Making it a standalone path would either be too narrow or would duplicate content from other paths.
**Date:** June 2026

---

## Cabinet — Practical Artifacts Not Theory

**Decision:** Every cabinet artifact is something the user produces by doing the work. Not a template they download. Not a document they read. Something they build.
**Reason:** The cabinet is the differentiator. It is proof of work, not proof of watching. A completed penetration test report means you ran the pentest and documented your findings. An ISO 27001 gap analysis means you assessed a real or simulated organisation against the standard. This is what makes CyberPivot different from every other platform. The cabinet is what you show in an interview.
**Date:** June 2026

---

## Tool Coverage — Two Tracks Per Module

**Decision:** Every module that involves tooling covers both a free/open source track and an enterprise track.
**Reason:** Platforms that only teach open source tools leave people unprepared for the job. You walk in day one and see Splunk for the first time. Platforms that only teach enterprise tools are inaccessible — most learners cannot afford Splunk licenses. CyberPivot does both. Full hands-on lab with the open source tool. Walkthrough, trial link, and explanation of what the enterprise tool does differently.
**Date:** June 2026

---

## Specialist Modules — Standalone and Embedded

**Decision:** Specialist modules live inside relevant role paths but are also accessible as standalone content.
**Reason:** Someone already working as a cloud security engineer might want just the PAM deep dive without doing the full Azure Security Engineer path from scratch. Someone in GRC might want just the GDPR in Practice module. Making specialist modules standalone respects that users have different starting points and specific gaps to fill.
**Date:** June 2026

---

## Writing Voice

**Decision:** Plain, direct, practitioner voice. Real examples from real incidents. Relatable analogies. No AI-sounding phrases.
**Reason:** The platform teaches security. It should sound like a knowledgeable human wrote it — someone who has done the job and can explain it to someone intelligent but new. AI-generated content patterns (em dashes, "delve into", "in today's landscape") undermine credibility. Real incidents (WannaCry, SolarWinds, Uber) make concepts stick in a way hypothetical scenarios never do.
**Date:** June 2026

---

## No Name Collection in Onboarding

**Decision:** Do not ask for the user's name during onboarding.
**Reason:** Adds friction before the user has seen any value. Platform is open source and privacy-conscious — asking for personal information at the door contradicts that. The platform earns that information. On account creation via Supabase Auth the name can be collected naturally if needed.
**Date:** June 2026

---

## Account Creation — Not Blocking

**Decision:** Account creation is soft and non-blocking throughout onboarding. Guest state saved to localStorage. Users can explore before committing.
**Reason:** Forcing account creation before showing value kills conversion. People should be able to go through onboarding, see their recommendation, see their cabinet preview, and decide if this platform is worth their time before being asked to sign up. Guest progress migrates to Supabase on signup.
**Date:** June 2026

---

## Auth — Google, GitHub, Email

**Decision:** Sign in with Google, sign in with GitHub, continue with email. No other providers at V1.
**Reason:** Google covers the broadest audience. GitHub is specifically right for this platform — everyone interested in cybersecurity and open source has a GitHub account. Email covers people who prefer not to use SSO. Three options is enough. Adding more creates noise.
**Date:** June 2026

---

## M365 Security Placement

**Decision:** M365 Security lives as a specialist module set inside the Azure Security Engineer path, not as a standalone role path.
**Reason:** M365 security sits on top of Azure and Entra ID. Defender for Office 365, Purview, Intune, M365 Defender — all Microsoft ecosystem. It belongs with the Azure path. Could eventually become its own specialist path but V1 treats it as specialist modules within Azure.
**Date:** June 2026

---

## Database Activity Monitoring Placement

**Decision:** DAM lives as a specialist module appearing inside Cloud Security, AppSec, and GRC paths.
**Reason:** Database security is relevant to multiple roles but is not a standalone career path. A cloud security engineer needs to understand Azure SQL Auditing. An AppSec engineer needs to understand least privilege for database accounts and SQL injection prevention. A GRC analyst needs to understand data classification and database compliance. One specialist module, three paths.
**Date:** June 2026

---

## PAM and CyberArk Placement

**Decision:** PAM lives primarily in the Identity Security Engineer path as a core skill. Also appears as a specialist module in Azure Security Engineer and GRC Analyst paths.
**Reason:** Identity Security Engineer is the role where PAM is the job. CyberArk, BeyondTrust, Delinea, HashiCorp Vault — this is their toolset. Azure Security Engineer needs PIM specifically (Microsoft's built-in PAM). GRC Analyst needs PAM as a governance control — privileged access governance, access reviews, separation of duties.
**Date:** June 2026

---

## Physical Security Inclusion

**Decision:** Physical security included as a specialist module.
**Reason:** Most cybersecurity learning platforms ignore physical security entirely. But physical penetration testing is a real engagement type. ISO 27001 includes physical security controls. Social engineering attacks are often physical — tailgating, shoulder surfing, dumpster diving. Leaving it out creates a gap in practitioners' mental models.
**Date:** June 2026

---

## OT/ICS/SCADA Inclusion

**Decision:** OT/ICS security included as a specialist module, not a full role path at V1.
**Reason:** Critical infrastructure security is a real and growing discipline. The skills required are significantly different from IT security — Purdue model, air-gapped networks, legacy protocols, safety-critical systems. It belongs on the platform. V1 covers it as a specialist module. A full OT security role path is a V2 consideration.
**Date:** June 2026

---

## Compliance Frameworks Coverage

**Decision:** GRC path covers GDPR, HIPAA, SOX, PCI-DSS, ISO 27001, NIST CSF, SOC 2, CIS Controls, FedRAMP, EU AI Act. Each as a module or specialist module depending on depth required.
**Reason:** A GRC analyst in the real world encounters multiple frameworks simultaneously depending on their industry. Healthcare touches HIPAA. Finance touches SOX and PCI-DSS. Any company with EU customers touches GDPR. Any company going for ISO 27001 touches that standard. The GRC path needs to cover all of them to be genuinely job-ready content.
**Date:** June 2026

---

## Regulatory Bodies

**Decision:** Regulatory bodies explicitly covered in the Introduction section and GRC path.
**Reason:** Most practitioners know frameworks exist but do not understand who enforces them and how. ICO enforces GDPR in the UK. FCA regulates financial services security in the UK. SEC has cybersecurity disclosure requirements in the US. CMS oversees HIPAA in the US. CISA coordinates critical infrastructure security in the US. Understanding who these bodies are and how they interact with organisations is essential GRC knowledge.
**Date:** June 2026

---

## Topic Library — Community Contributed

**Decision:** Topic Library content is primarily community contributed. Core team seeds it with initial topics.
**Reason:** The Topic Library has the lowest barrier to contribution — a focused explainer on one subject, no full module structure required. Making it community-led means it grows fast and stays current. Community contributors can start here before tackling full modules.
**Date:** June 2026

---

## Tools Directory — V2

**Decision:** Tools Directory is a V2 feature. Data structure designed now so it is easy to add later.
**Reason:** Genuinely useful but not core to the learning experience. The platform works without it. Tool information is already embedded in the relevant modules. The directory is a discovery and reference layer on top. Building it in V1 would delay more important features. Designing the data structure now (JSON in /content/tools/) means adding it later is straightforward.
**Date:** June 2026

---

## Tech Stack

**Decision:** Next.js 14 + Tailwind + shadcn/ui + Supabase + pnpm
**Reason:**
- Next.js: best in class for this type of content platform, excellent OSS community, self-hostable
- Tailwind + shadcn: fast development, consistent design, accessible components, no custom CSS needed
- Supabase: handles auth (including Google and GitHub OAuth), PostgreSQL database, realtime, generous free tier, open source and self-hostable
- pnpm: faster than npm, better for monorepo if needed later
- All choices are free or have generous free tiers — aligns with open source ethos
**Date:** June 2026

---

## Dark Mode First

**Decision:** Dark mode is the primary theme. Light mode is secondary if implemented at all.
**Reason:** Cybersecurity tools are dark mode. Terminals are dark. SIEMs are dark. IDEs are dark. The platform should feel native to the environment practitioners work in. Dark mode first also signals that this is a technical platform, not a generic SaaS product.
**Date:** June 2026

---

## No Ads, No Paywalls, No Premium Tiers

**Decision:** CyberPivot is free. All content is free. No premium tier. No ads.
**Reason:** The platform exists to help people get into cybersecurity regardless of their financial situation. Paywalling content contradicts that mission. Open source sustainability comes from community contributions, GitHub sponsors if applicable, and organisations using the platform for training.
**Date:** June 2026

---

*Add new decisions to this log as they are made. Format: Decision, Reason, Date.*
