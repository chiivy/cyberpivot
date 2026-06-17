import { redirect } from "next/navigation";

import { AccountSettingsForm } from "@/components/settings/account-settings-form";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/settings");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Account settings</h1>
        <p className="mt-3 text-muted-foreground">
          Manage your account and data on CyberPivot.
        </p>
      </header>

      <div className="mt-10">
        <AccountSettingsForm />
      </div>
    </div>
  );
}
