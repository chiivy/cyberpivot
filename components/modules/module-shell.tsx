interface ModuleShellProps {
  children: React.ReactNode;
}

export function ModuleShell({
  children,
}: ModuleShellProps): React.ReactElement {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {children}
    </article>
  );
}
