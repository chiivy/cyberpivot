import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getBridgeSuggestionForRoleSlug } from "@/lib/onboarding/recommendation-engine";

interface RoleBridgeSuggestionProps {
  roleSlug: string;
}

export function RoleBridgeSuggestion({
  roleSlug,
}: RoleBridgeSuggestionProps): React.ReactElement | null {
  const bridge = getBridgeSuggestionForRoleSlug(roleSlug);
  if (!bridge) {
    return null;
  }

  return (
    <section className="mt-8 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
      <h2 className="font-mono text-sm font-semibold text-cyan-300">
        Start with {bridge.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {bridge.explanation}
      </p>
      <Button
        asChild
        size="sm"
        className="mt-4 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
      >
        <Link href={`/roles/${bridge.slug}`}>Go to {bridge.name}</Link>
      </Button>
    </section>
  );
}
