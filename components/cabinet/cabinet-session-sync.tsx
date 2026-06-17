"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

const CABINET_SYNC_KEY = "cyberpivot-cabinet-session-sync";

export function clearCabinetSessionSyncFlag(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(CABINET_SYNC_KEY);
  }
}

export function CabinetSessionSync(): React.ReactElement {
  const { user, ready } = useAuth();
  const router = useRouter();
  const redirecting = useRef(false);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!user) {
      clearCabinetSessionSyncFlag();
      if (!redirecting.current) {
        redirecting.current = true;
        router.replace("/login?next=/cabinet");
      }
      return;
    }

    if (sessionStorage.getItem(CABINET_SYNC_KEY)) {
      return;
    }

    sessionStorage.setItem(CABINET_SYNC_KEY, "1");
    router.refresh();
  }, [ready, router, user]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm text-muted-foreground">Loading your cabinet…</p>
    </div>
  );
}
