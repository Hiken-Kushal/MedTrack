import { CheckCircle2, Pill } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { MedicationAdherenceStat } from "@/lib/mock-data";

export function MedicationAdherenceBreakdown({
  medicationStats,
}: {
  medicationStats: MedicationAdherenceStat[];
}) {
  return (
    <SectionCard
      title="Adherence by Medication"
      description="Consistency breakdown for each prescribed medicine."
    >
      <div className="space-y-4 pt-1">
        {medicationStats.map((item) => {
          const isOptimal = item.percent >= 80;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-4 transition-all hover:border-border-strong hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"
                  >
                    <Pill className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-foreground">
                      {item.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">{item.dosage}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={cn(
                      "text-base font-extrabold tabular",
                      isOptimal ? "text-foreground" : "text-warning-foreground font-bold",
                    )}
                  >
                    {item.percent}%
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    {item.taken} of {item.total} doses
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <Progress
                  value={item.percent}
                  className="h-2 bg-surface-muted"
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="size-3 text-success" />
                  {item.taken} doses completed
                </span>
                {item.missed > 0 ? (
                  <span className="text-danger font-medium">{item.missed} missed</span>
                ) : (
                  <span className="text-success font-medium">100% completed</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
