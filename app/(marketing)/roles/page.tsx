import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";
import { securityDomains } from "@/lib/homepage-data";

export const metadata: Metadata = {
  title: "Security roles",
  description: "Browse cybersecurity roles across five security domains.",
};

interface RolesPageProps {
  searchParams: { domain?: string };
}

export default function RolesPage({
  searchParams,
}: RolesPageProps): React.ReactElement {
  const domainId = searchParams.domain;
  const domain = securityDomains.find((d) => d.id === domainId);
  const title = domain ? domain.name : "Security roles";
  const description = domain
    ? `Role pages for ${domain.name} are coming in V1.`
    : "Browse all roles across defensive, offensive, cloud, app security, and GRC.";

  return <PlaceholderPage title={title} description={description} />;
}
