"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RolePathNotReadyMessage } from "@/components/roles/role-path-not-ready-message";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { readOnboardingState, writeOnboardingState } from "@/lib/onboarding/storage";
import { getRoleBySlug } from "@/lib/roles/get-role";
import { v1RoleHasAvailableModule } from "@/lib/roles/role-path-availability";
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
  const { user, ready: authReady } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNotReady, setShowNotReady] = useState(false);

  const roleName = getRoleBySlug(roleSlug)?.name ?? "This role";

  const handleClick = async (): Promise<void> => {
    if (!v1RoleHasAvailableModule(roleSlug)) {
      setShowNotReady(true);
      return;
    }

    setLoading(true);
    setShowNotReady(false);
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

      router.push(`/dashboard?role=${roleSlug}&path=${cabinetPath}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg text-left">
      <div className="text-center">
        <Button
          type="button"
          size="lg"
          className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
          disabled={loading}
          onClick={() => void handleClick()}
        >
          {loading ? "Loading…" : "Start this path"}
        </Button>
      </div>
      {showNotReady ? (
        <div className="mt-6">
          <RolePathNotReadyMessage
            roleName={roleName}
            signedIn={authReady && user != null}
          />
        </div>
      ) : null}
    </div>
  );
}
