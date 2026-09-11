import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Check,
  CheckCheck,
  Clock,
  Eye,
  MoreVertical,
  PauseCircle,
  Pill,
  RotateCw,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { MedicationItem, MedicationStatus } from "@/lib/mock-data";

const statusConfig: Record<
  MedicationStatus,
  { label: string; className: string; Icon: typeof Activity }
> = {
  active: {
    label: "Active",
    className: "bg-success-soft text-success border-success/25",
    Icon: Check,
  },
  refill_due: {
    label: "Refill Due",
    className: "bg-warning-soft text-warning-foreground border-warning/35",
    Icon: AlertCircle,
  },
  paused: {
    label: "Paused",
    className: "bg-surface-muted text-muted-foreground border-border-strong",
    Icon: PauseCircle,
  },
  completed: {
    label: "Completed",
    className: "bg-info-soft text-info-foreground border-info/25",
    Icon: CheckCheck,
  },
};

export function MedicationCard({
  medication,
  onViewDetails,
  onLogDose,
  onEdit,
}: {
  medication: MedicationItem;
  onViewDetails: (med: MedicationItem) => void;
  onLogDose: (med: MedicationItem) => void;
  onEdit: (med: MedicationItem) => void;
}) {
  const [logged, setLogged] = useState(false);
  const statusMeta = statusConfig[medication.status];
  const StatusIcon = statusMeta.Icon;

  const refillPercent = Math.min(
    100,
    Math.round((medication.refillInfo.pillsRemaining / Math.max(1, medication.refillInfo.totalPills)) * 100),
  );

  const isLowSupply =
    medication.status !== "completed" && medication.refillInfo.daysLeft <= 4;

  const handleLogClick = () => {
    setLogged(true);
    onLogDose(medication);
    setTimeout(() => setLogged(false), 2500);
  };

  return (
    <article
      aria-labelledby={`med-title-${medication.id}`}
      className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] transition-all hover:border-border-strong hover:shadow-[var(--shadow-raised)]"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary shadow-xs"
            >
              <Pill className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  id={`med-title-${medication.id}`}
                  className="truncate text-base font-bold text-foreground sm:text-lg"
                >
                  {medication.name}
                </h3>
                <span className="shrink-0 rounded-md border border-border bg-surface-muted px-2 py-0.5 text-xs font-semibold text-foreground">
                  {medication.dosage}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground mt-0.5">
                {medication.genericName} · {medication.form}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                statusMeta.className,
              )}
            >
              <StatusIcon aria-hidden="true" className="size-3" />
              {statusMeta.label}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-xl text-muted-foreground hover:text-foreground"
                  aria-label={`Actions for ${medication.name}`}
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                <DropdownMenuItem onClick={() => onViewDetails(medication)}>
                  <Eye className="mr-2 size-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(medication)}>
                  <RotateCw className="mr-2 size-4" /> Edit Medicine
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Condition tag */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg bg-accent/70 px-2.5 py-1 text-xs font-medium text-accent-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>For: {medication.condition}</span>
        </div>

        {/* Core details grid */}
        <div className="mt-4 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="font-medium text-foreground">{medication.frequency}</span>
            <span className="text-muted-foreground">· {medication.timing}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Stethoscope className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{medication.prescribedBy}</span>
          </div>

          {medication.status !== "completed" && (
            <div className="flex items-center justify-between gap-2 rounded-xl bg-surface-muted px-3 py-2">
              <span className="text-muted-foreground font-medium">Next scheduled dose:</span>
              <span className="font-bold text-foreground">{medication.nextDose}</span>
            </div>
          )}
        </div>

        {/* Refill summary indicator */}
        {medication.status !== "completed" && (
          <div className="mt-4 rounded-xl border border-border/80 bg-background/60 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">Supply remaining</span>
              <span
                className={cn(
                  "font-semibold",
                  isLowSupply ? "text-danger font-bold" : "text-foreground",
                )}
              >
                {medication.refillInfo.daysLeft} days ({medication.refillInfo.pillsRemaining} pills)
              </span>
            </div>
            <div className="mt-1.5">
              <Progress
                value={refillPercent}
                className="h-1.5 bg-border/60"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex items-center gap-2 pt-2">
        {medication.status !== "completed" && medication.status !== "paused" && (
          <Button
            size="sm"
            onClick={handleLogClick}
            disabled={logged}
            className={cn(
              "flex-1 rounded-xl text-xs font-semibold shadow-xs transition-all",
              logged
                ? "bg-success text-success-foreground hover:bg-success"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <Check className="mr-1.5 size-3.5" aria-hidden="true" />
            {logged ? "Dose Logged" : "Log Dose"}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(medication)}
          className="flex-1 rounded-xl border-border text-xs font-semibold text-foreground hover:bg-surface-muted"
        >
          <Eye className="mr-1.5 size-3.5 text-muted-foreground" aria-hidden="true" />
          Details
        </Button>
      </div>
    </article>
  );
}
