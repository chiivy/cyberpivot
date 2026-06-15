export interface IntroSectionMeta {
  title: string;
  slug: string;
  section: number;
  description: string;
  readingTime: string;
}

export interface IntroSection extends IntroSectionMeta {
  content: string;
}

export const INTRO_PROGRESS_STORAGE_KEY = "cyberpivot-intro-progress";
