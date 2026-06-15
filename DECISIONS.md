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
**Reason:** Every other platform assumes a starting point. CyberPivot meets people at their actual level — complete beginner, IT professional, developer, or existing security practitioner. The onboarding assessment determines entry point, not a fixed curriculum.
**Date:** June 2026

---

## Content Architecture — Modules as Building Blocks

**Decision:** Modules are the building blocks. Roles are curated collections of modules in a specific order. Some modules appear across multiple role paths — written once, used everywhere.
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
**Reason:** Most platforms either ignore team structures or only mention red and blue. Understanding how teams interact helps people understand what kind of work they are moving toward.
**Date:** June 2026

---

## AI Security — Separate Path Plus Cross-Path Modules

**Decision:** AI Security Engineer is a standalone role path under Application and Product Security. AI security content also appears as specialist modules inside other paths.
**Reason:** AI Security Engineer is a real and rapidly growing role with its own dedicated skills. But other roles also need AI security context — pentesters need to test LLM features, GRC analysts need AI governance, SOC analysts need to detect AI-based attacks. These are specialist modules inside those paths, not the full AI Security Engineer curriculum.
**Date:** June 2026

---

## Incident Response Placement

**Decision:** IR is not a standalone path. It lives inside SOC Analyst (core), Cloud paths (platform-specific), and GRC (governance and policy angle).
**Reason:** IR is a discipline that touches multiple roles. Making it standalone would either be too narrow or duplicate content from other paths.
**Date:** June 2026

---

## Cabinet — Practical Artifacts Not Theory

**Decision:** Every cabinet artifact is something the user produces by doing the work. Not a template they download. Not a document they read. Something they build.
**Reason:** The cabinet is proof of work, not proof of watching. This is what makes CyberPivot different from every other platform. The cabinet is what you show in an interview.
**Date:** June 2026

---

## Tool Coverage — Two Tracks Per Module

**Decision:** Every module that involves tooling covers both a free/open source track and an enterprise track.
**Reason:** Platforms that only teach open source tools leave people unprepared for the job. Platforms that only teach enterprise tools are inaccessible. CyberPivot does both.
**Date:** June 2026

---

## Specialist Modules — Standalone and Embedded

**Decision:** Specialist modules live inside relevant role paths but are also accessible as standalone content.
**Reason:** Someone already working as a cloud security engineer might want just the PAM deep dive without doing the full path from scratch. Making specialist modules standalone respects that users have different starting points and specific gaps to fill.
**Date:** June 2026

---

## Writing Voice

**Decision:** Plain, direct, practitioner voice. Real examples from real incidents. Relatable analogies. No AI-sounding phrases.
**Reason:** The platform teaches security. It should sound like a knowledgeable human wrote it. AI-generated content patterns undermine credibility. Real incidents make concepts stick.
**Date:** June 2026

---

## Content Standard — Real World Relevance Required

**Decision:** Every concept, framework, control, and topic on the platform must answer three questions before the user moves on:
1. Why does this matter in the real world? — A real incident, a real consequence, a real example. Not "this is important for your career."
2. How does it feel on the job? — What does a practitioner actually do with this knowledge on a Tuesday afternoon?
3. How do you get hands-on with it right now? — A tool, a simulation, a lab, a real exercise they can do today.

Theory without real-world context is not permitted on this platform. Every module, every topic, every concept must be grounded in how it actually shows up in practice.
**Reason:** Most cybersecurity training is passive, abstract, and disconnected from real job experience. People finish courses knowing framework names but unable to apply them. CyberPivot exists to fix this. If we cannot answer all three questions for a concept, we do not have the content ready to publish yet.
**Date:** June 2026

---

## No Name Collection in Onboarding

**Decision:** Do not ask for the user's name during onboarding.
**Reason:** Adds friction before the user has seen any value. The platform earns that information. On account creation via Supabase Auth the name is collected naturally.
**Date:** June 2026

---

## Account Creation — Not Blocking

**Decision:** Account creation is soft and non-blocking throughout onboarding. Guest state saved to localStorage. Users can explore before committing.
**Reason:** Forcing account creation before showing value kills conversion. People should be able to go through onboarding, see their recommendation, see their cabinet preview, and decide if this platform is worth their time before being asked to sign up.
**Date:** June 2026

---

## Auth — Google, GitHub, Email

**Decision:** Sign in with Google, sign in with GitHub, continue with email. No other providers at V1.
**Reason:** Google covers the broadest audience. GitHub is right for this platform — everyone interested in cybersecurity and open source has a GitHub account. Email covers people who prefer not to use SSO. Three options is enough.
**Date:** June 2026

---

## M365 Security Placement

**Decision:** M365 Security lives as a specialist module set inside the Azure Security Engineer path, not as a standalone role path.
**Reason:** M365 security sits on top of Azure and Entra ID. It belongs with the Azure path. Could eventually become its own specialist path but V1 treats it as specialist modules within Azure.
**Date:** June 2026

---

## Database Activity Monitoring Placement

**Decision:** DAM lives as a specialist module appearing inside Cloud Security, AppSec, and GRC paths.
**Reason:** Database security is relevant to multiple roles but is not a standalone career path. One specialist module, three paths.
**Date:** June 2026

---

## PAM and CyberArk Placement

**Decision:** PAM lives primarily in the Identity Security Engineer path as a core skill. Also appears as a specialist module in Azure Security Engineer and GRC Analyst paths.
**Reason:** Identity Security Engineer is the role where PAM is the job. Azure Security Engineer needs PIM specifically. GRC Analyst needs PAM as a governance control.
**Date:** June 2026

---

## Physical Security Inclusion

**Decision:** Physical security included as a specialist module.
**Reason:** Physical penetration testing is a real engagement type. ISO 27001 includes physical security controls. Social engineering attacks are often physical. Leaving it out creates a gap.
**Date:** June 2026

---

## OT/ICS/SCADA Inclusion

**Decision:** OT/ICS security included as a specialist module, not a full role path at V1.
**Reason:** Critical infrastructure security is a real and growing discipline with significantly different skills from IT security. V1 covers it as a specialist module. Full OT path is V2.
**Date:** June 2026

---

## Compliance Frameworks Coverage

**Decision:** GRC path covers GDPR, UK GDPR, NDPR, HIPAA, SOX, PCI-DSS 4.0, ISO 27001:2022, NIST CSF 2.0, SOC 2, CIS Controls, Cyber Essentials, NIS2, COBIT 2019, COSO ERM, DORA, CBN Cybersecurity Framework, NCSC CAF, FedRAMP, EU AI Act. Each as a module or specialist module.
**Reason:** A GRC analyst encounters multiple frameworks simultaneously depending on their industry and geography. The platform needs to cover all of them to be genuinely job-ready content.
**Date:** June 2026

---

## Regulatory Bodies Coverage

**Decision:** Regulatory bodies explicitly covered in the Introduction section and GRC path.
Includes: ICO (UK GDPR), FCA/PRA (UK financial services), SEC (US securities), CMS (US healthcare/HIPAA), CISA (US critical infrastructure), NDPC (Nigeria data protection), CBN (Nigeria banking), NCC (Nigeria telecoms), NCSC (UK national cyber security).
**Reason:** Most practitioners know frameworks exist but do not understand who enforces them. Understanding regulatory bodies is essential GRC knowledge.
**Date:** June 2026

---

## Nigeria/Africa Salary Specificity

**Decision:** Use "Nigeria" not "Africa" for the Nigerian salary row. Other African markets added separately when verified data is available.
**Reason:** Africa is not a salary market. It is a continent of 54 countries with wildly different economies. Nigeria figures are verified for the Nigerian market. South Africa and Kenya will be added as separate rows with their own verified data.
**Date:** June 2026

---

## Salary Data — Verified 2025/2026

**Decision:** Use only these verified salary figures on all role pages. Do not estimate or use training data for salary information. Update this log when new verified data is available.

All figures are annual base salary before tax unless marked as monthly. Nigeria figures are monthly.
Sources: HADESS Cybersecurity Salary Guide 2026, Optima Europe Cybersecurity Benchmarks 2026, Indeed UK May 2026.

Add this note under every salary table on every role page:
"UK, US, and EU figures are annual base salary before tax and benefits. Nigeria figures are monthly. Remote roles for international employers often pay at UK or EU rates regardless of location. Banking, fintech, and telecoms pay at the top end of every range."

**SOC Analyst:**
- UK: Entry £32k–£45k / Mid £45k–£65k / Senior £65k–£92k
- US: Entry $55k–$75k / Mid $75k–$100k / Senior $100k–$145k
- EU: Entry €35k–€55k / Mid €55k–€85k / Senior €80k–€120k+
- Nigeria (monthly): Entry ₦150k–₦300k / Mid ₦350k–₦700k / Senior ₦800k–₦1.5m+

**Penetration Tester:**
- UK: Entry £35k–£50k / Mid £55k–£80k / Senior £80k–£120k+
- US: Entry $75k–$100k / Mid $100k–$130k / Senior $130k–$170k+
- EU: Entry €38k–€55k / Mid €55k–€85k / Senior €85k–€120k+
- Nigeria (monthly): Entry ₦200k–₦400k / Mid ₦500k–₦900k / Senior ₦1m–₦2m+

**Azure Security Engineer:**
- UK: Entry £40k–£58k / Mid £58k–£85k / Senior £85k–£130k+
- US: Entry $90k–$115k / Mid $115k–$150k / Senior $150k–$200k+
- EU: Entry €52k–€72k / Mid €72k–€100k / Senior €100k–€138k+
- Nigeria (monthly): Entry ₦250k–₦500k / Mid ₦600k–₦1.2m / Senior ₦1.2m–₦2.5m+

**GRC Analyst:**
- UK: Entry £28k–£40k / Mid £40k–£60k / Senior £60k–£85k+
- US: Entry $55k–$75k / Mid $75k–$105k / Senior $105k–$140k+
- EU: Entry €32k–€48k / Mid €48k–€70k / Senior €70k–€100k+
- Nigeria (monthly): Entry ₦150k–₦300k / Mid ₦350k–₦700k / Senior ₦800k–₦1.5m+

**AppSec Engineer:**
- UK: Entry £40k–£58k / Mid £58k–£85k / Senior £85k–£145k+
- US: Entry $85k–$110k / Mid $110k–$150k / Senior $145k–$190k+
- EU: Entry €45k–€65k / Mid €65k–€95k / Senior €95k–€140k+
- Nigeria (monthly): Entry ₦250k–₦450k / Mid ₦500k–₦1m / Senior ₦1m–₦2m+

**API Security Engineer:**
- UK: Entry £38k–£55k / Mid £55k–£80k / Senior £80k–£130k+
- US: Entry $80k–$105k / Mid $105k–$140k / Senior $140k–$180k+
- EU: Entry €42k–€62k / Mid €62k–€90k / Senior €90k–€130k+
- Nigeria (monthly): Entry ₦200k–₦400k / Mid ₦450k–₦900k / Senior ₦900k–₦1.8m+

**Date:** June 2026

---

## Role Page Structure — Enriched Standard

**Decision:** Every role page must include all of the following sections in this order:
1. Domain and role name, level
2. What you actually do — day to day reality, honest
3. A day in the life — granular, what tools you open first, what handover looks like
4. Background that fits — prerequisites explicit, links to Foundation modules needed
5. Common misconceptions — what people get wrong about this role
6. What the labs look like — hands-on projects listed explicitly, what you install, configure, break, fix
7. Lab environment requirements — minimum specs, what gets installed, setup time, OS support
8. Regulations and standards you will work with — real context not definitions, why each matters for this role
9. A typical week — specific, day by day
10. Salary ranges — verified figures from DECISIONS.md, all regions including Nigeria (monthly)
11. Industries that hire
12. Tools on the job — free/open source and enterprise both listed
13. Top 5 interview questions — role-specific with context on good answers
14. Certs that actually matter — honest, order to do them, cost, free study resources
15. Where this role leads — career progression ladder
16. Related roles — when to consider them instead of or after this role
17. Community and resources — real communities, not generic links
18. Module list — available and coming soon
19. Cabinet artifacts — with why each one matters
20. Start this path CTA
**Reason:** The original role pages covered basics but missed sections that make someone feel truly informed. Every role page should feel like it was written by someone who has done the job and is being straight with you.
**Date:** June 2026

---

## Module Content Structure — Confirmed

**Decision:** Every module follows this exact structure:
1. Scenario — a real world situation using a real incident, not a hypothetical organisation
2. Concept — concise plain language explanation. The why before the what.
3. Free tool hands-on — actual lab work. Install it, use it, build something real.
4. Enterprise equivalent — what the job version looks like. Trial link where available.
5. Cabinet artifact — something tangible produced by completing the module.
**Reason:** This structure ensures every module produces real skill and a real output, not just knowledge.
**Date:** June 2026

---

## Writing Style — Universal Application

**Decision:** The writing voice defined in CLAUDE.md applies to every single piece of text on the platform without exception.
**Reason:** Inconsistent voice breaks trust. The voice must be consistent throughout or the platform feels assembled from parts rather than built with intention.
**Date:** June 2026

---

## CISSP Coverage Gap Analysis — Content Checklist

**Decision:** The following topics identified from CISSP CBK domains must be covered in CyberPivot content. Each must follow the content standard — real world relevance, job context, hands-on exercise. Every topic maps to a specific path or specialist module.

Each topic entry follows this format: Topic | Where it lives | Real world example | Hands-on exercise | Cabinet artifact

**Domain 1 — Security and Risk Management gaps:**

Personnel Security | GRC path + Foundation
- Real world: The 2013 Target breach started with credentials stolen from a poorly vetted HVAC contractor. Third party personnel with weak vetting became the entry point into a network holding 40 million card records.
- Job context: Reviewing contractor access requests, enforcing separation of duties, managing offboarding checklists, running access reviews.
- Hands-on: Build a joiners, movers, leavers process for a simulated organisation. Create an access review template. Simulate an offboarding and identify what breaks if steps are skipped.
- Cabinet artifact: Personnel security procedure pack.

Security Ethics | Introduction section + GRC path
- Real world: A security researcher discovered a critical vulnerability in hospital patient monitoring equipment. His decision to disclose responsibly vs sell it affected patient safety. Security professionals have access to systems and data that could cause serious harm.
- Job context: Finding out-of-scope vulnerabilities, discovering illegal activity during forensic work, being pressured to sign off on insecure systems.
- Hands-on: Work through ethical dilemma scenarios drawn from real cases. Apply (ISC)² Code of Ethics. Document reasoning for each decision.
- Cabinet artifact: Ethics case study analysis with documented reasoning.

Security Awareness Programme Design | GRC path
- Real world: Multiple Twitter employees fell for pretexting calls in the 2020 Twitter breach. Knowing phishing exists is different from pausing before clicking. Training must change behaviour, not just knowledge.
- Job context: Planning phishing simulations, building training calendars, targeting high-risk groups like finance and HR, reporting behaviour metrics to the board.
- Hands-on: Design a 12-month security awareness programme for a simulated 500-person organisation. Run a simulated phishing campaign using GoPhish (free and open source).
- Cabinet artifact: Security awareness programme design document and GoPhish phishing simulation results.

Third Party Governance | GRC path + Cloud path
- Real world: The SolarWinds attack compromised thousands of organisations through a trusted software update mechanism. The attacker was a trusted third party.
- Job context: Assessing software vendors, reviewing cloud provider security posture, managing supply chain risk registers.
- Hands-on: Complete a third party risk assessment for a simulated software vendor. Map supply chain dependencies. Identify single points of failure.
- Cabinet artifact: Third party risk assessment and supply chain risk register.

**Domain 2 — Asset Security gaps:**

Data Lifecycle Management and Secure Destruction | GRC path + Cloud path
- Real world: In 2019 Morgan Stanley was fined $60 million after decommissioned data centre equipment containing unencrypted customer data was sold at auction. They thought the data was gone. It was not.
- Job context: Specifying destruction methods for decommissioned hardware, producing certificates of destruction, documenting data retention schedules.
- Hands-on: Use DBAN or similar to perform a secure wipe. Document the process against NIST 800-88 guidelines. Write a data destruction policy and certificate of destruction template.
- Cabinet artifact: Data destruction procedure and completed certificate template.

Data Ownership Models | GRC path
- Real world: After a breach at a US retailer, a dispute arose over who was responsible for customer data — the retailer or the payment processor. Unclear data ownership meant unclear accountability.
- Job context: Assigning data owner, custodian, and user roles in a data register. Ensuring owners understand their responsibilities.
- Hands-on: Map data ownership roles for a simulated organisation. Create a data inventory with owner, custodian, and classification assigned to each dataset.
- Cabinet artifact: Data ownership and classification register.

**Domain 3 — Security Architecture and Engineering gaps:**

Access Control Models — DAC, MAC, RBAC, ABAC | Foundation layer + Identity path
- Real world: In 2020 a Twitter employee with excessive access (DAC failure) was social engineered into resetting high-profile account passwords. Obama, Biden, Musk and Apple accounts compromised simultaneously. A proper RBAC model with least privilege would have limited the blast radius.
- Job context: Reviewing Azure AD roles and finding three users with Global Administrator. Understanding why and recommending a move to PIM with JIT access.
- Hands-on: Configure RBAC in Azure AD for a simulated organisation. Create custom roles with scoped permissions. Document the access control model decision and why you chose RBAC over alternatives.
- Cabinet artifact: Access control model decision document with role matrix.

Common Criteria and FIPS 140-3 | GRC path + Cloud path
- Real world: A UK government department procured a VPN solution that claimed to be "military grade encrypted." The procurement team had no way to verify this claim. Common Criteria evaluation would have provided independent assurance.
- Job context: Evaluating security product claims during procurement. Understanding what EAL levels mean. Knowing which products must be FIPS 140-3 validated for regulated environments.
- Hands-on: Review a Common Criteria evaluation for a real product from the NIAP Product Compliant List. Write a procurement evaluation report using CC findings as evidence.
- Cabinet artifact: Security product procurement evaluation report.

**Domain 4 — Communication and Network Security gaps:**

Secure Protocol Configuration | Network Security path + Foundation
- Real world: In 2021 researchers found that 40% of Fortune 500 companies still supported TLS 1.0 and 1.1, protocols deprecated because of known vulnerabilities. Misconfigured TLS has been the root cause of multiple high-profile breaches.
- Job context: Reviewing web server TLS configuration, enforcing minimum TLS versions through policy, configuring SSH hardening baselines.
- Hands-on: Use testssl.sh (free) to scan a server's TLS configuration. Identify weak ciphers, deprecated protocols, certificate issues. Harden an nginx configuration and rescan to verify.
- Cabinet artifact: TLS configuration audit report before and after hardening.

Voice over IP Security | Network Security path
- Real world: Toll fraud — where attackers compromise VoIP systems and make expensive international calls — costs organisations billions annually. A UK SME had a £20,000 phone bill in one weekend after their VoIP system was compromised.
- Job context: Reviewing VoIP system configuration, implementing call restrictions, monitoring for anomalous call patterns.
- Hands-on: Configure a free Asterisk VoIP server. Identify default configuration weaknesses. Apply hardening controls and document the changes.
- Cabinet artifact: VoIP security configuration hardening guide.

**Domain 5 — Identity and Access Management gaps:**

Federated Identity — SAML, OIDC, WS-Federation | Identity Security path + AppSec path
- Real world: In 2021 attackers exploited a SAML vulnerability in Solarwinds Orion to forge authentication tokens and access victim systems without valid credentials. Understanding how federated identity works is understanding how it fails.
- Job context: Configuring SSO for a SaaS application, reviewing SAML assertions for security issues, implementing OIDC for an API, troubleshooting federation trust issues.
- Hands-on: Configure SAML SSO between a test application and Entra ID. Inspect SAML assertions using browser developer tools. Identify what an attacker would look for in a SAML response.
- Cabinet artifact: Federated identity implementation guide and security review.

Biometrics | Identity Security path + Foundation
- Real world: In 2019 a security researcher bypassed a fingerprint scanner used to secure a building by lifting a fingerprint from a wine glass and creating a fake finger using glue. Biometrics are not passwords — they cannot be changed when compromised.
- Job context: Evaluating biometric authentication for a physical access system. Understanding FAR, FRR, and CER to make procurement decisions.
- Hands-on: Compare biometric system specifications using FAR, FRR, and CER metrics. Write an evaluation report recommending or rejecting a biometric solution for a simulated use case.
- Cabinet artifact: Biometric system evaluation report.

**Domain 6 — Security Assessment and Testing gaps:**

Audit Strategies — Compliance vs Security Audits vs Penetration Testing | GRC path
- Real world: A major UK retailer passed their annual PCI compliance audit and were breached three weeks later. They were compliant but not secure. Understanding the difference between compliance audits and security assessments is fundamental GRC knowledge.
- Job context: Explaining to a board why passing a compliance audit does not mean you are secure. Commissioning the right type of assessment for the right purpose.
- Hands-on: Given three scenarios, identify whether a compliance audit, security audit, or penetration test is the appropriate assessment. Write the scoping document for each.
- Cabinet artifact: Assessment strategy document explaining when to use each type of evaluation.

Misuse Case Testing | AppSec path
- Real world: The Equifax breach exploited a known vulnerability in Apache Struts that had a patch available for months. No one had tested what happened when the patch was not applied. Misuse cases test what happens when things go wrong, not just when they go right.
- Job context: Working with developers to write abuse cases alongside use cases during sprint planning. Identifying how features could be abused by malicious users.
- Hands-on: Take a set of user stories for a simulated e-commerce checkout feature. Write corresponding abuse cases. Add security acceptance criteria to prevent each abuse case.
- Cabinet artifact: Abuse case library for a simulated application feature set.

**Domain 7 — Security Operations gaps:**

Evidence Handling and Chain of Custody | DFIR specialist module + SOC path
- Real world: A UK criminal prosecution for fraud involving stolen data was thrown out because digital evidence had been handled incorrectly — the chain of custody was broken and the defence argued the evidence could have been tampered with.
- Job context: Responding to a suspected insider threat. Photographing the screen, documenting system state, creating a forensic image using write blockers, hashing the image, starting an evidence log that every person who touches the evidence signs.
- Hands-on: Use FTK Imager or Autopsy to create a forensic image of a virtual machine. Document the chain of custody from acquisition through analysis. Hash the image before and after to demonstrate integrity.
- Cabinet artifact: Completed chain of custody form and forensic acquisition report.

e-Discovery | GRC path + DFIR specialist module
- Real world: When US retailer Zulily was sued following a data breach, they had to produce years of email records, security logs, and incident response documentation in a specific legal format within tight court-imposed deadlines. Organisations that cannot produce this face sanctions.
- Job context: Legal team calls. They need all emails, logs, and security records related to a specific incident from the last 18 months, in a specific format, within 30 days.
- Hands-on: Map a simulated organisation's data holdings. Create a legal hold notice. Document the e-Discovery response process from legal hold through to production. Identify what logs need to be preserved and for how long.
- Cabinet artifact: e-Discovery response playbook and legal hold template.

Business Continuity vs Disaster Recovery | GRC path
- Real world: When ransomware hit Maersk in 2017 they lost almost all global IT systems. BC kept the business operating manually while DR focused on restoring systems. Companies that confuse the two find themselves unable to operate while systems are being restored.
- Job context: Writing a BCP — if systems are down for 72 hours, how does the business keep operating? Writing a DRP — how do we get the systems back? Two different documents, two different audiences, two different timelines.
- Hands-on: Conduct a business impact analysis for a simulated organisation. Write a BCP with manual workarounds for critical processes. Write a separate DRP focused on system restoration. Test both against a ransomware scenario.
- Cabinet artifact: BCP and DRP documents tested against a realistic scenario.

Change Management as a Security Control | GRC path + SOC path
- Real world: The 2021 Facebook outage — six hours, $60 million in lost revenue — was caused by a routine BGP configuration change that bypassed proper testing. Change management exists because untested changes in production cause incidents.
- Job context: A developer wants to push a patch to production on Friday afternoon. Your change management process requires CAB review, test environment validation, rollback plan, and a defined change window. You enforce this even when people push back.
- Hands-on: Design a change management process for a simulated organisation. Create a change request template, a CAB process, and standard vs emergency change classification. Document how it satisfies SOX ITGC requirements.
- Cabinet artifact: Change management policy and change request template.

Configuration Management | Cloud path + SOC path
- Real world: The 2020 SolarWinds attack exploited a build server with weak configuration. Attackers inserted malicious code into a software update because the build environment was not hardened to baseline standards.
- Job context: 200 Windows servers that need to demonstrate to an auditor they all meet the security baseline. Running a compliance scan against the CIS benchmark to produce a compliance percentage and exception list.
- Hands-on: Download the CIS benchmark for Windows Server. Run a compliance scan against a virtual machine using OpenSCAP or CIS-CAT Lite. Document findings, remediate the top 10, rescan to show improvement.
- Cabinet artifact: CIS benchmark compliance report before and after remediation.

Patch and Vulnerability Management Programme Design | GRC path + SOC path
- Real world: The WannaCry ransomware attack in 2017 exploited a vulnerability (MS17-010) for which Microsoft had released a patch two months earlier. 230,000 systems in 150 countries were infected because organisations did not have effective patch management programmes.
- Job context: Building and running a programme, not just running a scanner. Prioritising patches by risk. Managing exceptions. Reporting patch compliance to leadership.
- Hands-on: Design a vulnerability management programme for a simulated organisation. Define SLAs for patching by severity. Create an exception management process. Build a dashboard showing patch compliance status.
- Cabinet artifact: Vulnerability management programme design document with SLAs and exception process.

**Domain 8 — Software Development Security gaps:**

Agile Security | DevSecOps path + AppSec path
- Real world: In 2021 a major UK bank failed a PCI audit partly because Agile development teams were shipping features without security reviews. Security was only involved at the end of sprints when it was too late to make changes without delays.
- Job context: Embedded AppSec engineer in a Scrum team. Every sprint planning session reviewing new user stories and adding security acceptance criteria. Every sprint review checking security requirements were met.
- Hands-on: Take a set of user stories for a simulated e-commerce feature. Add security acceptance criteria to each one. Write abuse cases alongside use cases. Add security gates to a sprint definition of done.
- Cabinet artifact: Security-enhanced user stories and sprint security checklist.

Database Security — Inference Attacks and Polyinstantiation | AppSec path + DAM specialist module
- Real world: In 2014 researchers demonstrated how queries to an anonymised medical database could be combined to re-identify individual patients — an inference attack. The data was "anonymous" but the attack revealed real people's health information.
- Job context: Reviewing database query patterns for inference risks. Implementing database views that restrict what data combinations are accessible. Understanding when polyinstantiation is needed for multi-level security environments.
- Hands-on: Demonstrate an inference attack against a sample anonymised dataset. Implement database views to prevent the attack. Document the design decision.
- Cabinet artifact: Database security design review with inference attack mitigation.

---

## Foundation Modules — Recommended Not Mandatory

**Decision:** Foundation modules are recommended not mandatory. The platform guides users toward the right starting point based on their onboarding entry point but never hard-gates access to role path content.
- Entry A (complete beginner) → strongly recommended to complete all Foundation modules first
- Entry B (IT background) → recommended to complete Security Fundamentals at minimum, self-assess the rest
- Entry C (developer) → recommended Security Fundamentals and Cloud Fundamentals depending on path
- Entry D (already in security) → skip foundations entirely

When someone clicks "Start this path" the platform shows a contextual recommendation — not a wall. Framing is "this will make your role path faster and deeper" not "you must complete this first."
**Reason:** Hard gating patronises people who already have the knowledge. Soft recommendations respect user autonomy while still guiding beginners.
**Date:** June 2026

---

## Future Paid Feature — AI CV Builder

**Decision:** An AI-powered CV builder is a future paid tier feature. Free tier gets role-specific templates and structured guidance. Paid tier gets an LLM that reads cabinet artifacts and writes tailored CV bullet points, cover letters, and LinkedIn summaries.
**Reason:** The cabinet artifacts are structured data about real work the user has done. An LLM can turn that into compelling CV copy. Genuinely valuable and worth paying for. Keeps the core platform free while creating a sustainable revenue stream.
**Date:** June 2026

---

## Career Switcher Reassurance

**Decision:** For non-technical paths (GRC, Compliance, Risk) the role page and recommendation screen must explicitly state that the role does not require coding or deep technical skills.
**Reason:** Career switchers from non-technical backgrounds self-select out of cybersecurity because they assume all roles require coding. GRC roles genuinely do not. Saying this explicitly removes a barrier that should not exist.
**Date:** June 2026

---

## Tech Stack

**Decision:** Next.js 14 + Tailwind + shadcn/ui + Supabase + pnpm
**Reason:** Next.js is best in class for this content platform. Supabase handles auth, database, and realtime. All choices are free or have generous free tiers — aligns with open source ethos.
**Date:** June 2026

---

## Dark Mode First

**Decision:** Dark mode is the primary theme.
**Reason:** Cybersecurity tools are dark mode. Terminals are dark. SIEMs are dark. The platform should feel native to the environment practitioners work in.
**Date:** June 2026

---

## No Ads, No Paywalls, No Premium Tiers (Core Content)

**Decision:** CyberPivot core content is free. No premium tier for learning content. No ads. Paid tier is for AI-powered tools only (CV builder).
**Reason:** The platform exists to help people get into cybersecurity regardless of financial situation. Paywalling content contradicts that mission.
**Date:** June 2026

---

*Add new decisions to this log as they are made. Format: Decision, Reason, Date.*
