import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { CabinetArtifactCard } from "@/components/marketing/cabinet-artifact-card";
import { DomainCard } from "@/components/marketing/domain-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  cabinetArtifacts,
  GITHUB_REPO_URL,
  howItWorksSteps,
  openSourceStats,
  problemStatements,
  securityDomains,
} from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "CyberPivot — Start your cybersecurity career",
  description:
    "Free, open source cybersecurity learning platform. Real tools, real labs, real portfolio. Find your path.",
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <section
        className="marketing-fade-in px-4 pb-[3.75rem] pt-12 sm:px-6 sm:pb-[5.25rem] sm:pt-[4.5rem]"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="hero-heading"
            className="font-mono text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Your cybersecurity career starts here.
            <br />
            Wherever here&nbsp;is.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            CyberPivot takes you from where you are now to job-ready in your
            chosen security role. Real tools, real labs, and a portfolio you can
            actually show someone.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="w-full bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400 sm:w-auto"
            >
              <Link href="/onboarding">Find your path</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full border-white/15 bg-transparent text-zinc-200 hover:bg-white/5 hover:text-foreground sm:w-auto"
            >
              <Link href="/intro">Start with the Introduction</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full border-white/15 bg-transparent text-zinc-200 hover:bg-white/5 hover:text-foreground sm:w-auto"
            >
              <Link href="#roles">Browse roles</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        className="marketing-section marketing-fade-in px-4 sm:px-6"
        aria-labelledby="problem-heading"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="problem-heading">
            Most cybersecurity learning prepares you for the course. Not the
            job.
          </SectionHeading>
          <div className="mt-10 space-y-6">
            {problemStatements.map((statement) => (
              <p
                key={statement.slice(0, 40)}
                className="text-base leading-relaxed text-zinc-400"
              >
                {statement}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="marketing-section marketing-fade-in px-4 sm:px-6"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="how-heading">How CyberPivot works</SectionHeading>
          <ol className="mt-10 grid gap-6 md:grid-cols-4 md:items-stretch">
            {howItWorksSteps.map((step, index) => (
              <li
                key={step.number}
                className="relative flex h-full flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] p-5"
              >
                {index < howItWorksSteps.length - 1 ? (
                  <span
                    className="absolute left-[1.125rem] top-10 hidden h-px w-[calc(100%+1.5rem)] bg-gradient-to-r from-cyan-500/40 to-transparent md:block"
                    aria-hidden="true"
                  />
                ) : null}
                <p className="font-mono text-sm text-cyan-400">{step.number}</p>
                <h3 className="mt-2 font-mono text-lg font-semibold leading-snug text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="roles"
        className="marketing-section marketing-fade-in scroll-mt-20 px-4 sm:px-6"
        aria-labelledby="roles-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="roles-heading">
            25+ roles across five security domains
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Pick a domain to see roles, modules, and what you will build. V1
            roles are ready to start. Others are listed so you can plan ahead.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {securityDomains.map((domain, index) => (
              <div
                key={domain.id}
                className={cn(
                  "lg:col-span-2",
                  index === 3 && "lg:col-start-2",
                  index === 4 &&
                    "sm:col-span-2 sm:mx-auto sm:max-w-md lg:col-start-4 lg:mx-0 lg:max-w-none",
                )}
              >
                <DomainCard domain={domain} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="marketing-section marketing-fade-in px-4 sm:px-6"
        aria-labelledby="cabinet-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="cabinet-heading">
            You don&apos;t finish with a certificate. You finish with a lab.
          </SectionHeading>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
            Your cabinet is the portfolio you show in interviews. Every module
            ends with something real: a configured tenant, a detection rule, a
            report, a policy pack. Not a screenshot of a completed quiz.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cabinetArtifacts.map((artifact) => (
              <CabinetArtifactCard key={artifact.name} artifact={artifact} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="marketing-section marketing-fade-in px-4 sm:px-6"
        aria-labelledby="opensource-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="opensource-heading">
            Free. Open source. No catch.
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            CyberPivot is free forever. Self-host it if you want. Content and
            code improve through community pull requests. MIT licensed.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 py-10">
            <div>
              <dt className="text-xs uppercase tracking-wider text-zinc-500">
                GitHub stars
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-cyan-400">
                {openSourceStats.githubStars}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-zinc-500">
                Roles
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-cyan-400">
                {openSourceStats.rolesAvailable}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-zinc-500">
                Modules
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-cyan-400">
                {openSourceStats.modulesAvailable}
              </dd>
            </div>
          </dl>
          <Link
            href={GITHUB_REPO_URL}
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="marketing-section marketing-fade-in px-4 pb-[4.5rem] sm:px-6"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="font-mono text-3xl font-semibold tracking-tight text-foreground"
          >
            Ready to start?
          </h2>
          <p className="mt-4 text-zinc-400">
            Tell us where you are. We&apos;ll show you where to go.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-8 bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
          >
            <Link href="/onboarding">Find your path</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
