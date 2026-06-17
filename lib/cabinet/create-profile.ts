import type { SupabaseClient } from "@supabase/supabase-js";

import { generateRandomCabinetUsername } from "@/lib/cabinet/username";
import type { Database } from "@/types/supabase";
import type { UserProfileRow } from "@/types/cabinet";

type ProfileClient = SupabaseClient<Database>;

function profileDisplayName(user: {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): string {
  const metadata = user.user_metadata;
  const fullName =
    typeof metadata?.full_name === "string" ? metadata.full_name.trim() : "";
  if (fullName) {
    return fullName;
  }
  const name = typeof metadata?.name === "string" ? metadata.name.trim() : "";
  if (name) {
    return name;
  }
  return user.email?.split("@")[0] ?? "CyberPivot learner";
}

export async function insertUniqueUserProfile(
  supabase: ProfileClient,
  user: {
    id: string;
    email?: string | null;
    user_metadata?: Record<string, unknown>;
  },
): Promise<UserProfileRow> {
  const displayName = profileDisplayName(user);
  const maxAttempts = 12;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const cabinetUsername = generateRandomCabinetUsername();
    const { data, error } = await supabase
      .from("user_profiles")
      .insert({
        user_id: user.id,
        cabinet_username: cabinetUsername,
        display_name: displayName,
      })
      .select("*")
      .single();

    if (!error && data) {
      return data;
    }

    if (error?.code !== "23505") {
      throw new Error(error?.message ?? "Could not create profile");
    }
  }

  throw new Error("Could not generate a unique cabinet username");
}
