import Link from "next/link";

import type { SecurityDomain } from "@/lib/homepage-data";
import { cn } from "@/lib/utils";

interface DomainCardProps {
  domain: SecurityDomain;
  className?: string;
}

export function DomainCard({
  domain,
  className,
}: DomainCardProps): React.ReactElement {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5",
        className,
      )}
    >
      <h3 className="font-mono text-lg font-semibold text-foreground">
        <Link
          href={`/paths?domain=${domain.id}`}
          className="hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          {domain.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {domain.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Roles in ${domain.name}`}>
        {domain.roles.map((role) => (
          <li key={role.slug}>
            <Link
              href={`/roles/${role.slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs transition-colors",
                "hover:border-cyan-500/40 hover:bg-cyan-500/[0.06]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                role.v1
                  ? "border-cyan-500/30 bg-cyan-500/10 text-zinc-300"
                  : "border-white/10 bg-white/5 text-zinc-300",
              )}
            >
              {role.name}
              {!role.v1 ? (
                <span className="rounded bg-zinc-800 px-1 py-px text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                  Soon
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
