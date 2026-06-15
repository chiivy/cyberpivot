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

export interface RoleMisconception {
  myth: string;
  reality: string;
}

export interface RoleInterviewQuestion {
  question: string;
  goodAnswer: string;
}

export interface RoleRelatedRole {
  name: string;
  note: string;
}

export interface RolePrerequisite {
  module: string;
  reason: string;
}

export interface RoleLabRequirements {
  minimumSpecs: string;
  recommendedSpecs?: string;
  diskSpace: string;
  installs: readonly string[];
  setupTime: string;
  osSupport: string;
  additionalNotes?: string;
}

export interface RoleCommunityResource {
  name: string;
  note?: string;
}

export interface RoleRegulation {
  name: string;
  description: string;
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
  dayInTheLife: string;
  background: string;
  careerSwitcherNote?: string;
  misconceptions: readonly RoleMisconception[];
  handsOnProjects: readonly string[];
  labRequirements: RoleLabRequirements;
  typicalWeek: readonly string[];
  salaries: readonly SalaryByRegion[];
  industries: readonly string[];
  toolsFree: readonly string[];
  toolsEnterprise: readonly string[];
  interviewQuestions: readonly RoleInterviewQuestion[];
  certs: readonly RoleCert[];
  careerProgression: readonly string[];
  relatedRoles: readonly RoleRelatedRole[];
  communityAndResources: readonly RoleCommunityResource[];
  prerequisites: readonly RolePrerequisite[];
  regulationsAndStandards: readonly RoleRegulation[];
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
