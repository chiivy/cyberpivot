"use client";

import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  size?: "default" | "large";
}

export function AnswerOption({
  label,
  selected,
  onSelect,
  size = "default",
}: AnswerOptionProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-lg border text-left transition-all",
        size === "large" ? "px-5 py-5 text-[15px] leading-relaxed" : "px-5 py-4 text-base",
        "hover:border-cyan-500/50 hover:bg-cyan-500/[0.04]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]",
        selected
          ? "border-cyan-500/60 bg-cyan-500/10 text-foreground"
          : "border-white/10 bg-white/[0.02] text-zinc-200",
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
