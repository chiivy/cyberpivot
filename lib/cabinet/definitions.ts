import { CONTENT_AREA_FOUNDATION } from "@/types/cabinet";
import type {
  CabinetArtifactRow,
  CabinetModuleCardData,
  CabinetModuleDefinition,
  ModuleCompletionRow,
} from "@/types/cabinet";
import { FOUNDATION_MODULES } from "@/lib/foundations/foundation-modules-index";

export function getFoundationCabinetDefinitions(): CabinetModuleDefinition[] {
  return FOUNDATION_MODULES.map((module) => ({
    contentArea: CONTENT_AREA_FOUNDATION,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    moduleNumber: module.module,
    artifactName: module.cabinetArtifact.name,
    artifactDescription: module.cabinetArtifact.description,
    status: module.status,
  }));
}

export function buildCabinetModuleCards(input: {
  definitions: CabinetModuleDefinition[];
  completions: ModuleCompletionRow[];
  artifacts: CabinetArtifactRow[];
}): CabinetModuleCardData[] {
  const completionByKey = new Map(
    input.completions.map((row) => [
      `${row.content_area}:${row.module_slug}`,
      row,
    ]),
  );
  const artifactByKey = new Map(
    input.artifacts.map((row) => [
      `${row.content_area}:${row.module_slug}`,
      row,
    ]),
  );

  return input.definitions.map((definition) => {
    const key = `${definition.contentArea}:${definition.moduleSlug}`;
    const completion = completionByKey.get(key);
    const artifact = artifactByKey.get(key);
    const unlocked = Boolean(completion && artifact);

    return {
      ...definition,
      unlocked,
      completedAt: completion?.completed_at ?? null,
      summary: artifact?.summary ?? null,
      linkUrl: artifact?.link_url ?? null,
      artifactId: artifact?.id ?? null,
    };
  });
}

export function groupCabinetCardsByContentArea(
  cards: CabinetModuleCardData[],
): Map<string, CabinetModuleCardData[]> {
  const grouped = new Map<string, CabinetModuleCardData[]>();

  for (const card of cards) {
    const existing = grouped.get(card.contentArea) ?? [];
    existing.push(card);
    grouped.set(card.contentArea, existing);
  }

  return grouped;
}

export function contentAreaLabel(contentArea: string): string {
  if (contentArea === CONTENT_AREA_FOUNDATION) {
    return "Foundation";
  }

  return contentArea
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function moduleSourceLabel(card: CabinetModuleCardData): string {
  return `${contentAreaLabel(card.contentArea)} · Module ${card.moduleNumber}`;
}
