import {
  Activity,
  AlertCircle,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  FileText,
  Info,
  PauseCircle,
  Pill,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

export function MedicationDetailsModal({
  medication,
  open,
  onOpenChange,
  onLogDose,
}: {
  medication: MedicationItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogDose: (med: MedicationItem) => void;
}) {
  if (!medication) return null;

  const statusMeta = statusConfig[medication.status];
  const StatusIcon = statusMeta.Icon;
  const refillPercent = Math.min(
    100,
    Math.round((medication.refillInfo.pillsRemaining / Math.max(1, medication.refillInfo.totalPills)) * 100),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary"
              >
                <Pill className="size-6" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {medication.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  {medication.genericName} · {medication.dosage} ({medication.form})
                </DialogDescription>
              </div>
            </div>

            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold shrink-0",
                statusMeta.className,
              )}
            >
              <StatusIcon aria-hidden="true" className="size-3.5" />
              {statusMeta.label}
            </span>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm">
          {/* Condition banner */}
          <div className="flex items-center gap-2 rounded-2xl bg-surface-muted p-3.5 border border-border">
            <ShieldCheck className="size-4 text-primary shrink-0" aria-hidden="true" />
            <div className="text-xs">
              <span className="text-muted-foreground font-medium">Prescribed for: </span>
              <span className="font-semibold text-foreground">{medication.condition}</span>
            </div>
          </div>

          {/* Dosage & Timing Section */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" aria-hidden="true" />
              Dosage & Administration
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-surface-muted/60 p-2.5">
                <p className="text-muted-foreground font-medium">Frequency</p>
                <p className="font-semibold text-foreground mt-0.5">{medication.frequency}</p>
              </div>
              <div className="rounded-xl bg-surface-muted/60 p-2.5">
                <p className="text-muted-foreground font-medium">Timing</p>
                <p className="font-semibold text-foreground mt-0.5">{medication.timing}</p>
              </div>
            </div>

            <div className="rounded-xl bg-surface-muted/60 p-2.5 text-xs">
              <p className="text-muted-foreground font-medium flex items-center gap-1">
                <Info className="size-3.5 text-primary" /> Special Instructions
              </p>
              <p className="text-foreground mt-1 leading-relaxed">{medication.instructions}</p>
            </div>
          </div>

          {/* Prescribing Info & Timeline */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Stethoscope className="size-3.5 text-primary" aria-hidden="true" />
              Prescription Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Prescribing Doctor</span>
                <p className="font-semibold text-foreground mt-0.5">{medication.prescribedBy}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Treatment Started</span>
                <p className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
                  <Calendar className="size-3.5 text-muted-foreground" /> {medication.startDate}
                </p>
              </div>
            </div>
          </div>

          {/* Supply & Refills */}
          {medication.status !== "completed" && (
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="size-3.5 text-primary" aria-hidden="true" />
                  Supply & Refills
                </h4>
                <span className="font-bold text-foreground">
                  {medication.refillInfo.daysLeft} days remaining
                </span>
              </div>
              <Progress value={refillPercent} className="h-2 bg-border/60" />
              <p className="text-xs text-muted-foreground">
                Current stock: {medication.refillInfo.pillsRemaining} of{" "}
                {medication.refillInfo.totalPills} {medication.form.toLowerCase()}s remaining.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Close
          </Button>
          {medication.status !== "completed" && medication.status !== "paused" && (
            <Button
              type="button"
              onClick={() => {
                onLogDose(medication);
                onOpenChange(false);
              }}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Check className="mr-1.5 size-4" /> Log Dose Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
