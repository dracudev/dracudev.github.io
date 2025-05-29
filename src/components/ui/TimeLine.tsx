import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import type { Experience, Education } from "../../types/content";

type Props = {
  items: (Experience | Education)[];
};

function formatDateRange(start: Date, end?: Date, current?: boolean) {
  const startStr = start.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
  const endStr = current
    ? "Present"
    : end
    ? end.toLocaleDateString(undefined, { year: "numeric", month: "short" })
    : "";
  return endStr ? `${startStr} - ${endStr}` : startStr;
}

function parseMarkdownLinks(text: string) {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-[var(--link-color)]" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

export default function TimeLineReact({ items }: Props) {
  const sortedItems = [...items].sort((a, b) => {
    return (
      new Date(b.data.startDate).getTime() -
      new Date(a.data.startDate).getTime()
    );
  });

  return (
    <div className="[&_ol]:!border-l-zinc-700  [&_[data-testid='timeline-point']_div]:!bg-zinc-700 [&_[data-testid='timeline-point']_div]:!border-zinc-700">
      <Timeline>
        {sortedItems.map((item) => (
          <TimelineItem key={item.id}>
            <TimelinePoint />
            <TimelineContent>
              <TimelineTime>
                {formatDateRange(
                  item.data.startDate,
                  item.data.endDate,
                  item.data.current
                )}
              </TimelineTime>
              <TimelineTitle
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownLinks(item.data.title),
                }}
              />
              <TimelineBody>
                <ul className="list-disc">
                  {item.data.description.map((phrase, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdownLinks(phrase),
                      }}
                    />
                  ))}
                </ul>{" "}
                <br />
              </TimelineBody>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
