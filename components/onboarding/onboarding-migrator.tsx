"use client";

import { useEffect, useRef } from "react";

import { migrateOnboardingToSupabase } from "@/lib/onboarding/migrate";
import { createClient } from "@/lib/supabase/client";

export function OnboardingMigrator(): React.ReactElement | null {
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) {
      return;
    }
    attempted.current = true;

    const run = async (): Promise<void> => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }
      await migrateOnboardingToSupabase();
    };

    void run();
  }, []);

  return null;
}
