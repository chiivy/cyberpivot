import { INTRO_PROGRESS_STORAGE_KEY } from "@/types/intro";

export function readIntroProgress(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(INTRO_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function markIntroSectionRead(slug: string): string[] {
  const current = readIntroProgress();
  if (current.includes(slug)) {
    return current;
  }
  const updated = [...current, slug];
  localStorage.setItem(INTRO_PROGRESS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
