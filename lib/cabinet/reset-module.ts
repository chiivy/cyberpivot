"use client";

import { createClient } from "@/lib/supabase/client";

export async function resetModuleProgress(input: {
  contentArea: string;
  moduleSlug: string;
}): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "You must be signed in to reset progress." };
  }

  const filters = {
    user_id: user.id,
    content_area: input.contentArea,
    module_slug: input.moduleSlug,
  };

  const [completionsResult, artifactsResult] = await Promise.all([
    supabase.from("module_completions").delete().match(filters),
    supabase.from("cabinet_artifacts").delete().match(filters),
  ]);

  if (completionsResult.error) {
    return { success: false, error: completionsResult.error.message };
  }

  if (artifactsResult.error) {
    return { success: false, error: artifactsResult.error.message };
  }

  return { success: true, error: null };
}
