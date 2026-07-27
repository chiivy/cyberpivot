import { getRoleBySlug } from "@/lib/roles/get-role";
import { isV1RoleContent } from "@/types/role";
import { getRolePathModuleHref } from "@/types/role-path";

function getFirstAvailableModuleSlug(roleSlug: string): string | null {
  const role = getRoleBySlug(roleSlug);
  if (!role || !isV1RoleContent(role)) {
    return null;
  }

  const first = role.modules.find(
    (module) => module.status === "available" && Boolean(module.slug),
  );

  return first?.slug ?? null;
}

export function v1RoleHasAvailableModule(roleSlug: string): boolean {
  return getFirstAvailableModuleSlug(roleSlug) != null;
}

/** Role overview, or the first available module when the path has real content. */
export function getV1RoleLearningHref(roleSlug: string): string {
  const moduleSlug = getFirstAvailableModuleSlug(roleSlug);
  if (moduleSlug) {
    return getRolePathModuleHref(roleSlug, moduleSlug);
  }

  return `/roles/${roleSlug}`;
}
