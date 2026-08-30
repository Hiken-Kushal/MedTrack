import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  Pill,
  TrendingUp,
} from "lucide-react";

import { AppShell } from "@/components/medtrack/AppShell";
import { AdherenceGaugeCard } from "@/components/medtrack/AdherenceGaugeCard";
import { AdherenceStreakCard } from "@/components/medtrack/AdherenceStreakCard";
import { AdherenceTrendChart } from "@/components/medtrack/AdherenceTrendChart";
import { MedicationAdherenceBreakdown } from "@/components/medtrack/MedicationAdherenceBreakdown";
import { DoseHistoryList } from "@/components/medtrack/DoseHistoryList";
import {
  adherenceByTimeframe,
  type AdherenceTimeframe,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const title = "Adherence & Consistency — MedTrack";
const description =
  "Track your medication-taking habits and stay consistent with your treatment. MedTrack adherence analytics.";

export const Route = createFileRoute("/adherence")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdherencePage,
});

const timeframeOptions: { id: AdherenceTimeframe; label: string }[] = [
  { id: "7days", label: "Last 7 days" },
  { id: "30days", label: "Last 30 days" },
  { id: "month", label: "This month" },
];

export function AdherencePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<AdherenceTimeframe>("7days");

  const currentData = adherenceByTimeframe[selectedTimeframe];
  const activeLabel = timeframeOptions.find((t) => t.id === selectedTimeframe)?.label || "Last 7 days";

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Page Header with Timeframe Filter */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">Adherence</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your medication-taking habits and stay consistent with your treatment.
            </p>
          </div>

          {/* Timeframe Filter Tabs */}
          <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-card p-1.5 shadow-[var(--shadow-card)]">
            {timeframeOptions.map((opt) => {
              const active = selectedTimeframe === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedTimeframe(opt.id)}
                  className={cn(
                    "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* 2. Top Row: Circular Score Gauge + Streak Card */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AdherenceGaugeCard
            overallPercent={currentData.overallPercent}
            dosesTaken={currentData.dosesTaken}
            dosesTotal={currentData.dosesTotal}
            dosesMissed={currentData.dosesMissed}
            timeframeLabel={activeLabel}
          />

          <AdherenceStreakCard
            streakDays={currentData.streakDays}
            bestStreakDays={currentData.bestStreakDays}
          />
        </div>

        {/* 3. Middle Row: Visual Adherence Trend Chart */}
        <AdherenceTrendChart
          trendData={currentData.dailyTrend}
          timeframeLabel={activeLabel}
        />

        {/* 4. Bottom Grid: Breakdown by Med (Left) + Dose History & Missed Doses (Right) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MedicationAdherenceBreakdown
            medicationStats={currentData.medicationStats}
          />

          <DoseHistoryList
            history={currentData.doseHistory}
            missedDoses={currentData.missedDoses}
          />
        </div>

        {/* 5. Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack calculates adherence based on your logged and scheduled doses to help you build consistency.
          It does not diagnose clinical efficacy or replace advice from a healthcare provider. Demo data shown.
        </p>
      </div>
    </AppShell>
  );
}
