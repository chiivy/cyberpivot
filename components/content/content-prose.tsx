import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ContentProseProps {
  content: string;
  className?: string;
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
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[20rem] border-collapse text-left text-base">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-white/15 text-zinc-300">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="text-[#e2e8f0]">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-white/[0.06]">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="py-2.5 pr-4 font-medium text-zinc-200">{children}</th>
  ),
  td: ({ children }) => <td className="py-2.5 pr-4">{children}</td>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-cyan-200">
      {children}
    </code>
  ),
};

export function ContentProse({
  content,
  className,
}: ContentProseProps): React.ReactElement {
  return (
    <div
      className={`content-prose max-w-none text-left [&_p:first-of-type]:mt-0 ${className ?? ""}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
