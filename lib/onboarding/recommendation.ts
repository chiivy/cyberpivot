import type {
  EntryPoint,
  OnboardingAnswers,
  OnboardingRecommendation,
  PathSlug,
  Q1Background,
  RecommendedRole,
} from "@/types/onboarding";

const ENTRY_LABELS: Record<EntryPoint, string> = {
  A: "Complete beginner",
  B: "IT background",
  C: "Developer moving into security",
  D: "Already in security",
};

const FOUNDATION_MODULES = {
  module1: {
    title: "Foundation Module 1 — How the Internet Actually Works",
    description:
      "IP addressing, DNS, HTTP, and your first packet capture in Wireshark. Built around a real troubleshooting scenario.",
  },
  module2: {
    title: "Foundation Module 2 — Operating Systems for Security",
    description:
      "Windows and Linux fundamentals you need before touching security tools. Navigate a machine like you would on the job.",
  },
  module3: {
    title: "Foundation Module 3 — Security Fundamentals",
    description:
      "CIA triad, threat modeling, and common attack types. Your first threat briefing as a new analyst.",
  },
} as const;

export function computeRecommendation(
  answers: OnboardingAnswers,
): OnboardingRecommendation {
  const { q1Background, q3Networking } = answers;

  if (q1Background === "beginner") {
    return {
      entryPoint: "A",
      entryLabel: ENTRY_LABELS.A,
      startingPointTitle: FOUNDATION_MODULES.module1.title,
      startingPointDescription: FOUNDATION_MODULES.module1.description,
    };
  }

  if (q1Background === "it") {
    const useModule3 =
      q3Networking === "yes" || q3Networking === "somewhat";
    const foundationModule = useModule3
      ? FOUNDATION_MODULES.module3
      : FOUNDATION_MODULES.module2;
    return {
      entryPoint: "B",
      entryLabel: ENTRY_LABELS.B,
      startingPointTitle: foundationModule.title,
      startingPointDescription: foundationModule.description,
    };
  }

  if (q1Background === "developer") {
    return {
      entryPoint: "C",
      entryLabel: ENTRY_LABELS.C,
      startingPointTitle: "Application & Product Security paths",
      startingPointDescription:
        "You already write code. AppSec and API security paths build on that. DevSecOps is there when you want pipeline work.",
      highlightedPaths: ["appsec"],
    };
  }

  return {
    entryPoint: "D",
    entryLabel: ENTRY_LABELS.D,
    startingPointTitle: "Pick your role",
    startingPointDescription:
      "Skip the foundations. Choose a role and jump into the modules that match where you want to go next.",
  };
}

export function getRecommendedRoles(
  q1Background: Q1Background,
): RecommendedRole[] {
  switch (q1Background) {
    case "beginner":
      return [
        {
          name: "SOC Analyst",
          slug: "soc-analyst",
          domainId: "defensive-security",
          pathSlug: "soc",
          suggested: true,
        },
        {
          name: "GRC Analyst",
          slug: "grc-analyst",
          domainId: "governance-risk-compliance",
          pathSlug: "grc",
        },
        {
          name: "Cloud Security Azure",
          slug: "cloud-security-azure",
          domainId: "cloud-infrastructure-security",
          pathSlug: "azure",
        },
      ];
    case "it":
      return [
        {
          name: "Cloud Security Azure",
          slug: "cloud-security-azure",
          domainId: "cloud-infrastructure-security",
          pathSlug: "azure",
          suggested: true,
        },
        {
          name: "SOC Analyst",
          slug: "soc-analyst",
          domainId: "defensive-security",
          pathSlug: "soc",
        },
        {
          name: "Penetration Tester",
          slug: "penetration-tester",
          domainId: "offensive-security",
          pathSlug: "pentest",
        },
      ];
    case "developer":
      return [
        {
          name: "AppSec Engineer",
          slug: "appsec-engineer",
          domainId: "application-product-security",
          pathSlug: "appsec",
          suggested: true,
        },
        {
          name: "API Security Engineer",
          slug: "api-security-engineer",
          domainId: "application-product-security",
          pathSlug: "appsec",
        },
        {
          name: "DevSecOps Engineer",
          slug: "devsecops-engineer",
          domainId: "application-product-security",
          pathSlug: "appsec",
        },
      ];
    case "security":
      return [
        {
          name: "Penetration Tester",
          slug: "penetration-tester",
          domainId: "offensive-security",
          pathSlug: "pentest",
          suggested: true,
        },
        {
          name: "SOC Analyst",
          slug: "soc-analyst",
          domainId: "defensive-security",
          pathSlug: "soc",
        },
        {
          name: "Cloud Security Azure",
          slug: "cloud-security-azure",
          domainId: "cloud-infrastructure-security",
          pathSlug: "azure",
        },
        {
          name: "GRC Analyst",
          slug: "grc-analyst",
          domainId: "governance-risk-compliance",
          pathSlug: "grc",
        },
      ];
  }
}

export function domainIdToPathSlug(domainId: string): PathSlug | null {
  const map: Record<string, PathSlug> = {
    "defensive-security": "soc",
    "offensive-security": "pentest",
    "application-product-security": "appsec",
    "cloud-infrastructure-security": "azure",
    "governance-risk-compliance": "grc",
  };
  return map[domainId] ?? null;
}

export function pathSlugFromRoleSlug(roleSlug: string): PathSlug | null {
  if (roleSlug.includes("azure") || roleSlug.includes("cloud-security")) {
    return "azure";
  }
  if (
    roleSlug.includes("pentest") ||
    roleSlug.includes("penetration") ||
    roleSlug.includes("red-team")
  ) {
    return "pentest";
  }
  if (roleSlug.includes("soc") || roleSlug.includes("incident")) {
    return "soc";
  }
  if (roleSlug.includes("grc") || roleSlug.includes("compliance")) {
    return "grc";
  }
  if (
    roleSlug.includes("appsec") ||
    roleSlug.includes("api-security") ||
    roleSlug.includes("devsecops")
  ) {
    return "appsec";
  }
  return null;
}
