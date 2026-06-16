import type { Metadata } from "next";
import Link from "next/link";

import { FoundationModuleCards } from "@/components/foundations/foundation-module-cards";
import { Button } from "@/components/ui/button";
import { getFoundationModuleMetaList } from "@/lib/foundations/get-foundation-module";
export const metadata: Metadata = {
  title: "Foundation Layer",
  description:
    "Six shared foundation modules covering networking, Linux, Windows, security fundamentals, cloud, and Python before you start a role path.",
};

export default function FoundationsIndexPage(): React.ReactElement {
  const modules = getFoundationModuleMetaList();

  return (
    <div className="marketing-page min-h-full">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <header className="text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Level 1
          </p>
          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Foundation Layer
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            Shared technical baseline before role paths. Module 1 is available
            now. Work through what you need based on your onboarding entry
            point.
          </p>
        </header>

        <div className="mt-12">
          <FoundationModuleCards modules={modules} />
        </div>

        <section className="mt-16 rounded-lg border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <p className="text-base leading-relaxed text-zinc-300">
            Once you have worked through the Foundation modules, you are ready to
            choose a role path and start building your cabinet.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
            >
              <Link href="/onboarding">Find your path</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/15 bg-transparent text-zinc-200 hover:bg-white/[0.04]"
            >
              <Link href="/roles">Browse all roles</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
