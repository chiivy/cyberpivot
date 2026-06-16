export interface FoundationProseSection {
  type: "prose";
  title: string;
  markdown: string;
}

export interface FoundationTask {
  number: number;
  title: string;
  markdown: string;
}

export interface FoundationTasksSection {
  type: "tasks";
  title: string;
  intro: string;
  tasks: FoundationTask[];
}

export interface FoundationAnswerGuideSection {
  type: "answer-guide";
  title: string;
  markdown: string;
}

export type FoundationContentSection =
  | FoundationProseSection
  | FoundationTasksSection
  | FoundationAnswerGuideSection;

function parseTasksSection(
  title: string,
  body: string,
): FoundationTasksSection {
  const taskPattern = /^#{1,3} Task (\d+) — (.+)$/gm;
  const matches = Array.from(body.matchAll(taskPattern));

  if (matches.length === 0) {
    return { type: "tasks", title, intro: body.trim(), tasks: [] };
  }

  const introEnd = matches[0]?.index ?? 0;
  const intro = body.slice(0, introEnd).trim();

  const tasks: FoundationTask[] = matches.map((match, index) => {
    const start = match.index ?? 0;
    const headerLength = match[0].length;
    const nextMatch = matches[index + 1];
    const end = nextMatch?.index ?? body.length;
    const taskBody = body.slice(start + headerLength, end).trim();
    return {
      number: Number.parseInt(match[1] ?? "0", 10),
      title: match[2]?.trim() ?? "",
      markdown: taskBody,
    };
  });

  return { type: "tasks", title, intro, tasks };
}

export function parseFoundationModuleContent(
  content: string,
): FoundationContentSection[] {
  const parts = content.split(/^## /m).filter(Boolean);
  const sections: FoundationContentSection[] = [];

  for (const part of parts) {
    const newlineIndex = part.indexOf("\n");
    if (newlineIndex === -1) {
      continue;
    }

    const title = part.slice(0, newlineIndex).trim();
    const body = part.slice(newlineIndex + 1).trim();

    if (title.toLowerCase().startsWith("analysis tasks")) {
      sections.push(parseTasksSection(title, body));
    } else if (title.toLowerCase().startsWith("answer guide")) {
      sections.push({ type: "answer-guide", title, markdown: body });
    } else {
      sections.push({ type: "prose", title, markdown: body });
    }
  }

  return sections;
}
