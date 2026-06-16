"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useFoundationProgress } from "@/hooks/use-foundation-progress";

export function DashboardFoundationStartCard(): React.ReactElement | null {
  const { hasActivity } = useFoundationProgress();

  if (hasActivity) {
    return null;
  }

  return (
    <section className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
      <h2 className="text-lg font-semibold text-foreground">Where to start</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        New to cybersecurity? Start with the Foundation modules. They cover the
        essentials before your role path begins, including networking, Linux,
        Windows, security fundamentals, cloud basics, and Python.
      </p>
      <Button asChild className="mt-5 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400">
        <Link href="/foundations">Go to Foundations</Link>
      </Button>
    </section>
  );
}
