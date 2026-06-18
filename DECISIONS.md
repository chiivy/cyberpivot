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

## Content Standard — Second-Person, In-Role Narrative Voice

**Decision:** Content addresses the learner directly and keeps them positioned inside the role throughout, not as a detached observer reading about what someone else does. "You are the AD administrator setting this up," "your colleague in the SOC flags this alert to you," not "the administrator would configure this OU" or "a SOC analyst might investigate this." This applies through the entire body of a module, including hands-on lab instructions, not just the opening scenario.

This is already present in how Foundation Modules 1 and 2 open ("you join a SOC as a junior analyst") and must be carried consistently through every section of every module, and into role path content as it is written, not just the opening hook.
**Reason:** Keeping the learner inside the scenario as an active participant rather than an outside observer makes the material stick, mirrors how the job actually feels, and is consistent with the platform's whole premise that learners should be doing real work, not reading about real work secondhand.
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

**Incident Responder:**
- UK: Entry £40k–£55k / Mid £55k–£75k / Senior £75k–£110k+
- US: Entry $70k–$90k / Mid $90k–$120k / Senior $120k–$160k+
- EU: Entry €42k–€60k / Mid €60k–€90k / Senior €90k–€130k+
- Nigeria (monthly): Entry ₦200k–₦400k / Mid ₦500k–₦900k / Senior ₦900k–₦1.8m+

**Threat Hunter:**
- UK: Entry £50k–£65k / Mid £65k–£85k / Senior £85k–£120k+
- US: Entry $85k–$110k / Mid $110k–$155k / Senior $155k–$215k+
- EU: Entry €55k–€70k / Mid €70k–€100k / Senior €100k–€140k+
- Nigeria (monthly): Entry ₦300k–₦600k / Mid ₦700k–₦1.2m / Senior ₦1.2m–₦2.5m+

**EDR Analyst:**
- UK: Entry £32k–£48k / Mid £48k–£68k / Senior £68k–£95k+
- US: Entry $60k–$80k / Mid $80k–$110k / Senior $110k–$145k+
- EU: Entry €38k–€55k / Mid €55k–€80k / Senior €80k–€115k+
- Nigeria (monthly): Entry ₦175k–₦350k / Mid ₦400k–₦750k / Senior ₦850k–₦1.6m+

**Red Teamer:**
- UK: Entry £45k–£65k / Mid £65k–£90k / Senior £90k–£140k+
- US: Entry $85k–$110k / Mid $110k–$150k / Senior $150k–$200k+
- EU: Entry €48k–€68k / Mid €68k–€95k / Senior €95k–€140k+
- Nigeria (monthly): Entry ₦250k–₦500k / Mid ₦600k–₦1.1m / Senior ₦1.2m–₦2.2m+

**Vulnerability Assessment Analyst:**
- UK: Entry £28k–£42k / Mid £42k–£60k / Senior £60k–£85k+
- US: Entry $55k–$75k / Mid $75k–$105k / Senior $105k–$135k+
- EU: Entry €35k–€50k / Mid €50k–€75k / Senior €75k–€105k+
- Nigeria (monthly): Entry ₦150k–₦300k / Mid ₦350k–₦650k / Senior ₦750k–₦1.4m+

**Bug Bounty Hunter:**
- Not a traditional salaried role. Earnings are programme-dependent.
- Top hunters earn $100k–$500k+ annually from programmes
- Entry level realistic expectation: $5k–$20k supplemental income while building skills
- Display as a note on the role page rather than a standard salary table

**DevSecOps Engineer:**
- UK: Entry £42k–£60k / Mid £60k–£85k / Senior £85k–£130k+
- US: Entry $90k–$115k / Mid $115k–$155k / Senior $155k–$210k+
- EU: Entry €48k–€68k / Mid €68k–€98k / Senior €98k–€140k+
- Nigeria (monthly): Entry ₦250k–₦500k / Mid ₦600k–₦1.1m / Senior ₦1.2m–₦2.2m+

**AI Security Engineer:**
- UK: Entry £45k–£65k / Mid £65k–£95k / Senior £95k–£150k+
- US: Entry $95k–$125k / Mid $125k–$170k / Senior $170k–$250k+
- EU: Entry €52k–€75k / Mid €75k–€110k / Senior €110k–€160k+
- Nigeria (monthly): Entry ₦300k–₦600k / Mid ₦700k–₦1.3m / Senior ₦1.4m–₦2.8m+

**AWS Security Engineer:**
- UK: Entry £42k–£60k / Mid £60k–£88k / Senior £88k–£135k+
- US: Entry $90k–$120k / Mid $120k–$160k / Senior $160k–$210k+
- EU: Entry €52k–€72k / Mid €72k–€102k / Senior €102k–€145k+
- Nigeria (monthly): Entry ₦270k–₦540k / Mid ₦650k–₦1.3m / Senior ₦1.3m–₦2.6m+

**GCP Security Engineer:**
- Same as AWS Security Engineer — comparable market rates

**Network Security Engineer:**
- UK: Entry £35k–£52k / Mid £52k–£75k / Senior £75k–£110k+
- US: Entry $75k–$100k / Mid $100k–$135k / Senior $135k–$175k+
- EU: Entry €42k–€60k / Mid €60k–€88k / Senior €88k–€125k+
- Nigeria (monthly): Entry ₦200k–₦400k / Mid ₦500k–₦950k / Senior ₦1m–₦2m+

**Identity Security Engineer:**
- UK: Entry £40k–£58k / Mid £58k–£82k / Senior £82k–£125k+
- US: Entry $85k–$110k / Mid $110k–$148k / Senior $148k–$195k+
- EU: Entry €48k–€68k / Mid €68k–€98k / Senior €98k–€138k+
- Nigeria (monthly): Entry ₦250k–₦480k / Mid ₦580k–₦1.1m / Senior ₦1.2m–₦2.3m+

**Email Security Engineer:**
- UK: Entry £32k–£48k / Mid £48k–£68k / Senior £68k–£95k+
- US: Entry $65k–$85k / Mid $85k–$115k / Senior $115k–$150k+
- EU: Entry €38k–€55k / Mid €55k–€80k / Senior €80k–€115k+
- Nigeria (monthly): Entry ₦175k–₦350k / Mid ₦400k–₦750k / Senior ₦850k–₦1.5m+

**Compliance Analyst:**
- UK: Entry £28k–£40k / Mid £40k–£58k / Senior £58k–£80k+
- US: Entry $52k–$70k / Mid $70k–$95k / Senior $95k–$130k+
- EU: Entry €30k–€45k / Mid €45k–€65k / Senior €65k–€92k+
- Nigeria (monthly): Entry ₦150k–₦280k / Mid ₦320k–₦620k / Senior ₦700k–₦1.3m+

**Risk Analyst:**
- UK: Entry £30k–£45k / Mid £45k–£65k / Senior £65k–£90k+
- US: Entry $55k–$75k / Mid $75k–$105k / Senior $105k–$140k+
- EU: Entry €32k–€48k / Mid €48k–€70k / Senior €70k–€100k+
- Nigeria (monthly): Entry ₦150k–₦300k / Mid ₦350k–₦680k / Senior ₦750k–₦1.4m+

**Security Auditor:**
- UK: Entry £32k–£48k / Mid £48k–£70k / Senior £70k–£100k+
- US: Entry $58k–$78k / Mid $78k–$108k / Senior $108k–$145k+
- EU: Entry €35k–€52k / Mid €52k–€75k / Senior €75k–€108k+
- Nigeria (monthly): Entry ₦160k–₦320k / Mid ₦370k–₦700k / Senior ₦800k–₦1.5m+

**vCISO:**
- UK: £90k–£180k+ (fractional/consulting, day rates vary widely)
- US: $120k–$300k+ (fractional engagements often $200–$400/hour)
- EU: €90k–€180k+
- Nigeria (monthly): ₦800k–₦3m+ (fractional, consulting)
- Note: vCISO is almost always a senior consulting role. Display a note explaining day rates and fractional engagement model rather than standard entry/mid/senior salary bands.

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

## Recurring Fictional Company for Lab Scenarios

**Decision:** Foundation Module 3 (Windows and Active Directory) introduces a single, durable fictional company used as the lab environment, and this same company is referenced and built upon in later Foundation modules and role path modules wherever a consistent organizational scenario is useful, rather than inventing a new unrelated fictional company every time.

The company is a fictional bank or fintech, deliberately international/neutral rather than tied to one specific country, with two or three branch locations spread across different recognizable cities rather than clustered in one place, modeled with realistic departments (IT, Finance, Customer Service, HR) represented as OUs and security groups. The exact name, locations, and structure are finalized in the Module 3 draft itself.

Examples and scenario details used across modules more broadly should also rotate naturally across different recognizable cities and countries over time, rather than defaulting to any single country, so the platform reads as broadly relatable to a global audience even though it is built from Lagos.
**Reason:** A consistent, realistic fictional company gives learners continuity across modules, lets later content build on familiar structure instead of reintroducing a new scenario every time, and a bank/fintech context naturally justifies the kind of multi-branch, multi-department complexity that makes an AD lab feel like a real organization. Keeping it internationally neutral and varying example locations supports the platform's global audience rather than over-indexing on any single market.
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

---

## AI Security Engineer — Expanded Scope and Module List

**Decision:** AI Security Engineer is a deep specialist role covering offensive AI security, defensive AI security, MCP security, RAG security, LLM application security, AI governance, and AI incident response. The full module list is:

1. AI Fundamentals for Security — LLM architecture, tokenization, inference, attack surface mapping, MITRE ATLAS introduction. No prior AI experience required.
2. OWASP LLM Top 10 — all 10 vulnerabilities exploited hands-on: prompt injection, insecure output handling, training data poisoning, model denial of service, sensitive information disclosure, excessive agency, system prompt leakage, vector and embedding weaknesses, misinformation, model theft.
3. Prompt Injection in Depth — direct injection, indirect injection, tokenization bypasses, multi-turn injection chains, defence techniques, detection strategies. References SEC411 and OWASP LLM01.
4. RAG System Security — vector database poisoning, retrieval manipulation, indirect prompt injection via poisoned documents, unauthorised data access through retrieval, context window attacks.
5. Training Pipeline Security — data poisoning, model manipulation, supply chain attacks on AI, fine-tuning risks, model cards and provenance.
6. Agentic AI and MCP Security — agent permissions, tool validation, MCP trust boundaries, tool poisoning, reasoning model attacks, chain-of-thought manipulation, human oversight mechanisms, excessive agency prevention.
7. Tokenization Security — tokenization vulnerabilities across model families, tokenization bypass techniques, exploitation at the tokenization level to bypass security controls.
8. AI Monitoring and SOC Integration — detection rules for AI attacks, SIEM integration for LLM behaviour monitoring, anomaly detection, incident indicators for AI systems.
9. Secure AI Deployment — deployment architecture, API security for LLM services, authentication and authorisation patterns, rate limiting, network segmentation for AI workloads, inference environment hardening.
10. AI Incident Response — IR playbook for AI-specific incidents, evidence preservation for AI systems, containment strategies, recovery, post-incident review.
11. AI Governance and Compliance — NIST AI RMF, EU AI Act risk classification, ISO 42001, responsible AI policy, bias auditing, model documentation requirements.
12. AI Security Capstone — full red team assessment of a simulated LLM-powered application end to end, report produced.

Cabinet artifacts (12):
- OWASP LLM Top 10 exploitation lab report
- Prompt injection payload library with documented bypasses and defences
- Tokenization vulnerability research notes
- RAG system security assessment — poisoning and retrieval manipulation demonstrated
- Training pipeline threat model
- MCP security assessment — tool permissions, trust boundaries, agent control documented
- Agentic AI red team report — jailbreaks, guardrail bypasses, reasoning manipulation
- AI security monitoring runbook — detection rules, SIEM integration, alert triage
- AI incident response playbook — containment, evidence preservation, recovery steps
- AI governance policy suite — responsible AI use policy, risk assessment process, EU AI Act compliance
- ISO 42001 gap analysis — AI management system requirements assessed
- Secure AI deployment architecture diagram — annotated with security controls

Reference: SANS SEC411, OWASP LLM Top 10 2024, MITRE ATLAS, NIST AI RMF
**Date:** June 2026

---

## SOC Analyst — Comprehensive Module List

**Decision:** SOC Analyst path covers all topics from SANS SEC450 (Blue Team Fundamentals), SEC504 (Incident Handling), and SEC555 (Detection Engineering). Module list:

1. SOC Fundamentals — how a SOC works, tiers, shift operations, alert lifecycle, SOC tools ecosystem, SOAR introduction, alert fatigue and how to manage it.
2. Security Data Collection — endpoint telemetry (EDR), network sensors, cloud logs, SIEM ingestion, log normalisation, data quality.
3. SIEM Fundamentals — Wazuh deployment, log ingestion, dashboards, search and correlation. Enterprise: Splunk, Microsoft Sentinel, IBM QRadar.
4. Detection Engineering — writing detection rules, Sigma rules, KQL, SPL basics, MITRE ATT&CK mapping, detection tuning, false positive reduction.
5. Alert Triage and Analysis — triage methodology, cognitive bias in analysis, separating commodity attacks from advanced threats, escalation decisions, documentation.
6. Log Analysis and Investigation — Windows event logs, Linux auth logs, network logs, web access logs, DNS logs, building investigation timelines.
7. Incident Response — IR lifecycle, containment decisions, eradication, recovery, post-incident review, IR playbook development.
8. Threat Hunting — hypothesis-driven hunting, MITRE ATT&CK as a hunting framework, proactive hunting techniques, KQL/Sigma hunting queries, hunt documentation.
9. Email Threat Analysis — email header analysis, phishing indicators, URL detonation, sandbox analysis, BEC patterns, reporting workflow.
10. Endpoint Triage — Windows and Linux triage methodology, volatile data collection, live response techniques, EDR investigation, memory acquisition basics.
11. Malware Analysis Introduction — static analysis, dynamic analysis, sandbox tools, IOC extraction, threat actor attribution basics.
12. SOC Automation — SOAR concepts, playbook design, automation opportunities, Python scripting for SOC tasks.
13. SOC Capstone — 48-hour simulated incident investigation from initial alert through to full IR report.

Cabinet artifacts (8 core + capstone):
- Wazuh SIEM deployment with documented configuration
- Custom detection rules — 10+ rules with MITRE ATT&CK mapping
- Incident investigation report — full timeline, evidence chain, root cause, lessons learned
- MITRE ATT&CK mapped threat hunting report
- Phishing investigation report — header analysis, sandbox results, containment documented
- IOC enrichment report — VirusTotal, AbuseIPDB, WHOIS enriched
- Alert triage log — 20 alerts with documented decisions
- Linux and Windows triage checklists
- SOC Capstone report — full investigation from alert to closure

Reference: SANS SEC450, SEC504, SEC555, BTL1 curriculum, MITRE ATT&CK
**Date:** June 2026

---

## Penetration Tester — Comprehensive Module List

**Decision:** Penetration Tester path covers all topics from SANS SEC560 (Enterprise Penetration Testing), OffSec PWK/OSCP curriculum, and eJPT. Module list:

1. Penetration Testing Methodology — engagement types, scoping, rules of engagement, legal framework (CMA, CFAA, Nigerian Cybercrime Act), reporting structure, PTES and OSSTMM frameworks.
2. Passive Reconnaissance — OSINT techniques, Google dorking, Shodan, Maltego, WHOIS, certificate transparency, LinkedIn OSINT, breach data analysis.
3. Active Reconnaissance — DNS enumeration, subdomain discovery, network scanning, service fingerprinting, technology identification.
4. Scanning and Enumeration — nmap in depth, service enumeration, SMB enumeration, SNMP enumeration, web directory enumeration, Gobuster, ffuf.
5. Vulnerability Assessment — OpenVAS, Nessus (trial), vulnerability analysis, CVSS scoring, false positive identification, prioritisation by exploitability and impact.
6. Exploitation Fundamentals — Metasploit framework, manual exploitation concepts, payload types, staged vs stageless, antivirus evasion basics.
7. Web Application Penetration Testing — OWASP Top 10 2025 hands-on, Burp Suite in depth, SQL injection, XSS, IDOR, SSRF, authentication bypass, business logic flaws.
8. Active Directory Attacks — Kerberoasting, AS-REP roasting, Pass the Hash, Pass the Ticket, BloodHound, ADCS exploitation, domain privilege escalation.
9. Post-Exploitation — privilege escalation (Windows and Linux), persistence mechanisms, lateral movement, credential dumping, data exfiltration simulation.
10. Cloud Penetration Testing — Azure/AWS misconfigurations, cloud-specific attack paths, IAM privilege escalation in cloud, storage bucket exposure.
11. Social Engineering — pretexting, phishing campaign design, vishing concepts, physical security testing introduction.
12. Penetration Test Reporting — executive summary writing, technical finding documentation, CVSS scoring, evidence standards, remediation recommendations, client communication.
13. Penetration Testing Capstone — full black box engagement on a simulated target environment, complete professional report produced.

Cabinet artifacts (8):
- Configured Kali Linux environment with custom toolset
- Reconnaissance report — passive and active recon findings
- Vulnerability assessment report — CVSS scored and prioritised
- Professional penetration test report — executive summary, technical findings, remediation
- Burp Suite project — documented findings with request/response evidence
- Custom nmap scripts for service enumeration
- Exploitation notes — privilege escalation path documented end to end
- Post-exploitation report — access simulation and persistence mechanisms documented

Reference: SANS SEC560, OffSec PWK/OSCP, eJPT curriculum, PTES, OWASP Top 10 2025
**Date:** June 2026

---

## Azure Security Engineer — Comprehensive Module List

**Decision:** Azure Security Engineer path covers Microsoft SC-200, AZ-500, and SC-300 exam domains plus practical cloud security operations. Module list:

1. Azure Fundamentals for Security — resource hierarchy, management groups, subscriptions, resource groups, shared responsibility model, Azure trust model.
2. Identity and Access Management — Entra ID architecture, users, groups, roles, MFA configuration, Conditional Access policies, break-glass accounts, hybrid identity.
3. Privileged Identity Management — PIM setup, JIT access, role activation, approval workflows, access reviews, audit logs.
4. Network Security in Azure — VNets, subnets, NSGs, Azure Firewall, Private Endpoints, VNet peering, DDoS protection, hub-spoke topology.
5. Microsoft Defender for Cloud — Secure Score, recommendations, workload protections, regulatory compliance dashboard, alert investigation.
6. Microsoft Sentinel — workspace setup, data connectors, KQL fundamentals, analytics rules, incidents, playbooks, UEBA, threat intelligence integration.
7. Microsoft Defender for Endpoint — onboarding, alert investigation, live response, threat and vulnerability management, attack surface reduction rules.
8. Microsoft 365 Security — Defender for Office 365, anti-phishing, safe links, safe attachments, Purview, DLP, sensitivity labels, Defender for Cloud Apps.
9. Compliance and Governance — Azure Policy, management group policy, regulatory compliance dashboard, CIS benchmark, NIST 800-53 mapping, Blueprints.
10. Cloud Incident Response — detection via Sentinel, investigation playbook, containment for identity compromise and data exfiltration, evidence preservation in Azure.
11. Azure Security Architecture — threat modelling for Azure workloads, STRIDE analysis, security architecture patterns, landing zone security.
12. Azure Security Capstone — full security assessment of a simulated Azure environment, Secure Score improvement documented, IR simulation run.

Cabinet artifacts (8):
- Configured Entra ID tenant — MFA, Conditional Access, PIM documented
- Microsoft Sentinel workspace — 5+ connectors, 10+ KQL rules, ATT&CK coverage map
- Defender for Cloud Secure Score improvement report — before and after
- Azure network security architecture diagram
- Cloud incident response runbook
- Regulatory compliance report — CIS Azure Benchmark or NIST 800-53 posture
- Azure workload threat model — STRIDE analysis, mitigations mapped
- M365 security configuration baseline — documented and verified

Reference: Microsoft SC-200, AZ-500, SC-300 exam domains, CIS Azure Benchmark, NIST 800-53
**Date:** June 2026

---

## GRC Analyst — Comprehensive Module List

**Decision:** GRC Analyst path covers ISACA CISM/CRISC domains, ISO 27001 Lead Implementer curriculum, and CompTIA Security+ governance content. Module list:

1. GRC Fundamentals — what GRC is, how it fits the business, governance vs risk vs compliance, security programme structure, GRC tools.
2. Information Security Risk Management — risk identification, qualitative vs quantitative risk assessment, risk scoring, risk registers, treatment options, risk appetite, risk reporting to leadership.
3. Security Frameworks Overview — NIST CSF 2.0, ISO 27001:2022, CIS Controls v8, COBIT 2019, COSO ERM — purpose, scope, and when to use each.
4. ISO 27001 Implementation — ISMS scope, context of organisation, leadership requirements, risk treatment, Annex A controls, Statement of Applicability, internal audit, management review.
5. Regulatory Compliance — GDPR, UK GDPR, NDPR, HIPAA, SOX, PCI-DSS 4.0, NIS2, DORA, Cyber Essentials, CBN Cybersecurity Framework. Regulatory landscape mapping by geography and industry.
6. Policy and Procedure Development — information security policy suite, policy writing standards, AUP, BYOD, incident response policy, data classification policy, password policy.
7. Security Control Assessment — control design vs operating effectiveness, control testing methods, evidence collection and documentation, control deficiency reporting.
8. Audit Management — internal audit planning and execution, audit evidence standards, gap analysis methodology, finding classification, management response, audit reporting.
9. Vendor and Third Party Risk — vendor tiering, risk questionnaires, contract security requirements, ongoing monitoring, supply chain risk.
10. Business Continuity and Disaster Recovery — BIA methodology, RTO and RPO, BCP development, DRP development, testing and exercising, lessons learned.
11. Data Protection and Privacy — data lifecycle management, data classification, data subject rights, Article 30 records, DPIA methodology, breach notification procedures.
12. Security Awareness Programme Design — programme planning, phishing simulation, targeted training, behaviour measurement, board reporting.
13. GRC Capstone — full ISO 27001 readiness assessment of a simulated organisation, all deliverables produced.

Cabinet artifacts (13):
- Information security risk register — 15+ risks scored and treatment plans assigned
- ISO 27001 gap analysis — all 93 Annex A controls assessed
- Information security policy suite — 6 policies written
- NIST CSF 2.0 current state assessment — scored across all five functions
- PCI-DSS 4.0 gap analysis report
- ISO 27001 internal audit report
- SOC 2 readiness assessment
- GDPR Article 30 records of processing
- Cyber Essentials self-assessment
- NDPR compliance review
- Regulatory applicability matrix — Nigerian fintech scenario
- CBN Cybersecurity Framework assessment
- Vendor risk assessment — completed questionnaire, risk rating, recommendation
- Business impact analysis — RTO, RPO, recovery priorities documented
- Security awareness programme design document with GoPhish results

Reference: ISO 27001:2022, NIST CSF 2.0, ISACA CISM/CRISC domains, PCI-DSS 4.0, GDPR, NDPR, CBN Cybersecurity Framework
**Date:** June 2026

---

## AppSec Engineer — Comprehensive Module List

**Decision:** AppSec Engineer path covers OWASP SAMM, OWASP Top 10 2025, OWASP ASVS, and SANS SEC522 curriculum. Module list:

1. Secure SDLC — security in each phase of development, OWASP SAMM maturity model, security gates, developer security training, shifting left.
2. OWASP Top 10 2025 — all 10 categories hands-on: broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable components, authentication failures, software and data integrity failures, logging failures, SSRF. New 2025 additions: software supply chain failures, mishandling of exceptional conditions.
3. Threat Modelling — STRIDE methodology, data flow diagrams, trust boundaries, abuse cases, PASTA framework, threat modelling for Agile teams, output documentation.
4. Secure Code Review — code review methodology, language-specific vulnerability patterns, OWASP Code Review Guide, tools-assisted review, peer review vs security review, finding documentation.
5. SAST and DAST — Semgrep setup and custom rule writing, OWASP ZAP authenticated scanning, interpreting results, false positive management, SonarQube community edition.
6. Software Composition Analysis — dependency security, CVE triage, OWASP Dependency Check, Snyk free tier, SBOM concepts, supply chain attack awareness.
7. Cryptography for Developers — correct implementation of encryption, common cryptographic failures, TLS configuration, secrets management, key management, certificate handling.
8. Authentication and Authorisation — secure session management, OAuth 2.0 implementation, OIDC, JWT best practices, MFA implementation, broken auth patterns.
9. Security in CI/CD — GitHub Actions security gates, secrets scanning with Gitleaks, container scanning with Trivy, SAST in pipeline, dependency checking in pipeline, security as code.
10. Agile Security — security user stories, abuse cases in sprint planning, security acceptance criteria, definition of done security gates, AppSec in retrospectives.
11. API Security for Developers — OWASP API Top 10 2023 from a developer perspective, secure API design, input validation, rate limiting, authentication for APIs.
12. AppSec Programme Building — building a security champions programme, metrics and reporting, developer security training design, bug bounty programme basics.
13. AppSec Capstone — full security assessment of a sample application, threat model produced, code reviewed, SAST and DAST run, findings reported with remediation.

Cabinet artifacts (7):
- Semgrep custom rule set — 10+ rules targeting OWASP Top 10
- OWASP ZAP authenticated scan report with categorised findings
- Web application threat model — STRIDE analysis, mitigations documented
- Secure code review report — real PR reviewed with findings
- CI/CD security pipeline — GitHub Actions with SAST, SCA, secrets scanning
- OWASP Top 10 2025 exploitation lab notes
- Secure development guidelines document

Reference: OWASP SAMM, OWASP Top 10 2025, OWASP ASVS, OWASP Code Review Guide, SANS SEC522
**Date:** June 2026

---

## API Security Engineer — Comprehensive Module List

**Decision:** API Security Engineer path covers OWASP API Security Top 10 2023, APIsec University curriculum, and practical API testing methodology. Module list:

1. API Fundamentals for Security — REST, GraphQL, gRPC, SOAP, API authentication patterns, API documentation review, attack surface mapping for APIs.
2. OWASP API Top 10 2023 — all 10 categories hands-on against OWASP crAPI: BOLA, broken authentication, BOPLA, unrestricted resource consumption, BFLA, unrestricted access to sensitive business flows, SSRF, security misconfiguration, improper inventory management, unsafe consumption of APIs.
3. API Authentication and Authorisation — JWT in depth (algorithm confusion, weak secrets, none algorithm), OAuth 2.0 vulnerabilities, API key management, FAPI for financial APIs, scope validation.
4. API Reconnaissance and Discovery — finding undocumented endpoints, Swagger and OpenAPI abuse, GraphQL introspection, fuzzing for hidden endpoints, API inventory management.
5. Business Logic and Abuse — rate limiting bypass, workflow abuse, price manipulation, mass assignment, testing for business logic flaws specific to APIs.
6. GraphQL Security — introspection attacks, query depth limits, batching attacks, authorisation in GraphQL, field-level security.
7. API Gateway Security — WAF for APIs, rate limiting at gateway level, authentication at gateway, mTLS, API versioning security, gateway misconfiguration.
8. Secure API Design — security by design for APIs, input validation, output filtering, error handling, logging and monitoring for APIs, deprecation security.
9. API Security in Financial Services — PSD2, Open Banking, FAPI compliance, payment API security patterns, regulatory requirements for financial APIs.
10. API Security Testing Methodology — building a repeatable API security testing process, Postman collections, automated security testing, CI/CD integration for API security.
11. API Security Capstone — full security assessment of a simulated fintech API, OWASP API Top 10 coverage, professional findings report produced.

Cabinet artifacts (6):
- Postman security testing collection — auth, injection, BOLA/BFLA, rate limiting, business logic tests
- OWASP API Top 10 2023 findings report — each vulnerability demonstrated
- API threat model — endpoints mapped, trust boundaries documented
- JWT security lab — algorithm confusion, weak secret, none algorithm bypass
- OAuth 2.0 misconfiguration lab — redirect URI manipulation, state bypass, token leakage
- API security checklist — comprehensive reusable checklist

Reference: OWASP API Security Top 10 2023, APIsec University, FAPI specification, PSD2
**Date:** June 2026


---

## Licensing Model

**Decision:** Two-tier licensing approach.
- Code: MIT licence. Fully open source. Anyone can fork, modify, and run their own instance.
- Content: Creative Commons Attribution Non-Commercial 4.0 (CC BY-NC 4.0). Content is freely readable and shareable but cannot be used in commercial products or services without a licence from CyberPivot.

**Reason:** Open source code builds community trust, attracts developer contributors, and is standard for developer-facing platforms in the security community. Proprietary content licence protects the commercial model while keeping content accessible for individual learners. Someone can fork the platform and run a community instance. They cannot build a competing commercial business using CyberPivot content without permission.

The real competitive moat is not the licence. It is content quality, community, employer relationships, and brand. Those are not forkable.
**Date:** June 2026

---

## Business Model

**Decision:** Freemium model with three revenue streams.

**Free forever (core mission):**
- All learning content across all paths
- All modules and labs
- The cabinet system
- Cert roadmaps
- Interview prep guides
- CV templates
- Community features

**Premium individual features (paid monthly or annually):**
- AI CV builder — reads cabinet artifacts and writes tailored CV bullet points, cover letters, LinkedIn summaries
- Mock interview AI — role-specific technical interview practice with real-time feedback
- Verified certification — practical capstone assessment producing a certificate that means something because it is backed by real demonstrated skill, not multiple choice

**B2B revenue streams:**
- Team accounts — for bootcamps, universities, and corporate training programmes. Companies pay for cohort access and progress tracking.
- Employer partnerships — companies pay for access to the candidate pool. They can see cabinet artifacts and capstone results before interviewing. Placement fee or monthly access model.
- Sponsored cohorts — a company sponsors a group of learners through a specific path, gets first access to hire from the cohort. Apprenticeship model without the administrative overhead.
- Corporate training licences — companies use CyberPivot to upskill existing junior staff instead of sending them to expensive vendor training.

**Reason:** Keeping core content free serves the mission of accessible security education. Premium features create revenue without compromising that mission. B2B revenue is the largest opportunity and most aligned with the platform's purpose — connecting skilled people with employers who need them.
**Date:** June 2026

---

## Certification Strategy

**Decision:** CyberPivot will offer its own verified certification as a premium feature. Not in V1. Introduced after the platform has built sufficient reputation and content depth that the certification means something to employers.

**What makes it different from existing certifications:**
- Entirely practical. No multiple choice. Completion requires producing all cabinet artifacts and passing a capstone assessment involving real work.
- Role-specific. A CyberPivot SOC Analyst certification means the holder has demonstrated they can do SOC work, not just answer questions about it.
- Transparent. Employers can see exactly what the assessment involved and what artifacts were produced. No black box.

**Path to credibility:**
1. Build excellent free content and community (V1 and V2)
2. Employer partnerships that validate the quality of CyberPivot learners
3. Real placement data — people who completed paths and got hired
4. Introduce certification once employers recognise the platform's quality signal

**Reason:** A certification launched before the platform has credibility is just another badge. Credibility comes from the quality of people the platform produces and the employers who trust those people. Build that first.
**Date:** June 2026

---

## Employer Partnership Model

**Decision:** CyberPivot will pursue employer partnerships as the primary B2B revenue stream and the most powerful validation of the platform's mission.

**How it works:**
- Companies register as hiring partners
- They get access to a searchable pool of candidates who have completed specific paths
- They can view cabinet artifacts, capstone results, and progress before requesting an interview
- They pay a placement fee or monthly access fee

**Sponsored cohort model:**
- A company identifies a hiring need — for example 10 SOC Tier 1 analysts
- They sponsor a cohort through the SOC Analyst path — paying a fixed fee
- CyberPivot runs the cohort over three to four months
- The company gets first access to hire from the cohort
- Learners get a clear path to employment with a committed employer at the end

**Nigerian market opportunity:**
- Nigerian banks and fintechs face growing CBN cybersecurity requirements and a shortage of qualified local talent
- A sponsored cohort model partnered with Nigerian financial institutions trains people to CBN framework standard and connects them directly to employers
- Priority targets: GTBank, Access Bank, Zenith Bank, Flutterwave, Paystack, and other fintech companies with security hiring needs
- This model creates the most powerful marketing asset possible — real people who went through CyberPivot and got hired

**Corporate training:**
- Companies pay for existing junior staff to go through paths
- Cheaper and more practical than expensive vendor training or SANS courses
- Progress visible to the employer through team accounts
- Cabinet artifacts demonstrate what was learned

**Reason:** Employer partnerships serve the mission (connecting skilled people with employers), create sustainable revenue, and produce the most credible marketing asset — real placement data. The Nigerian market is specifically underserved and represents a first-mover opportunity.
**Date:** June 2026

---

## Platform Resources Section (V2)

**Decision:** Add a Resources section accessible from the dashboard covering podcasts, communities, conferences, blogs, and YouTube channels relevant to each role path.

**Podcasts to include:**
- Darknet Diaries — real stories of hacks, breaches, and espionage. Best entry point for anyone new to the field.
- Risky Business — weekly news and interviews, practitioner focused.
- Security Now — deep technical dives, long running.
- The CyberWire Daily — quick daily news briefing.
- Smashing Security — lighter tone, still substantive.
- Nigerian and African voices — research and add relevant African cybersecurity podcast voices when identified.

**Not built in V1.** Resources section is a V2 feature. Flag content as it is identified and store in a resources data file for when it is built.
**Date:** June 2026

---

## Coming Soon Role Placeholder Pages

**Decision:** Seven new Coming Soon roles added to the ROLES catalog (DFIR Analyst, Security Engineer, Malware Analyst, Privacy Analyst, AI Red Teamer, OT Security Analyst, OT Security Engineer) receive temporary placeholder pages at /roles/{slug} rather than 404ing. These pages show the role's real name, domain, and level, an honest message that the full role page content is still being written, a link back to /paths, and signed-out signup/signin CTAs. No salary data, tools, certs, or other rich sections are included. This is a deliberate temporary measure. Full rich coming-soon content (matching the pattern already built for the 17 existing coming-soon roles) will be written for each of these seven roles in a future dedicated session once proper research per role has been done. The placeholder pages are implemented in lib/roles/placeholder-coming-soon-roles.ts and components/roles/role-placeholder-coming-soon-page.tsx, and are routed via app/roles/[slug]/page.tsx after V1 roles and before the 17 rich coming-soon roles.
**Date:** June 2026

---

## OT/ICS Security Domain

**Decision:** A sixth domain, Operational Technology and Industrial Control Systems Security (domainId: ot-ics-security, pathSlug: ot-security), was added to the platform alongside two initial roles: OT Security Analyst (Entry to Mid) and OT Security Engineer (Mid to Senior). This domain covers securing industrial control systems, SCADA, PLCs, and the physical infrastructure behind power, water, manufacturing, and critical services. It is distinct from Cloud and Infrastructure Security because OT/ICS security involves genuinely different technology, protocols (Modbus, DNP3), and regulatory frameworks (NERC CIP, ISA/IEC 62443) from standard IT and cloud security. The domain description used everywhere is: "The people who secure the industrial systems and physical infrastructure behind power, water, manufacturing, and other critical services." Real-world data confirms OT Security Analyst is Entry to Mid level, though this entry point is less common than SOC Analyst and often draws people transitioning from general IT or security rather than true career-zero beginners.
**Date:** June 2026

---

## Onboarding Coming Soon Role Routing Fix

**Decision:** The onboarding recommendation engine previously silently routed users whose recommended role was comingSoon: true into a different, unrelated role's actual content via the bridgeRole and pathSlug mechanism (for example, both gcpEngineer and awsEngineer had pathSlug: "azure" hardcoded, sending GCP-leaning users into Azure Security Engineer content with no explanation). This was identified as a real bug, not an intentional design choice. Fixed so that comingSoon roles now show the user a clear holding page for their actual recommended role, with the existing bridgeRole explanation text displayed as a suggestion with a clickable link, rather than being used for silent auto-redirect. The fix applies consistently to all comingSoon roles: awsEngineer, gcpEngineer, edrAnalyst, threatHunter, securityAuditor, devsecops, and aiSecurity.
**Date:** June 2026

---

## V1 Role Module False Availability Fix

**Decision:** Six V1 role paths (SOC Analyst, Penetration Tester, Azure Security Engineer, GRC Analyst, AppSec Engineer, API Security Engineer) had their first one or two modules incorrectly marked status: "available" in lib/roles/v1-roles.ts, despite no actual module content, routes, or MDX files existing anywhere in the project for any role-path module. All 12 affected module entries across all six roles were corrected to status: "coming-soon". No module on any role path now shows "Available" status anywhere in the app until real built content exists behind it.
**Date:** June 2026

---

## Paths Overview Page and URL Structure

**Decision:** A dedicated Paths overview page was built at /paths (moved from its original /roles route, which now redirects to /paths). This page shows all roles grouped by domain with domain descriptions, role levels, and Ready/Coming soon status. Individual role pages remain at /roles/[slug] as before. The naming distinction is deliberate: "path" refers to the structured learning journey CyberPivot provides toward a role, while "role" refers to the real-world job title the path leads toward. The top-level overview uses "Paths" because it lists learning journeys; individual destination pages use "roles" because they describe specific job roles.
**Date:** June 2026

