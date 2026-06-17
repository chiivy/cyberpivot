"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Pencil, RotateCcw, Unlock } from "lucide-react";

import { CabinetSummaryField } from "@/components/cabinet/cabinet-summary-field";
import { ExternalWriteupLink } from "@/components/cabinet/external-writeup-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notifyCabinetUpdated } from "@/hooks/use-module-completion";
import { updateCabinetArtifactDetails } from "@/lib/cabinet/complete-module";
import { resetModuleProgress } from "@/lib/cabinet/reset-module";
import { moduleSourceLabel } from "@/lib/cabinet/definitions";
import {
  CABINET_SUMMARY_MAX_LENGTH,
  validateCabinetSummary,
} from "@/lib/cabinet/validate-summary";
import { validateExternalLinkUrl } from "@/lib/cabinet/validate-link-url";
import { cn } from "@/lib/utils";
import type { CabinetModuleCardData } from "@/types/cabinet";

interface CabinetModuleCardProps {
  card: CabinetModuleCardData;
}

function formatDate(value: string | null): string | null {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function CabinetModuleCard({
  card,
}: CabinetModuleCardProps): React.ReactElement {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [summary, setSummary] = useState(card.summary ?? "");
  const [linkUrl, setLinkUrl] = useState(card.linkUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);

  const completedDate = formatDate(card.completedAt);
  const locked = !card.unlocked;
  const comingSoon = card.status === "coming-soon";

  const handleSave = async (): Promise<void> => {
    if (!card.artifactId) {
      return;
    }

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
    setSaving(true);
    setErrorMessage(null);

    const result = await updateCabinetArtifactDetails({
      artifactId: card.artifactId,
      summary: summaryValidation.normalized,
      linkUrl: linkValidation.normalized,
    });

    setSaving(false);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    notifyCabinetUpdated();
    setEditing(false);
    router.refresh();
  };

  const handleReset = async (): Promise<void> => {
    setResetting(true);
    setErrorMessage(null);

    const result = await resetModuleProgress({
      contentArea: card.contentArea,
      moduleSlug: card.moduleSlug,
    });

    setResetting(false);

    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    notifyCabinetUpdated();
    setConfirmReset(false);
    router.refresh();
  };

  return (
    <article
      className={cn(
        "rounded-lg border p-5 sm:p-6",
        locked && comingSoon
          ? "border-white/[0.06] bg-white/[0.01] opacity-70"
          : locked
            ? "border-white/10 bg-white/[0.02] opacity-90"
            : "border-cyan-500/20 bg-cyan-500/[0.03]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {locked ? (
            <Lock
              className={cn(
                "mt-1 h-4 w-4 shrink-0",
                comingSoon ? "text-zinc-600" : "text-zinc-500",
              )}
              aria-hidden
            />
          ) : (
            <Unlock className="mt-1 h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
          )}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {moduleSourceLabel(card)}
            </p>
            <h3 className="mt-2 font-mono text-lg font-semibold text-foreground">
              {card.artifactName}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{card.artifactDescription}</p>
          </div>
        </div>
        {comingSoon ? (
          <span className="shrink-0 rounded-md border border-zinc-600/50 bg-zinc-800/80 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Coming soon
          </span>
        ) : null}
      </div>

      {locked ? (
        <p className="mt-5 text-sm text-zinc-500">
          {comingSoon ? (
            <>
              Coming soon. This module is not available yet, so this artifact
              cannot be unlocked right now.
            </>
          ) : (
            <>
              Complete{" "}
              <Link
                href={`/foundations/${card.moduleSlug}`}
                className="text-cyan-400 hover:text-cyan-300"
              >
                {card.moduleTitle}
              </Link>{" "}
              to unlock this artifact.
            </>
          )}
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {completedDate ? (
            <p className="text-sm text-zinc-500">Completed {completedDate}</p>
          ) : null}

          {!editing ? (
            <>
              {card.summary ? (
                <p className="text-sm leading-relaxed text-zinc-300">{card.summary}</p>
              ) : (
                <p className="text-sm text-zinc-500">No summary added yet.</p>
              )}

              {card.linkUrl ? <ExternalWriteupLink href={card.linkUrl} /> : null}

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-white/15 bg-transparent"
                  onClick={() => setEditing(true)}
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden />
                  Edit summary or link
                </Button>

                {!confirmReset ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-white/15 bg-transparent text-zinc-400"
                    onClick={() => setConfirmReset(true)}
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Reset this module
                  </Button>
                ) : (
                  <div className="flex w-full flex-col gap-2 rounded-md border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-sm text-zinc-400">
                      Reset progress for this module? This deletes your completion
                      record and cabinet artifact so you can redo the module.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={resetting}
                        onClick={() => void handleReset()}
                      >
                        {resetting ? "Resetting…" : "Confirm reset"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="border-white/15 bg-transparent"
                        onClick={() => setConfirmReset(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <CabinetSummaryField
                id={`edit-summary-${card.moduleSlug}`}
                value={summary}
                onChange={setSummary}
              />
              <div>
                <label
                  htmlFor={`edit-link-${card.moduleSlug}`}
                  className="text-sm font-medium text-zinc-300"
                >
                  Link (http:// or https:// only)
                </label>
                <Input
                  id={`edit-link-${card.moduleSlug}`}
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
              {errorMessage ? (
                <p role="alert" className="text-sm text-red-300">
                  {errorMessage}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  disabled={saving || summary.trim().length > CABINET_SUMMARY_MAX_LENGTH}
                  onClick={() => void handleSave()}
                  className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-white/15 bg-transparent"
                  onClick={() => {
                    setEditing(false);
                    setSummary(card.summary ?? "");
                    setLinkUrl(card.linkUrl ?? "");
                    setErrorMessage(null);
                    setLinkError(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {errorMessage && !editing && !confirmReset ? (
            <p role="alert" className="text-sm text-red-300">
              {errorMessage}
            </p>
          ) : null}
        </div>
      )}
    </article>
  );
}
