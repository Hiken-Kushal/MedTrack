import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/medtrack/AppShell";
import { MedicationOverview } from "@/components/medtrack/MedicationOverview";
import { NextDoseCard } from "@/components/medtrack/NextDoseCard";
import { MedicationSchedule } from "@/components/medtrack/MedicationSchedule";
import { AdherenceSummary } from "@/components/medtrack/AdherenceSummary";
import { InteractionAlert } from "@/components/medtrack/InteractionAlert";
import { ActivityTimeline } from "@/components/medtrack/ActivityTimeline";
import { adherence, interactionWarnings, patient, recentActivity, todaySchedule } from "@/lib/mock-data";

const title = "MedTrack — Patient medication dashboard";
const description =
  "MedTrack helps patients organize prescribed medicines, schedules, adherence and interaction warnings. Informational support, not medical advice.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [logged, setLogged] = useState(false);
  const [logging, setLogging] = useState(false);
  const [schedule, setSchedule] = useState(todaySchedule);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleLogDose = () => {
    setLogging(true);
    window.setTimeout(() => {
      setLogging(false);
      setLogged(true);
      setSchedule((prev) =>
        prev.map((d) => (d.status === "upcoming" ? { ...d, status: "taken" } : d)),
      );
      toast.success("Dose logged", { description: "Metformin 500 mg recorded for 8:00 PM." });
    }, 700);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">
              Good evening, {patient.firstName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {today} · One dose left on today's schedule.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-2 shadow-[var(--shadow-card)]">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Adherence: {adherence.weekPercent}%
            </span>
          </div>
        </header>

        {/* Stat strip */}
        <MedicationOverview />

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <NextDoseCard logged={logged} loading={logging} onLog={handleLogDose} />
            <MedicationSchedule doses={schedule} />
            <div className="lg:hidden">
              <AdherenceSummary />
            </div>
          </div>

          <div className="space-y-6">
            <AdherenceSummary />
            <InteractionAlert warnings={interactionWarnings} />
            <ActivityTimeline entries={recentActivity} />
          </div>
        </div>

        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack organizes medication information and surfaces safety warnings reported by its
          interaction checker. It does not diagnose conditions, prescribe or change medication, or
          replace advice from a qualified healthcare professional. Demo data shown.
        </p>
      </div>
    </AppShell>
  );
}