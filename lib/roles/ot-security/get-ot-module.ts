import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { OT_SECURITY_MODULES } from "@/lib/roles/ot-security/ot-modules-index";
import type {
  RolePathCabinetArtifact,
  RolePathModule,
  RolePathModuleMeta,
  RolePathModuleTool,
} from "@/types/role-path";

const OT_SECURITY_DIR = path.join(
  process.cwd(),
  "content/paths/ot-security",
);

function validateOtModuleRegistry(): void {
  const slugs = new Set(OT_SECURITY_MODULES.map((entry) => entry.slug));

  for (const entry of OT_SECURITY_MODULES) {
    if (entry.status !== "available") {
      continue;
    }

    const filePath = path.join(OT_SECURITY_DIR, `${entry.slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `OT Security module "${entry.slug}" is marked available in ot-modules-index.ts but ${filePath} does not exist.`,
      );
    }

    if (entry.nextModule !== null && !slugs.has(entry.nextModule)) {
      throw new Error(
        `OT Security module "${entry.slug}" has invalid nextModule "${entry.nextModule}" in ot-modules-index.ts.`,
      );
    }

    if (
      entry.previousModule !== null &&
      !slugs.has(entry.previousModule)
    ) {
      throw new Error(
        `OT Security module "${entry.slug}" has invalid previousModule "${entry.previousModule}" in ot-modules-index.ts.`,
      );
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    const frontmatterSlug = data.slug;

    if (typeof frontmatterSlug !== "string" || frontmatterSlug !== entry.slug) {
      throw new Error(
        `OT Security module "${entry.slug}" frontmatter slug is "${String(frontmatterSlug)}" in ${filePath}, expected "${entry.slug}".`,
      );
    }

    if (
      typeof data.nextModule === "string" &&
      data.nextModule !== entry.nextModule
    ) {
      throw new Error(
        `OT Security module "${entry.slug}" frontmatter nextModule is "${data.nextModule}" in ${filePath}, expected "${entry.nextModule ?? "null"}".`,
      );
    }
  }
}

validateOtModuleRegistry();

export function getOtSecurityModuleSlugs(): string[] {
  return OT_SECURITY_MODULES.filter((module) => module.status === "available").map(
    (module) => module.slug,
  );
}

export function getOtSecurityModuleMetaList(): readonly RolePathModuleMeta[] {
  return OT_SECURITY_MODULES;
}

export function getOtSecurityModuleMetaBySlug(
  slug: string,
): RolePathModuleMeta | null {
  return OT_SECURITY_MODULES.find((module) => module.slug === slug) ?? null;
}

export function getOtSecurityModuleBySlug(
  slug: string,
): RolePathModule | null {
  const meta = getOtSecurityModuleMetaBySlug(slug);
  if (!meta || meta.status !== "available") {
    return null;
  }

  const filePath = path.join(OT_SECURITY_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const tools = data.tools as RolePathModuleTool[];
  const enterpriseToolsNote =
    typeof data.enterpriseToolsNote === "string"
      ? data.enterpriseToolsNote
      : undefined;
  const cabinetArtifact = data.cabinetArtifact as Omit<
    RolePathCabinetArtifact,
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
