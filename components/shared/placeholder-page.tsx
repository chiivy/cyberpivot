interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description = "Coming in V1.",
}: PlaceholderPageProps): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Placeholder
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
      {description ? (
        <p className="mt-4 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
