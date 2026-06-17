import { createClient } from "@/lib/supabase/server";
import type { PublicCabinetArtifactRow } from "@/types/cabinet";
import { normalizeCabinetUsernameParam } from "@/lib/cabinet/username";

export async function fetchPublicCabinetArtifacts(
  username: string,
): Promise<PublicCabinetArtifactRow[]> {
  const normalized = normalizeCabinetUsernameParam(username);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("public_cabinet_artifacts")
    .select("*")
    .eq("cabinet_username", normalized)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
}

export function publicCabinetDisplayName(
  username: string,
  artifacts: PublicCabinetArtifactRow[],
): string {
  const fromRow = artifacts.find((row) => row.display_name?.trim())?.display_name;
  if (fromRow?.trim()) {
    return fromRow.trim();
  }

  return username;
}
