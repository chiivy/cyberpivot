import type {
  OnboardingAnswers,
  Q3Environment,
  Q6CloudPlatform,
  Q6CodeFocus,
  Q6SocFocus,
} from "@/types/onboarding";

export interface QuestionOption<T extends string = string> {
  value: T;
  label: string;
}

export interface FlowQuestion {
  id: string;
  prompt: string;
  options: readonly QuestionOption[];
  largeOptions?: boolean;
}

export const Q1_QUESTION: FlowQuestion = {
  id: "q1",
  prompt: "Where are you starting from?",
  options: [
    { value: "no-background", label: "No IT or tech background" },
    {
      value: "it",
      label: "IT or tech background — helpdesk, networking, sysadmin",
    },
    { value: "developer", label: "I work as a developer or engineer" },
    { value: "security", label: "I already work in cybersecurity" },
  ],
};

export const Q2_QUESTION: FlowQuestion = {
  id: "q2",
  prompt: "When something goes wrong in a system, what is your instinct?",
  largeOptions: true,
  options: [
    {
      value: "investigate",
      label:
        "Investigate it — find out exactly what happened and who did it",
    },
    {
      value: "fix-fast",
      label: "Fix it before it gets worse — contain the damage fast",
    },
    {
      value: "prevention",
      label:
        "Figure out how it could have been prevented — process and policy",
    },
    {
      value: "replicate",
      label:
        "Try to replicate it — understand how an attacker would have done it",
    },
    {
      value: "build-right",
      label:
        "Make sure the system was built to handle it — secure by design",
    },
  ],
};

export const Q3_QUESTION: FlowQuestion = {
  id: "q3",
  prompt: "Where do you imagine yourself working most?",
  largeOptions: true,
  options: [
    {
      value: "cloud",
      label:
        "Inside cloud platforms — dashboards, policies, configurations",
    },
    {
      value: "code",
      label:
        "Inside code and applications — reviewing, testing, securing software",
    },
    {
      value: "soc",
      label:
        "Inside a security operations centre — monitoring, alerts, investigations",
    },
    {
      value: "business",
      label: "Across the business — policies, audits, risk conversations",
    },
    {
      value: "attack",
      label: "On the attack side — finding weaknesses before attackers do",
    },
  ],
};

export const Q4_QUESTION: FlowQuestion = {
  id: "q4",
  prompt: "How comfortable are you working in a terminal or command line?",
  options: [
    { value: "very-comfortable", label: "Very comfortable — I live in the terminal" },
    { value: "somewhat", label: "Somewhat — I can get by" },
    { value: "not-really", label: "Not really — I prefer GUIs and dashboards" },
    { value: "never", label: "Never used one" },
  ],
};

export const Q5_QUESTION: FlowQuestion = {
  id: "q5",
  prompt: "What does success look like for you in 12 months?",
  largeOptions: true,
  options: [
    {
      value: "job-from-scratch",
      label: "I have a job in cybersecurity — starting from scratch",
    },
    {
      value: "it-to-security",
      label: "I have moved from IT into a security role",
    },
    {
      value: "level-up",
      label: "I have levelled up — more senior or more specialised",
    },
    {
      value: "understand-field",
      label: "I understand this field well enough to make a decision",
    },
  ],
};

export function getCloudQ6(): FlowQuestion {
  return {
    id: "q6-cloud",
    prompt: "Which cloud platform does your target employer or industry use most?",
    options: [
      {
        value: "azure",
        label: "Microsoft Azure — most common in enterprise, UK and Europe",
      },
      {
        value: "aws",
        label: "Amazon AWS — most common in tech companies and startups",
      },
      {
        value: "gcp",
        label: "Google GCP — common in data and AI focused companies",
      },
      { value: "not-sure", label: "Not sure yet" },
    ],
  };
}

export function getSocQ6(): FlowQuestion {
  return {
    id: "q6-soc",
    prompt: "What aspect of security operations interests you most?",
    options: [
      {
        value: "monitoring",
        label: "Monitoring alerts and investigating incidents day to day",
      },
      {
        value: "endpoint",
        label: "Going deep on endpoint telemetry and detection engineering",
      },
      {
        value: "hunting",
        label:
          "Proactively hunting for threats that have not triggered alerts yet",
      },
    ],
  };
}

export function getCodeQ6(): FlowQuestion {
  return {
    id: "q6-code",
    prompt: "Where in the development process are you most interested in security?",
    options: [
      {
        value: "applications",
        label: "Reviewing and testing applications before they ship",
      },
      {
        value: "apis",
        label: "Securing APIs and the way services talk to each other",
      },
      {
        value: "pipeline",
        label: "Embedding security into the build and deployment pipeline",
      },
      {
        value: "ai",
        label: "Securing AI-powered features and LLM integrations",
      },
    ],
  };
}

export function needsConditionalQ6(environment: Q3Environment): boolean {
  return environment === "cloud" || environment === "soc" || environment === "code";
}

export function getConditionalQ6(environment: Q3Environment): FlowQuestion | null {
  switch (environment) {
    case "cloud":
      return getCloudQ6();
    case "soc":
      return getSocQ6();
    case "code":
      return getCodeQ6();
    default:
      return null;
  }
}

export const CORE_QUESTIONS: readonly FlowQuestion[] = [
  Q1_QUESTION,
  Q2_QUESTION,
  Q3_QUESTION,
  Q4_QUESTION,
  Q5_QUESTION,
];

export function parseQ6Value(
  environment: Q3Environment,
  value: string,
): OnboardingAnswers["q6"] {
  switch (environment) {
    case "cloud":
      return { type: "cloud", value: value as Q6CloudPlatform };
    case "soc":
      return { type: "soc", value: value as Q6SocFocus };
    case "code":
      return { type: "code", value: value as Q6CodeFocus };
    default:
      return undefined;
  }
}

export function isCompleteAnswers(
  partial: Partial<OnboardingAnswers>,
): partial is OnboardingAnswers {
  const { q1Background, q2WorkInstinct, q3Environment, q4Terminal, q5Goal } =
    partial;
  if (
    !q1Background ||
    !q2WorkInstinct ||
    !q3Environment ||
    !q4Terminal ||
    !q5Goal
  ) {
    return false;
  }
  if (needsConditionalQ6(q3Environment) && !partial.q6) {
    return false;
  }
  return true;
}
