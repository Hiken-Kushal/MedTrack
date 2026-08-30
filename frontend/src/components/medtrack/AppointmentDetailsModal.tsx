import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  Stethoscope,
  Video,
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { AppointmentItem, AppointmentStatus } from "@/lib/mock-data";

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  upcoming: {
    label: "Upcoming",
    className: "bg-primary-soft text-primary border-primary/30",
  },
  completed: {
    label: "Completed",
    className: "bg-success-soft text-success border-success/25",
  },
  rescheduled: {
    label: "Rescheduled",
    className: "bg-warning-soft text-warning-foreground border-warning/35",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-danger-soft text-danger border-danger/25",
  },
};

export function AppointmentDetailsModal({
  appointment,
  open,
  onOpenChange,
}: {
  appointment: AppointmentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!appointment) return null;

  const statusMeta = statusConfig[appointment.status];
  const isVideo = appointment.mode === "Video Consultation";

  const handleAddToCalendar = () => {
    toast.success("Added to calendar", {
      description: `Appointment with ${appointment.doctorName} for ${appointment.dateDisplay} saved to your device calendar.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"
              >
                <Stethoscope className="size-6" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {appointment.doctorName}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  {appointment.specialty} · {appointment.hospitalOrClinic}
                </DialogDescription>
              </div>
            </div>

            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold shrink-0",
                statusMeta.className,
              )}
            >
              {statusMeta.label}
            </span>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm">
          {/* Consultation Type Card */}
          <div className="rounded-2xl bg-surface-muted p-4 border border-border">
            <span className="text-xs text-muted-foreground font-medium">Consultation Purpose</span>
            <p className="font-bold text-foreground mt-1 text-sm">{appointment.type}</p>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl border border-border bg-card p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <Calendar className="size-3.5 text-primary" /> Date
              </div>
              <p className="font-bold text-foreground">{appointment.dateDisplay}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <Clock className="size-3.5 text-primary" /> Time
              </div>
              <p className="font-bold text-foreground">{appointment.time}</p>
            </div>
          </div>

          {/* Location / Meeting link */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              {isVideo ? (
                <>
                  <Video className="size-3.5 text-primary" /> Online Video Session
                </>
              ) : (
                <>
                  <MapPin className="size-3.5 text-primary" /> Clinic Location
                </>
              )}
            </div>
            <p className="font-semibold text-foreground">{appointment.location}</p>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <FileText className="size-3.5 text-primary" /> Preparation Notes
              </div>
              <p className="text-muted-foreground leading-relaxed">{appointment.notes}</p>
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
          {appointment.status === "upcoming" && (
            <Button
              type="button"
              onClick={handleAddToCalendar}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Calendar className="mr-1.5 size-4" /> Add to Calendar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
