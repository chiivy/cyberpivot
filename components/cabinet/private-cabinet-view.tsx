"use client";

import { useEffect, useMemo } from "react";

import { CabinetModuleCard } from "@/components/cabinet/cabinet-module-card";
import { CabinetShareBanner } from "@/components/cabinet/cabinet-share-banner";
import { clearCabinetSessionSyncFlag } from "@/components/cabinet/cabinet-session-sync";
import {
  buildCabinetModuleCards,
  contentAreaLabel,
  getFoundationCabinetDefinitions,
  groupCabinetCardsByContentArea,
} from "@/lib/cabinet/definitions";
import type {
  CabinetArtifactRow,
  CabinetModuleCardData,
  ModuleCompletionRow,
  UserProfileRow,
} from "@/types/cabinet";

interface PrivateCabinetViewProps {
  profile: UserProfileRow;
  completions: ModuleCompletionRow[];
  artifacts: CabinetArtifactRow[];
  shareOrigin: string;
}

export function PrivateCabinetView({
  profile,
  completions,
  artifacts,
  shareOrigin,
}: PrivateCabinetViewProps): React.ReactElement {
  const shareUrl = `${shareOrigin}/cabinet/${profile.cabinet_username}`;

  useEffect(() => {
    clearCabinetSessionSyncFlag();
  }, []);

  const cards = useMemo(() => {
    const definitions = getFoundationCabinetDefinitions();
    return buildCabinetModuleCards({
      definitions,
      completions,
      artifacts,
    });
  }, [artifacts, completions]);

  const grouped = useMemo(() => groupCabinetCardsByContentArea(cards), [cards]);
  const unlockedCount = cards.filter((card) => card.unlocked).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Your cabinet</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Real artifacts from modules you have completed. Locked items show what
          you are building toward next.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {unlockedCount} unlocked artifact{unlockedCount === 1 ? "" : "s"}
        </p>
      </header>

      <div className="mt-8">
        <CabinetShareBanner shareUrl={shareUrl} />
      </div>

      <div className="mt-12 space-y-12">
        {Array.from(grouped.entries()).map(([contentArea, areaCards]) => (
          <section key={contentArea}>
            <h2 className="font-mono text-xl font-semibold text-foreground">
              {contentAreaLabel(contentArea)}
            </h2>
            <div className="mt-6 grid gap-5">
              {areaCards.map((card: CabinetModuleCardData) => (
                <CabinetModuleCard key={`${card.contentArea}:${card.moduleSlug}`} card={card} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
