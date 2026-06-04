import type { OnboardingPersistedState } from "@/types/onboarding";

export const ONBOARDING_STORAGE_KEY = "cyberpivot-onboarding" as const;

export function readOnboardingState(): OnboardingPersistedState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isOnboardingState(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeOnboardingState(state: OnboardingPersistedState): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
}

export function clearOnboardingState(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}

function isOnboardingState(value: unknown): value is OnboardingPersistedState {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.answers === "object" &&
    record.answers !== null &&
    typeof record.recommendation === "object" &&
    record.recommendation !== null
  );
}
