"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const PUBLIC_NAV_LINKS = [
  { href: "/intro", label: "Introduction", match: (path: string) => path.startsWith("/intro") },
  {
    href: "/foundations",
    label: "Foundations",
    match: (path: string) => path.startsWith("/foundations"),
  },
  { href: "/paths", label: "Paths", match: (path: string) => path === "/paths" },
] as const;

const SIGNED_IN_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", match: (path: string) => path.startsWith("/dashboard") },
  { href: "/cabinet", label: "Cabinet", match: (path: string) => path === "/cabinet" },
] as const;

export function SiteHeaderNav(): React.ReactElement {
  const pathname = usePathname();
  const { user, ready } = useAuth();

  const links = ready && user
    ? [...SIGNED_IN_NAV_LINKS, ...PUBLIC_NAV_LINKS]
    : PUBLIC_NAV_LINKS;

  return (
    <nav
      className="flex items-center gap-4 text-sm sm:gap-6"
      aria-label="Main"
    >
      {links.map((item) => {
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
