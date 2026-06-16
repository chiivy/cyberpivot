import { ContentProse } from "@/components/content/content-prose";

interface IntroProseProps {
  content: string;
}

export function IntroProse({ content }: IntroProseProps): React.ReactElement {
  return <ContentProse content={content} />;
}
