import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { APPSEC_ENGINEER_REGULATIONS } from "@/lib/roles/regulations/appsec-engineer";

export const APPSEC_ENGINEER_ENRICHED = {
  dayInTheLife:
    "Morning starts with the PR review queue. Two or three pull requests need a security review before merge. You read the diff, check for auth bypasses, injection points, and secrets in code. You run a Semgrep scan on the feature branch and triage anything new. Mid-morning might be a threat modeling session with the dev team on a new API: data flows, trust boundaries, STRIDE on each component. Afternoon you work through SAST results, remove false positives, and file real issues with reproduction steps. End of day you update the secure coding guidelines with a pattern you saw twice this week. A normal two-hour block is one thorough code review plus documenting findings the developer can act on without a meeting.",
  misconceptions: [
    {
      myth: "AppSec is just running scanners",
      reality:
        "Manual code review and threat modeling catch business logic flaws that SAST will never see.",
    },
    {
      myth: "You need to be a developer first",
      reality:
        "Development experience helps but is not mandatory. A security mindset and the ability to read code matter more.",
    },
    {
      myth: "SAST catches everything",
      reality:
        "Automated tools miss business logic flaws, broken access control, and design-level issues. You still need human review.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Set up Semgrep and write custom rules for your stack",
    "Run an authenticated ZAP scan against OWASP WebGoat",
    "Conduct a threat model using STRIDE on a sample application",
    "Review a pull request with real security findings and write actionable feedback",
    "Build a CI/CD pipeline with security gates (SAST, dependency scan, secret detection)",
  ],
  labRequirements: {
    minimumSpecs: "8GB RAM",
    diskSpace: "30GB free disk space",
    installs: ["Docker", "VS Code or similar IDE", "Node.js for running vulnerable apps locally"],
    setupTime: "Roughly 2 hours",
    osSupport: "Windows (WSL2 recommended), macOS, and Linux",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "Walk me through how you would threat model a new login feature",
      goodAnswer:
        "Map data flows, identify trust boundaries, apply STRIDE to each component. Ask what happens if MFA is bypassed, sessions are fixed, or passwords are logged. Document threats and mitigations before code ships.",
    },
    {
      question: "What is the difference between SAST and DAST?",
      goodAnswer:
        "SAST analyses source or bytecode without running the app. DAST tests the running application from the outside. You need both because they find different classes of bugs.",
    },
    {
      question: "You find a stored XSS in production. What do you do?",
      goodAnswer:
        "Assess impact and exploitability. Notify the team lead and product owner. Coordinate a fix and verify in staging. Consider whether incident response is needed if data was accessed.",
    },
    {
      question: "How do you get developers to care about security?",
      goodAnswer:
        "Show up in their workflow, not as a gate at the end. Pair on fixes, explain impact in their terms, and make secure patterns easier than insecure ones.",
    },
    {
      question: "What is OWASP and why does it matter?",
      goodAnswer:
        "Open Web Application Security Project. Their Top 10 and cheat sheets give a shared vocabulary for the most common web flaws. Hiring managers expect you to know them.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "API Security Engineer",
      note: "If APIs and machine-to-machine auth are your main focus.",
    },
    {
      name: "DevSecOps Engineer",
      note: "If pipelines, automation, and infrastructure-as-code interest you most.",
    },
    {
      name: "AI Security Engineer",
      note: "If you want to secure LLM integrations and AI-powered features.",
    },
    {
      name: "Penetration Tester",
      note: "If you want the offensive side with full exploitation scope.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "OWASP local chapters", note: "Meetups and talks in most major cities" },
    { name: "PortSwigger Web Security Academy", note: "Free labs covering OWASP Top 10" },
    { name: "r/netsec", note: "Technical security discussion and news" },
    { name: "AppSec Cali conference talks on YouTube", note: "Practitioner talks on product security" },
    { name: "Semgrep blog", note: "SAST patterns and rule writing guides" },
    { name: "Snyk Learn", note: "Free modules on dependencies and container security" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Networking Fundamentals",
      reason: "HTTP, TLS, and DNS underpin every web security conversation.",
    },
    {
      module: "Security Fundamentals",
      reason: "Attack types, secure design principles, and how to describe risk to developers.",
    },
    {
      module: "Python for Security",
      reason: "Helpful for reading code, writing Semgrep rules, and automating checks. Not mandatory but accelerates the path.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: APPSEC_ENGINEER_REGULATIONS,
} as const;
