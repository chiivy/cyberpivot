import type { Metadata } from "next";
import Link from "next/link";

import { securityDomains } from "@/lib/homepage-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Security roles",
  description:
    "Browse cybersecurity roles across defensive, offensive, cloud, application security, and GRC.",
};

interface RolesIndexPageProps {
  searchParams: { domain?: string };
}

export default function RolesIndexPage({
  searchParams,
}: RolesIndexPageProps): React.ReactElement {
  const domainFilter = searchParams.domain;
  const domains = domainFilter
    ? securityDomains.filter((d) => d.id === domainFilter)
    : securityDomains;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground">
        {domains.length === 1 ? domains[0].name : "Security roles"}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Pick a role to see what the job involves, what you will build, and
        whether the path is ready to start.
      </p>

      <div className="mt-10 space-y-10">
        {domains.map((domain) => (
          <section key={domain.id}>
            <h2 className="font-mono text-xl font-semibold text-foreground">
              {domain.name}
            </h2>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              {domain.roles.map((role) => (
                <li key={role.slug}>
                  <Link
                    href={`/roles/${role.slug}`}
                    className={cn(
                      "flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors",
                      "hover:border-cyan-500/40 hover:bg-cyan-500/[0.03]",
                    )}
                  >
                    <span className="text-sm font-medium text-zinc-200">
                      {role.name}
                    </span>
                    {role.v1 ? (
                      <span className="text-xs font-medium text-cyan-400">
                        Ready
                      </span>
                    ) : (
                      <span className="text-xs uppercase tracking-wide text-zinc-500">
                        Coming soon
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
