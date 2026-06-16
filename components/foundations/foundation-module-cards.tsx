"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { useFoundationProgress } from "@/hooks/use-foundation-progress";
import type { FoundationModuleMeta } from "@/types/foundation";
import { cn } from "@/lib/utils";

interface FoundationModuleCardsProps {
  modules: readonly FoundationModuleMeta[];
}

export function FoundationModuleCards({
  modules,
}: FoundationModuleCardsProps): React.ReactElement {
  const { isComplete } = useFoundationProgress();

  return (
    <ol className="space-y-4" role="list">
      {modules.map((mod) => {
        const available = mod.status === "available";
        const complete = isComplete(mod.slug);

        const inner = (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-wide text-cyan-400/80">
                Module {mod.module}
              </span>
              <span
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                  complete
                    ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300/90"
                    : available
                      ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300/90"
                      : "border-white/10 bg-white/5 text-zinc-500",
                )}
              >
                {complete ? "Complete" : available ? "Available" : "Coming soon"}
              </span>
            </div>
            <h2 className="mt-3 font-mono text-lg font-semibold leading-snug text-foreground">
              {mod.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {mod.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
              <span>{mod.readingTime} read</span>
              <span>{mod.labTime} lab</span>
            </div>
          </>
        );

        if (!available) {
          return (
            <li key={mod.slug}>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5 opacity-75">
                {inner}
              </div>
            </li>
          );
        }

        return (
          <li key={mod.slug}>
            <Link
              href={`/foundations/${mod.slug}`}
              className={cn(
                "group block rounded-lg border p-5 transition-colors",
                "border-white/10 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.04]",
                complete && "border-cyan-500/15 bg-cyan-500/[0.03]",
              )}
            >
              {inner}
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-500 group-hover:text-cyan-400/80">
                Start module
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
