import { Suspense } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AccountDeletedBanner } from "@/components/marketing/account-deleted-banner";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="marketing-page flex min-h-screen flex-col text-zinc-100">
      <SiteHeader marketing />
      <Suspense fallback={null}>
        <AccountDeletedBanner />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter marketing />
    </div>
  );
}
