export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
