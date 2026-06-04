import Link from "next/link";

export function OnboardingWordmark(): React.ReactElement {
  return (
    <Link
      href="/"
      className="font-mono text-2xl font-semibold tracking-tight text-foreground hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
    >
      CyberPivot
    </Link>
  );
}
