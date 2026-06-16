import Link from "next/link";

import { SiteHeaderNav } from "@/components/layout/site-header-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  marketing?: boolean;
}

export function SiteHeader({
  marketing = false,
}: SiteHeaderProps): React.ReactElement {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md",
        marketing
          ? "border-white/[0.08] bg-[#0a0a0f]/80"
          : "border-border bg-background/80",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className={cn(
            "font-mono text-lg font-semibold tracking-tight",
            marketing ? "text-foreground hover:text-cyan-300" : "",
          )}
        >
          CyberPivot
        </Link>
        <div className="flex items-center gap-4">
          {marketing ? <SiteHeaderNav /> : null}
          <nav className="flex items-center gap-2" aria-label="Account">
          <Button
            variant="ghost"
            asChild
            className={marketing ? "text-zinc-300 hover:text-foreground" : ""}
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            className={
              marketing
                ? "bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
                : ""
            }
          >
            <Link href="/onboarding">Get Started</Link>
          </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
