export function getUserDisplayName(
  email: string | undefined,
  metadata: Record<string, unknown> | undefined,
): string {
  const fullName = metadata?.full_name;
  if (typeof fullName === "string" && fullName.trim() !== "") {
    return fullName.trim();
  }

  const name = metadata?.name;
  if (typeof name === "string" && name.trim() !== "") {
    return name.trim();
  }

  if (email) {
    return email;
  }

  return "Account";
}

export function getUserInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  if (parts[0]?.includes("@")) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0]?.slice(0, 2) ?? "CP").toUpperCase();
}

export function getUserAvatarUrl(
  metadata: Record<string, unknown> | undefined,
): string | null {
  const avatarUrl = metadata?.avatar_url;
  if (typeof avatarUrl === "string" && avatarUrl.trim() !== "") {
    return avatarUrl;
  }
  return null;
}
