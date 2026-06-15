import { cn } from "@/lib/utils";

interface OnboardingShellProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  /** Wider container for cabinet grid (max-w-4xl). */
  wide?: boolean;
  /** Top-aligned layout with extra bottom padding for scrollable pages. */
  alignTop?: boolean;
}

export function OnboardingShell({
  children,
  className,
  narrow = false,
  wide = false,
  alignTop = false,
}: OnboardingShellProps): React.ReactElement {
  return (
    <div
      className={cn(
        "onboarding-page flex min-h-screen w-full flex-col items-center bg-[#0a0a0f] px-4 text-zinc-100",
        alignTop ? "justify-start py-16 pb-24" : "justify-center py-12",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          narrow ? "max-w-md" : wide ? "max-w-4xl" : "max-w-2xl",
        )}
      >
        {children}
      </div>
    </div>
  );
}
