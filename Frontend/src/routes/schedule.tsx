import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Pill,
  Plus,
  RotateCcw,
  Stethoscope,
} from "lucide-react";

import { AppShell } from "@/components/medtrack/AppShell";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { ScheduleTimelineItem } from "@/components/medtrack/ScheduleTimelineItem";
import { AppointmentCard } from "@/components/medtrack/AppointmentCard";
import { AppointmentDetailsModal } from "@/components/medtrack/AppointmentDetailsModal";
import { Button } from "@/components/ui/button";
import {
  multiDaySchedules,
  upcomingAppointmentsList,
  type AppointmentItem,
  type DayScheduleItem,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const title = "Schedule & Appointments — MedTrack";
const description =
  "Keep track of your medication doses and upcoming health appointments with MedTrack.";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SchedulePage,
});

export function SchedulePage() {
  const [schedules, setSchedules] = useState(multiDaySchedules);
  const [selectedDateKey, setSelectedDateKey] = useState("2026-08-29"); // Today
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Active day schedule
  const activeDaySchedule = useMemo(() => {
    return (
      schedules.find((s) => s.dateKey === selectedDateKey) ||
      schedules[1] // fallback to today
    );
  }, [schedules, selectedDateKey]);

  // Selected date statistics
  const dayStats = useMemo(() => {
    const doses = activeDaySchedule.doses;
    const total = doses.length;
    const taken = doses.filter((d) => d.status === "taken").length;
    const missed = doses.filter((d) => d.status === "missed").length;
    const pending = doses.filter((d) => d.status === "upcoming" || d.status === "delayed").length;
    const percent = total > 0 ? Math.round((taken / total) * 100) : 0;

    return { total, taken, missed, pending, percent };
  }, [activeDaySchedule]);

  const handleLogDose = (item: DayScheduleItem) => {
    setSchedules((prev) =>
      prev.map((day) => {
        if (day.dateKey !== selectedDateKey) return day;
        return {
          ...day,
          doses: day.doses.map((d) =>
            d.id === item.id ? { ...d, status: "taken" } : d,
          ),
        };
      }),
    );
    toast.success("Dose logged", {
      description: `${item.medicine} ${item.dosage} recorded for ${item.time}.`,
    });
  };

  const handleViewAppointment = (apt: AppointmentItem) => {
    setSelectedAppointment(apt);
    setAppointmentModalOpen(true);
  };

  const handleQuickAdd = () => {
    toast.info("Appointment scheduling", {
      description: "Consultation booking modal is active in prototype mode.",
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Page Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">Schedule</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of your medication doses and upcoming health appointments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDateKey("2026-08-29")}
              className="rounded-2xl border-border text-xs font-semibold"
            >
              <RotateCcw className="mr-1.5 size-3.5" /> Jump to Today
            </Button>
            <Button
              size="sm"
              onClick={handleQuickAdd}
              className="rounded-2xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
            >
              <Plus className="mr-1.5 size-3.5" /> Book Appointment
            </Button>
          </div>
        </header>

        {/* 2. Interactive Date Navigation Picker */}
        <section
          aria-label="Select date"
          className="rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-primary" aria-hidden="true" />
              <h2 className="text-xs sm:text-sm font-bold text-foreground">
                {activeDaySchedule.monthYear}
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Selected: <strong className="text-foreground">{activeDaySchedule.fullDateStr}</strong>
            </span>
          </div>

          <div className="overflow-x-auto pb-1 sm:pb-0">
            <div className="grid grid-cols-7 gap-2 sm:gap-3 min-w-[540px] sm:min-w-0">
              {schedules.map((day) => {
                const isSelected = day.dateKey === selectedDateKey;
                const isToday = day.dateKey === "2026-08-29";
                const hasAppointments = day.appointments.length > 0;

                return (
                  <button
                    key={day.dateKey}
                    type="button"
                    onClick={() => setSelectedDateKey(day.dateKey)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-2xl p-2.5 sm:p-3.5 text-center transition-all relative min-h-[92px] sm:min-h-[105px]",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md scale-102 font-bold"
                        : isToday
                          ? "bg-primary-soft text-primary font-semibold border border-primary/30"
                          : "bg-surface-muted/70 text-foreground hover:bg-surface-muted hover:border-border-strong border border-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] sm:text-xs font-semibold uppercase tracking-wider",
                        isSelected
                          ? "text-primary-foreground/90"
                          : isToday
                            ? "text-primary"
                            : "text-muted-foreground",
                      )}
                    >
                      {day.dayLabel}
                    </span>
                    <span className="mt-1 text-base sm:text-xl font-extrabold tabular leading-tight">
                      {day.dayNum}
                    </span>
                    <span
                      className={cn(
                        "mt-1 text-[10px] sm:text-xs font-medium",
                        isSelected
                          ? "text-primary-foreground/90"
                          : isToday
                            ? "text-primary/90"
                            : "text-muted-foreground",
                      )}
                    >
                      {day.doses.length} doses
                    </span>

                    {/* Indicator badges */}
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      {isToday && (
                        <span
                          aria-label="Today"
                          className={cn(
                            "size-1.5 sm:size-2 rounded-full",
                            isSelected ? "bg-primary-foreground" : "bg-primary",
                          )}
                        />
                      )}
                      {hasAppointments && (
                        <span
                          aria-label="Has appointment"
                          className={cn(
                            "size-1.5 sm:size-2 rounded-full",
                            isSelected ? "bg-accent" : "bg-warning",
                          )}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Daily Status Banner */}
        <section
          aria-label="Day adherence status"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Total Doses
            </span>
            <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground">
              <Pill className="size-4 text-primary" aria-hidden="true" />
              {dayStats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Completed
            </span>
            <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-success">
              <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
              {dayStats.taken}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Pending
            </span>
            <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              {dayStats.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Completion Rate
            </span>
            <p className="mt-1.5 text-xl sm:text-2xl font-bold text-foreground tabular">
              {dayStats.percent}%
            </p>
          </div>
        </section>

        {/* 4. Timeline Schedule Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left 2 Cols: Doses for Selected Date */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard
              title={`Medication Schedule (${activeDaySchedule.dayLabel})`}
              description={`Chronological medication doses for ${activeDaySchedule.fullDateStr}.`}
            >
              {activeDaySchedule.doses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-2xl bg-surface-muted text-muted-foreground"
                  >
                    <Pill className="size-6" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    No medication doses scheduled
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No prescriptions due on this date.
                  </p>
                </div>
              ) : (
                <ol className="space-y-3.5">
                  {activeDaySchedule.doses.map((item) => (
                    <ScheduleTimelineItem
                      key={item.id}
                      item={item}
                      onLogDose={handleLogDose}
                    />
                  ))}
                </ol>
              )}
            </SectionCard>
          </div>

          {/* Right Col: Appointments & Consultations */}
          <div className="space-y-6">
            <SectionCard
              title="Upcoming Appointments"
              description="Scheduled consultations with your care team."
            >
              {upcomingAppointmentsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No upcoming appointments scheduled.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointmentsList.slice(0, 3).map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onViewDetails={handleViewAppointment}
                    />
                  ))}
                </div>
              )}
            </SectionCard>
          </div>
        </div>

        {/* 5. Appointment Details Modal */}
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          open={appointmentModalOpen}
          onOpenChange={setAppointmentModalOpen}
        />

        {/* 6. Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack organizes medication schedules and surfaces safety reminders. It does not replace
          advice or consultation with a qualified medical professional. Demo schedule shown.
        </p>
      </div>
    </AppShell>
  );
}
