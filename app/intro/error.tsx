"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function IntroError({
  reset,
}: {
  reset: () => void;
}): React.ReactElement {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-mono text-xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        We could not load this section. Try again or return to the introduction.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button type="button" onClick={reset} variant="outline">
          Try again
        </Button>
        <Button asChild className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400">
          <Link href="/intro">Back to Introduction</Link>
        </Button>
      </div>
    </div>
  );
}
