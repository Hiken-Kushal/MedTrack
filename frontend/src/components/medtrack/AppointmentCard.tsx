import {
  Calendar,
  Clock,
  Eye,
  MapPin,
  Stethoscope,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function AppointmentCard({
  appointment,
  onViewDetails,
}: {
  appointment: AppointmentItem;
  onViewDetails: (apt: AppointmentItem) => void;
}) {
  const statusMeta = statusConfig[appointment.status];
  const isVideo = appointment.mode === "Video Consultation";

  return (
    <article
      aria-labelledby={`apt-title-${appointment.id}`}
      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-border-strong hover:shadow-[var(--shadow-raised)]"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"
            >
              <Stethoscope className="size-5" />
            </span>
            <div className="min-w-0">
              <h3
                id={`apt-title-${appointment.id}`}
                className="truncate text-base font-bold text-foreground"
              >
                {appointment.doctorName}
              </h3>
              <p className="truncate text-xs text-muted-foreground mt-0.5">
                {appointment.specialty} · {appointment.hospitalOrClinic}
              </p>
            </div>
          </div>

          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold shrink-0",
              statusMeta.className,
            )}
          >
            {statusMeta.label}
          </span>
        </div>

        {/* Appointment Type */}
        <div className="mt-3.5 rounded-xl bg-surface-muted px-3 py-2 text-xs font-semibold text-foreground">
          {appointment.type}
        </div>

        {/* Date and Time info */}
        <div className="mt-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="font-semibold text-foreground">{appointment.dateDisplay}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="font-semibold text-foreground">{appointment.time}</span>
            <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {isVideo ? (
                <>
                  <Video className="size-3 text-primary" /> Video
                </>
              ) : (
                <>
                  <MapPin className="size-3 text-primary" /> In-Person
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(appointment)}
          className="w-full rounded-xl border-border text-xs font-semibold text-foreground hover:bg-surface-muted"
        >
          <Eye className="mr-1.5 size-3.5 text-muted-foreground" aria-hidden="true" />
          View Details
        </Button>
      </div>
    </article>
  );
}
