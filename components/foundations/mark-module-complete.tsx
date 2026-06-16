"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  isFoundationModuleComplete,
  markFoundationModuleComplete,
} from "@/lib/foundations/progress";

interface MarkModuleCompleteProps {
  moduleSlug: string;
  artifactSlug: string;
  artifactName: string;
}

export function MarkModuleComplete({
  moduleSlug,
  artifactSlug,
  artifactName,
}: MarkModuleCompleteProps): React.ReactElement {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setCompleted(isFoundationModuleComplete(moduleSlug));

    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setAuthed(Boolean(data.user));
    });
  }, [moduleSlug]);

  const handleComplete = useCallback(async (): Promise<void> => {
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setAuthed(false);
      setLoading(false);
      return;
    }

    markFoundationModuleComplete(moduleSlug, artifactSlug);
    setCompleted(true);
    window.dispatchEvent(new CustomEvent("cyberpivot-foundation-progress"));
    setLoading(false);
  }, [moduleSlug, artifactSlug]);

  if (completed) {
    return (
      <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06] px-6 py-5">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
          <div>
            <p className="font-medium text-cyan-100">Module complete</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <span className="text-zinc-300">{artifactName}</span> is unlocked
              in your cabinet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authed === false) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-5">
        <p className="text-sm leading-relaxed text-zinc-400">
          Sign in to track progress and unlock your cabinet artifact.
        </p>
        <Button
          asChild
          className="mt-4 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
        >
          <Link href={`/login?next=/foundations/${moduleSlug}`}>Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-5">
      <p className="text-sm leading-relaxed text-zinc-400">
        Finished the lab and documented your analysis? Mark this module complete
        to unlock your cabinet artifact.
      </p>
      <Button
        type="button"
        onClick={() => void handleComplete()}
        disabled={loading || authed === null}
        className="mt-4 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
      >
        {loading ? "Saving…" : "Mark as complete"}
      </Button>
    </div>
  );
}
