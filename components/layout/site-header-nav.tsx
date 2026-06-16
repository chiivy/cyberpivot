"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/intro", label: "Introduction", match: (path: string) => path.startsWith("/intro") },
  {
    href: "/foundations",
    label: "Foundations",
    match: (path: string) => path.startsWith("/foundations"),
  },
  { href: "/roles", label: "Roles", match: (path: string) => path.startsWith("/roles") },
] as const;

export function SiteHeaderNav(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav
      className="flex items-center gap-4 text-sm sm:gap-6"
      aria-label="Main"
    >
      {NAV_LINKS.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors",
              active
                ? "font-medium text-cyan-400"
                : "text-zinc-400 hover:text-cyan-300",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
