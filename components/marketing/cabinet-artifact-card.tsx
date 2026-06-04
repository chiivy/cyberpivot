import { Check } from "lucide-react";

import type { CabinetArtifact } from "@/lib/homepage-data";

interface CabinetArtifactCardProps {
  artifact: CabinetArtifact;
}

export function CabinetArtifactCard({
  artifact,
}: CabinetArtifactCardProps): React.ReactElement {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5">
      <Check
        className="mb-3 h-4 w-4 shrink-0 text-cyan-400"
        strokeWidth={2.5}
        aria-hidden
      />
      <h3 className="font-mono text-base font-medium leading-snug text-foreground">
        {artifact.name}
      </h3>
      <p className="mt-2 text-sm text-zinc-500">{artifact.role}</p>
      <p className="mt-1 text-xs text-zinc-600">{artifact.domain}</p>
    </article>
  );
}
