import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FoundationCabinetPreview } from "@/components/foundations/foundation-cabinet-preview";
import { FoundationMarkStarted } from "@/components/foundations/foundation-mark-started";
import { FoundationModuleRenderer } from "@/components/foundations/foundation-module-renderer";
import { FoundationToolsSection } from "@/components/foundations/foundation-tools-section";
import { MarkModuleComplete } from "@/components/foundations/mark-module-complete";
import {
  getOtSecurityModuleBySlug,
  getOtSecurityModuleMetaBySlug,
} from "@/lib/roles/ot-security/get-ot-module";
import {
  getRolePathModuleHref,
  OT_SECURITY_ANALYST_ROLE_SLUG,
  OT_SECURITY_CONTENT_AREA,
} from "@/types/role-path";

interface RolePathModulePageProps {
  roleModule: NonNullable<ReturnType<typeof getOtSecurityModuleBySlug>>;
}

export function RolePathModulePage({
  roleModule,
}: RolePathModulePageProps): React.ReactElement {
  const previousModule = roleModule.previousModule
    ? getOtSecurityModuleMetaBySlug(roleModule.previousModule)
    : null;
  const nextModule = roleModule.nextModule
    ? getOtSecurityModuleMetaBySlug(roleModule.nextModule)
    : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-left sm:py-14">
      <FoundationMarkStarted slug={roleModule.slug} />
      <header className="border-b border-white/[0.08] pb-8 text-left">
        <Link
          href={`/roles/${OT_SECURITY_ANALYST_ROLE_SLUG}`}
          className="text-sm text-zinc-500 hover:text-cyan-300"
        >
          ← OT Security Analyst path
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          {roleModule.level} · Module {roleModule.module}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {roleModule.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          {roleModule.description}
        </p>
        <dl className="mt-5 flex flex-wrap gap-6 text-sm text-zinc-500">
          <div>
            <dt className="sr-only">Reading time</dt>
            <dd>{roleModule.readingTime} read</dd>
          </div>
          <div>
            <dt className="sr-only">Lab time</dt>
            <dd>{roleModule.labTime} lab</dd>
          </div>
        </dl>
      </header>

      <div className="mt-8 space-y-8">
        <FoundationToolsSection
          tools={roleModule.tools}
          enterpriseToolsNote={roleModule.enterpriseToolsNote}
        />
        <FoundationCabinetPreview
          name={roleModule.cabinetArtifact.name}
          description={roleModule.cabinetArtifact.description}
          moduleSlug={roleModule.slug}
          contentArea={OT_SECURITY_CONTENT_AREA}
        />
      </div>

      <div className="mt-12">
        <FoundationModuleRenderer content={roleModule.content} />
      </div>

      <footer className="mt-16 space-y-8 border-t border-white/[0.08] pt-10">
        <MarkModuleComplete
          contentArea={OT_SECURITY_CONTENT_AREA}
          moduleSlug={roleModule.slug}
          artifactName={roleModule.cabinetArtifact.name}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {previousModule && previousModule.status === "available" ? (
            <Link
              href={getRolePathModuleHref(
                OT_SECURITY_ANALYST_ROLE_SLUG,
                previousModule.slug,
              )}
              className="group rounded-lg border border-white/10 bg-white/[0.02] p-5"
            >
              <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-zinc-500 group-hover:text-cyan-400/80">
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                Previous
              </p>
              <h2 className="mt-3 font-mono text-base font-semibold text-foreground group-hover:text-cyan-100">
                Module {previousModule.module} — {previousModule.title}
              </h2>
            </Link>
          ) : (
            <div />
          )}

          {nextModule ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Up next
              </p>
              {nextModule.status === "available" ? (
                <Link
                  href={getRolePathModuleHref(
                    OT_SECURITY_ANALYST_ROLE_SLUG,
                    nextModule.slug,
                  )}
                  className="group mt-3 block"
                >
                  <h2 className="font-mono text-base font-semibold text-foreground group-hover:text-cyan-100">
                    Module {nextModule.module} — {nextModule.title}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-500 group-hover:text-cyan-400/80">
                    Continue
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              ) : (
                <div className="mt-3">
                  <h2 className="font-mono text-base font-semibold text-zinc-300">
                    Module {nextModule.module} — {nextModule.title}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">Coming soon</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </footer>
    </article>
  );
}
