import {
  AlertTriangle,
  CheckCircle2,
  Pill,
  TrendingUp,
} from "lucide-react";
import { historyOverviewStats } from "@/lib/mock-data";

export function HistoryOverviewCards({
  stats = historyOverviewStats,
}: {
  stats?: typeof historyOverviewStats;
}) {
  return (
    <section
      aria-label="Medication history statistics overview"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Prescriptions
        </span>
        <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground">
          <Pill className="size-4 text-primary" aria-hidden="true" />
          {stats.totalPrescriptions}
        </p>
        <span className="mt-1 block text-[11px] text-muted-foreground">
          Active treatment regimens
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Doses Taken
        </span>
        <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-success">
          <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
          {stats.dosesTaken}
        </p>
        <span className="mt-1 block text-[11px] text-muted-foreground">
          Confirmed administrations
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Doses Missed
        </span>
        <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-danger">
          <AlertTriangle className="size-4 text-danger" aria-hidden="true" />
          {stats.dosesMissed}
        </p>
        <span className="mt-1 block text-[11px] text-muted-foreground">
          Missed schedule windows
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Overall Adherence
        </span>
        <p className="mt-1.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground tabular">
          <TrendingUp className="size-4 text-primary" aria-hidden="true" />
          {stats.adherenceRate}%
        </p>
        <span className="mt-1 block text-[11px] text-success font-medium">
          Optimal therapeutic range
        </span>
      </div>
    </section>
  );
}
