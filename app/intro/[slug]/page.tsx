import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IntroMarkRead } from "@/components/intro/intro-mark-read";
import { IntroProgressIndicator } from "@/components/intro/intro-progress-indicator";
import { IntroProse } from "@/components/intro/intro-prose";
import { IntroSectionNav } from "@/components/intro/intro-section-nav";
import {
  getAdjacentIntroSections,
  getIntroSectionBySlug,
  getIntroSectionMetaList,
  getIntroSectionSlugs,
} from "@/lib/intro/get-intro-sections";

interface IntroSectionPageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return getIntroSectionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: IntroSectionPageProps): Metadata {
  const section = getIntroSectionBySlug(params.slug);
  if (!section) {
    return { title: "Section not found" };
  }
  return {
    title: section.title,
    description: section.description,
  };
}

export default function IntroSectionPage({
  params,
}: IntroSectionPageProps): React.ReactElement {
  const section = getIntroSectionBySlug(params.slug);
  if (!section) {
    notFound();
  }

  const allSections = getIntroSectionMetaList();
  const { previous, next } = getAdjacentIntroSections(params.slug);
  const isLastSection = section.slug === "how-cyberpivot-works";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-left sm:py-14">
      <IntroMarkRead slug={section.slug} />

      <header className="border-b border-white/[0.08] pb-8 text-left">
        <IntroProgressIndicator
          sections={allSections}
          currentSlug={section.slug}
        />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Section {section.section}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {section.title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{section.readingTime} read</p>
      </header>

      <div className="mt-10 text-left">
        <IntroProse content={section.content} />
      </div>

      <IntroSectionNav
        previous={previous}
        next={next}
        isLastSection={isLastSection}
      />
    </article>
  );
}
