"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { OnboardingWordmark } from "@/components/onboarding/onboarding-wordmark";
import { Button } from "@/components/ui/button";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { activeRoleForPath } from "@/lib/onboarding/recommendation-engine";
import { writeOnboardingState } from "@/lib/onboarding/storage";
import { cn } from "@/lib/utils";
import type { OnboardingPersistedState } from "@/types/onboarding";

export function RecommendationView(): React.ReactElement {
  const router = useRouter();
  const { state, ready } = useOnboardingState();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!state?.answers || !state.recommendation?.role) {
      router.replace("/onboarding");
      return;
    }
    setValidated(true);
  }, [ready, router, state]);

  const continueToCabinet = (): void => {
    if (!state) {
      return;
    }
    const active = activeRoleForPath(state.recommendation);
    const next: OnboardingPersistedState = {
      ...state,
      chosenPath: active.pathSlug,
      chosenDomainId: active.domainId,
      chosenRoleSlug: active.roleSlug,
    };
    writeOnboardingState(next);
    router.push("/onboarding/cabinet-preview");
  };

  if (!ready || !validated || !state) {
    return (
      <OnboardingShell narrow>
        <p className="text-center text-sm text-zinc-500">Loading…</p>
      </OnboardingShell>
    );
  }

  const { recommendation } = state;
  const { role, whyExplanation, foundationFirst } = recommendation;
  const isEntryPointA = recommendation.entryPoint === "A";
  const displayRole = role.comingSoon && role.targetRoleName
    ? role.targetRoleName
    : role.roleName;

  return (
    <OnboardingShell alignTop>
      <div className="mb-10 text-center">
        <OnboardingWordmark />
      </div>

      <section className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Recommended role
        </p>
        <h1 className="mt-2 font-mono text-2xl font-semibold text-foreground">
          {displayRole}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
          <span>{role.domain}</span>
          <span className="text-zinc-600" aria-hidden>
            ·
          </span>
          <span>{role.level}</span>
          {role.comingSoon ? (
            <span className="rounded-md border border-zinc-600/50 bg-zinc-800/80 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
              Coming soon
            </span>
          ) : null}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-zinc-300">Why this fits you</h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-400">
          {whyExplanation}
        </p>
      </section>

      {role.comingSoon && role.bridgeRole ? (
        <section className="mt-8 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
          <h2 className="font-mono text-sm font-semibold text-cyan-300">
            Start with {role.bridgeRole.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {role.bridgeRole.explanation}
          </p>
        </section>
      ) : null}

      {isEntryPointA ? (
        <>
          <section className="mt-8 text-sm text-zinc-500">
            <p className="font-medium text-zinc-400">
              Entry point: {recommendation.entryLabel}
            </p>
            <p className="mt-1">{recommendation.startingPointTitle}</p>
          </section>

          <section className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
            <p className="text-sm leading-relaxed text-zinc-300">
              Before diving into your role path, the Foundation modules cover
              the essentials — networking, Linux, Windows, security
              fundamentals, cloud basics, and Python basics. They are short,
              practical, and built for people starting from scratch.
            </p>
          </section>
        </>
      ) : foundationFirst ? (
        <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium text-zinc-300">Foundations first</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {recommendation.startingPointTitle}.{" "}
            {recommendation.startingPointDescription}
          </p>
        </section>
      ) : (
        <section className="mt-8 text-sm text-zinc-500">
          <p className="font-medium text-zinc-400">
            Entry point: {recommendation.entryLabel}
          </p>
          <p className="mt-1">{recommendation.startingPointTitle}</p>
        </section>
      )}

      <div className="mt-10 flex flex-col items-center gap-4">
        {isEntryPointA ? (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              size="lg"
              asChild
              className="w-full bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400 sm:w-auto"
            >
              <Link href="/foundations">Start with Foundations</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/15 bg-transparent text-zinc-200 hover:bg-white/[0.04] sm:w-auto"
              onClick={continueToCabinet}
            >
              {role.comingSoon && role.bridgeRole
                ? `Preview ${role.bridgeRole.name} cabinet`
                : "Preview your cabinet"}
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="w-full bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400 sm:w-auto"
            onClick={continueToCabinet}
          >
            {role.comingSoon && role.bridgeRole
              ? `Preview ${role.bridgeRole.name} cabinet`
              : "Preview your cabinet"}
          </Button>
        )}
        <Button
          variant="ghost"
          className="text-zinc-400"
          onClick={() => router.push("/onboarding")}
        >
          Start over
        </Button>
      </div>

      <p className={cn("mt-12 text-center text-sm text-zinc-500")}>
        Want to explore before committing?{" "}
        <Link href="/roles" className="text-zinc-400 underline-offset-4 hover:text-cyan-300 hover:underline">
          Browse all 25+ roles across five domains.
        </Link>
      </p>
    </OnboardingShell>
  );
}
