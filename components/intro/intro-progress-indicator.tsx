"use client";

import { useIntroProgress } from "@/hooks/use-intro-progress";
import type { IntroSectionMeta } from "@/types/intro";
import { cn } from "@/lib/utils";

interface IntroProgressIndicatorProps {
  sections: readonly IntroSectionMeta[];
  currentSlug: string;
}

export function IntroProgressIndicator({
  sections,
  currentSlug,
}: IntroProgressIndicatorProps): React.ReactElement {
  const { isRead } = useIntroProgress();
  const currentSection = sections.find((s) => s.slug === currentSlug)?.section ?? 1;

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1" aria-hidden>
        {sections.map((section) => {
          const isCurrent = section.slug === currentSlug;
          const read = isRead(section.slug);
          return (
            <span
              key={section.slug}
              className={cn(
                "h-1.5 w-4 rounded-full transition-colors",
                isCurrent && "bg-cyan-400",
                !isCurrent && read && "bg-cyan-500/40",
                !isCurrent && !read && "bg-white/10",
              )}
            />
          );
        })}
      </div>
      <span className="text-xs text-zinc-500">
        Section {currentSection} of {sections.length}
      </span>
    </div>
  );
}
