import type { Metadata } from "next";
import Link from "next/link";

import { IntroSectionCards } from "@/components/intro/intro-section-cards";
import { getIntroSectionMetaList } from "@/lib/intro/get-intro-sections";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Free introduction to cybersecurity. Eight sections covering what the field is, how attacks work, the industry, compliance, careers, and how CyberPivot works.",
};

export default function IntroLandingPage(): React.ReactElement {
  const sections = getIntroSectionMetaList();

  return (
    <div className="marketing-page min-h-full">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <header className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Level 0
          </p>
          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Introduction
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            Free, ungated, no account required. Eight sections that answer whether
            cybersecurity is for you, how the industry works, and what employers
            actually care about before you commit to a path.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Start with section 1 or jump to what you need.{" "}
            <Link href="/intro/what-is-cybersecurity" className="text-cyan-400 hover:text-cyan-300">
              Begin here
            </Link>
            .
          </p>
        </header>

        <div className="mt-12">
          <IntroSectionCards sections={sections} />
        </div>
      </div>
    </div>
  );
}
