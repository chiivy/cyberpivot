export type Q1Background =
  | "beginner"
  | "it"
  | "developer"
  | "security";

export type Q2Linux = "comfortable" | "little" | "never";

export type Q3Networking = "yes" | "somewhat" | "not-really";

export type Q4PathKnown = "show-roles" | "help-choose";

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
  q2Linux: Q2Linux;
  q3Networking: Q3Networking;
  q4PathKnown: Q4PathKnown;
}

export interface OnboardingRecommendation {
  entryPoint: EntryPoint;
  entryLabel: string;
  startingPointTitle: string;
  startingPointDescription: string;
  highlightedPaths?: PathSlug[];
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

export interface RecommendedRole {
  name: string;
  slug: string;
  domainId: string;
  pathSlug: PathSlug;
  suggested?: boolean;
  comingSoon?: boolean;
}
