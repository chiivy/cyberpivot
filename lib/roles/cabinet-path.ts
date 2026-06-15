import type { PathSlug } from "@/types/onboarding";

const ROLE_SLUG_TO_CABINET: Record<string, PathSlug> = {
  "soc-analyst": "soc",
  "penetration-tester": "pentest",
  "azure-security-engineer": "azure",
  "grc-analyst": "grc",
  "appsec-engineer": "appsec",
  "api-security-engineer": "api-security",
  "ai-security-engineer": "ai-security",
};

export function cabinetPathForRoleSlug(slug: string): PathSlug | null {
  return ROLE_SLUG_TO_CABINET[slug] ?? null;
}

export function allRoleSlugs(): string[] {
  return Object.keys(ROLE_SLUG_TO_CABINET);
}
