import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoleComingSoonPage } from "@/components/roles/role-coming-soon-page";
import { RolePlaceholderComingSoonPage } from "@/components/roles/role-placeholder-coming-soon-page";
import { RoleV1Page } from "@/components/roles/role-v1-page";
import { getAllRoleSlugs, getRoleBySlug } from "@/lib/roles/get-role";
import { createClient } from "@/lib/supabase/server";
import { isPlaceholderComingSoonRole, isV1RoleContent } from "@/types/role";

interface RolePageProps {
  params: { slug: string };
}

export const dynamicParams = true;

export function generateStaticParams(): { slug: string }[] {
  return getAllRoleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: RolePageProps): Metadata {
  const role = getRoleBySlug(params.slug);
  if (!role) {
    return { title: "Role not found" };
  }
  const description = isPlaceholderComingSoonRole(role)
    ? `${role.name} on CyberPivot. Full role page coming soon.`
    : role.dayToDay.slice(0, 160);
  return {
    title: role.name,
    description,
  };
}

export default async function RoleDetailPage({
  params,
}: RolePageProps): Promise<React.ReactElement> {
  const role = getRoleBySlug(params.slug);
  if (!role) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const signedIn = user != null;

  if (isV1RoleContent(role)) {
    return <RoleV1Page role={role} />;
  }

  if (isPlaceholderComingSoonRole(role)) {
    return <RolePlaceholderComingSoonPage role={role} signedIn={signedIn} />;
  }

  return <RoleComingSoonPage role={role} />;
}
