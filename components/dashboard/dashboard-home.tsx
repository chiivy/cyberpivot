"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { PATH_LABELS } from "@/lib/onboarding/cabinet-artifacts";
import { activeRoleForPath } from "@/lib/onboarding/recommendation-engine";
import { V1_ROLE_PAGES } from "@/lib/roles/v1-roles";
import type { PathSlug } from "@/types/onboarding";

function isPathSlug(value: string): value is PathSlug {
  return value in PATH_LABELS;
}

export function DashboardHome(): React.ReactElement {
  const searchParams = useSearchParams();
  const pathParam = searchParams.get("path");
  const { state, ready } = useOnboardingState();

  const pathFromUrl = useMemo((): PathSlug | null => {
    if (!pathParam || !isPathSlug(pathParam)) {
      return null;
    }
    return pathParam;
  }, [pathParam]);

  const roleFromPath = useMemo(() => {
    if (!pathFromUrl) {
      return null;
    }
    return (
      V1_ROLE_PAGES.find((role) => role.cabinetPath === pathFromUrl) ?? null
    );
  }, [pathFromUrl]);

  const recommendation = state?.recommendation;
  const activeRole =
    recommendation?.role != null ? activeRoleForPath(recommendation) : null;

  const displayRole = roleFromPath
    ? roleFromPath.name
    : recommendation?.role.comingSoon && recommendation.role.targetRoleName
      ? recommendation.role.targetRoleName
      : activeRole?.roleName;

  const displayDomain = roleFromPath
    ? roleFromPath.domain
    : activeRole?.domain;

  const displayLevel = roleFromPath ? roleFromPath.level : activeRole?.level;

  const startHref = roleFromPath
    ? `/roles/${roleFromPath.slug}`
    : activeRole
      ? `/roles/${activeRole.roleSlug}`
      : null;

  const pathLabel = pathFromUrl ? PATH_LABELS[pathFromUrl] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to CyberPivot</h1>
      <p className="mt-3 text-muted-foreground">
        Your home base for learning, labs, and building a real security
        portfolio.
      </p>

      <section className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Continue where you left off</h2>

        {!ready ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : displayRole && (roleFromPath || activeRole) ? (
          <div className="mt-4">
            {pathLabel ? (
              <p className="text-sm text-muted-foreground">
                Your selected path:{" "}
                <span className="text-foreground">{pathLabel}</span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Based on your onboarding answers, your recommended starting point
                is:
              </p>
            )}
            <p className="mt-2 font-mono text-xl font-semibold">{displayRole}</p>
            {displayDomain && displayLevel ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {displayDomain} · {displayLevel}
              </p>
            ) : null}
            {startHref ? (
              <Button asChild className="mt-6">
                <Link href={startHref}>Start</Link>
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              You have not completed onboarding yet. Answer a few questions and
              we will point you at a role that fits your background.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/onboarding">Find your path</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
