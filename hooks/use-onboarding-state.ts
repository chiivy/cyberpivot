"use client";

import { useEffect, useState } from "react";

import { readOnboardingState } from "@/lib/onboarding/storage";
import type { OnboardingPersistedState } from "@/types/onboarding";

export interface UseOnboardingStateResult {
  state: OnboardingPersistedState | null;
  ready: boolean;
}

export function useOnboardingState(): UseOnboardingStateResult {
  const [state, setState] = useState<OnboardingPersistedState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readOnboardingState());
    setReady(true);
  }, []);

  return { state, ready };
}
