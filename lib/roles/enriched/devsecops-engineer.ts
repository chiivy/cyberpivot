import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { APPSEC_ENGINEER_REGULATIONS } from "@/lib/roles/regulations/appsec-engineer";

export const DEVSECOPS_ENGINEER_ENRICHED = {
  dayInTheLife:
    "Morning starts with the CI pipeline dashboard. Two builds failed on security gates overnight. You triage Semgrep and Trivy findings, decide which are real, and pair with a developer on the SQL injection false positive blocking their release. Mid-morning you review a Terraform PR for Checkov violations and suggest fixes that do not break deployment. Afternoon might be a workshop on adding secret scanning to a new microservice repo, or tuning container scan thresholds so teams stop ignoring alerts. End of day you update the pipeline template everyone inherits so the next team does not rebuild the same gates from scratch.",
  misconceptions: [
    {
      myth: "DevSecOps means running scanners in CI and calling it done",
      reality:
        "Developers bypass gates they do not understand. Your job is usable guardrails, triage, and fixing broken pipelines, not just adding tools.",
    },
    {
      myth: "You need to be a senior developer",
      reality:
        "You need to read code and YAML pipelines well enough to debug failures. Deep framework expertise helps but is not the whole job.",
    },
    {
      myth: "Security gates should block every release with a finding",
      reality:
        "Severity thresholds, allowlists, and fix SLAs beat hard fails on every informational item. Balance speed with risk.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Build a GitHub Actions pipeline with Semgrep, Trivy, and Gitleaks gates",
    "Write ten Semgrep rules for OWASP Top 10 patterns in your stack",
    "Scan Terraform with Checkov and remediate high severity findings",
    "Add container image scanning to a Docker build pipeline",
    "Document security-enhanced user stories for a sprint",
    "Tune false positive rates so developers trust the pipeline",
  ],
  labRequirements: {
    minimumSpecs: "8GB RAM",
    diskSpace: "30GB free disk space",
    installs: ["Docker", "Git", "GitHub account or GitLab", "VS Code"],
    setupTime: "Roughly 2 hours",
    osSupport: "Windows (WSL2 recommended), macOS, and Linux",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "How would you introduce security scanning to an existing CI pipeline?",
      goodAnswer:
        "Start with secret detection and dependency scanning in warn mode. Show value with one real fix. Add SAST with tuned rules. Move to blocking on critical only after developers trust the signal.",
    },
    {
      question: "What is shift left and what does it mean in practice?",
      goodAnswer:
        "Find security issues earlier in delivery. In practice: pre-commit hooks, PR checks, IaC scan on plan, and threat modeling before build, not a security review the night before release.",
    },
    {
      question: "How do you handle developers who bypass security gates?",
      goodAnswer:
        "Understand why: false positives, slow pipelines, unclear errors. Fix the gate or the docs. Escalate repeated bypass as a risk decision with leadership if needed.",
    },
    {
      question: "What tools would you use for IaC security?",
      goodAnswer:
        "Checkov, tfsec, or KICS for Terraform and CloudFormation. Run in CI on every plan or PR. Block on high severity misconfigurations like public storage or open security groups.",
    },
    {
      question: "How is DevSecOps different from AppSec?",
      goodAnswer:
        "AppSec focuses on code, design, and review. DevSecOps embeds security into how software ships: pipelines, containers, secrets, and developer workflows.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "AppSec Engineer",
      note: "More code review and threat modeling, less pipeline plumbing.",
    },
    {
      name: "Cloud Security Engineer",
      note: "Infrastructure and cloud posture instead of application delivery pipelines.",
    },
    {
      name: "AI Security Engineer",
      note: "When your pipelines start shipping LLM features and agents.",
    },
    {
      name: "Penetration Tester",
      note: "If you want offensive validation of what your gates miss.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "DevSecOps.org community", note: "Practitioner discussions on pipeline security" },
    { name: "Semgrep blog", note: "SAST patterns and rule writing guides" },
    { name: "Snyk Learn", note: "Free modules on dependencies and container security" },
    { name: "Checkov documentation", note: "IaC policy examples and custom checks" },
    { name: "r/devops", note: "Pipeline and tooling discussions" },
    { name: "Google Cloud DevOps research", note: "DORA metrics and delivery practices" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Security Fundamentals",
      reason: "Vulnerability classes and risk language for triaging scanner output.",
    },
    {
      module: "Python for Security",
      reason: "Helpful for scripting pipeline fixes and reading application code.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: APPSEC_ENGINEER_REGULATIONS,
} as const;
