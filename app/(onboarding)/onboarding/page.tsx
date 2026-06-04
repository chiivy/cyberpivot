import type { Metadata } from "next";

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
  title: "Find your path",
  description:
    "Answer a few questions and get a starting point that matches your background.",
};

export default function OnboardingPage(): React.ReactElement {
  return <OnboardingFlow />;
}
