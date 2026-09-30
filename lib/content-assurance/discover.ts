import fs from "fs";
import path from "path";

import type {
  ContentFamily,
  DiscoveredModule,
} from "@/lib/content-assurance/types";

function toPosix(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function detectFamily(relativePath: string): ContentFamily {
  if (relativePath.startsWith("content/foundations/")) {
    return "foundation";
  }
  if (relativePath.startsWith("content/paths/ot-security/")) {
    return "ot-security";
  }
  return "unknown";
}

function walkMdxFiles(absoluteDir: string): string[] {
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(absoluteDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(absolutePath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(absolutePath);
    }
  }

  return files;
}

/**
 * Discover implemented content modules under supported locations.
 * Placeholder path directories that only contain .gitkeep yield no modules.
 */
export function discoverContentModules(rootDir: string): DiscoveredModule[] {
  const foundationsDir = path.join(rootDir, "content", "foundations");
  const pathsDir = path.join(rootDir, "content", "paths");

  const absoluteFiles = [
    ...walkMdxFiles(foundationsDir),
    ...walkMdxFiles(pathsDir),
  ].sort((a, b) => a.localeCompare(b));

  return absoluteFiles.map((absolutePath) => {
    const relativePath = toPosix(path.relative(rootDir, absolutePath));
    const fileSlug = path.basename(absolutePath, ".mdx");
    return {
      absolutePath,
      relativePath,
      family: detectFamily(relativePath),
      fileSlug,
    };
  });
}

/**
 * List placeholder path directories (only .gitkeep / empty), for CP-FILE-002.
 */
export function listPlaceholderPathDirectories(rootDir: string): string[] {
  const pathsDir = path.join(rootDir, "content", "paths");
  if (!fs.existsSync(pathsDir)) {
    return [];
  }

  const placeholders: string[] = [];
  for (const entry of fs.readdirSync(pathsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const dirPath = path.join(pathsDir, entry.name);
    const children = fs.readdirSync(dirPath);
    const onlyPlaceholders =
      children.length === 0 ||
      children.every((name) => name === ".gitkeep");
    if (onlyPlaceholders) {
      placeholders.push(toPosix(path.relative(rootDir, dirPath)));
    }
  }

  return placeholders.sort((a, b) => a.localeCompare(b));
}
