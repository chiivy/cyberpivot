export default function OtSecurityModuleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <div className="intro-reading-page min-h-full">{children}</div>;
}
