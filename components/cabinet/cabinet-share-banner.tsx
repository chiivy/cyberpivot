"use client";

import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CabinetShareBannerProps {
  shareUrl: string;
}

export function CabinetShareBanner({
  shareUrl,
}: CabinetShareBannerProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [shareUrl]);

  return (
    <section className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-foreground">Share your cabinet</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Send this link to employers, recruiters, or mentors. It shows your
        unlocked artifacts only.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <code
          className={cn(
            "flex-1 truncate rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-cyan-200",
          )}
        >
          {shareUrl}
        </code>
        <Button
          type="button"
          variant="outline"
          className="shrink-0 border-white/15 bg-transparent"
          onClick={() => void handleCopy()}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden />
              Copy link
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
