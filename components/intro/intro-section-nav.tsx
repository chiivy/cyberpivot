"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIntroProgress } from "@/hooks/use-intro-progress";
import type { IntroSectionMeta } from "@/types/intro";

interface IntroSectionNavProps {
  previous: IntroSectionMeta | null;
  next: IntroSectionMeta | null;
  isLastSection: boolean;
}

export function IntroSectionNav({
  previous,
  next,
  isLastSection,
}: IntroSectionNavProps): React.ReactElement {
  const { readSlugs } = useIntroProgress();
  const totalSections = 8;

  return (
    <footer className="mt-16 border-t border-white/[0.08] pt-10 text-left">
      <p className="text-sm text-zinc-500">
        Progress: {readSlugs.length} of {totalSections} sections read
      </p>

      {isLastSection ? (
        <div className="mt-8 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] px-6 py-8 text-left">
          <h2 className="font-mono text-xl font-semibold text-foreground">
            Ready to find your path?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            You have the context. Now pick a role and start building real skills.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
          >
            <Link href="/onboarding">Ready to find your path?</Link>
          </Button>
        </div>
      ) : null}

      <nav
        className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between"
        aria-label="Section navigation"
      >
        {previous ? (
          <Link
            href={`/intro/${previous.slug}`}
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            <span>
              <span className="block text-xs text-zinc-500">Previous</span>
              <span className="font-medium text-zinc-300 group-hover:text-cyan-100">
                {previous.title}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/intro/${next.slug}`}
            className="group inline-flex items-center justify-end gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-200 sm:text-right"
          >
            <span>
              <span className="block text-xs text-zinc-500">Next</span>
              <span className="font-medium text-zinc-300 group-hover:text-cyan-100">
                {next.title}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        ) : null}
      </nav>

      <p className="mt-8 text-left">
        <Link
          href="/intro"
          className="text-sm text-zinc-500 hover:text-cyan-300"
        >
          Back to all sections
        </Link>
      </p>
    </footer>
  );
}
