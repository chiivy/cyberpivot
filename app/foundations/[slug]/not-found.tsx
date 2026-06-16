import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FoundationModuleNotFound(): React.ReactElement {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-mono text-xl font-semibold text-foreground">
        Module not found
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        That foundation module does not exist or is not available yet.
      </p>
      <Button
        asChild
        className="mt-8 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
      >
        <Link href="/foundations">Back to Foundations</Link>
      </Button>
    </div>
  );
}
