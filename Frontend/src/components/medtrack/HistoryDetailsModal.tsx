import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Pill,
  Stethoscope,
  Utensils,
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
import { StatusBadge } from "@/components/medtrack/StatusBadge";
import type { DetailedHistoryEntry } from "@/lib/mock-data";

export function HistoryDetailsModal({
  entry,
  open,
  onOpenChange,
}: {
  entry: DetailedHistoryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!entry) return null;

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
                  {entry.medicine} {entry.dosage}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  {entry.genericName} · {entry.form}
                </DialogDescription>
              </div>
            </div>

            <StatusBadge
              status={entry.status === "skipped" ? "missed" : entry.status}
              className="shrink-0"
            />
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-3.5 text-sm">
          {/* Scheduled vs Logged Timing */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl border border-border bg-card p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <Calendar className="size-3.5 text-primary" /> Scheduled Time
              </div>
              <p className="font-bold text-foreground">
                {entry.dateDisplay} · {entry.time}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <Clock className="size-3.5 text-primary" /> Confirmed / Logged
              </div>
              <p className="font-bold text-foreground">
                {entry.loggedTime ? `${entry.dateDisplay} · ${entry.loggedTime}` : "Not logged"}
              </p>
            </div>
          </div>

          {/* Condition & Prescriber */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Indication / Condition:</span>
              <span className="font-bold text-foreground">{entry.condition}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Prescribing Physician:</span>
              <span className="font-bold text-foreground">{entry.doctorName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Clinic / Facility:</span>
              <span className="text-foreground">{entry.clinicName}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-2xl border border-border bg-surface-muted p-4 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <Utensils className="size-3.5 text-primary" /> Instructions
            </div>
            <p className="font-semibold text-foreground">{entry.instruction}</p>
          </div>

          {/* Notes */}
          {entry.notes && (
            <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <FileText className="size-3.5 text-primary" /> Dose Activity Log
              </div>
              <p className="text-muted-foreground leading-relaxed">{entry.notes}</p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
