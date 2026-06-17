"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Archive, ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
} from "@/lib/auth/display";
import { cn } from "@/lib/utils";

interface SiteHeaderAuthProps {
  marketing?: boolean;
}

export function SiteHeaderAuth({
  marketing = false,
}: SiteHeaderAuthProps): React.ReactElement {
  const { user, ready, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  if (!ready) {
    return (
      <div
        className="h-9 w-28 animate-pulse rounded-md bg-white/5"
        aria-hidden
      />
    );
  }

  if (!user) {
    return (
      <>
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
      </>
    );
  }

  const displayName = getUserDisplayName(
    user.email,
    user.user_metadata as Record<string, unknown> | undefined,
  );
  const initials = getUserInitials(displayName);
  const avatarUrl = getUserAvatarUrl(
    user.user_metadata as Record<string, unknown> | undefined,
  );

  const handleSignOut = (): void => {
    setMenuOpen(false);
    void signOut();
  };

  const menuItemClass = cn(
    "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
    marketing
      ? "text-zinc-200 hover:bg-white/[0.06] hover:text-cyan-300"
      : "text-foreground hover:bg-accent",
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
          marketing
            ? "text-zinc-200 hover:bg-white/[0.06]"
            : "text-foreground hover:bg-accent",
        )}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            className="h-8 w-8 rounded-full border border-white/10 object-cover"
          />
        ) : (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 font-mono text-xs font-semibold text-cyan-300"
            aria-hidden
          >
            {initials}
          </span>
        )}
        <span className="hidden max-w-[10rem] truncate sm:inline">
          {displayName}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-zinc-500 transition-transform",
            menuOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-50 mt-2 min-w-[11rem] rounded-md border py-1 shadow-lg",
            marketing
              ? "border-white/10 bg-[#111118]"
              : "border-border bg-popover",
          )}
        >
          <Link
            href="/dashboard"
            role="menuitem"
            className={menuItemClass}
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Dashboard
          </Link>
          <Link
            href="/cabinet"
            role="menuitem"
            className={menuItemClass}
            onClick={() => setMenuOpen(false)}
          >
            <Archive className="h-4 w-4" aria-hidden />
            Cabinet
          </Link>
          <Link
            href="/settings"
            role="menuitem"
            className={menuItemClass}
            onClick={() => setMenuOpen(false)}
          >
            <Settings className="h-4 w-4" aria-hidden />
            Account settings
          </Link>
          <button
            type="button"
            role="menuitem"
            className={cn(menuItemClass, "w-full text-left")}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
