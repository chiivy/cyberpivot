import type { PlaceholderComingSoonRoleContent } from "@/types/role";

/** Slugs with catalog entries in ROLES but no rich coming-soon page yet. */
export const PLACEHOLDER_COMING_SOON_ROLE_SLUGS = [
  "dfir-analyst",
  "security-engineer",
  "malware-analyst",
  "privacy-analyst",
  "ai-red-teamer",
  "ot-security-analyst",
  "ot-security-engineer",
] as const;

export type PlaceholderComingSoonRoleSlug =
  (typeof PLACEHOLDER_COMING_SOON_ROLE_SLUGS)[number];

export const PLACEHOLDER_COMING_SOON_ROLES: readonly PlaceholderComingSoonRoleContent[] =
  [
    {
      slug: "dfir-analyst",
      name: "DFIR Analyst",
      domain: "Defensive Security",
      level: "Mid to Senior",
      placeholder: true,
    },
    {
      slug: "security-engineer",
      name: "Security Engineer",
      domain: "Cloud and Infrastructure Security",
      level: "Mid to Senior",
      placeholder: true,
    },
    {
      slug: "malware-analyst",
      name: "Malware Analyst",
      domain: "Offensive Security",
      level: "Mid to Senior",
      placeholder: true,
    },
    {
      slug: "privacy-analyst",
      name: "Privacy Analyst",
      domain: "Governance, Risk and Compliance",
      level: "Entry to Mid",
      placeholder: true,
    },
    {
      slug: "ai-red-teamer",
      name: "AI Red Teamer",
      domain: "Offensive Security",
      level: "Mid to Senior",
      placeholder: true,
    },
    {
      slug: "ot-security-analyst",
      name: "OT Security Analyst",
      domain: "Operational Technology and Industrial Control Systems Security",
      level: "Entry to Mid",
      placeholder: true,
    },
    {
      slug: "ot-security-engineer",
      name: "OT Security Engineer",
      domain: "Operational Technology and Industrial Control Systems Security",
      level: "Mid to Senior",
      placeholder: true,
    },
  ] as const;

export function isPlaceholderComingSoonSlug(
  slug: string,
): slug is PlaceholderComingSoonRoleSlug {
  return (PLACEHOLDER_COMING_SOON_ROLE_SLUGS as readonly string[]).includes(
    slug,
  );
}
