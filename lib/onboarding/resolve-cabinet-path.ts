import { pathSlugFromRoleSlug } from "@/lib/onboarding/recommendation";
import type { PathSlug } from "@/types/onboarding";

export function resolveCabinetPath(
  chosenPath: PathSlug,
  chosenRoleSlug: string | null,
): PathSlug {
  if (chosenRoleSlug) {
    const fromRole = pathSlugFromRoleSlug(chosenRoleSlug);
    if (fromRole) {
      return fromRole;
    }
  }
  return chosenPath;
}
