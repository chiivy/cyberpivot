import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { OnboardingMigrator } from "@/components/onboarding/onboarding-migrator";

export default function DashboardPage(): React.ReactElement {
  return (
    <>
      <OnboardingMigrator />
      <DashboardHome />
    </>
  );
}
