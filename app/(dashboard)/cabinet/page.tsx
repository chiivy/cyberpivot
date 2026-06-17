import { headers } from "next/headers";

import { CabinetSessionSync } from "@/components/cabinet/cabinet-session-sync";
import { PrivateCabinetView } from "@/components/cabinet/private-cabinet-view";import { fetchPrivateCabinetData } from "@/lib/cabinet/private-cabinet";
import { ensureUserProfileServer } from "@/lib/cabinet/profile-server";
import { createClient } from "@/lib/supabase/server";

function resolveShareOrigin(): string {
  const headerList = headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "https";

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export default async function CabinetPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <CabinetSessionSync />;
  }

  const profile = await ensureUserProfileServer(user);
  const cabinetData = await fetchPrivateCabinetData(user.id);

  return (
    <PrivateCabinetView
      profile={profile}
      completions={cabinetData.completions}
      artifacts={cabinetData.artifacts}
      shareOrigin={resolveShareOrigin()}
    />
  );
}
