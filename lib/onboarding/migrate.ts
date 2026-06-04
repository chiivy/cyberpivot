import { createClient } from "@/lib/supabase/client";
import { clearOnboardingState, readOnboardingState } from "@/lib/onboarding/storage";
import type { OnboardingAnswers } from "@/types/onboarding";

export interface MigrateOnboardingResult {
  success: boolean;
  error: string | null;
}

export async function migrateOnboardingToSupabase(): Promise<MigrateOnboardingResult> {
  const state = readOnboardingState();
  if (!state) {
    return { success: true, error: null };
  }

  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: userError?.message ?? "Not signed in",
    };
  }

  const { answers, recommendation, chosenPath } = state;
  const row = answersToRow(answers, recommendation.entryPoint, chosenPath);

  const { error } = await supabase.from("user_onboarding").upsert(
    {
      user_id: user.id,
      ...row,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return { success: false, error: error.message };
  }

  clearOnboardingState();
  return { success: true, error: null };
}

function answersToRow(
  answers: OnboardingAnswers,
  entryPoint: string,
  chosenPath: string | null,
): {
  q1_background: string;
  q2_linux: string;
  q3_networking: string;
  q4_path_known: string;
  entry_point: string;
  chosen_path: string | null;
} {
  return {
    q1_background: answers.q1Background,
    q2_linux: answers.q2Linux,
    q3_networking: answers.q3Networking,
    q4_path_known: answers.q4PathKnown,
    entry_point: entryPoint,
    chosen_path: chosenPath,
  };
}
