"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { DashboardFoundationStartCard } from "@/components/dashboard/dashboard-foundation-start-card";
import { useFoundationProgress } from "@/hooks/use-foundation-progress";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { getRoleBySlug } from "@/lib/roles/get-role";
import { isV1RoleContent } from "@/types/role";

export function DashboardHome(): React.ReactElement {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const { state, ready } = useOnboardingState();
  const { hasActivity } = useFoundationProgress();

  const roleSlug = useMemo((): string | null => {
    if (state?.chosenRoleSlug) {
      return state.chosenRoleSlug;
    }
    if (roleParam) {
      return roleParam;
    }
    return state?.recommendation?.role.roleSlug ?? null;
  }, [roleParam, state?.chosenRoleSlug, state?.recommendation?.role.roleSlug]);

  const rolePage = useMemo(
    () => (roleSlug ? getRoleBySlug(roleSlug) : null),
    [roleSlug],
  );

  const recommendedRole = state?.recommendation?.role ?? null;

  const displayRole = rolePage
    ? rolePage.name
    : recommendedRole?.comingSoon && recommendedRole.targetRoleName
      ? recommendedRole.targetRoleName
      : recommendedRole?.roleName;

  const displayDomain = rolePage?.domain ?? recommendedRole?.domain;
  const displayLevel = rolePage?.level ?? recommendedRole?.level;

  const learningHref = roleSlug ? `/roles/${roleSlug}` : "/paths";

  const hasProgress = Boolean(roleSlug && displayRole);

  const showFoundationStartCard =
    ready &&
    state?.recommendation.entryPoint === "A" &&
    !hasActivity;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to CyberPivot</h1>
      <p className="mt-3 text-muted-foreground">
        Your home base for learning, labs, and building a real security
        portfolio.
      </p>

      {showFoundationStartCard ? (
        <div className="mt-12">
          <DashboardFoundationStartCard />
        </div>
      ) : null}

      <section className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Continue where you left off</h2>

        {!ready ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : hasProgress && displayRole ? (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Your selected path:{" "}
              <span className="text-foreground">{displayRole}</span>
              {rolePage && !isV1RoleContent(rolePage) ? (
                <span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Coming soon
                </span>
              ) : null}
            </p>
            <p className="mt-2 font-mono text-xl font-semibold">{displayRole}</p>
            {displayDomain && displayLevel ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {displayDomain} · {displayLevel}
              </p>
            ) : null}
            <Button asChild className="mt-6">
              <Link href={learningHref}>
                {rolePage && !isV1RoleContent(rolePage) ? "View role page" : "Start"}
              </Link>
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
