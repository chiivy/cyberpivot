"use client";

import { useEffect } from "react";

import { useIntroProgress } from "@/hooks/use-intro-progress";

interface IntroMarkReadProps {
  slug: string;
}

export function IntroMarkRead({ slug }: IntroMarkReadProps): null {
  const { markRead } = useIntroProgress();

  useEffect(() => {
    markRead(slug);
  }, [slug, markRead]);

  return null;
}
