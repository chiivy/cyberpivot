import type { Metadata } from "next";

import { RecommendationView } from "@/components/onboarding/recommendation-view";

export const metadata: Metadata = {
  title: "Your starting point",
  description: "Recommended entry point and roles based on your background.",
};

export default function OnboardingRecommendationPage(): React.ReactElement {
  return <RecommendationView />;
}
