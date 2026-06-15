import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { IntroSection, IntroSectionMeta } from "@/types/intro";

const INTRO_DIR = path.join(process.cwd(), "content/intro");

export function getIntroSectionSlugs(): string[] {
  return getIntroSectionMetaList().map((section) => section.slug);
}

export function getIntroSectionMetaList(): readonly IntroSectionMeta[] {
  const files = fs
    .readdirSync(INTRO_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => {
      const sectionA = matter(fs.readFileSync(path.join(INTRO_DIR, a), "utf8")).data
        .section as number;
      const sectionB = matter(fs.readFileSync(path.join(INTRO_DIR, b), "utf8")).data
        .section as number;
      return sectionA - sectionB;
    });

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(INTRO_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      title: data.title as string,
      slug: data.slug as string,
      section: data.section as number,
      description: data.description as string,
      readingTime: data.readingTime as string,
    };
  });
}

export function getIntroSectionBySlug(slug: string): IntroSection | null {
  const filePath = path.join(INTRO_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    title: data.title as string,
    slug: data.slug as string,
    section: data.section as number,
    description: data.description as string,
    readingTime: data.readingTime as string,
    content: content.trim(),
  };
}

export function getAdjacentIntroSections(slug: string): {
  previous: IntroSectionMeta | null;
  next: IntroSectionMeta | null;
} {
  const sections = getIntroSectionMetaList();
  const index = sections.findIndex((section) => section.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? sections[index - 1]! : null,
    next: index < sections.length - 1 ? sections[index + 1]! : null,
  };
}
