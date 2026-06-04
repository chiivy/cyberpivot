interface SectionHeadingProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  id,
  children,
  className = "",
}: SectionHeadingProps): React.ReactElement {
  return (
    <h2
      id={id}
      className={`font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}
