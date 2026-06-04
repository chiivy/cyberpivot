import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Find your path",
  description: "Tell us where you are starting from and get a recommended security role.",
};

export default function OnboardingPage(): React.ReactElement {
  return (
    <PlaceholderPage
      title="Find your path"
      description="Onboarding assessment coming next in V1."
    />
  );
}
