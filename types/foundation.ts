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
  cabinetArtifact?: {
    name: string;
    description: string;
  };
}

export interface FoundationModule extends FoundationModuleMeta {
  tools: readonly FoundationModuleTool[];
  enterpriseToolsNote?: string;
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
