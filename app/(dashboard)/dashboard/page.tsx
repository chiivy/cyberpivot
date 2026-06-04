import { OnboardingMigrator } from "@/components/onboarding/onboarding-migrator";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function DashboardPage(): React.ReactElement {
  return (
    <>
      <OnboardingMigrator />
      <PlaceholderPage
        title="Dashboard"
        description="Progress, streaks, and journey map."
      />
    </>
  );
}
