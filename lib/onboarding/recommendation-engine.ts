import type {
  BridgeRole,
  EntryPoint,
  OnboardingAnswers,
  OnboardingRecommendation,
  PathSlug,
  Q3Environment,
  RoleRecommendation,
} from "@/types/onboarding";

import { generateWhyExplanation } from "@/lib/onboarding/why-explanation";

const ENTRY_LABELS: Record<EntryPoint, string> = {
  A: "Complete beginner",
  B: "IT background",
  C: "Developer moving into security",
  D: "Already in security",
};

const FOUNDATION = {
  module1: {
    title: "Foundation Module 1 — How the Internet Actually Works",
    description:
      "IP addressing, DNS, HTTP, and your first packet capture in Wireshark. Built around a real troubleshooting scenario.",
  },
  module3: {
    title: "Foundation Module 3 — Security Fundamentals",
    description:
      "CIA triad, threat modeling, and common attack types. Your first threat briefing as a new analyst.",
  },
} as const;

interface RoleDef {
  roleName: string;
  roleSlug: string;
  domain: string;
  domainId: string;
  level: string;
  pathSlug: PathSlug;
  comingSoon: boolean;
}

const ROLES = {
  socAnalyst: {
    roleName: "SOC Analyst",
    roleSlug: "soc-analyst",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Entry to Mid",
    pathSlug: "soc",
    comingSoon: false,
  },
  incidentResponder: {
    roleName: "Incident Responder",
    roleSlug: "incident-responder",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Mid",
    pathSlug: "soc",
    comingSoon: true,
  },
  edrAnalyst: {
    roleName: "EDR Analyst",
    roleSlug: "edr-analyst",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Entry to Mid",
    pathSlug: "soc",
    comingSoon: true,
  },
  threatHunter: {
    roleName: "Threat Hunter",
    roleSlug: "threat-hunter",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Mid to Senior",
    pathSlug: "soc",
    comingSoon: true,
  },
  dfirAnalyst: {
    roleName: "DFIR Analyst",
    roleSlug: "dfir-analyst",
    domain: "Defensive Security",
    domainId: "defensive-security",
    level: "Mid to Senior",
    pathSlug: "soc",
    comingSoon: true,
  },
  azureEngineer: {
    roleName: "Azure Security Engineer",
    roleSlug: "azure-security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid to Senior",
    pathSlug: "azure",
    comingSoon: false,
  },
  awsEngineer: {
    roleName: "AWS Security Engineer",
    roleSlug: "aws-security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid to Senior",
    pathSlug: "azure",
    comingSoon: true,
  },
  gcpEngineer: {
    roleName: "GCP Security Engineer",
    roleSlug: "gcp-security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid to Senior",
    pathSlug: "azure",
    comingSoon: true,
  },
  networkSecurityEngineer: {
    roleName: "Network Security Engineer",
    roleSlug: "network-security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Entry to Mid",
    pathSlug: "azure",
    comingSoon: true,
  },
  identitySecurityEngineer: {
    roleName: "Identity Security Engineer",
    roleSlug: "identity-security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid",
    pathSlug: "azure",
    comingSoon: true,
  },
  emailSecurityEngineer: {
    roleName: "Email Security Engineer",
    roleSlug: "email-security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Entry to Mid",
    pathSlug: "azure",
    comingSoon: true,
  },
  securityEngineer: {
    roleName: "Security Engineer",
    roleSlug: "security-engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid to Senior",
    pathSlug: "azure",
    comingSoon: true,
  },
  grcAnalyst: {
    roleName: "GRC Analyst",
    roleSlug: "grc-analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Entry to Mid",
    pathSlug: "grc",
    comingSoon: false,
  },
  complianceAnalyst: {
    roleName: "Compliance Analyst",
    roleSlug: "compliance-analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Entry to Mid",
    pathSlug: "grc",
    comingSoon: true,
  },
  riskAnalyst: {
    roleName: "Risk Analyst",
    roleSlug: "risk-analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Entry to Mid",
    pathSlug: "grc",
    comingSoon: true,
  },
  securityAuditor: {
    roleName: "Security Auditor",
    roleSlug: "security-auditor",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Mid to Senior",
    pathSlug: "grc",
    comingSoon: true,
  },
  vciso: {
    roleName: "vCISO",
    roleSlug: "vciso",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Senior",
    pathSlug: "grc",
    comingSoon: true,
  },
  privacyAnalyst: {
    roleName: "Privacy Analyst",
    roleSlug: "privacy-analyst",
    domain: "Governance, Risk and Compliance",
    domainId: "governance-risk-compliance",
    level: "Entry to Mid",
    pathSlug: "grc",
    comingSoon: true,
  },
  pentest: {
    roleName: "Penetration Tester",
    roleSlug: "penetration-tester",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Mid to Senior",
    pathSlug: "pentest",
    comingSoon: false,
  },
  vulnAssessment: {
    roleName: "Vulnerability Assessment Analyst",
    roleSlug: "vulnerability-assessment-analyst",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Entry to Mid",
    pathSlug: "pentest",
    comingSoon: true,
  },
  redTeamer: {
    roleName: "Red Teamer",
    roleSlug: "red-teamer",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Mid to Senior",
    pathSlug: "pentest",
    comingSoon: true,
  },
  bugBountyHunter: {
    roleName: "Bug Bounty Hunter",
    roleSlug: "bug-bounty-hunter",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Entry to Senior",
    pathSlug: "pentest",
    comingSoon: true,
  },
  malwareAnalyst: {
    roleName: "Malware Analyst",
    roleSlug: "malware-analyst",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Mid to Senior",
    pathSlug: "pentest",
    comingSoon: true,
  },
  aiRedTeamer: {
    roleName: "AI Red Teamer",
    roleSlug: "ai-red-teamer",
    domain: "Offensive Security",
    domainId: "offensive-security",
    level: "Mid to Senior",
    pathSlug: "pentest",
    comingSoon: true,
  },
  appsec: {
    roleName: "AppSec Engineer",
    roleSlug: "appsec-engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    level: "Mid to Senior",
    pathSlug: "appsec",
    comingSoon: false,
  },
  apiSecurity: {
    roleName: "API Security Engineer",
    roleSlug: "api-security-engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    level: "Mid",
    pathSlug: "api-security",
    comingSoon: false,
  },
  devsecops: {
    roleName: "DevSecOps Engineer",
    roleSlug: "devsecops-engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    level: "Mid to Senior",
    pathSlug: "appsec",
    comingSoon: true,
  },
  aiSecurity: {
    roleName: "AI Security Engineer",
    roleSlug: "ai-security-engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    level: "Mid to Senior",
    pathSlug: "ai-security",
    comingSoon: true,
  },
  otSecurityAnalyst: {
    roleName: "OT Security Analyst",
    roleSlug: "ot-security-analyst",
    domain: "Operational Technology and Industrial Control Systems Security",
    domainId: "ot-ics-security",
    level: "Entry to Mid",
    pathSlug: "ot-security",
    comingSoon: true,
  },
  otSecurityEngineer: {
    roleName: "OT Security Engineer",
    roleSlug: "ot-security-engineer",
    domain: "Operational Technology and Industrial Control Systems Security",
    domainId: "ot-ics-security",
    level: "Mid to Senior",
    pathSlug: "ot-security",
    comingSoon: true,
  },
} as const satisfies Record<string, RoleDef>;

export type RoleCatalogEntry = {
  roleName: string;
  roleSlug: string;
  domain: string;
  domainId: string;
  level: string;
  comingSoon: boolean;
};

export const ROLE_DOMAIN_DESCRIPTIONS = {
  "defensive-security":
    "The people who detect, investigate, and respond when something goes wrong inside an organization's systems.",
  "offensive-security":
    "The people who think like an attacker on purpose, finding weaknesses before someone malicious does.",
  "application-product-security":
    "The people who build security into software and APIs from the start, rather than bolting it on afterward.",
  "cloud-infrastructure-security":
    "The people who secure the platforms, networks, and identity systems everything else runs on top of.",
  "governance-risk-compliance":
    "The people who make sure security decisions are documented, defensible, and aligned with real regulatory and business risk.",
  "ot-ics-security":
    "The people who secure the industrial systems and physical infrastructure behind power, water, manufacturing, and other critical services.",
} as const;

export const ROLE_DOMAIN_ORDER = [
  "defensive-security",
  "offensive-security",
  "application-product-security",
  "cloud-infrastructure-security",
  "governance-risk-compliance",
  "ot-ics-security",
] as const;

const BRIDGE_SUGGESTIONS_BY_TARGET_SLUG: Record<string, BridgeRole> = {
  [ROLES.awsEngineer.roleSlug]: {
    name: ROLES.azureEngineer.roleName,
    slug: ROLES.azureEngineer.roleSlug,
    domainId: ROLES.azureEngineer.domainId,
    pathSlug: ROLES.azureEngineer.pathSlug,
    explanation: `${ROLES.awsEngineer.roleName} is coming soon. ${ROLES.azureEngineer.roleName} covers the same cloud security fundamentals on Microsoft Azure and is available now. The skills transfer when AWS content ships.`,
  },
  [ROLES.gcpEngineer.roleSlug]: {
    name: ROLES.azureEngineer.roleName,
    slug: ROLES.azureEngineer.roleSlug,
    domainId: ROLES.azureEngineer.domainId,
    pathSlug: ROLES.azureEngineer.pathSlug,
    explanation: `${ROLES.gcpEngineer.roleName} is coming soon. Start with ${ROLES.azureEngineer.roleName} to build cloud security fundamentals that apply across providers.`,
  },
  [ROLES.edrAnalyst.roleSlug]: {
    name: ROLES.socAnalyst.roleName,
    slug: ROLES.socAnalyst.roleSlug,
    domainId: ROLES.socAnalyst.domainId,
    pathSlug: ROLES.socAnalyst.pathSlug,
    explanation: `${ROLES.edrAnalyst.roleName} is coming soon. ${ROLES.socAnalyst.roleName} is the practical starting point: alert triage, investigations, and SIEM work. Endpoint depth builds on that foundation.`,
  },
  [ROLES.threatHunter.roleSlug]: {
    name: ROLES.socAnalyst.roleName,
    slug: ROLES.socAnalyst.roleSlug,
    domainId: ROLES.socAnalyst.domainId,
    pathSlug: ROLES.socAnalyst.pathSlug,
    explanation: `${ROLES.threatHunter.roleName} is coming soon. ${ROLES.socAnalyst.roleName} gets you comfortable with logs, detections, and investigations first. Hunting assumes you already know how a SOC runs.`,
  },
  [ROLES.securityAuditor.roleSlug]: {
    name: ROLES.grcAnalyst.roleName,
    slug: ROLES.grcAnalyst.roleSlug,
    domainId: ROLES.grcAnalyst.domainId,
    pathSlug: ROLES.grcAnalyst.pathSlug,
    explanation: `${ROLES.securityAuditor.roleName} is coming soon. ${ROLES.grcAnalyst.roleName} builds the control, risk, and evidence skills that audit work depends on.`,
  },
  [ROLES.devsecops.roleSlug]: {
    name: ROLES.appsec.roleName,
    slug: ROLES.appsec.roleSlug,
    domainId: ROLES.appsec.domainId,
    pathSlug: ROLES.appsec.pathSlug,
    explanation: `${ROLES.devsecops.roleName} is coming soon. ${ROLES.appsec.roleName} covers secure development and testing foundations you need before pipeline security work.`,
  },
  [ROLES.aiSecurity.roleSlug]: {
    name: ROLES.appsec.roleName,
    slug: ROLES.appsec.roleSlug,
    domainId: ROLES.appsec.domainId,
    pathSlug: ROLES.appsec.pathSlug,
    explanation: `${ROLES.aiSecurity.roleName} is coming soon. ${ROLES.appsec.roleName} covers the secure development foundations you will need and is available now. Start there.`,
  },
};

export function getBridgeSuggestionForRoleSlug(
  roleSlug: string,
): BridgeRole | null {
  return BRIDGE_SUGGESTIONS_BY_TARGET_SLUG[roleSlug] ?? null;
}

export function getRoleCatalogGrouped(): Array<{
  domainId: (typeof ROLE_DOMAIN_ORDER)[number];
  domain: string;
  description: string;
  roles: RoleCatalogEntry[];
}> {
  const byDomain = new Map<string, RoleCatalogEntry[]>();

  for (const role of Object.values(ROLES)) {
    const entry: RoleCatalogEntry = {
      roleName: role.roleName,
      roleSlug: role.roleSlug,
      domain: role.domain,
      domainId: role.domainId,
      level: role.level,
      comingSoon: role.comingSoon,
    };
    const existing = byDomain.get(role.domainId) ?? [];
    existing.push(entry);
    byDomain.set(role.domainId, existing);
  }

  return ROLE_DOMAIN_ORDER.map((domainId) => {
    const roles = byDomain.get(domainId) ?? [];
    return {
      domainId,
      domain: roles[0]?.domain ?? domainId,
      description: ROLE_DOMAIN_DESCRIPTIONS[domainId],
      roles,
    };
  });
}

function withBridge(
  target: RoleDef,
  bridge: RoleDef,
  explanation: string,
): RoleRecommendation {
  return {
    ...target,
    comingSoon: true,
    targetRoleName: target.roleName,
    bridgeRole: {
      name: bridge.roleName,
      slug: bridge.roleSlug,
      domainId: bridge.domainId,
      pathSlug: bridge.pathSlug,
      explanation,
    },
  };
}

function asRole(def: RoleDef, extras?: Partial<RoleRecommendation>): RoleRecommendation {
  return { ...def, ...extras };
}

function resolveCloudRole(answers: OnboardingAnswers): RoleRecommendation {
  const platform =
    answers.q6?.type === "cloud" ? answers.q6.value : "azure";

  if (platform === "aws") {
    return withBridge(
      ROLES.awsEngineer,
      ROLES.azureEngineer,
      `${ROLES.awsEngineer.roleName} is coming soon. ${ROLES.azureEngineer.roleName} covers the same cloud security fundamentals on Microsoft Azure and is available now. The skills transfer when AWS content ships.`,
    );
  }
  if (platform === "gcp") {
    return withBridge(
      ROLES.gcpEngineer,
      ROLES.azureEngineer,
      `${ROLES.gcpEngineer.roleName} is coming soon. Start with ${ROLES.azureEngineer.roleName} to build cloud security fundamentals that apply across providers.`,
    );
  }
  return asRole(ROLES.azureEngineer);
}

function resolveSocRole(answers: OnboardingAnswers): RoleRecommendation {
  const focus =
    answers.q6?.type === "soc" ? answers.q6.value : "monitoring";

  if (focus === "endpoint") {
    return withBridge(
      ROLES.edrAnalyst,
      ROLES.socAnalyst,
      `${ROLES.edrAnalyst.roleName} is coming soon. ${ROLES.socAnalyst.roleName} is the practical starting point: alert triage, investigations, and SIEM work. Endpoint depth builds on that foundation.`,
    );
  }
  if (focus === "hunting") {
    return withBridge(
      ROLES.threatHunter,
      ROLES.socAnalyst,
      `${ROLES.threatHunter.roleName} is coming soon. ${ROLES.socAnalyst.roleName} gets you comfortable with logs, detections, and investigations first. Hunting assumes you already know how a SOC runs.`,
    );
  }
  return asRole(ROLES.socAnalyst);
}

function resolveCodeRole(answers: OnboardingAnswers): RoleRecommendation {
  const focus =
    answers.q6?.type === "code" ? answers.q6.value : "applications";

  switch (focus) {
    case "apis":
      return asRole(ROLES.apiSecurity);
    case "pipeline":
      return withBridge(
        ROLES.devsecops,
        ROLES.appsec,
        `${ROLES.devsecops.roleName} is coming soon. ${ROLES.appsec.roleName} covers secure development and testing foundations you need before pipeline security work.`,
      );
    case "ai":
      return withBridge(
        ROLES.aiSecurity,
        ROLES.appsec,
        `${ROLES.aiSecurity.roleName} is coming soon. ${ROLES.appsec.roleName} covers the secure development foundations you will need and is available now. Start there.`,
      );
    default:
      return asRole(ROLES.appsec);
  }
}

function resolveAttackRole(answers: OnboardingAnswers): RoleRecommendation {
  const { q4Terminal } = answers;

  if (q4Terminal === "very-comfortable") {
    return asRole(ROLES.pentest);
  }

  const vuln = withBridge(
    ROLES.vulnAssessment,
    ROLES.pentest,
    `${ROLES.vulnAssessment.roleName} is coming soon. The ${ROLES.pentest.roleName} path teaches scanning, analysis, and reporting skills that overlap heavily with vuln assessment work.`,
  );

  return vuln;
}

function defaultByEnvironment(
  answers: OnboardingAnswers,
): RoleRecommendation {
  const { q2WorkInstinct, q3Environment } = answers;

  switch (q3Environment) {
    case "soc":
      return resolveSocRole(answers);
    case "cloud":
      return resolveCloudRole(answers);
    case "code":
      if (q2WorkInstinct === "build-right" || q2WorkInstinct === "replicate") {
        return resolveCodeRole(answers);
      }
      return asRole(ROLES.appsec);
    case "business":
      return asRole(ROLES.grcAnalyst);
    case "attack":
      return resolveAttackRole(answers);
    default:
      return asRole(ROLES.socAnalyst);
  }
}

function resolveRole(answers: OnboardingAnswers): RoleRecommendation {
  const { q1Background, q2WorkInstinct, q3Environment, q5Goal } = answers;

  if (
    q1Background === "security" &&
    q2WorkInstinct === "prevention" &&
    q5Goal === "level-up"
  ) {
    if (q3Environment === "business") {
      return withBridge(
        ROLES.securityAuditor,
        ROLES.grcAnalyst,
        `${ROLES.securityAuditor.roleName} is coming soon. ${ROLES.grcAnalyst.roleName} builds the control, risk, and evidence skills that audit work depends on.`,
      );
    }
    return asRole(ROLES.grcAnalyst);
  }

  if (q2WorkInstinct === "investigate" && q3Environment === "soc") {
    return resolveSocRole(answers);
  }

  if (q2WorkInstinct === "investigate" && q3Environment === "cloud") {
    return resolveCloudRole(answers);
  }

  if (q2WorkInstinct === "fix-fast" && q3Environment === "soc") {
    return asRole(ROLES.socAnalyst, {
      pathNote:
        "Incident response depth comes next on this path once you are comfortable with alert triage.",
    });
  }

  if (q2WorkInstinct === "prevention" && q3Environment === "business") {
    if (q1Background === "security") {
      return withBridge(
        ROLES.securityAuditor,
        ROLES.grcAnalyst,
        `${ROLES.securityAuditor.roleName} is coming soon. ${ROLES.grcAnalyst.roleName} is the available path that builds audit-ready control and evidence skills.`,
      );
    }
    return asRole(ROLES.grcAnalyst);
  }

  if (q2WorkInstinct === "prevention" && q3Environment === "cloud") {
    return resolveCloudRole(answers);
  }

  if (q2WorkInstinct === "replicate" && q3Environment === "attack") {
    return resolveAttackRole(answers);
  }

  if (q2WorkInstinct === "replicate" && q3Environment === "code") {
    return asRole(ROLES.appsec);
  }

  if (q2WorkInstinct === "build-right" && q3Environment === "code") {
    return resolveCodeRole(answers);
  }

  if (q2WorkInstinct === "build-right" && q3Environment === "cloud") {
    return resolveCloudRole(answers);
  }

  return defaultByEnvironment(answers);
}

function computeEntryPoint(answers: OnboardingAnswers): {
  entryPoint: EntryPoint;
  startingPointTitle: string;
  startingPointDescription: string;
} {
  switch (answers.q1Background) {
    case "no-background":
      return {
        entryPoint: "A",
        startingPointTitle: FOUNDATION.module1.title,
        startingPointDescription: FOUNDATION.module1.description,
      };
    case "it":
      return {
        entryPoint: "B",
        startingPointTitle: FOUNDATION.module3.title,
        startingPointDescription: FOUNDATION.module3.description,
      };
    case "developer":
      return {
        entryPoint: "C",
        startingPointTitle: "Application and Product Security paths",
        startingPointDescription:
          "You already write code. AppSec and API security paths build on that. DevSecOps is there when you want pipeline work.",
      };
    default:
      return {
        entryPoint: "D",
        startingPointTitle: "Pick your role",
        startingPointDescription:
          "Skip the foundations. Jump into the modules that match where you want to go next.",
      };
  }
}

function needsFoundationFirst(answers: OnboardingAnswers): boolean {
  if (
    answers.q1Background === "no-background" &&
    answers.q4Terminal === "never"
  ) {
    return true;
  }
  if (
    answers.q2WorkInstinct === "replicate" &&
    answers.q3Environment === "attack" &&
    (answers.q4Terminal === "not-really" || answers.q4Terminal === "never")
  ) {
    return true;
  }
  return false;
}

export function computeRecommendation(
  answers: OnboardingAnswers,
): OnboardingRecommendation {
  const entry = computeEntryPoint(answers);
  const role = resolveRole(answers);
  const foundationFirst = needsFoundationFirst(answers);
  const whyExplanation = generateWhyExplanation(answers, role, foundationFirst);

  return {
    entryPoint: entry.entryPoint,
    entryLabel: ENTRY_LABELS[entry.entryPoint],
    startingPointTitle: entry.startingPointTitle,
    startingPointDescription: entry.startingPointDescription,
    role,
    whyExplanation,
    foundationFirst,
  };
}

export function activeRoleForPath(
  recommendation: OnboardingRecommendation,
): RoleRecommendation {
  return recommendation.role;
}

export function domainIdToPathSlug(domainId: string): PathSlug | null {
  const map: Record<string, PathSlug> = {
    "defensive-security": "soc",
    "offensive-security": "pentest",
    "application-product-security": "appsec",
    "cloud-infrastructure-security": "azure",
    "governance-risk-compliance": "grc",
    "ot-ics-security": "ot-security",
  };
  return map[domainId] ?? null;
}

export function pathSlugFromRoleSlug(roleSlug: string): PathSlug | null {
  if (
    roleSlug.includes("azure") ||
    roleSlug.includes("aws-security") ||
    roleSlug.includes("gcp-security")
  ) {
    return "azure";
  }
  if (
    roleSlug.includes("pentest") ||
    roleSlug.includes("penetration") ||
    roleSlug.includes("vulnerability") ||
    roleSlug.includes("red-team")
  ) {
    return "pentest";
  }
  if (
    roleSlug.includes("soc") ||
    roleSlug.includes("incident") ||
    roleSlug.includes("edr") ||
    roleSlug.includes("threat-hunter")
  ) {
    return "soc";
  }
  if (roleSlug.includes("grc") || roleSlug.includes("security-auditor")) {
    return "grc";
  }
  if (roleSlug.includes("api-security")) {
    return "api-security";
  }
  if (roleSlug.includes("ai-security")) {
    return "ai-security";
  }
  if (roleSlug.includes("appsec") || roleSlug.includes("devsecops")) {
    return "appsec";
  }
  if (roleSlug.includes("ot-security")) {
    return "ot-security";
  }
  if (roleSlug === "security-engineer") {
    return "azure";
  }
  if (roleSlug.includes("dfir")) {
    return "soc";
  }
  if (roleSlug.includes("malware")) {
    return "pentest";
  }
  if (roleSlug.includes("ai-red-teamer")) {
    return "pentest";
  }
  if (roleSlug.includes("privacy-analyst")) {
    return "grc";
  }
  return null;
}

export function environmentLabel(env: Q3Environment): string {
  const labels: Record<Q3Environment, string> = {
    cloud: "cloud platforms",
    code: "code and applications",
    soc: "a security operations centre",
    business: "policy and risk work across the business",
    attack: "offensive security",
  };
  return labels[env];
}
