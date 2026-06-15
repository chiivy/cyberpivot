import type { ComingSoonRoleContent } from "@/types/role";

import { APP_PRODUCT_COMING_SOON_ROLES } from "@/lib/roles/coming-soon/app-product";
import { CLOUD_COMING_SOON_ROLES } from "@/lib/roles/coming-soon/cloud";
import { DEFENSIVE_COMING_SOON_ROLES } from "@/lib/roles/coming-soon/defensive";
import { GRC_COMING_SOON_ROLES } from "@/lib/roles/coming-soon/grc";
import { OFFENSIVE_COMING_SOON_ROLES } from "@/lib/roles/coming-soon/offensive";

export const COMING_SOON_ROLE_PAGES: readonly ComingSoonRoleContent[] = [
  ...DEFENSIVE_COMING_SOON_ROLES,
  ...OFFENSIVE_COMING_SOON_ROLES,
  ...APP_PRODUCT_COMING_SOON_ROLES,
  ...CLOUD_COMING_SOON_ROLES,
  ...GRC_COMING_SOON_ROLES,
] as const;
