import Link from "next/link";
import { ExternalLink } from "lucide-react";

import type { FoundationModuleTool } from "@/types/foundation";

interface FoundationToolsSectionProps {
  tools: readonly FoundationModuleTool[];
  enterpriseToolsNote?: string;
}

export function FoundationToolsSection({
  tools,
  enterpriseToolsNote,
}: FoundationToolsSectionProps): React.ReactElement {
  const freeTools = tools.filter((tool) => tool.type === "free");
  const enterpriseTools = tools.filter((tool) => tool.type === "enterprise");

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
      <h2 className="font-mono text-sm font-semibold uppercase tracking-wide text-zinc-300">
        Tools on this module
      </h2>
      <div className="mt-5 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-zinc-400">Free / open source</h3>
          <ul className="mt-3 space-y-2" role="list">
            {freeTools.map((tool) => (
              <li key={tool.name} className="text-sm">
                {tool.url ? (
                  <Link
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300"
                  >
                    {tool.name}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                ) : (
                  <span className="text-zinc-300">{tool.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium text-zinc-400">Enterprise</h3>
          {enterpriseTools.length > 0 ? (
            <ul className="mt-3 space-y-2" role="list">
              {enterpriseTools.map((tool) => (
                <li key={tool.name} className="text-sm text-zinc-400">
                  {tool.name}
                </li>
              ))}
            </ul>
          ) : enterpriseToolsNote ? (
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {enterpriseToolsNote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
