import type { Metadata } from "next";

import { PublicCabinetView } from "@/components/cabinet/public-cabinet-view";
import {
  fetchPublicCabinetArtifacts,
  publicCabinetDisplayName,
} from "@/lib/cabinet/public-cabinet";
import { normalizeCabinetUsernameParam } from "@/lib/cabinet/username";

interface PublicCabinetPageProps {
  params: { username: string };
}

function resolveSiteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://cyberpivot.com";
}

export async function generateMetadata({
  params,
}: PublicCabinetPageProps): Promise<Metadata> {
  const username = normalizeCabinetUsernameParam(params.username);
  const artifacts = await fetchPublicCabinetArtifacts(username);
  const displayName = publicCabinetDisplayName(username, artifacts);
  const count = artifacts.length;
  const description =
    count > 0
      ? `${displayName} has completed ${count} cabinet artifact${count === 1 ? "" : "s"} on CyberPivot`
      : `${displayName}'s CyberPivot cabinet`;

  const origin = resolveSiteOrigin();

  return {
    title: `${displayName}'s Cabinet`,
    description,
    openGraph: {
      title: `${displayName}'s CyberPivot Cabinet`,
      description,
      type: "profile",
      url: `${origin}/cabinet/${username}`,
      images: [
        {
          url: `${origin}/og-cabinet-share.png`,
          width: 1200,
          height: 630,
          alt: "CyberPivot cabinet portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName}'s CyberPivot Cabinet`,
      description,
      images: [`${origin}/og-cabinet-share.png`],
    },
  };
}

export default async function PublicCabinetPage({
  params,
}: PublicCabinetPageProps): Promise<React.ReactElement> {
  const username = normalizeCabinetUsernameParam(params.username);
  const artifacts = await fetchPublicCabinetArtifacts(username);
  const displayName = publicCabinetDisplayName(username, artifacts);

  return (
    <PublicCabinetView
      username={username}
      displayName={displayName}
      artifacts={artifacts}
    />
  );
}
