import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function IntroSectionNotFound(): React.ReactElement {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-mono text-xl font-semibold text-foreground">
        Section not found
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        That introduction section does not exist.
      </p>
      <Button
        asChild
        className="mt-8 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
      >
        <Link href="/intro">Back to Introduction</Link>
      </Button>
    </div>
  );
}
