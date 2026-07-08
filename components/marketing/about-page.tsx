import Link from "next/link";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";

export function AboutPage(): React.ReactElement {
  return (
    <div className="marketing-fade-in">
      <section className="px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <header>
            <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built by someone doing the job.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              CyberPivot was built by a working cybersecurity professional
              currently operating across threat detection, incident response,
              security architecture, and IT governance in enterprise
              environments.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              The platform exists because every available course either stops at
              certification prep or assumes you already have a job to practice
              on. Neither is useful if you are trying to get your first role or
              move into a specialisation you have not worked in yet.
            </p>
          </header>
        </div>
      </section>

      <section
        className="marketing-section border-t border-white/[0.08] px-4 py-12 sm:px-6 sm:py-16"
        aria-labelledby="what-cyberpivot-is"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="what-cyberpivot-is">
            What CyberPivot actually is
          </SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              CyberPivot is a structured cybersecurity learning platform built
              around real job roles. You pick the role you want, work through
              the modules, and build a portfolio of real work products along the
              way, the kind of artifacts you can show in an interview rather
              than a completion certificate nobody asked for.
            </p>
            <p>
              Every module is built around a realistic scenario inside a
              fictional enterprise, Quorivane Bank, so the work you do has
              context. You are not running disconnected exercises. You are
              investigating a real alert, writing a real brief, building a real
              detection rule, for a real environment that happens to be
              fictional.
            </p>
            <p>
              Foundation modules are free. They cover the technical ground every
              cybersecurity professional needs regardless of which direction they
              go: networking, Linux, Windows and Active Directory, security
              fundamentals, cloud, and Python for security. Six modules,
              hands-on labs, and six portfolio entries before you have spent a
              penny.
            </p>
            <p>
              Role paths are available on subscription. Thirty plus roles across
              six security domains: defensive security, offensive security,
              application and product security, cloud and infrastructure
              security, governance risk and compliance, and operational
              technology security. Each path is built around what the role
              actually requires on shift, verified against real job postings and
              real practitioners, not abstracted into generic content that could
              apply to anything.
            </p>
          </div>
        </div>
      </section>

      <section
        className="marketing-section border-t border-white/[0.08] px-4 py-12 sm:px-6 sm:py-16"
        aria-labelledby="why-this-exists"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="why-this-exists">Why this exists</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              Most cybersecurity training falls into one of two categories.
              Certification prep, which teaches you to pass a test and not much
              else. And hands-on labs, which are useful but disconnected, a
              series of rooms or challenges with no through-line to a real job.
            </p>
            <p>
              CyberPivot is built around a different question: what does
              someone in this role actually do on a normal shift, and how do
              you get good at that specifically?
            </p>
            <p>
              The answer turns out to be: you do it. With real tools, real
              scenarios, and real outputs you keep. Not video lectures you watch
              and forget. Not multiple-choice questions about concepts you have
              never applied.
            </p>
          </div>
        </div>
      </section>

      <section
        className="marketing-section border-t border-white/[0.08] px-4 py-12 sm:px-6 sm:py-16"
        aria-labelledby="who-this-is-for"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="who-this-is-for">Who this is for</SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              You are trying to break into cybersecurity and you want to know
              exactly what a SOC analyst, penetration tester, or GRC analyst
              actually does before you commit years to getting there.
            </p>
            <p>
              Or you are already working in security and you want to move into a
              specialisation you have not worked in yet, cloud security, OT
              security, AI red teaming, and you need a way to build real
              skills and real evidence of those skills without waiting for an
              employer to give you the opportunity.
            </p>
            <p>
              Or you are somewhere between the two and you just want to learn
              properly rather than collecting certificates.
            </p>
            <p>CyberPivot is built for all three.</p>
          </div>
        </div>
      </section>

      <section
        className="marketing-section border-t border-white/[0.08] px-4 py-12 sm:px-6 sm:py-16"
        aria-labelledby="the-honest-version"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="the-honest-version">
            The honest version
          </SectionHeading>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              CyberPivot is in active development. Not everything is live yet.
              Foundation is complete and available now. Role paths are being
              built, verified against real job data, and published as they are
              ready.
            </p>
            <p>
              The role pages for paths not yet live tell you what the path
              covers and what you will build when it ships. Nothing is hidden
              behind a vague coming soon with no substance behind it.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-[4.5rem] pt-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h2 className="font-mono text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Start with Foundation. It is free.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Six modules covering the technical ground every cybersecurity
              professional needs. No account required to begin.
            </p>
            <div className="mt-6">
              <Button
                asChild
                className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
              >
                <Link href="/foundations">Start Foundation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
