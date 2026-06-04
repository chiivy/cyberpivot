"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Button } from "@/components/ui/button";
import { CABINET_BY_PATH } from "@/lib/onboarding/data";
import { readOnboardingState } from "@/lib/onboarding/storage";
import type { OnboardingPersistedState, PathSlug } from "@/types/onboarding";

const PATH_LABELS: Record<PathSlug, string> = {
  azure: "Cloud Security Azure",
  pentest: "Penetration Testing",
  soc: "SOC Analyst",
  grc: "GRC Analyst",
  appsec: "Application Security",
};

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

  const pathSlug = state.chosenPath;
  const items = CABINET_BY_PATH[pathSlug];
  const pathLabel = PATH_LABELS[pathSlug];

  return (
    <OnboardingShell className="!max-w-3xl !justify-start !py-16">
      <header className="mb-10 text-center">
        <h1 className="text-xl font-medium leading-snug text-foreground sm:text-2xl">
          Here&apos;s what you&apos;ll have built by the time you&apos;re done.
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{pathLabel} path</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2" role="list">
        {items.map((item) => (
          <li key={item.name}>
            <article className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <Lock
                className="mb-3 h-4 w-4 text-zinc-500"
                strokeWidth={2}
                aria-hidden
              />
              <h2 className="font-mono text-base font-medium leading-snug text-zinc-200">
                {item.name}
              </h2>
              <p className="mt-3 text-xs text-zinc-500">
                Unlocks in{" "}
                <span className="text-zinc-400">{item.unlocksInModule}</span>
              </p>
              <span className="mt-4 inline-flex w-fit rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                Locked until you earn it
              </span>
            </article>
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
