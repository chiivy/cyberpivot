"use client";

import type { OnboardingPersistedState } from "@/types/onboarding";

export const ONBOARDING_STORAGE_KEY = "cyberpivot-onboarding-v2" as const;

const LEGACY_STORAGE_KEYS = [
  "cyberpivot-onboarding",
  "cyberpivot-onboarding-v1",
] as const;

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function getStorageItem(key: string): string | null {
  if (!isBrowser()) {
    return null;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw.trim() === "") {
      return null;
    }
    return raw;
  } catch {
    return null;
  }
}

function removeStorageItem(key: string): void {
  if (!isBrowser()) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    // Private browsing or storage disabled — ignore.
  }
}

function parseStoredState(raw: string): OnboardingPersistedState | null {
  const parsed = safeJsonParse(raw);
  if (!isOnboardingState(parsed)) {
    return null;
  }
  return parsed;
}

export function readOnboardingState(): OnboardingPersistedState | null {
  if (!isBrowser()) {
    return null;
  }

  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    const legacyRaw = getStorageItem(legacyKey);
    if (!legacyRaw) {
      continue;
    }
    removeStorageItem(legacyKey);
    const legacyState = parseStoredState(legacyRaw);
    if (legacyState) {
      writeOnboardingState(legacyState);
      return legacyState;
    }
  }

  const raw = getStorageItem(ONBOARDING_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  const state = parseStoredState(raw);
  if (!state) {
    removeStorageItem(ONBOARDING_STORAGE_KEY);
    return null;
  }

  return state;
}

export function writeOnboardingState(state: OnboardingPersistedState): void {
  if (!isBrowser()) {
    return;
  }
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage unavailable — ignore.
  }
}

export function clearOnboardingState(): void {
  if (!isBrowser()) {
    return;
  }
  removeStorageItem(ONBOARDING_STORAGE_KEY);
  for (const key of LEGACY_STORAGE_KEYS) {
    removeStorageItem(key);
  }
}

function isOnboardingState(value: unknown): value is OnboardingPersistedState {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;
  if (!isOnboardingAnswers(record.answers)) {
    return false;
  }
  if (!isOnboardingRecommendation(record.recommendation)) {
    return false;
  }

  if (
    record.chosenPath !== null &&
    typeof record.chosenPath !== "string"
  ) {
    return false;
  }
  if (
    record.chosenDomainId !== null &&
    typeof record.chosenDomainId !== "string"
  ) {
    return false;
  }
  if (
    record.chosenRoleSlug !== null &&
    typeof record.chosenRoleSlug !== "string"
  ) {
    return false;
  }

  return true;
}

function isOnboardingAnswers(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const answers = value as Record<string, unknown>;
  return (
    typeof answers.q1Background === "string" &&
    typeof answers.q2WorkInstinct === "string" &&
    typeof answers.q3Environment === "string" &&
    typeof answers.q4Terminal === "string" &&
    typeof answers.q5Goal === "string"
  );
}

function isOnboardingRecommendation(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const rec = value as Record<string, unknown>;
  if (
    typeof rec.entryPoint !== "string" ||
    typeof rec.entryLabel !== "string" ||
    typeof rec.whyExplanation !== "string" ||
    typeof rec.foundationFirst !== "boolean"
  ) {
    return false;
  }
  if (!rec.role || typeof rec.role !== "object" || Array.isArray(rec.role)) {
    return false;
  }
  const role = rec.role as Record<string, unknown>;
  return typeof role.roleName === "string" && typeof role.roleSlug === "string";
}
