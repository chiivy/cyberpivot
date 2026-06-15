export type Q1Background =
  | "no-background"
  | "it"
  | "developer"
  | "security";

export type Q2WorkInstinct =
  | "investigate"
  | "fix-fast"
  | "prevention"
  | "replicate"
  | "build-right";

export type Q3Environment =
  | "cloud"
  | "code"
  | "soc"
  | "business"
  | "attack";

export type Q4Terminal =
  | "very-comfortable"
  | "somewhat"
  | "not-really"
  | "never";

export type Q5Goal =
  | "job-from-scratch"
  | "it-to-security"
  | "level-up"
  | "understand-field";

export type Q6CloudPlatform = "azure" | "aws" | "gcp" | "not-sure";

export type Q6SocFocus = "monitoring" | "endpoint" | "hunting";

export type Q6CodeFocus = "applications" | "apis" | "pipeline" | "ai";

export type Q6Answer =
  | { type: "cloud"; value: Q6CloudPlatform }
  | { type: "soc"; value: Q6SocFocus }
  | { type: "code"; value: Q6CodeFocus };

export type EntryPoint = "A" | "B" | "C" | "D";

export type PathSlug =
  | "azure"
  | "pentest"
  | "soc"
  | "grc"
  | "appsec"
  | "api-security"
  | "ai-security";

export interface OnboardingAnswers {
  q1Background: Q1Background;
  q2WorkInstinct: Q2WorkInstinct;
  q3Environment: Q3Environment;
  q4Terminal: Q4Terminal;
  q5Goal: Q5Goal;
  q6?: Q6Answer;
}

export interface BridgeRole {
  name: string;
  slug: string;
  domainId: string;
  pathSlug: PathSlug;
  explanation: string;
}

export interface RoleRecommendation {
  roleName: string;
  roleSlug: string;
  domain: string;
  domainId: string;
  level: string;
  pathSlug: PathSlug;
  comingSoon: boolean;
  targetRoleName?: string;
  bridgeRole?: BridgeRole;
  pathNote?: string;
}

export interface OnboardingRecommendation {
  entryPoint: EntryPoint;
  entryLabel: string;
  startingPointTitle: string;
  startingPointDescription: string;
  role: RoleRecommendation;
  whyExplanation: string;
  foundationFirst: boolean;
}

export interface OnboardingPersistedState {
  answers: OnboardingAnswers;
  recommendation: OnboardingRecommendation;
  chosenPath: PathSlug | null;
  chosenDomainId: string | null;
  chosenRoleSlug: string | null;
}

export interface CabinetPreviewItem {
  name: string;
  description: string;
  unlocksInModule: string;
}
