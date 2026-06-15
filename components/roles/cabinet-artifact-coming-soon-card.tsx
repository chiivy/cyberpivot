import { Clock } from "lucide-react";

import type { CabinetPreviewItem } from "@/types/onboarding";

interface CabinetArtifactComingSoonCardProps {
  artifact: CabinetPreviewItem;
}

export function CabinetArtifactComingSoonCard({
  artifact,
}: CabinetArtifactComingSoonCardProps): React.ReactElement {
  return (
    <article className="flex h-full flex-col rounded-lg border border-amber-500/10 bg-amber-500/[0.02] p-5 opacity-80">
      <div className="mb-3 flex items-start justify-between gap-3">
        <Clock
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-500/50"
          strokeWidth={2}
          aria-hidden
        />
        <span className="sr-only">Path coming soon</span>
      </div>
      <h2 className="font-mono text-base font-semibold leading-snug text-zinc-300">
        {artifact.name}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500">
        {artifact.description}
      </p>
      <p className="mt-4 text-xs text-zinc-600">
        Part of{" "}
        <span className="text-zinc-500">{artifact.unlocksInModule}</span>
      </p>
      <span className="mt-3 inline-flex w-fit rounded-md border border-amber-500/20 bg-amber-500/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-400/80">
        Path coming soon
      </span>
    </article>
  );
}
