"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { isModuleComplete } from "@/lib/cabinet/complete-module";

export function useModuleCompletion(
  contentArea: string,
  moduleSlug: string,
): { completed: boolean; ready: boolean; refresh: () => void } {
  const { user, ready: authReady } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [ready, setReady] = useState(false);

  const refresh = useCallback((): void => {
    if (!authReady) {
      return;
    }

    if (!user) {
      setCompleted(false);
      setReady(true);
      return;
    }

    void isModuleComplete({ contentArea, moduleSlug }).then((value) => {
      setCompleted(value);
      setReady(true);
    });
  }, [authReady, contentArea, moduleSlug, user]);

  useEffect(() => {
    setReady(false);
    refresh();
  }, [refresh]);

  useEffect(() => {
    const handleUpdate = (): void => {
      refresh();
    };

    window.addEventListener("cyberpivot-cabinet-updated", handleUpdate);
    return () => {
      window.removeEventListener("cyberpivot-cabinet-updated", handleUpdate);
    };
  }, [refresh]);

  return { completed, ready, refresh };
}

export function notifyCabinetUpdated(): void {
  window.dispatchEvent(new CustomEvent("cyberpivot-cabinet-updated"));
}
