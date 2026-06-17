"use client";

import { Lock, Unlock } from "lucide-react";

import { useModuleCompletion } from "@/hooks/use-module-completion";
import { cn } from "@/lib/utils";

interface FoundationCabinetPreviewProps {
  name: string;
  description: string;
  moduleSlug: string;
  contentArea: string;
}

export function FoundationCabinetPreview({
  name,
  description,
  moduleSlug,
  contentArea,
}: FoundationCabinetPreviewProps): React.ReactElement {
  const { completed, ready } = useModuleCompletion(contentArea, moduleSlug);
  const unlocked = ready && completed;

  return (
    <article
      className={cn(
        "rounded-lg border p-5",
        unlocked
          ? "border-cyan-500/25 bg-cyan-500/[0.04]"
          : "border-white/10 bg-white/[0.02] opacity-90",
      )}
    >
      <div className="mb-3 flex items-start gap-3">
        {unlocked ? (
          <Unlock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
        ) : (
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
        )}
      </div>
      <h2 className="font-mono text-base font-semibold leading-snug text-foreground">
        {name}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
      <span
        className={cn(
          "mt-4 inline-flex w-fit rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
          unlocked
            ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300/90"
            : "border-white/10 bg-white/5 text-zinc-500",
        )}
      >
        {unlocked ? "Unlocked in your cabinet" : "Unlocks on completion"}
      </span>
    </article>
  );
}
