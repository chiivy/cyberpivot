import { OnboardingShell } from "@/components/onboarding/onboarding-shell";

export default function OnboardingLoading(): React.ReactElement {
  return (
    <OnboardingShell narrow>
      <p className="text-center text-sm text-zinc-500">Loading…</p>
    </OnboardingShell>
  );
}
