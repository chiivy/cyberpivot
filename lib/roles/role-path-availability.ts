import { getRoleBySlug } from "@/lib/roles/get-role";
import { isV1RoleContent } from "@/types/role";

export function v1RoleHasAvailableModule(roleSlug: string): boolean {
  const role = getRoleBySlug(roleSlug);
  if (!role || !isV1RoleContent(role)) {
    return false;
  }

  return role.modules.some((module) => module.status === "available");
}
