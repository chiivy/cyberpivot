import { cn } from "@/lib/utils";

interface OnboardingShellProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function OnboardingShell({
  children,
  className,
  narrow = false,
}: OnboardingShellProps): React.ReactElement {
  return (
    <div
      className={cn(
        "onboarding-page flex min-h-screen flex-col items-center justify-center px-4 py-12 text-zinc-100",
        className,
      )}
    >
      <div
        className={cn(
          "w-full",
          narrow ? "max-w-md" : "max-w-2xl",
        )}
      >
        {children}
      </div>
    </div>
  );
}
