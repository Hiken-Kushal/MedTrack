import { useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MedicationItem } from "@/lib/mock-data";

export function DashboardMedicineCard({
  medication,
}: {
  medication: MedicationItem;
}) {
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    setLogged(true);
    toast.success("Dose logged", {
      description: `${medication.name} ${medication.dosage} recorded.`,
    });
    setTimeout(() => setLogged(false), 3000);
  };

  const isRefillDue = medication.status === "refill_due";

  return (
    <article
      aria-labelledby={`dash-med-${medication.id}`}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-[var(--shadow-card)] transition-all hover:border-border-strong hover:shadow-[var(--shadow-raised)] sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Left info area */}
      <div className="flex items-start gap-3.5 min-w-0">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-2xl shadow-xs",
            isRefillDue
              ? "bg-warning-soft text-warning"
              : "bg-primary-soft text-primary",
          )}
        >
          <Pill className="size-5" />
        </span>

        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              id={`dash-med-${medication.id}`}
              className="text-base sm:text-lg font-bold text-foreground truncate"
            >
              {medication.name}
            </h3>
            <span className="shrink-0 rounded-lg border border-border bg-surface-muted px-2 py-0.5 text-xs font-semibold text-foreground">
              {medication.dosage}
            </span>
            {isRefillDue ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning-soft px-2 py-0.5 text-[11px] font-semibold text-warning-foreground">
                <AlertCircle className="size-3 text-warning" aria-hidden="true" />
                Refill Due
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">
                <CheckCircle2 className="size-3 text-success" aria-hidden="true" />
                Active
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground truncate">
            {medication.timing} · For: <span className="text-foreground font-medium">{medication.condition}</span>
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3 text-primary shrink-0" aria-hidden="true" />
            <span>Next: <strong className="text-foreground">{medication.nextDose}</strong></span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
        <Button
          size="sm"
          onClick={handleLog}
          disabled={logged}
          className={cn(
            "h-9 rounded-xl px-4 text-xs font-semibold shadow-xs transition-all w-full sm:w-auto",
            logged
              ? "bg-success text-success-foreground hover:bg-success"
              : "bg-surface-muted text-foreground border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary",
          )}
        >
          {logged ? (
            <>
              <Check className="mr-1.5 size-3.5" aria-hidden="true" /> Taken
            </>
          ) : (
            <>
              <Check className="mr-1.5 size-3.5 text-primary" aria-hidden="true" /> Log Dose
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
