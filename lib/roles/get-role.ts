import { COMING_SOON_ROLE_PAGES } from "@/lib/roles/coming-soon-roles";
import { V1_ROLE_PAGES } from "@/lib/roles/v1-roles";
import type { RolePageData } from "@/types/role";

const ALL_ROLES: readonly RolePageData[] = [
  ...V1_ROLE_PAGES,
  ...COMING_SOON_ROLE_PAGES,
];

const BY_SLUG = new Map<string, RolePageData>(
  ALL_ROLES.map((role) => [role.slug, role]),
);

export function getRoleBySlug(slug: string): RolePageData | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllRoleSlugs(): string[] {
  return ALL_ROLES.map((role) => role.slug);
}

export function getV1RoleSlugs(): string[] {
  return V1_ROLE_PAGES.map((role) => role.slug);
}
