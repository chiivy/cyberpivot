import type { User } from "@supabase/supabase-js";

import { insertUniqueUserProfile } from "@/lib/cabinet/create-profile";
import { createClient } from "@/lib/supabase/client";
import type { UserProfileRow } from "@/types/cabinet";

export async function fetchUserProfile(
  userId: string,
): Promise<UserProfileRow | null> {
  const supabase = createClient();
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

export async function ensureUserProfile(user: User): Promise<UserProfileRow> {
  const existing = await fetchUserProfile(user.id);
  if (existing) {
    return existing;
  }

  const supabase = createClient();
  return insertUniqueUserProfile(supabase, user);
}
