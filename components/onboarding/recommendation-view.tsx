"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { OnboardingWordmark } from "@/components/onboarding/onboarding-wordmark";
import { Button } from "@/components/ui/button";
import { securityDomains } from "@/lib/homepage-data";
import {
  domainIdToPathSlug,
  getRecommendedRoles,
  pathSlugFromRoleSlug,
} from "@/lib/onboarding/recommendation";
import { readOnboardingState, writeOnboardingState } from "@/lib/onboarding/storage";
import { cn } from "@/lib/utils";
import type { OnboardingPersistedState, PathSlug } from "@/types/onboarding";

export function RecommendationView(): React.ReactElement {
  const router = useRouter();
  const [state, setState] = useState<OnboardingPersistedState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readOnboardingState();
    if (!stored?.answers) {
      router.replace("/onboarding");
      return;
    }
    setState(stored);
    setReady(true);
  }, [router]);

  const selectPath = (
    pathSlug: PathSlug,
    domainId: string,
    roleSlug: string | null,
  ): void => {
    if (!state) {
      return;
    }
    const next: OnboardingPersistedState = {
      ...state,
      chosenPath: pathSlug,
      chosenDomainId: domainId,
      chosenRoleSlug: roleSlug,
    };
    writeOnboardingState(next);
    router.push("/onboarding/cabinet-preview");
  };

  if (!ready || !state) {
    return (
      <OnboardingShell narrow>
        <p className="text-center text-sm text-zinc-500">Loading…</p>
      </OnboardingShell>
    );
  }

  const { answers, recommendation } = state;
  const showAllDomains = answers.q4PathKnown === "show-roles";
  const recommendedRoles = getRecommendedRoles(answers.q1Background);

  return (
    <OnboardingShell className="!justify-start !py-16">
      <div className="mb-10 text-center">
        <OnboardingWordmark />
      </div>

      <div className="mb-10 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Your entry point
        </p>
        <h1 className="mt-2 font-mono text-xl font-semibold text-foreground">
          {recommendation.entryLabel}
        </h1>
        <p className="mt-4 text-sm font-medium text-zinc-300">
          {recommendation.startingPointTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {recommendation.startingPointDescription}
        </p>
      </div>

      {showAllDomains ? (
        <section aria-labelledby="domains-heading">
          <h2
            id="domains-heading"
            className="mb-4 text-center text-lg font-medium text-foreground"
          >
            Choose a domain
          </h2>
          <ul className="flex flex-col gap-4" role="list">
            {securityDomains.map((domain) => {
              const defaultPathSlug = domainIdToPathSlug(domain.id);
              if (!defaultPathSlug) {
                return null;
              }
              const v1Role = domain.roles.find((r) => r.v1);
              const roleSlug = v1Role?.slug ?? domain.roles[0].slug;
              const pathSlug =
                pathSlugFromRoleSlug(roleSlug) ?? defaultPathSlug;
              return (
                <li key={domain.id}>
                  <button
                    type="button"
                    onClick={() =>
                      selectPath(pathSlug, domain.id, roleSlug)
                    }
                    className={cn(
                      "w-full rounded-lg border border-white/10 bg-white/[0.02] p-5 text-left transition-colors",
                      "hover:border-cyan-500/40 hover:bg-cyan-500/[0.03]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                    )}
                  >
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {domain.name}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      {domain.description}
                    </p>
                    <ul
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label={`Roles in ${domain.name}`}
                    >
                      {domain.roles.slice(0, 3).map((role) => (
                        <li key={role.slug}>
                          <span className="inline-flex rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-300">
                            {role.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <section aria-labelledby="roles-heading">
          <h2
            id="roles-heading"
            className="mb-4 text-center text-lg font-medium text-foreground"
          >
            Roles that fit your background
          </h2>
          <ul className="flex flex-col gap-3" role="list">
            {recommendedRoles.map((role) => (
              <li key={role.slug}>
                <button
                  type="button"
                  onClick={() =>
                    selectPath(role.pathSlug, role.domainId, role.slug)
                  }
                  className={cn(
                    "relative w-full rounded-lg border p-5 text-left transition-colors",
                    "hover:border-cyan-500/40 hover:bg-cyan-500/[0.03]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                    role.suggested
                      ? "border-cyan-500/40 bg-cyan-500/[0.05]"
                      : "border-white/10 bg-white/[0.02]",
                  )}
                >
                  {role.suggested ? (
                    <span className="absolute right-4 top-4 rounded-md bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-300">
                      Best fit
                    </span>
                  ) : null}
                  {role.comingSoon ? (
                    <span
                      className={cn(
                        "absolute top-4 rounded-md border border-zinc-600/50 bg-zinc-800/80 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-400",
                        role.suggested ? "right-24" : "right-4",
                      )}
                    >
                      Coming soon
                    </span>
                  ) : null}
                  <h3 className="font-mono text-lg font-semibold text-foreground">
                    {role.name}
                  </h3>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recommendation.highlightedPaths?.includes("appsec") ? (
        <p className="mt-6 text-center text-sm text-zinc-500">
          AppSec and API Security are the usual starting points for developers.
        </p>
      ) : null}

      <div className="mt-10 flex justify-center">
        <Button
          variant="ghost"
          className="text-zinc-400"
          onClick={() => router.push("/onboarding")}
        >
          Start over
        </Button>
      </div>
    </OnboardingShell>
  );
}
