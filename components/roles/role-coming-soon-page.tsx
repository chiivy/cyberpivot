import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NotifyLaunchForm } from "@/components/roles/notify-launch-form";
import type { ComingSoonRoleContent } from "@/types/role";

interface RoleComingSoonPageProps {
  role: ComingSoonRoleContent;
}

export function RoleComingSoonPage({
  role,
}: RoleComingSoonPageProps): React.ReactElement {
  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to home
      </Link>

      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-zinc-500">
        {role.domain}
      </p>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-foreground">
        {role.name}
      </h1>
      <span className="mt-4 inline-flex rounded-md border border-zinc-600/50 bg-zinc-800/80 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
        Coming soon
      </span>
      <p className="mt-6 text-base leading-relaxed text-zinc-400">
        {role.oneLiner}
      </p>

      <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <NotifyLaunchForm roleSlug={role.slug} roleName={role.name} />
      </div>
    </div>
  );
}
