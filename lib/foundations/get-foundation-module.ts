import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { FOUNDATION_MODULES } from "@/lib/foundations/foundation-modules-index";
import type {
  FoundationCabinetArtifact,
  FoundationModule,
  FoundationModuleMeta,
  FoundationModuleTool,
} from "@/types/foundation";

const FOUNDATIONS_DIR = path.join(process.cwd(), "content/foundations");

export function getFoundationModuleSlugs(): string[] {
  return FOUNDATION_MODULES.filter((m) => m.status === "available").map(
    (m) => m.slug,
  );
}

export function getFoundationModuleMetaList(): readonly FoundationModuleMeta[] {
  return FOUNDATION_MODULES;
}

export function getFoundationModuleMetaBySlug(
  slug: string,
): FoundationModuleMeta | null {
  return FOUNDATION_MODULES.find((m) => m.slug === slug) ?? null;
}

export function getFoundationModuleBySlug(
  slug: string,
): FoundationModule | null {
  const meta = getFoundationModuleMetaBySlug(slug);
  if (!meta || meta.status !== "available") {
    return null;
  }

  const filePath = path.join(FOUNDATIONS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const tools = data.tools as FoundationModuleTool[];
  const enterpriseToolsNote =
    typeof data.enterpriseToolsNote === "string"
      ? data.enterpriseToolsNote
      : undefined;
  const cabinetArtifact = data.cabinetArtifact as Omit<
    FoundationCabinetArtifact,
    "slug"
  >;

  return {
    ...meta,
    title: data.title as string,
    tools,
    enterpriseToolsNote,
    cabinetArtifact: {
      ...cabinetArtifact,
      slug: `${slug}-artifact`,
    },
    content: content.trim(),
  };
}
