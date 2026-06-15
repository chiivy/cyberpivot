"use client";

import { useCallback, useEffect, useState } from "react";

import {
  markIntroSectionRead,
  readIntroProgress,
} from "@/lib/intro/progress";

export function useIntroProgress(): {
  readSlugs: string[];
  markRead: (slug: string) => void;
  isRead: (slug: string) => boolean;
} {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  useEffect(() => {
    setReadSlugs(readIntroProgress());
  }, []);

  const markRead = useCallback((slug: string): void => {
    const updated = markIntroSectionRead(slug);
    setReadSlugs(updated);
  }, []);

  const isRead = useCallback(
    (slug: string): boolean => readSlugs.includes(slug),
    [readSlugs],
  );

  return { readSlugs, markRead, isRead };
}
