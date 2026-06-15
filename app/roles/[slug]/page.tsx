import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoleComingSoonPage } from "@/components/roles/role-coming-soon-page";
import { RoleV1Page } from "@/components/roles/role-v1-page";
import { getAllRoleSlugs, getRoleBySlug } from "@/lib/roles/get-role";
import { isV1RoleContent } from "@/types/role";

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
  const description = isV1RoleContent(role)
    ? role.dayToDay.slice(0, 160)
    : role.oneLiner;
  return {
    title: role.name,
    description,
  };
}

export default function RoleDetailPage({
  params,
}: RolePageProps): React.ReactElement {
  const role = getRoleBySlug(params.slug);
  if (!role) {
    notFound();
  }

  if (isV1RoleContent(role)) {
    return <RoleV1Page role={role} />;
  }

  return <RoleComingSoonPage role={role} />;
}
