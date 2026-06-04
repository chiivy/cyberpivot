"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CabinetArtifactCard } from "@/components/onboarding/cabinet-artifact-card";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Button } from "@/components/ui/button";
import {
  CABINET_BY_PATH,
  PATH_COMING_SOON,
  PATH_LABELS,
} from "@/lib/onboarding/cabinet-artifacts";
import { resolveCabinetPath } from "@/lib/onboarding/resolve-cabinet-path";
import { readOnboardingState } from "@/lib/onboarding/storage";
import type { OnboardingPersistedState } from "@/types/onboarding";

export function CabinetPreviewView(): React.ReactElement {
  const router = useRouter();
  const [state, setState] = useState<OnboardingPersistedState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readOnboardingState();
    if (!stored?.answers || !stored.chosenPath) {
      router.replace("/onboarding/recommendation");
      return;
    }
    setState(stored);
    setReady(true);
  }, [router]);

  if (!ready || !state?.chosenPath) {
    return (
      <OnboardingShell>
        <p className="text-center text-sm text-zinc-500">Loading…</p>
      </OnboardingShell>
    );
  }

  const cabinetPath = resolveCabinetPath(
    state.chosenPath,
    state.chosenRoleSlug,
  );
  const items = CABINET_BY_PATH[cabinetPath];
  const pathLabel = PATH_LABELS[cabinetPath];
  const isComingSoon = PATH_COMING_SOON[cabinetPath] === true;

  return (
    <OnboardingShell className="!max-w-4xl !justify-start !py-16">
      <header className="mb-10 text-center">
        <h1 className="text-xl font-medium leading-snug text-foreground sm:text-2xl">
          Here&apos;s what you&apos;ll have built by the time you&apos;re done.
        </h1>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <p className="text-sm text-zinc-500">{pathLabel}</p>
          {isComingSoon ? (
            <span className="rounded-md border border-zinc-600/50 bg-zinc-800/80 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
              Coming soon
            </span>
          ) : null}
        </div>
        {isComingSoon ? (
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-500">
            This path is not live yet. You can still see what you will build
            when it ships.
          </p>
        ) : null}
      </header>

      <ul className="grid gap-4 sm:grid-cols-2" role="list">
        {items.map((item) => (
          <li key={item.name}>
            <CabinetArtifactCard artifact={item} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button
          size="lg"
          className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
          onClick={() => router.push("/onboarding/account")}
        >
          Start Learning
        </Button>
      </div>
    </OnboardingShell>
  );
}
