"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CabinetArtifactCard } from "@/components/onboarding/cabinet-artifact-card";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Button } from "@/components/ui/button";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import {
  CABINET_BY_PATH,
  PATH_COMING_SOON,
  PATH_LABELS,
} from "@/lib/onboarding/cabinet-artifacts";
import { CABINET_PREVIEW_BY_SLUG } from "@/lib/roles/coming-soon-cabinet";
import { getRoleBySlug } from "@/lib/roles/get-role";
import { isV1RoleContent } from "@/types/role";
import type { CabinetPreviewItem, PathSlug } from "@/types/onboarding";

function resolveCabinetPreview(
  chosenPath: PathSlug,
  chosenRoleSlug: string | null,
): {
  items: readonly CabinetPreviewItem[];
  pathLabel: string;
  isComingSoon: boolean;
} {
  if (chosenRoleSlug) {
    const rolePreview = CABINET_PREVIEW_BY_SLUG[chosenRoleSlug];
    const role = getRoleBySlug(chosenRoleSlug);
    if (rolePreview && role) {
      return {
        items: rolePreview,
        pathLabel: role.name,
        isComingSoon: true,
      };
    }
    if (role && isV1RoleContent(role)) {
      return {
        items: CABINET_BY_PATH[role.cabinetPath],
        pathLabel: role.name,
        isComingSoon: false,
      };
    }
  }

  return {
    items: CABINET_BY_PATH[chosenPath],
    pathLabel: PATH_LABELS[chosenPath],
    isComingSoon: PATH_COMING_SOON[chosenPath] === true,
  };
}

export function CabinetPreviewView(): React.ReactElement {
  const router = useRouter();
  const { state, ready } = useOnboardingState();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!state?.answers || !state.chosenPath) {
      router.replace("/onboarding/recommendation");
      return;
    }
    setValidated(true);
  }, [ready, router, state]);

  if (!ready || !validated || !state?.chosenPath) {
    return (
      <OnboardingShell>
        <p className="text-center text-sm text-zinc-500">Loading…</p>
      </OnboardingShell>
    );
  }

  const { items, pathLabel, isComingSoon } = resolveCabinetPreview(
    state.chosenPath,
    state.chosenRoleSlug,
  );

  return (
    <OnboardingShell alignTop wide>
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
