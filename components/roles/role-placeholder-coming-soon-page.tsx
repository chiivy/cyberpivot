import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RolePathNotReadyMessage } from "@/components/roles/role-path-not-ready-message";
import type { PlaceholderComingSoonRoleContent } from "@/types/role";

interface RolePlaceholderComingSoonPageProps {
  role: PlaceholderComingSoonRoleContent;
  signedIn: boolean;
}

export function RolePlaceholderComingSoonPage({
  role,
  signedIn,
}: RolePlaceholderComingSoonPageProps): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Link
        href="/paths"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-300/90"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Browse all roles
      </Link>

      <header className="mt-8 pb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          {role.domain}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {role.name}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">Level: {role.level}</p>
      </header>

      <RolePathNotReadyMessage
        roleName={role.name}
        signedIn={signedIn}
        variant="role-page-pending"
      />
    </div>
  );
}
