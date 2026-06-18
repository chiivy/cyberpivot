import Link from "next/link";

import { Button } from "@/components/ui/button";

type RolePathNotReadyVariant = "path-not-ready" | "role-page-pending";

interface RolePathNotReadyMessageProps {
  roleName: string;
  signedIn: boolean;
  variant?: RolePathNotReadyVariant;
}

export function RolePathNotReadyMessage({
  roleName,
  signedIn,
  variant = "path-not-ready",
}: RolePathNotReadyMessageProps): React.ReactElement {
  const isRolePagePending = variant === "role-page-pending";

  return (
    <div className="rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-5 text-left">
      <p className="text-sm font-medium text-amber-200">
        {isRolePagePending
          ? "This role page is still being written"
          : "This path is not ready to start yet"}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {isRolePagePending
          ? `The ${roleName} role is listed on CyberPivot, but the full role page is not published yet. Role description, salary data, tools, certs, and learning modules are still being written.`
          : `The ${roleName} learning path is still being built. No modules are available to start yet. Check back when the first module ships, or browse Foundation modules and other ready paths in the meantime.`}
      </p>
      {signedIn ? (
        <p className="mt-3 text-sm text-zinc-500">
          You are signed in. Your account is ready and any progress you make
          once modules launch will be saved.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            {isRolePagePending
              ? "Create an account or sign in now so you are ready when this path's content goes live. Any progress you make will be saved to your account."
              : "Create an account or sign in now so you are ready when the first module goes live. Any progress you make will be saved to your account."}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="sm"
              className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
            >
              <Link href="/signup">Create account</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/15 bg-transparent"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
