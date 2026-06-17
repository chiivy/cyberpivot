import type { User } from "@supabase/supabase-js";

import { insertUniqueUserProfile } from "@/lib/cabinet/create-profile";
import { createClient } from "@/lib/supabase/server";
import type { UserProfileRow } from "@/types/cabinet";

export async function fetchUserProfileServer(
  userId: string,
): Promise<UserProfileRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function ensureUserProfileServer(
  user: User,
): Promise<UserProfileRow> {
  const existing = await fetchUserProfileServer(user.id);
  if (existing) {
    return existing;
  }

  const supabase = await createClient();
  return insertUniqueUserProfile(supabase, user);
}
