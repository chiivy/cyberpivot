"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { loadOnboardingState } from "@/lib/onboarding/load-onboarding-state";
import type { OnboardingPersistedState } from "@/types/onboarding";

export interface UseOnboardingStateResult {
  state: OnboardingPersistedState | null;
  ready: boolean;
}

export function useOnboardingState(): UseOnboardingStateResult {
  const { user, ready: authReady } = useAuth();
  const [state, setState] = useState<OnboardingPersistedState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!authReady) {
      return;
    }

    let cancelled = false;

    const load = async (): Promise<void> => {
      const loaded = await loadOnboardingState(user?.id ?? null);
      if (!cancelled) {
        setState(loaded);
        setReady(true);
      }
    };

    setReady(false);
    void load();

    return () => {
      cancelled = true;
    };
  }, [authReady, user?.id]);

  return { state, ready: ready && authReady };
}
