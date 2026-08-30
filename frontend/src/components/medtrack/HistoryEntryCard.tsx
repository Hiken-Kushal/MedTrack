import { Clock, Eye, FileText, Pill, Stethoscope, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/medtrack/StatusBadge";
import { cn } from "@/lib/utils";
import type { DetailedHistoryEntry } from "@/lib/mock-data";

export function HistoryEntryCard({
  entry,
  onViewDetails,
}: {
  entry: DetailedHistoryEntry;
  onViewDetails: (entry: DetailedHistoryEntry) => void;
}) {
  const isMissed = entry.status === "missed";
  const isTaken = entry.status === "taken";

  return (
    <article
      aria-labelledby={`hist-title-${entry.id}`}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-4 transition-all sm:flex-row sm:items-center sm:justify-between",
        isMissed
          ? "border-danger/25 bg-danger-soft/30 hover:border-danger/40"
          : "border-border bg-card shadow-2xs hover:border-border-strong hover:shadow-xs",
      )}
    >
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        {/* Time Badge */}
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-xl text-xs font-bold tabular",
            isTaken
              ? "bg-primary-soft text-primary"
              : isMissed
                ? "bg-danger-soft text-danger"
                : "bg-surface-muted text-foreground border border-border",
          )}
        >
          <span className="text-center leading-tight">
            {entry.time.split(" ")[0]}
            <span className="block text-[10px] font-normal text-muted-foreground">
              {entry.time.split(" ")[1]}
            </span>
          </span>
        </span>

        {/* Medication Info */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              id={`hist-title-${entry.id}`}
              className="truncate text-sm font-bold text-foreground sm:text-base"
            >
              {entry.medicine}
            </h4>
            <span className="shrink-0 rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-foreground">
              {entry.dosage}
            </span>
            <span className="text-xs text-muted-foreground">· {entry.condition}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Stethoscope className="size-3 text-primary" /> {entry.doctorName}
            </span>
            {entry.loggedTime && (
              <span>· Logged at <strong className="text-foreground">{entry.loggedTime}</strong></span>
            )}
            {entry.notes && (
              <span className="text-muted-foreground/90 font-medium">({entry.notes})</span>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Status and Details button */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t border-border/50 sm:border-0 shrink-0">
        <StatusBadge
          status={entry.status === "skipped" ? "missed" : entry.status}
          className="shrink-0"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(entry)}
          className="rounded-xl border-border text-xs font-semibold h-8 px-2.5 hover:bg-surface-muted text-foreground"
        >
          <Eye className="mr-1 size-3.5 text-muted-foreground" aria-hidden="true" />
          Details
        </Button>
      </div>
    </article>
  );
}
