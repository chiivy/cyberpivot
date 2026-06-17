import type { Metadata } from "next";
import Link from "next/link";

import { getRoleCatalogGrouped } from "@/lib/onboarding/recommendation-engine";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Paths",
  description:
    "Browse cybersecurity learning paths across defensive, offensive, cloud, application security, and GRC.",
};

export default function PathsIndexPage(): React.ReactElement {
  const domains = getRoleCatalogGrouped();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground">
        Paths
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Pick a role to see what the job involves, what you will build, and
        whether the path is ready to start.
      </p>

      <div className="mt-10 space-y-12">
        {domains.map((domain) => (
          <section key={domain.domainId}>
            <h2 className="font-mono text-xl font-semibold text-foreground">
              {domain.domain}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {domain.description}
            </p>
            <ul className="mt-5 flex flex-col gap-3" role="list">
              {domain.roles.map((role) => (
                <li key={role.roleSlug}>
                  <Link
                    href={`/roles/${role.roleSlug}`}
                    className={cn(
                      "flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
                      "hover:border-cyan-500/40 hover:bg-cyan-500/[0.03]",
                    )}
                  >
                    <div>
                      <span className="text-sm font-medium text-zinc-200">
                        {role.roleName}
                      </span>
                      <p className="mt-1 text-xs text-zinc-500">{role.level}</p>
                    </div>
                    {role.comingSoon ? (
                      <span className="w-fit rounded-md border border-zinc-600/50 bg-zinc-800/80 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
                        Coming soon
                      </span>
                    ) : (
                      <span className="w-fit text-xs font-medium text-cyan-400">
                        Ready
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
