import { ContentProse } from "@/components/content/content-prose";
import {
  FoundationAnswerGuide,
  FoundationTaskCard,
} from "@/components/foundations/foundation-module-parts";
import { parseFoundationModuleContent } from "@/lib/foundations/parse-module-content";

interface FoundationModuleRendererProps {
  content: string;
}

export function FoundationModuleRenderer({
  content,
}: FoundationModuleRendererProps): React.ReactElement {
  const sections = parseFoundationModuleContent(content);

  return (
    <div className="text-left">
      {sections.map((section) => {
        if (section.type === "prose") {
          return (
            <section key={section.title} className="mt-14 first:mt-0">
              <h2 className="font-mono text-2xl font-semibold tracking-tight text-[#22d3ee] sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-6">
                <ContentProse content={section.markdown} />
              </div>
            </section>
          );
        }

        if (section.type === "tasks") {
          return (
            <section key={section.title} className="mt-14">
              <h2 className="font-mono text-2xl font-semibold tracking-tight text-[#22d3ee] sm:text-3xl">
                {section.title}
              </h2>
              {section.intro ? (
                <div className="mt-6">
                  <ContentProse content={section.intro} />
                </div>
              ) : null}
              <div className="mt-8 space-y-6">
                {section.tasks.map((task) => (
                  <FoundationTaskCard
                    key={task.number}
                    number={task.number}
                    title={task.title}
                    markdown={task.markdown}
                  />
                ))}
              </div>
            </section>
          );
        }

        return (
          <FoundationAnswerGuide
            key={section.title}
            title={section.title}
            markdown={section.markdown}
          />
        );
      })}
    </div>
  );
}
