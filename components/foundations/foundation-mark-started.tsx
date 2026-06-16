"use client";

import { useEffect } from "react";

import { markFoundationModuleStarted } from "@/lib/foundations/progress";

interface FoundationMarkStartedProps {
  slug: string;
}

export function FoundationMarkStarted({
  slug,
}: FoundationMarkStartedProps): null {
  useEffect(() => {
    markFoundationModuleStarted(slug);
  }, [slug]);

  return null;
}
