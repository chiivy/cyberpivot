import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { FoundationCabinetPreview } from "@/components/foundations/foundation-cabinet-preview";
import { FoundationMarkStarted } from "@/components/foundations/foundation-mark-started";
import { FoundationModuleRenderer } from "@/components/foundations/foundation-module-renderer";
import { FoundationToolsSection } from "@/components/foundations/foundation-tools-section";
import { MarkModuleComplete } from "@/components/foundations/mark-module-complete";
import {
  getFoundationModuleBySlug,
  getFoundationModuleMetaBySlug,
  getFoundationModuleSlugs,
} from "@/lib/foundations/get-foundation-module";

interface FoundationModulePageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return getFoundationModuleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: FoundationModulePageProps): Metadata {
  const foundationModule = getFoundationModuleBySlug(params.slug);
  if (!foundationModule) {
    return { title: "Module not found" };
  }
  return {
    title: foundationModule.title,
    description: foundationModule.description,
  };
}

export default function FoundationModulePage({
  params,
}: FoundationModulePageProps): React.ReactElement {
  const foundationModule = getFoundationModuleBySlug(params.slug);
  if (!foundationModule) {
    notFound();
  }

  const nextModule = foundationModule.nextModule
    ? getFoundationModuleMetaBySlug(foundationModule.nextModule)
    : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-left sm:py-14">
      <FoundationMarkStarted slug={foundationModule.slug} />
      <header className="border-b border-white/[0.08] pb-8 text-left">
        <Link
          href="/foundations"
          className="text-sm text-zinc-500 hover:text-cyan-300"
        >
          ← All foundation modules
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          {foundationModule.level} · Module {foundationModule.module}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {foundationModule.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          {foundationModule.description}
        </p>
        <dl className="mt-5 flex flex-wrap gap-6 text-sm text-zinc-500">
          <div>
            <dt className="sr-only">Reading time</dt>
            <dd>{foundationModule.readingTime} read</dd>
          </div>
          <div>
            <dt className="sr-only">Lab time</dt>
            <dd>{foundationModule.labTime} lab</dd>
          </div>
        </dl>
      </header>

      <div className="mt-8 space-y-8">
        <FoundationToolsSection tools={foundationModule.tools} />
        <FoundationCabinetPreview
          name={foundationModule.cabinetArtifact.name}
          description={foundationModule.cabinetArtifact.description}
          moduleSlug={foundationModule.slug}
          contentArea="foundation"
        />
      </div>

      <div className="mt-12">
        <FoundationModuleRenderer content={foundationModule.content} />
      </div>

      <footer className="mt-16 space-y-8 border-t border-white/[0.08] pt-10">
        <MarkModuleComplete
          contentArea="foundation"
          moduleSlug={foundationModule.slug}
          artifactName={foundationModule.cabinetArtifact.name}
        />

        {nextModule ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Up next
            </p>
            {nextModule.status === "available" ? (
              <Link
                href={`/foundations/${nextModule.slug}`}
                className="group mt-3 block"
              >
                <h2 className="font-mono text-lg font-semibold text-foreground group-hover:text-cyan-100">
                  Foundation Module {nextModule.module} — {nextModule.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">{nextModule.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-500 group-hover:text-cyan-400/80">
                  Continue
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ) : (
              <div className="mt-3">
                <h2 className="font-mono text-lg font-semibold text-zinc-300">
                  Foundation Module {nextModule.module} — {nextModule.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-500">Coming soon</p>
              </div>
            )}
          </div>
        ) : null}
      </footer>
    </article>
  );
}
