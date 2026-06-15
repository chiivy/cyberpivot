import type { Metadata } from "next";

import { CabinetPreviewView } from "@/components/onboarding/cabinet-preview-view";

export const metadata: Metadata = {
  title: "Your cabinet",
  description: "Artifacts you will build on your chosen security path.",
};

export default function CabinetPreviewPage(): React.ReactElement {
  return <CabinetPreviewView />;
}
