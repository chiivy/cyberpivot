import type { Metadata } from "next";

import { AccountPromptView } from "@/components/onboarding/account-prompt-view";

export const metadata: Metadata = {
  title: "Save your progress",
  description: "Optional account creation to sync your onboarding choices.",
};

export default function OnboardingAccountPage(): React.ReactElement {
  return <AccountPromptView />;
}
