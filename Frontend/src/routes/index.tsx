import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pill } from "lucide-react";

import { AppShell } from "@/components/medtrack/AppShell";
import { MedicationOverview } from "@/components/medtrack/MedicationOverview";
import { NextDoseCard } from "@/components/medtrack/NextDoseCard";
import { DashboardMedicineCard } from "@/components/medtrack/DashboardMedicineCard";
import { DashboardCalendarCard } from "@/components/medtrack/DashboardCalendarCard";
import { DashboardAdherenceCard } from "@/components/medtrack/DashboardAdherenceCard";
import { DashboardStreakCard } from "@/components/medtrack/DashboardStreakCard";
import { HealthInsightsCard } from "@/components/medtrack/HealthInsightsCard";
import { AIAssistant } from "@/components/medtrack/AIAssistant";
import { initialMedicationsList, patient } from "@/lib/mock-data";

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

  // Additional active medications to display in the middle column
  const otherMedications = initialMedicationsList.filter(
    (m) => m.name !== "Metformin" && m.status !== "completed",
  );

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
      toast.success("Dose logged", {
        description: "Metformin 500 mg recorded for 8:00 PM.",
      });
    }, 600);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Greeting & Top Dashboard Header */}
        <header>
          <h1 className="text-page-title text-foreground sm:text-3xl font-bold tracking-tight">
            Good evening, {patient.firstName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {today} · One dose left on today's schedule.
          </p>
        </header>

        {/* 2. Exact 3-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-5 xl:gap-6 items-start">
          {/* ──────────────── 1. LEFT COLUMN: SUMMARY CARDS & INSIGHTS (25%) ──────────────── */}
          <div className="lg:col-span-3 space-y-4">
            <MedicationOverview />
            <HealthInsightsCard />
          </div>

          {/* ──────────────── 2. MIDDLE COLUMN: MEDICATIONS (45%) ──────────────── */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between pb-0.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Pill className="size-4 text-primary" aria-hidden="true" />
                Prescriptions & Daily Schedule
              </h2>
              <span className="text-xs text-muted-foreground">
                {initialMedicationsList.filter((m) => m.status !== "completed").length} active
              </span>
            </div>

            {/* Medicine Card 1: Next Scheduled Dose Hero Card */}
            <NextDoseCard
              logged={logged}
              loading={logging}
              onLog={handleLogDose}
            />

            {/* Medicine Cards 2, 3, 4: Stacked Vertically */}
            <div className="space-y-3.5">
              {otherMedications.map((med) => (
                <DashboardMedicineCard key={med.id} medication={med} />
              ))}
            </div>
          </div>

          {/* ──────── 3. RIGHT COLUMN: CALENDAR → ADHERENCE → STREAK (30%) ──────── */}
          <div className="lg:col-span-4 space-y-4">
            {/* 1. Calendar */}
            <DashboardCalendarCard />

            {/* 2. Adherence 82% Percentage Circle */}
            <DashboardAdherenceCard />

            {/* 3. Current Streak 12 Days */}
            <DashboardStreakCard />
          </div>
        </div>

        {/* 3. Clinical & Informational Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack organizes medication information and surfaces safety warnings reported by its
          interaction checker. It does not diagnose conditions, prescribe or change medication, or
          replace advice from a qualified healthcare professional. Demo data shown.
        </p>
      </div>

      {/* Floating AI Assistant overlay */}
      <AIAssistant />
    </AppShell>
  );
}