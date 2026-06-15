import type { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100 antialiased">
      {children}
    </div>
  );
}
