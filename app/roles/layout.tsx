import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function RolesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="marketing-page flex min-h-screen flex-col text-zinc-100">
      <SiteHeader marketing />
      <main className="flex-1">{children}</main>
      <SiteFooter marketing />
    </div>
  );
}
