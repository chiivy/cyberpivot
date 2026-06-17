export default function PublicCabinetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="marketing-page min-h-screen bg-[#0a0a0f] text-zinc-100">
      {children}
    </div>
  );
}
