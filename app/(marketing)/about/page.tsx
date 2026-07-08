import type { Metadata } from "next";

import { AboutPage } from "@/components/marketing/about-page";

export const metadata: Metadata = {
  title: {
    absolute: "About CyberPivot — Built by practitioners, for practitioners",
  },
  description:
    "CyberPivot is a structured cybersecurity learning platform built by a working security professional. Real tools, real labs, real portfolio artifacts across thirty plus roles and six security domains.",
};

export default function AboutRoutePage(): React.ReactElement {
  return <AboutPage />;
}
