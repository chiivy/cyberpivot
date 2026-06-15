"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { readOnboardingState, writeOnboardingState } from "@/lib/onboarding/storage";
import { createClient } from "@/lib/supabase/client";
import type { PathSlug } from "@/types/onboarding";

interface StartPathButtonProps {
  roleSlug: string;
  cabinetPath: PathSlug;
  domainId: string;
}

async function hasOnboardingData(): Promise<boolean> {
  const local = readOnboardingState();
  if (local?.answers) {
    return true;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from("user_onboarding")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  return data != null;
}

export function StartPathButton({
  roleSlug,
  cabinetPath,
  domainId,
}: StartPathButtonProps): React.ReactElement {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    try {
      const onboarded = await hasOnboardingData();
      if (!onboarded) {
        router.push("/onboarding");
        return;
      }

      const current = readOnboardingState();
      if (current) {
        writeOnboardingState({
          ...current,
          chosenPath: cabinetPath,
          chosenDomainId: domainId,
          chosenRoleSlug: roleSlug,
        });
      }

      router.push(`/dashboard?path=${cabinetPath}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
      disabled={loading}
      onClick={() => void handleClick()}
    >
      {loading ? "Loading…" : "Start this path"}
    </Button>
  );
}
