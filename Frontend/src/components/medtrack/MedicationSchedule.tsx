import { CalendarX2 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { StatusBadge } from "./StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import type { ScheduledDose } from "@/lib/mock-data";

function timeBlock(time: string) {
  const match = time.match(/(\d{1,2}):(\d{2}) (AM|PM)/i);
  if (!match) return time;
  return match[1];
}

export function MedicationSchedule({
  doses,
  loading = false,
}: {
  doses: ScheduledDose[];
  loading?: boolean;
}) {
  return (
    <SectionCard title="Today's schedule" description="Scheduled doses in chronological order.">
      {loading ? (
        <ul className="space-y-4">
          {[0, 1, 2].map((i) => (
            <li key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-5 flex-1 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </li>
          ))}
        </ul>
      ) : doses.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
          <CalendarX2 aria-hidden="true" className="size-6 text-muted-foreground" />
          <p className="text-card-title text-foreground">No doses scheduled today</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Doses you add to a medication schedule will appear here.
          </p>
        </div>
      ) : (
        <ol className="space-y-4">
          {doses.map((dose) => {
            const isTaken = dose.status === "taken";
            return (
              <li
                key={dose.id}
                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                  isTaken
                    ? "border-border bg-surface-muted"
                    : dose.status === "upcoming"
                      ? "border-border bg-card"
                      : "border-border bg-card"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-12 shrink-0 place-items-center rounded-xl text-base font-bold tabular ${
                    isTaken
                      ? "bg-primary-soft text-primary"
                      : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {timeBlock(dose.time)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-card-title font-semibold text-foreground">
                    {dose.medicine}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {dose.dosage}
                    {dose.note ? ` · ${dose.note}` : ""}
                  </p>
                </div>
                <StatusBadge status={dose.status} className="shrink-0" />
              </li>
            );
          })}
        </ol>
      )}
    </SectionCard>
  );
}