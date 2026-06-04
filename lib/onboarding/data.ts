import type {
  CabinetPreviewItem,
  OnboardingAnswers,
  PathSlug,
  Q1Background,
  Q2Linux,
  Q3Networking,
  Q4PathKnown,
} from "@/types/onboarding";

export interface OnboardingQuestionOption<T extends string> {
  value: T;
  label: string;
}

export interface OnboardingQuestion<T extends string> {
  id: string;
  prompt: string;
  options: readonly OnboardingQuestionOption<T>[];
}

export const ONBOARDING_QUESTIONS: readonly [
  OnboardingQuestion<Q1Background>,
  OnboardingQuestion<Q2Linux>,
  OnboardingQuestion<Q3Networking>,
  OnboardingQuestion<Q4PathKnown>,
] = [
  {
    id: "q1",
    prompt: "Where are you starting from?",
    options: [
      { value: "beginner", label: "Complete beginner, no IT background" },
      { value: "it", label: "I work in IT already" },
      { value: "developer", label: "I'm a developer moving into security" },
      { value: "security", label: "I already work in security" },
    ],
  },
  {
    id: "q2",
    prompt: "Have you used Linux before?",
    options: [
      { value: "comfortable", label: "Yes, comfortably" },
      { value: "little", label: "A little" },
      { value: "never", label: "Never" },
    ],
  },
  {
    id: "q3",
    prompt: "Do you understand basic networking?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "somewhat", label: "Somewhat" },
      { value: "not-really", label: "Not really" },
    ],
  },
  {
    id: "q4",
    prompt: "Do you have a path in mind?",
    options: [
      { value: "show-roles", label: "Yes, show me the roles" },
      { value: "help-choose", label: "Not yet, help me choose" },
    ],
  },
] as const;

export const CABINET_BY_PATH: Record<PathSlug, readonly CabinetPreviewItem[]> = {
  azure: [
    {
      name: "Configured Entra ID tenant",
      unlocksInModule: "Identity & Access Management",
    },
    {
      name: "Working Sentinel workspace",
      unlocksInModule: "Microsoft Sentinel",
    },
    {
      name: "Secure Score report",
      unlocksInModule: "Defender for Cloud",
    },
    {
      name: "IR runbook",
      unlocksInModule: "Incident Response on Azure",
    },
    {
      name: "Security architecture diagram",
      unlocksInModule: "Azure Security Capstone",
    },
  ],
  pentest: [
    {
      name: "Configured Kali environment",
      unlocksInModule: "Reconnaissance & Enumeration",
    },
    {
      name: "Custom nmap scripts",
      unlocksInModule: "Network Scanning",
    },
    {
      name: "Completed pentest report",
      unlocksInModule: "Reporting & Communication",
    },
    {
      name: "Burp Suite findings",
      unlocksInModule: "Web Application Testing",
    },
  ],
  soc: [
    {
      name: "Running Wazuh SIEM",
      unlocksInModule: "SIEM Fundamentals",
    },
    {
      name: "Custom detection rules",
      unlocksInModule: "Detection Engineering",
    },
    {
      name: "IR playbook collection",
      unlocksInModule: "Incident Response",
    },
    {
      name: "Completed incident report",
      unlocksInModule: "SOC Capstone",
    },
  ],
  grc: [
    {
      name: "Complete risk register",
      unlocksInModule: "Risk Management",
    },
    {
      name: "Policy suite",
      unlocksInModule: "Policy & Standards",
    },
    {
      name: "Gap analysis report",
      unlocksInModule: "Compliance Frameworks",
    },
    {
      name: "Audit evidence folder",
      unlocksInModule: "Audit Preparation",
    },
  ],
  appsec: [
    {
      name: "OWASP Top 10 assessment report",
      unlocksInModule: "OWASP Top 10",
    },
    {
      name: "API security testing collection",
      unlocksInModule: "API Security",
    },
    {
      name: "Threat model document",
      unlocksInModule: "Threat Modeling",
    },
    {
      name: "SAST and DAST findings summary",
      unlocksInModule: "Application Security Testing",
    },
  ],
};

export function answersFromPartial(
  partial: Partial<OnboardingAnswers>,
): OnboardingAnswers | null {
  const { q1Background, q2Linux, q3Networking, q4PathKnown } = partial;
  if (!q1Background || !q2Linux || !q3Networking || !q4PathKnown) {
    return null;
  }
  return { q1Background, q2Linux, q3Networking, q4PathKnown };
}
