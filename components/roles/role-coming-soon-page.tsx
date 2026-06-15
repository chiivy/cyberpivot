import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CabinetArtifactComingSoonCard } from "@/components/roles/cabinet-artifact-coming-soon-card";
import { NotifyLaunchForm } from "@/components/roles/notify-launch-form";
import { SALARY_TABLE_NOTE } from "@/lib/roles/shared-snippets";
import type { ComingSoonRoleContent } from "@/types/role";

interface RoleComingSoonPageProps {
  role: ComingSoonRoleContent;
}

function Section({
  title,
  accent = "amber",
  children,
}: {
  title: string;
  accent?: "amber" | "cyan";
  children: React.ReactNode;
}): React.ReactElement {
  const borderClass =
    accent === "amber" ? "border-amber-500/40" : "border-cyan-500/60";

  return (
    <section className="border-t border-white/[0.08] py-12 first:border-t-0 first:pt-0">
      <h2
        className={`border-l-2 pl-4 font-mono text-xl font-semibold tracking-tight text-foreground ${borderClass}`}
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function RoleComingSoonPage({
  role,
}: RoleComingSoonPageProps): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Link
        href="/roles"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-300/90"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Browse all roles
      </Link>

      <header className="mt-8 pb-4">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          {role.domain}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {role.name}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">Level: {role.level}</p>
        <div className="mt-5 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3">
          <p className="text-sm leading-relaxed text-amber-100/90">
            <span className="font-medium text-amber-200">Full path coming soon</span>
            {" — "}
            notify me when it launches using the form below.
          </p>
        </div>
      </header>

      <Section title="What this role actually does">
        <p className="text-base leading-relaxed text-zinc-400">{role.dayToDay}</p>
      </Section>

      <Section title="What makes this role different">
        <p className="text-base leading-relaxed text-zinc-400">
          {role.differentiator}
        </p>
      </Section>

      <Section title="Background that fits">
        <p className="text-base leading-relaxed text-zinc-400">{role.background}</p>
      </Section>

      <Section title="Salary ranges (2025/2026)">
        {role.salaryDisplay.type === "table" ? (
          <>
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
                  {role.salaryDisplay.salaries.map((row) => (
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
            <p className="mt-5 text-sm leading-relaxed text-zinc-500">
              {SALARY_TABLE_NOTE}
            </p>
          </>
        ) : (
          <p className="text-base leading-relaxed text-zinc-400">
            {role.salaryDisplay.note}
          </p>
        )}
        {role.salaryExtraNote ? (
          <p className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] px-4 py-3 text-sm leading-relaxed text-zinc-300">
            {role.salaryExtraNote}
          </p>
        ) : null}
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
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-zinc-300">Free / open source</h3>
            <ul className="mt-3 space-y-1.5" role="list">
              {role.toolsFree.map((tool) => (
                <li key={tool} className="text-sm text-zinc-400">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-300">Enterprise</h3>
            <ul className="mt-3 space-y-1.5" role="list">
              {role.toolsEnterprise.map((tool) => (
                <li key={tool} className="text-sm text-zinc-400">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Certs that matter">
        <ul className="space-y-5" role="list">
          {role.certs.map((cert) => (
            <li key={cert.name}>
              <p className="font-medium text-zinc-200">{cert.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
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

      <Section title="Related roles">
        <ul className="space-y-3" role="list">
          {role.relatedRoles.map((related) => (
            <li key={related.name} className="text-sm leading-relaxed text-zinc-400">
              <span className="font-medium text-zinc-300">{related.name}</span>
              {" — "}
              {related.note}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Cabinet artifacts you will build">
        <p className="mb-6 text-sm leading-relaxed text-zinc-500">
          Real work products you keep for interviews. The full path is not live yet, but
          this is what you will earn module by module.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {role.cabinetPreview.map((artifact) => (
            <li key={artifact.name}>
              <CabinetArtifactComingSoonCard artifact={artifact} />
            </li>
          ))}
        </ul>
      </Section>

      <div className="border-t border-white/[0.08] py-12">
        <div className="rounded-lg border border-amber-500/15 bg-amber-500/[0.03] p-6">
          <h2 className="font-mono text-lg font-semibold text-foreground">
            Get notified when this path launches
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Leave your email. We will let you know when the {role.name} path is ready.
          </p>
          <div className="mt-6">
            <NotifyLaunchForm
              roleSlug={role.slug}
              roleName={role.name}
              variant="coming-soon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
