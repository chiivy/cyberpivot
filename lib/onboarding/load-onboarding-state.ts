"use client";

import { migrateOnboardingToSupabase } from "@/lib/onboarding/migrate";
import { onboardingStateFromSupabaseRow } from "@/lib/onboarding/from-supabase-row";
import { readOnboardingState } from "@/lib/onboarding/storage";
import { createClient } from "@/lib/supabase/client";
import type { OnboardingPersistedState } from "@/types/onboarding";

export async function fetchUserOnboardingFromSupabase(
  userId: string,
): Promise<OnboardingPersistedState | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return onboardingStateFromSupabaseRow(data);
}

export async function loadOnboardingState(
  userId: string | null,
): Promise<OnboardingPersistedState | null> {
  if (!userId) {
    return readOnboardingState();
  }

  const remoteState = await fetchUserOnboardingFromSupabase(userId);
  if (remoteState) {
    return remoteState;
  }

  const localState = readOnboardingState();
  if (localState) {
    const migrateResult = await migrateOnboardingToSupabase();
    if (migrateResult.success) {
      const migratedState = await fetchUserOnboardingFromSupabase(userId);
      if (migratedState) {
        return migratedState;
      }
    }
    return localState;
  }

  return null;
}
