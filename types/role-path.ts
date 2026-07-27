export type RolePathModuleStatus = "available" | "coming-soon";

export interface RolePathModuleTool {
  name: string;
  type: "free" | "enterprise";
  url?: string;
}

export interface RolePathCabinetArtifact {
  name: string;
  description: string;
  unlocksOn: string;
  slug: string;
}

export interface RolePathModuleMeta {
  title: string;
  slug: string;
  module: number;
  level: string;
  roleSlug: string;
  pathSlug: string;
  description: string;
  readingTime: string;
  labTime: string;
  status: RolePathModuleStatus;
  previousModule: string | null;
  nextModule: string | null;
  cabinetArtifact?: {
    name: string;
    description: string;
  };
}

export interface RolePathModule extends RolePathModuleMeta {
  tools: readonly RolePathModuleTool[];
  enterpriseToolsNote?: string;
  cabinetArtifact: RolePathCabinetArtifact;
  content: string;
}

export const OT_SECURITY_ANALYST_ROLE_SLUG = "ot-security-analyst" as const;
export const OT_SECURITY_CONTENT_AREA = "ot-security-analyst" as const;
export const OT_SECURITY_PATH_SLUG = "ot-security" as const;

export function getRolePathModuleHref(
  roleSlug: string,
  moduleSlug: string,
): string {
  return `/roles/${roleSlug}/${moduleSlug}`;
}
