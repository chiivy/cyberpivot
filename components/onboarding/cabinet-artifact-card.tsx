import { Lock } from "lucide-react";

import type { CabinetPreviewItem } from "@/types/onboarding";

interface CabinetArtifactCardProps {
  artifact: CabinetPreviewItem;
}

export function CabinetArtifactCard({
  artifact,
}: CabinetArtifactCardProps): React.ReactElement {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <Lock
          className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
          strokeWidth={2}
          aria-hidden
        />
        <span className="sr-only">Locked</span>
      </div>
      <h2 className="font-mono text-base font-semibold leading-snug text-foreground">
        {artifact.name}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {artifact.description}
      </p>
      <p className="mt-4 text-xs text-zinc-500">
        Unlocks in{" "}
        <span className="text-zinc-400">{artifact.unlocksInModule}</span>
      </p>
      <span className="mt-3 inline-flex w-fit rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
        Locked until you earn it
      </span>
    </article>
  );
}
