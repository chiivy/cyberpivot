"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { ContentProse } from "@/components/content/content-prose";
import { cn } from "@/lib/utils";

interface FoundationAnswerGuideProps {
  title: string;
  markdown: string;
}

export function FoundationAnswerGuide({
  markdown,
}: FoundationAnswerGuideProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-14 rounded-lg border border-white/10 bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-sm font-medium text-zinc-300">
          Answer Guide — nb6-http.pcap only
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-500 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="border-t border-white/[0.06] px-5 pb-5 pt-2">
          <ContentProse content={markdown} />
        </div>
      ) : null}
    </div>
  );
}

interface FoundationTaskCardProps {
  number: number;
  title: string;
  markdown: string;
}

export function FoundationTaskCard({
  number,
  title,
  markdown,
}: FoundationTaskCardProps): React.ReactElement {
  return (
    <article className="rounded-lg border border-cyan-500/15 bg-cyan-500/[0.03] p-5 sm:p-6">
      <p className="font-mono text-xs uppercase tracking-wide text-cyan-400/80">
        Task {number}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4">
        <ContentProse content={markdown} />
      </div>
    </article>
  );
}
