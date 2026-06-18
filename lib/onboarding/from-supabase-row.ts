import { computeRecommendation } from "@/lib/onboarding/recommendation-engine";
import type { Database } from "@/types/supabase";
import type {
  OnboardingAnswers,
  OnboardingPersistedState,
  PathSlug,
  Q1Background,
  Q2WorkInstinct,
  Q3Environment,
  Q4Terminal,
  Q5Goal,
  Q6Answer,
} from "@/types/onboarding";

type UserOnboardingRow = Database["public"]["Tables"]["user_onboarding"]["Row"];

interface Q4StoredPayload {
  terminal?: string;
  goal?: string;
  q6?: Q6Answer | null;
}

function parseQ4Payload(raw: string): Q4StoredPayload | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Q4StoredPayload;
  } catch {
    return null;
  }
}

function isPathSlug(value: string): value is PathSlug {
  return [
    "azure",
    "pentest",
    "soc",
    "grc",
    "appsec",
    "api-security",
    "ai-security",
    "ot-security",
  ].includes(value);
}

export function onboardingStateFromSupabaseRow(
  row: UserOnboardingRow,
): OnboardingPersistedState | null {
  if (
    !row.q1_background ||
    !row.q2_linux ||
    !row.q3_networking ||
    !row.q4_path_known
  ) {
    return null;
  }

  const q4 = parseQ4Payload(row.q4_path_known);
  if (!q4?.terminal || !q4.goal) {
    return null;
  }

  const answers: OnboardingAnswers = {
    q1Background: row.q1_background as Q1Background,
    q2WorkInstinct: row.q2_linux as Q2WorkInstinct,
    q3Environment: row.q3_networking as Q3Environment,
    q4Terminal: q4.terminal as Q4Terminal,
    q5Goal: q4.goal as Q5Goal,
    q6: q4.q6 ?? undefined,
  };

  const recommendation = computeRecommendation(answers);
  const recommendedRole = recommendation.role;

  const chosenPath =
    row.chosen_path && isPathSlug(row.chosen_path)
      ? row.chosen_path
      : recommendedRole.pathSlug;

  return {
    answers,
    recommendation,
    chosenPath,
    chosenDomainId: recommendedRole.domainId,
    chosenRoleSlug: recommendedRole.roleSlug,
  };
}
