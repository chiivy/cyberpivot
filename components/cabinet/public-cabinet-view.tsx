import Link from "next/link";

import { ExternalWriteupLink } from "@/components/cabinet/external-writeup-link";
import { contentAreaLabel } from "@/lib/cabinet/definitions";
import type { PublicCabinetArtifactRow } from "@/types/cabinet";

interface PublicCabinetViewProps {
  username: string;
  displayName: string;
  artifacts: PublicCabinetArtifactRow[];
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function PublicCabinetView({
  username,
  displayName,
  artifacts,
}: PublicCabinetViewProps): React.ReactElement {
  const unlockedCount = artifacts.length;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/[0.08] bg-[#0a0a0f]/90">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            CyberPivot cabinet
          </p>
          <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {displayName}&apos;s CyberPivot cabinet
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            {unlockedCount > 0
              ? `${displayName} has completed ${unlockedCount} cabinet artifact${unlockedCount === 1 ? "" : "s"} on CyberPivot.`
              : "A portfolio of hands-on cybersecurity work built on CyberPivot."}
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          {artifacts.length === 0 ? (
            <section className="rounded-lg border border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="text-sm leading-relaxed text-zinc-400">
                No unlocked artifacts yet. Check back as {displayName} completes
                more modules.
              </p>
            </section>
          ) : (
            <div className="grid gap-5">
              {artifacts.map((artifact) => (
                <article
                  key={`${artifact.module_slug}-${artifact.created_at}`}
                  className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.03] p-6"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {contentAreaLabel(artifact.content_area)} ·{" "}
                    {artifact.module_slug.replace(/-/g, " ")}
                  </p>
                  <h2 className="mt-3 font-mono text-xl font-semibold text-foreground">
                    {artifact.artifact_name}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    Completed {formatDate(artifact.created_at)}
                  </p>
                  {artifact.summary ? (
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      {artifact.summary}
                    </p>
                  ) : null}
                  {artifact.link_url ? (
                    <ExternalWriteupLink
                      href={artifact.link_url}
                      className="mt-4"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-6 text-sm text-zinc-500">
          <span>@{username}</span>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            cyberpivot.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
