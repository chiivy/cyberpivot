"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { useIntroProgress } from "@/hooks/use-intro-progress";
import type { IntroSectionMeta } from "@/types/intro";
import { cn } from "@/lib/utils";

interface IntroSectionCardsProps {
  sections: readonly IntroSectionMeta[];
}

function ReadBadge(): React.ReactElement {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300/90">
      <Check className="h-3 w-3" aria-hidden />
      Read
    </span>
  );
}

export function IntroSectionCards({
  sections,
}: IntroSectionCardsProps): React.ReactElement {
  const { isRead } = useIntroProgress();
  const readCount = sections.filter((section) => isRead(section.slug)).length;

  return (
    <div>
      <p className="text-sm text-zinc-500">
        {readCount} of {sections.length} sections read
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
        {sections.map((section) => {
          const read = isRead(section.slug);
          return (
            <li key={section.slug} className="flex">
              <Link
                href={`/intro/${section.slug}`}
                className={cn(
                  "group flex h-full w-full flex-col rounded-lg border p-5 transition-colors",
                  "border-white/10 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.04]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  read && "border-cyan-500/15 bg-cyan-500/[0.03]",
                )}
              >
                <div className="flex min-h-[1.375rem] items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-wide text-cyan-400/80">
                    Section {section.section}
                  </span>
                  <span className={cn("shrink-0", !read && "invisible")} aria-hidden={!read}>
                    <ReadBadge />
                  </span>
                </div>
                <h2 className="mt-3 font-mono text-lg font-semibold leading-snug text-foreground group-hover:text-cyan-100">
                  {section.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center gap-1 border-t border-white/[0.06] pt-4 text-xs text-zinc-500 group-hover:text-cyan-400/80">
                  <span>{section.readingTime}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
