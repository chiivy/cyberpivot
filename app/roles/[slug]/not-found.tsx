import Link from "next/link";

export default function RoleNotFound(): React.ReactElement {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-mono text-2xl font-semibold text-foreground">
        Role not found
      </h1>
      <p className="mt-4 text-sm text-zinc-400">
        That role does not exist yet. Browse the full list instead.
      </p>
      <Link
        href="/roles"
        className="mt-8 inline-block text-sm text-cyan-400 hover:text-cyan-300"
      >
        View all roles
      </Link>
    </div>
  );
}
