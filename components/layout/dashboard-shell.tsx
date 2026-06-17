import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";

interface DashboardShellProps {
  children: React.ReactNode;
}
const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/intro", label: "Introduction" },
  { href: "/foundations", label: "Foundations" },
  { href: "/paths", label: "Paths" },
  { href: "/labs", label: "Labs" },
  { href: "/interview", label: "Interview" },
  { href: "/cv", label: "CV" },
  { href: "/cabinet", label: "Cabinet" },
  { href: "/settings", label: "Settings" },
] as const;

export function DashboardShell({
  children,
}: DashboardShellProps): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col text-zinc-100">
      <SiteHeader marketing />
      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r border-border md:block">
          <div className="px-4 py-6">
            <Link href="/" className="text-lg font-semibold">
              CyberPivot
            </Link>
          </div>
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}