export const CONTENT_AREA_FOUNDATION = "foundation" as const;

export type ContentArea = typeof CONTENT_AREA_FOUNDATION | string;

export interface ModuleCompletionRow {
  id: string;
  user_id: string;
  content_area: string;
  module_slug: string;
  completed_at: string;
}

export interface CabinetArtifactRow {
  id: string;
  user_id: string;
  content_area: string;
  module_slug: string;
  artifact_name: string;
  summary: string | null;
  link_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfileRow {
  user_id: string;
  cabinet_username: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicCabinetArtifactRow {
  cabinet_username: string;
  display_name: string | null;
  content_area: string;
  module_slug: string;
  artifact_name: string;
  summary: string | null;
  link_url: string | null;
  created_at: string;
}

export interface CabinetModuleDefinition {
  contentArea: string;
  moduleSlug: string;
  moduleTitle: string;
  moduleNumber: number;
  artifactName: string;
  artifactDescription: string;
  status: "available" | "coming-soon";
}

export interface CabinetModuleCardData extends CabinetModuleDefinition {
  unlocked: boolean;
  completedAt: string | null;
  summary: string | null;
  linkUrl: string | null;
  artifactId: string | null;
}

export interface CompleteModuleInput {
  contentArea: string;
  moduleSlug: string;
  artifactName: string;
  summary?: string | null;
  linkUrl?: string | null;
}

export interface UpdateArtifactInput {
  artifactId: string;
  summary: string | null;
  linkUrl: string | null;
}
