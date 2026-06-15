import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IntroProseProps {
  content: string;
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-14 scroll-mt-8 font-mono text-2xl font-semibold tracking-tight text-[#22d3ee] first:mt-0 sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 text-xl font-medium text-white">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-lg leading-[1.8] text-[#e2e8f0]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-[1.8] text-[#e2e8f0]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-[1.8] text-[#e2e8f0]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
};

export function IntroProse({ content }: IntroProseProps): React.ReactElement {
  return (
    <div className="intro-prose max-w-none text-left [&_p:first-of-type]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
