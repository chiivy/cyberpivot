import Link from "next/link";

import { CabinetArtifactCard } from "@/components/onboarding/cabinet-artifact-card";
import { Button } from "@/components/ui/button";
import { CABINET_BY_PATH } from "@/lib/onboarding/cabinet-artifacts";
import type { RolePageContent } from "@/types/role";
import { cn } from "@/lib/utils";

interface RoleV1PageProps {
  role: RolePageContent;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <section className="marketing-divider py-10 first:pt-0">
      <h2 className="font-mono text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function RoleV1Page({ role }: RoleV1PageProps): React.ReactElement {
  const cabinet = CABINET_BY_PATH[role.cabinetPath];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          {role.domain}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {role.name}
        </h1>
        <p className="mt-3 text-sm text-cyan-400/90">Level: {role.level}</p>
      </header>

      <Section title="What you actually do">
        <p className="text-base leading-relaxed text-zinc-400">{role.dayToDay}</p>
      </Section>

      <Section title="Background that fits">
        <p className="text-base leading-relaxed text-zinc-400">{role.background}</p>
      </Section>

      <Section title="A typical week">
        <ul className="space-y-3" role="list">
          {role.typicalWeek.map((item) => (
            <li
              key={item.slice(0, 24)}
              className="text-sm leading-relaxed text-zinc-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Salary ranges (2025/2026)">
        <p className="mb-4 text-sm text-zinc-500">
          Figures are typical base salary ranges. Contract and senior leadership
          roles can sit higher. Always check local market reports before you negotiate.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-zinc-500">
                <th className="py-2 pr-4 font-medium">Region</th>
                <th className="py-2 pr-4 font-medium">Entry</th>
                <th className="py-2 pr-4 font-medium">Mid</th>
                <th className="py-2 font-medium">Senior</th>
              </tr>
            </thead>
            <tbody>
              {role.salaries.map((row) => (
                <tr
                  key={row.region}
                  className="border-b border-white/[0.06] text-zinc-300"
                >
                  <td className="py-3 pr-4">{row.region}</td>
                  <td className="py-3 pr-4">{row.entry}</td>
                  <td className="py-3 pr-4">{row.mid}</td>
                  <td className="py-3">{row.senior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Industries that hire">
        <ul className="flex flex-wrap gap-2" role="list">
          {role.industries.map((industry) => (
            <li key={industry}>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                {industry}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tools on the job">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-zinc-300">Free / open source</h3>
            <ul className="mt-2 space-y-1.5" role="list">
              {role.toolsFree.map((tool) => (
                <li key={tool} className="text-sm text-zinc-400">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-300">Enterprise</h3>
            <ul className="mt-2 space-y-1.5" role="list">
              {role.toolsEnterprise.map((tool) => (
                <li key={tool} className="text-sm text-zinc-400">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Certs that actually matter">
        <ul className="space-y-4" role="list">
          {role.certs.map((cert) => (
            <li key={cert.name}>
              <p className="font-medium text-zinc-200">{cert.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                {cert.note}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Where this role leads">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-400" role="list">
          {role.careerProgression.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section title="Modules on this path">
        <ul className="space-y-2" role="list">
          {role.modules.map((mod, index) => (
            <li
              key={mod.name}
              className="flex items-center justify-between gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <span className="text-sm text-zinc-300">
                <span className="font-mono text-zinc-500">{index + 1}.</span>{" "}
                {mod.name}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                  mod.status === "available"
                    ? "bg-cyan-500/15 text-cyan-300"
                    : "bg-zinc-800 text-zinc-500",
                )}
              >
                {mod.status === "available" ? "Available" : "Coming soon"}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Cabinet artifacts you will build">
        <p className="mb-6 text-sm leading-relaxed text-zinc-500">
          Real work products you keep for interviews. Not templates you download.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {cabinet.map((artifact) => (
            <li key={artifact.name}>
              <CabinetArtifactCard artifact={artifact} />
            </li>
          ))}
        </ul>
      </Section>

      <div className="marketing-divider py-12 text-center">
        <Button
          size="lg"
          asChild
          className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
        >
          <Link href="/onboarding">Start this path</Link>
        </Button>
      </div>
    </div>
  );
}
