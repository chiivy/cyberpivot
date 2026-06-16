export default function FoundationModuleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <div className="intro-reading-page min-h-full">{children}</div>;
}
