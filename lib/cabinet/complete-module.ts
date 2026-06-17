"use client";

import { validateExternalLinkUrl } from "@/lib/cabinet/validate-link-url";
import { validateCabinetSummary } from "@/lib/cabinet/validate-summary";
import { ensureUserProfile } from "@/lib/cabinet/profile";
import { createClient } from "@/lib/supabase/client";
import type { CompleteModuleInput } from "@/types/cabinet";

export interface CompleteModuleResult {
  success: boolean;
  alreadyComplete: boolean;
  error: string | null;
}

function isUniqueViolation(code: string | undefined): boolean {
  return code === "23505";
}

function isCheckViolation(code: string | undefined): boolean {
  return code === "23514";
}

function validateLinkInput(
  linkUrl: string | null | undefined,
): { value: string | null; error: string | null } {
  if (linkUrl === null || linkUrl === undefined) {
    return { value: null, error: null };
  }

  const validation = validateExternalLinkUrl(linkUrl);
  if (!validation.valid) {
    return { value: null, error: validation.error };
  }

  return { value: validation.normalized, error: null };
}

function validateSummaryInput(
  summary: string | null | undefined,
): { value: string | null; error: string | null } {
  const validation = validateCabinetSummary(summary);
  if (!validation.valid) {
    return { value: null, error: validation.error };
  }

  return { value: validation.normalized, error: null };
}

function constraintErrorMessage(): string {
  return "Summary or link did not pass validation";
}

export async function completeModule(
  input: CompleteModuleInput,
): Promise<CompleteModuleResult> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      alreadyComplete: false,
      error: "You must be signed in to save progress.",
    };
  }

  const linkValidation = validateLinkInput(input.linkUrl);
  if (linkValidation.error) {
    return {
      success: false,
      alreadyComplete: false,
      error: linkValidation.error,
    };
  }

  const summaryValidation = validateSummaryInput(input.summary);
  if (summaryValidation.error) {
    return {
      success: false,
      alreadyComplete: false,
      error: summaryValidation.error,
    };
  }

  await ensureUserProfile(user);

  const completionInsert = await supabase.from("module_completions").insert({
    user_id: user.id,
    content_area: input.contentArea,
    module_slug: input.moduleSlug,
  });

  if (completionInsert.error && !isUniqueViolation(completionInsert.error.code)) {
    return {
      success: false,
      alreadyComplete: false,
      error: completionInsert.error.message,
    };
  }

  const artifactInsert = await supabase.from("cabinet_artifacts").insert({
    user_id: user.id,
    content_area: input.contentArea,
    module_slug: input.moduleSlug,
    artifact_name: input.artifactName,
    summary: summaryValidation.value,
    link_url: linkValidation.value,
  });

  if (
    artifactInsert.error &&
    !isUniqueViolation(artifactInsert.error.code) &&
    !isCheckViolation(artifactInsert.error.code)
  ) {
    return {
      success: false,
      alreadyComplete: false,
      error: artifactInsert.error.message,
    };
  }

  if (artifactInsert.error && isCheckViolation(artifactInsert.error.code)) {
    return {
      success: false,
      alreadyComplete: false,
      error: constraintErrorMessage(),
    };
  }

  const alreadyComplete =
    Boolean(completionInsert.error && isUniqueViolation(completionInsert.error.code)) ||
    Boolean(artifactInsert.error && isUniqueViolation(artifactInsert.error.code));

  if (
    alreadyComplete &&
    (input.summary !== undefined || input.linkUrl !== undefined)
  ) {
    const updateResult = await supabase
      .from("cabinet_artifacts")
      .update({
        summary: summaryValidation.value,
        link_url: linkValidation.value,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("content_area", input.contentArea)
      .eq("module_slug", input.moduleSlug);

    if (updateResult.error) {
      if (isCheckViolation(updateResult.error.code)) {
        return {
          success: false,
          alreadyComplete: true,
          error: constraintErrorMessage(),
        };
      }
      return {
        success: false,
        alreadyComplete: true,
        error: updateResult.error.message,
      };
    }
  }

  return {
    success: true,
    alreadyComplete,
    error: null,
  };
}

export async function updateCabinetArtifactDetails(input: {
  artifactId: string;
  summary: string | null;
  linkUrl: string | null;
}): Promise<{ success: boolean; error: string | null }> {
  const linkValidation = validateLinkInput(input.linkUrl);
  if (linkValidation.error) {
    return { success: false, error: linkValidation.error };
  }

  const summaryValidation = validateSummaryInput(input.summary);
  if (summaryValidation.error) {
    return { success: false, error: summaryValidation.error };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("cabinet_artifacts")
    .update({
      summary: summaryValidation.value,
      link_url: linkValidation.value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.artifactId);

  if (error) {
    if (isCheckViolation(error.code)) {
      return {
        success: false,
        error: constraintErrorMessage(),
      };
    }
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function isModuleComplete(input: {
  contentArea: string;
  moduleSlug: string;
}): Promise<boolean> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from("module_completions")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_area", input.contentArea)
    .eq("module_slug", input.moduleSlug)
    .maybeSingle();

  if (error) {
    return false;
  }

  return Boolean(data);
}
