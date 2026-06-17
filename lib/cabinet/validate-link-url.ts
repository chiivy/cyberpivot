export interface LinkUrlValidationResult {
  valid: boolean;
  normalized: string | null;
  error: string | null;
}

export function validateExternalLinkUrl(value: string): LinkUrlValidationResult {
  const trimmed = value.trim();

  if (trimmed === "") {
    return { valid: true, normalized: null, error: null };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      valid: false,
      normalized: null,
      error: "Enter a full URL starting with http:// or https://",
    };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      valid: false,
      normalized: null,
      error: "Only http:// and https:// links are allowed",
    };
  }

  const hostname = parsed.hostname;
  if (!hostname || !hostname.includes(".")) {
    return {
      valid: false,
      normalized: null,
      error:
        "Enter a full URL with a valid domain name (e.g. https://example.com)",
    };
  }

  if (parsed.username || parsed.password) {
    return {
      valid: false,
      normalized: null,
      error: "Links with embedded credentials are not allowed",
    };
  }

  if (parsed.href.length > 2048) {
    return {
      valid: false,
      normalized: null,
      error: "Link is too long (maximum 2048 characters)",
    };
  }

  return { valid: true, normalized: parsed.href, error: null };
}

export function isSafeExternalHref(href: string): boolean {
  return validateExternalLinkUrl(href).valid;
}
