"use client";

import { useCallback, useEffect, useState } from "react";

import {
  isFoundationModuleComplete,
  readFoundationProgress,
} from "@/lib/foundations/progress";

export function useFoundationProgress(): {
  completedSlugs: string[];
  hasActivity: boolean;
  isComplete: (slug: string) => boolean;
  refresh: () => void;
} {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [hasActivity, setHasActivity] = useState(false);

  const refresh = useCallback((): void => {
    const state = readFoundationProgress();
    setCompletedSlugs(state.completedModules);
    setHasActivity(
      state.completedModules.length > 0 || state.startedModules.length > 0,
    );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isComplete = useCallback(
    (slug: string): boolean =>
      completedSlugs.includes(slug) || isFoundationModuleComplete(slug),
    [completedSlugs],
  );

  return { completedSlugs, hasActivity, isComplete, refresh };
}
