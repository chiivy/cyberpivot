"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { CabinetSummaryField } from "@/components/cabinet/cabinet-summary-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  notifyCabinetUpdated,
  useModuleCompletion,
} from "@/hooks/use-module-completion";
import { completeModule } from "@/lib/cabinet/complete-module";
import {
  CABINET_SUMMARY_MAX_LENGTH,
  validateCabinetSummary,
} from "@/lib/cabinet/validate-summary";
import { validateExternalLinkUrl } from "@/lib/cabinet/validate-link-url";

interface MarkModuleCompleteProps {
  contentArea: string;
  moduleSlug: string;
  artifactName: string;
}

type CompletePhase = "ready" | "loading" | "details" | "done" | "guest";

export function MarkModuleComplete({
  contentArea,
  moduleSlug,
  artifactName,
}: MarkModuleCompleteProps): React.ReactElement {
  const router = useRouter();
  const { user, ready: authReady } = useAuth();
  const { completed, ready: completionReady } = useModuleCompletion(
    contentArea,
    moduleSlug,
  );
  const [phase, setPhase] = useState<CompletePhase>("ready");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState<string | null>(null);
  const [savingDetails, setSavingDetails] = useState(false);
  const initialSyncDone = useRef(false);

  useEffect(() => {
    if (!completionReady || initialSyncDone.current) {
      return;
    }

    initialSyncDone.current = true;

    if (completed) {
      setPhase("done");
    }
  }, [completed, completionReady]);

  const handleMarkComplete = useCallback(async (): Promise<void> => {
    setErrorMessage(null);
    setPhase("loading");

    const result = await completeModule({
      contentArea,
      moduleSlug,
      artifactName,
    });

    if (!result.success) {
      setErrorMessage(result.error);
      setPhase(user ? "ready" : "guest");
      return;
    }

    router.refresh();
    notifyCabinetUpdated();
    setPhase("details");
  }, [artifactName, contentArea, moduleSlug, router, user]);

  const handleSaveDetails = useCallback(async (): Promise<void> => {
    const summaryValidation = validateCabinetSummary(summary);
    if (!summaryValidation.valid) {
      setErrorMessage(summaryValidation.error);
      return;
    }

    const linkValidation = validateExternalLinkUrl(linkUrl);
    if (!linkValidation.valid) {
      setLinkError(linkValidation.error);
      return;
    }

    setLinkError(null);
    setSavingDetails(true);
    setErrorMessage(null);

    const result = await completeModule({
      contentArea,
      moduleSlug,
      artifactName,
      summary: summaryValidation.normalized,
      linkUrl: linkValidation.normalized,
    });

    setSavingDetails(false);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    router.refresh();
    notifyCabinetUpdated();
    setPhase("done");
  }, [artifactName, contentArea, linkUrl, moduleSlug, router, summary]);

  const handleSkipDetails = useCallback((): void => {
    setPhase("done");
  }, []);

  if (!authReady || !completionReady) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-5">
        <p className="text-sm text-zinc-500">Loading progress…</p>
      </div>
    );
  }

  if (!user || phase === "guest") {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-5">
        <p className="text-sm leading-relaxed text-zinc-400">
          You need an account to save progress and unlock cabinet artifacts.
          Sign in or create a free account to keep your work and build your
          portfolio.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
          >
            <Link href={`/login?next=/foundations/${moduleSlug}`}>Sign in</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/15 bg-transparent">
            <Link href={`/signup?next=/foundations/${moduleSlug}`}>
              Create account
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "details") {
    return (
      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] px-6 py-5">
        <p className="font-medium text-cyan-100">Module saved</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Optional: add a short summary or a link to your writeup. You can skip
          this now and update it later from your cabinet.
        </p>

        {errorMessage ? (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-5 space-y-4">
          <CabinetSummaryField
            id={`summary-${moduleSlug}`}
            value={summary}
            onChange={setSummary}
          />
          <div>
            <label
              htmlFor={`link-${moduleSlug}`}
              className="text-sm font-medium text-zinc-300"
            >
              Link to your writeup, blog post, or LinkedIn post, if you have one
            </label>
            <Input
              id={`link-${moduleSlug}`}
              type="url"
              value={linkUrl}
              onChange={(event) => {
                setLinkUrl(event.target.value);
                setLinkError(null);
              }}
              placeholder="https://"
              className="mt-2 border-white/15 bg-white/[0.02]"
            />
            {linkError ? (
              <p role="alert" className="mt-2 text-sm text-red-300">
                {linkError}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => void handleSaveDetails()}
            disabled={
              savingDetails || summary.trim().length > CABINET_SUMMARY_MAX_LENGTH
            }
            className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
          >
            {savingDetails ? "Saving…" : "Save details"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-white/15 bg-transparent"
            onClick={handleSkipDetails}
          >
            Skip for now
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06] px-6 py-5">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden />
          <div>
            <p className="font-medium text-cyan-100">Module complete</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <Link href="/cabinet" className="text-cyan-300 hover:text-cyan-200">
                {artifactName}
              </Link>{" "}
              is unlocked in your cabinet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-6 py-5">
      <p className="text-sm leading-relaxed text-zinc-400">
        Finished the lab and documented your analysis? Mark this module complete
        to unlock your cabinet artifact.
      </p>

      {errorMessage ? (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="button"
        onClick={() => void handleMarkComplete()}
        disabled={phase === "loading"}
        className="mt-4 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
      >
        {phase === "loading" ? "Saving…" : "Mark as complete"}
      </Button>
    </div>
  );
}
