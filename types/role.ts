import type { PathSlug } from "@/types/onboarding";

export type RoleLevel =
  | "Entry"
  | "Entry to Mid"
  | "Mid"
  | "Mid to Senior"
  | "Entry to Senior"
  | "Senior";

export interface SalaryByRegion {
  region: string;
  entry: string;
  mid: string;
  senior: string;
}

export interface RoleCert {
  name: string;
  note: string;
}

export interface RoleModuleItem {
  name: string;
  status: "available" | "coming-soon";
}

export interface RolePageContent {
  slug: string;
  name: string;
  domain: string;
  domainId: string;
  level: RoleLevel;
  v1: boolean;
  cabinetPath: PathSlug;
  dayToDay: string;
  background: string;
  typicalWeek: readonly string[];
  salaries: readonly SalaryByRegion[];
  industries: readonly string[];
  toolsFree: readonly string[];
  toolsEnterprise: readonly string[];
  certs: readonly RoleCert[];
  careerProgression: readonly string[];
  modules: readonly RoleModuleItem[];
}

export interface ComingSoonRoleContent {
  slug: string;
  name: string;
  domain: string;
  domainId: string;
  oneLiner: string;
}

export type RolePageData = RolePageContent | ComingSoonRoleContent;

export function isV1RoleContent(
  role: RolePageData,
): role is RolePageContent {
  return "dayToDay" in role;
}
