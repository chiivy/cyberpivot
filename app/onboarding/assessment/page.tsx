import type { Metadata } from "next";

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
  title: "Your assessment",
  description: "Answer a few questions to find your recommended security role.",
};

export default function OnboardingAssessmentPage(): React.ReactElement {
  return <OnboardingFlow />;
}
