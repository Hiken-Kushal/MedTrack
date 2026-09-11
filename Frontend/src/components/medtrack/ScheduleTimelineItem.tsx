import { useState } from "react";
import { Check, Clock, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/medtrack/StatusBadge";
import { cn } from "@/lib/utils";
import type { DayScheduleItem } from "@/lib/mock-data";

export function ScheduleTimelineItem({
  item,
  onLogDose,
}: {
  item: DayScheduleItem;
  onLogDose: (item: DayScheduleItem) => void;
}) {
  const [logged, setLogged] = useState(item.status === "taken");
  const isTaken = logged || item.status === "taken";
  const isActionable = item.status === "upcoming" || item.status === "delayed";

  const handleLogClick = () => {
    setLogged(true);
    onLogDose(item);
  };

  return (
    <li
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between transition-all",
        isTaken
          ? "border-border bg-surface-muted/70"
          : item.status === "missed"
            ? "border-danger/20 bg-danger-soft/30"
            : "border-border bg-card shadow-[var(--shadow-card)]",
      )}
    >
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        {/* Time Badge */}
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-xl text-xs font-bold tabular",
            isTaken
              ? "bg-primary-soft text-primary"
              : item.status === "missed"
                ? "bg-danger-soft text-danger"
                : "bg-surface-muted text-foreground border border-border",
          )}
        >
          <span className="text-center leading-tight">
            {item.time.split(" ")[0]}
            <span className="block text-[10px] font-normal text-muted-foreground">
              {item.time.split(" ")[1]}
            </span>
          </span>
        </span>

        {/* Medicine & Instructions */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={cn(
                "truncate text-sm font-bold text-foreground sm:text-base",
                isTaken && "line-through text-muted-foreground",
              )}
            >
              {item.medicine}
            </h4>
            <span className="shrink-0 rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-foreground">
              {item.dosage}
            </span>
            <span className="text-xs text-muted-foreground">· {item.condition}</span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Utensils className="size-3 text-primary" aria-hidden="true" />
              {item.instruction}
            </span>
            {item.note && (
              <span className="text-warning-foreground font-medium">({item.note})</span>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Status and Action */}
      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t border-border/50 sm:border-0">
        <StatusBadge
          status={logged ? "taken" : item.status}
          className="shrink-0"
        />

        {isActionable && !logged && (
          <Button
            size="sm"
            onClick={handleLogClick}
            className="rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 h-8 px-3"
          >
            <Check className="mr-1 size-3.5" aria-hidden="true" />
            Log Dose
          </Button>
        )}
      </div>
    </li>
  );
}
