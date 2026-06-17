import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FoundationCompleteNextSteps(): React.ReactElement {
  return (
    <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-cyan-400/80">
        Foundation complete
      </p>
      <h2 className="mt-3 font-mono text-lg font-semibold text-foreground">
        Choose your path
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Foundation is finished. Browse every role across five security domains,
        or retake onboarding now that you have real hands-on experience behind
        your answers.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
        >
          <Link href="/paths">
            Browse paths
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-white/15 bg-transparent text-zinc-200 hover:bg-white/[0.04]"
        >
          <Link href="/onboarding">Retake onboarding</Link>
        </Button>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-zinc-500">
        There is no wrong choice here. Every path ahead builds on everything you
        just did across these six modules.
      </p>
    </div>
  );
}
