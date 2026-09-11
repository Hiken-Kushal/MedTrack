import { SectionCard } from "./SectionCard";
import type { ActivityEntry } from "@/lib/mock-data";

const dotTone: Record<ActivityEntry["kind"], string> = {
  taken: "bg-primary",
  missed: "bg-warning",
  added: "bg-primary",
  updated: "bg-surface-muted",
};

export function ActivityTimeline({ entries }: { entries: ActivityEntry[] }) {
  return (
    <SectionCard title="Recent activity" description="Your latest medication events.">
      {entries.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Activity will appear here once you log doses or update medications.
        </p>
      ) : (
        <ol className="space-y-5">
          {entries.map((entry, i) => {
            const isLast = i === entries.length - 1;
            return (
              <li key={entry.id} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 size-2.5 shrink-0 rounded-full ${dotTone[entry.kind]}`}
                  />
                  {!isLast && (
                    <span aria-hidden="true" className="absolute top-4 bottom-0 w-px bg-border" />
                  )}
                </div>
                <div className="min-w-0 pb-1">
                  <p className="truncate text-sm font-medium text-foreground">{entry.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {entry.detail} · {entry.timeAgo}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </SectionCard>
  );
}