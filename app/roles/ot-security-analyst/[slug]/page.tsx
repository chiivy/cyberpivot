import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RolePathModulePage } from "@/components/roles/role-path-module-page";
import {
  getOtSecurityModuleBySlug,
  getOtSecurityModuleSlugs,
} from "@/lib/roles/ot-security/get-ot-module";

interface OtSecurityModulePageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return getOtSecurityModuleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: OtSecurityModulePageProps): Metadata {
  const roleModule = getOtSecurityModuleBySlug(params.slug);
  if (!roleModule) {
    return { title: "Module not found" };
  }
  return {
    title: roleModule.title,
    description: roleModule.description,
  };
}

export default function OtSecurityAnalystModuleRoute({
  params,
}: OtSecurityModulePageProps): React.ReactElement {
  const roleModule = getOtSecurityModuleBySlug(params.slug);
  if (!roleModule) {
    notFound();
  }

  return <RolePathModulePage roleModule={roleModule} />;
}
