import type {
  OnboardingAnswers,
  Q1Background,
  Q2Linux,
  Q3Networking,
  Q4PathKnown,
} from "@/types/onboarding";

export {
  CABINET_BY_PATH,
  PATH_COMING_SOON,
  PATH_LABELS,
} from "@/lib/onboarding/cabinet-artifacts";

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

export function answersFromPartial(
  partial: Partial<OnboardingAnswers>,
): OnboardingAnswers | null {
  const { q1Background, q2Linux, q3Networking, q4PathKnown } = partial;
  if (!q1Background || !q2Linux || !q3Networking || !q4PathKnown) {
    return null;
  }
  return { q1Background, q2Linux, q3Networking, q4PathKnown };
}
