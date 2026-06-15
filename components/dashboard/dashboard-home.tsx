"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { activeRoleForPath } from "@/lib/onboarding/recommendation-engine";

export function DashboardHome(): React.ReactElement {
  const { state, ready } = useOnboardingState();

  const recommendation = state?.recommendation;
  const activeRole =
    recommendation?.role != null ? activeRoleForPath(recommendation) : null;

  const displayRole =
    recommendation?.role.comingSoon && recommendation.role.targetRoleName
      ? recommendation.role.targetRoleName
      : activeRole?.roleName;

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
        ) : activeRole && displayRole ? (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Based on your onboarding answers, your recommended starting point
              is:
            </p>
            <p className="mt-2 font-mono text-xl font-semibold">
              {displayRole}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeRole.domain} · {activeRole.level}
            </p>
            <Button asChild className="mt-6">
              <Link href={`/roles/${activeRole.roleSlug}`}>Start</Link>
            </Button>
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
