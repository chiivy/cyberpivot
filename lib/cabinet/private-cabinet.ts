import { createClient } from "@/lib/supabase/server";
import type {
  CabinetArtifactRow,
  ModuleCompletionRow,
  UserProfileRow,
} from "@/types/cabinet";

export interface PrivateCabinetData {
  profile: UserProfileRow | null;
  completions: ModuleCompletionRow[];
  artifacts: CabinetArtifactRow[];
}

export async function fetchPrivateCabinetData(
  userId: string,
): Promise<PrivateCabinetData> {
  const supabase = await createClient();

  const [profileResult, completionsResult, artifactsResult] = await Promise.all([
    supabase.from("user_profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase
      .from("module_completions")
      .select("*")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false }),
    supabase
      .from("cabinet_artifacts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  return {
    profile: profileResult.data ?? null,
    completions: completionsResult.data ?? [],
    artifacts: artifactsResult.data ?? [],
  };
}
