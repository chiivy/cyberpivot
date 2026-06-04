import { OnboardingShell } from "@/components/onboarding/onboarding-shell";

export default function CabinetPreviewLoading(): React.ReactElement {
  return (
    <OnboardingShell>
      <p className="text-center text-sm text-zinc-500">Loading…</p>
    </OnboardingShell>
  );
}
