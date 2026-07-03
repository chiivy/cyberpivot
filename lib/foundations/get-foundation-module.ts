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

function validateFoundationModuleRegistry(): void {
  const slugs = new Set(FOUNDATION_MODULES.map((entry) => entry.slug));

  for (const entry of FOUNDATION_MODULES) {
    if (entry.status !== "available") {
      continue;
    }

    const filePath = path.join(FOUNDATIONS_DIR, `${entry.slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Foundation module "${entry.slug}" is marked available in foundation-modules-index.ts but ${filePath} does not exist.`,
      );
    }

    if (entry.nextModule !== null && !slugs.has(entry.nextModule)) {
      throw new Error(
        `Foundation module "${entry.slug}" has invalid nextModule "${entry.nextModule}" in foundation-modules-index.ts.`,
      );
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const frontmatterSlug = data.slug;

    if (typeof frontmatterSlug !== "string" || frontmatterSlug !== entry.slug) {
      throw new Error(
        `Foundation module "${entry.slug}" frontmatter slug is "${String(frontmatterSlug)}" in ${filePath}, expected "${entry.slug}".`,
      );
    }

    if (
      typeof data.nextModule === "string" &&
      data.nextModule !== entry.nextModule
    ) {
      throw new Error(
        `Foundation module "${entry.slug}" frontmatter nextModule is "${data.nextModule}" in ${filePath}, expected "${entry.nextModule ?? "null"}".`,
      );
    }
  }
}

validateFoundationModuleRegistry();

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
