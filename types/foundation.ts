export type FoundationModuleStatus = "available" | "coming-soon";

export interface FoundationModuleTool {
  name: string;
  type: "free" | "enterprise";
  url?: string;
}

export interface FoundationCabinetArtifact {
  name: string;
  description: string;
  unlocksOn: string;
  slug: string;
}

export interface FoundationModuleMeta {
  title: string;
  slug: string;
  module: number;
  level: string;
  description: string;
  readingTime: string;
  labTime: string;
  status: FoundationModuleStatus;
  nextModule: string | null;
}

export interface FoundationModule extends FoundationModuleMeta {
  tools: readonly FoundationModuleTool[];
  cabinetArtifact: FoundationCabinetArtifact;
  content: string;
}

export const FOUNDATION_PROGRESS_STORAGE_KEY =
  "cyberpivot-foundation-progress" as const;

export interface FoundationProgressState {
  completedModules: string[];
  startedModules: string[];
  cabinetArtifacts: string[];
}
