import type { Metadata } from "next";
import Link from "next/link";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { OnboardingWordmark } from "@/components/onboarding/onboarding-wordmark";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Find your path",
  description:
    "Answer a few questions and get a starting point that matches your background.",
};

export default function OnboardingWelcomePage(): React.ReactElement {
  return (
    <OnboardingShell narrow className="text-center">
      <div className="flex flex-col items-center gap-8">
        <OnboardingWordmark />
        <p className="max-w-sm text-base leading-relaxed text-zinc-400">
          Figure out where you&apos;re starting. We&apos;ll take it from there.
        </p>
        <Button
          size="lg"
          asChild
          className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
        >
          <Link href="/onboarding/assessment">Get Started</Link>
        </Button>
      </div>
    </OnboardingShell>
  );
}
