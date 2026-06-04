import Link from "next/link";

import { GITHUB_REPO_URL } from "@/lib/homepage-data";

interface SiteFooterProps {
  marketing?: boolean;
}

export function SiteFooter({
  marketing = false,
}: SiteFooterProps): React.ReactElement {
  if (marketing) {
    return (
      <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link
            href="/"
            className="font-mono text-sm font-semibold text-foreground"
          >
            CyberPivot
          </Link>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400"
            aria-label="Footer"
          >
            <Link
              href={GITHUB_REPO_URL}
              className="hover:text-cyan-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link
              href={`${GITHUB_REPO_URL}/blob/master/CONTRIBUTING.md`}
              className="hover:text-cyan-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contributing
            </Link>
            <Link
              href={`${GITHUB_REPO_URL}/blob/master/LICENSE`}
              className="hover:text-cyan-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              License
            </Link>
          </nav>
          <p className="text-sm text-zinc-500">Free and open source</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <p>CyberPivot — free, open source cybersecurity learning.</p>
      </div>
    </footer>
  );
}
