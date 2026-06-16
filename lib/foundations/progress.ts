import {
  FOUNDATION_PROGRESS_STORAGE_KEY,
  type FoundationProgressState,
} from "@/types/foundation";

const EMPTY_STATE: FoundationProgressState = {
  completedModules: [],
  startedModules: [],
  cabinetArtifacts: [],
};

export function readFoundationProgress(): FoundationProgressState {
  if (typeof window === "undefined") {
    return EMPTY_STATE;
  }

  try {
    const raw = localStorage.getItem(FOUNDATION_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return EMPTY_STATE;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "completedModules" in parsed &&
      "cabinetArtifacts" in parsed &&
      Array.isArray((parsed as FoundationProgressState).completedModules) &&
      Array.isArray((parsed as FoundationProgressState).cabinetArtifacts)
    ) {
      const state = parsed as FoundationProgressState;
      return {
        completedModules: state.completedModules,
        startedModules: Array.isArray(state.startedModules)
          ? state.startedModules
          : [],
        cabinetArtifacts: state.cabinetArtifacts,
      };
    }
    return EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

export function markFoundationModuleComplete(
  moduleSlug: string,
  artifactSlug: string,
): FoundationProgressState {
  const current = readFoundationProgress();
  const completedModules = current.completedModules.includes(moduleSlug)
    ? current.completedModules
    : [...current.completedModules, moduleSlug];
  const cabinetArtifacts = current.cabinetArtifacts.includes(artifactSlug)
    ? current.cabinetArtifacts
    : [...current.cabinetArtifacts, artifactSlug];

  const updated: FoundationProgressState = {
    completedModules,
    startedModules: current.startedModules.includes(moduleSlug)
      ? current.startedModules
      : [...current.startedModules, moduleSlug],
    cabinetArtifacts,
  };

  localStorage.setItem(
    FOUNDATION_PROGRESS_STORAGE_KEY,
    JSON.stringify(updated),
  );
  return updated;
}

export function isFoundationModuleComplete(moduleSlug: string): boolean {
  return readFoundationProgress().completedModules.includes(moduleSlug);
}

export function markFoundationModuleStarted(moduleSlug: string): void {
  const current = readFoundationProgress();
  if (current.startedModules.includes(moduleSlug)) {
    return;
  }
  localStorage.setItem(
    FOUNDATION_PROGRESS_STORAGE_KEY,
    JSON.stringify({
      ...current,
      startedModules: [...current.startedModules, moduleSlug],
    }),
  );
}

export function hasFoundationActivity(): boolean {
  const state = readFoundationProgress();
  return state.completedModules.length > 0 || state.startedModules.length > 0;
}
