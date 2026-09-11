import { AlertTriangle, Clock, History } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { StatusBadge } from "@/components/medtrack/StatusBadge";
import type { DoseHistoryEntry } from "@/lib/mock-data";

export function DoseHistoryList({
  history,
  missedDoses,
}: {
  history: DoseHistoryEntry[];
  missedDoses: DoseHistoryEntry[];
}) {
  return (
    <div className="space-y-6">
      {/* 1. Missed Doses Focus Section (if any missed doses exist) */}
      {missedDoses.length > 0 && (
        <section
          aria-labelledby="missed-doses-heading"
          className="rounded-3xl border border-warning/30 bg-warning-soft p-5 sm:p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-danger text-primary-foreground"
            >
              <AlertTriangle className="size-5" />
            </span>
            <div className="min-w-0">
              <h3
                id="missed-doses-heading"
                className="text-base font-bold text-foreground"
              >
                Missed Doses ({missedDoses.length})
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Doses not logged within their schedule window.
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2.5">
            {missedDoses.map((dose) => (
              <li
                key={dose.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-danger/20 bg-card p-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-foreground">
                    {dose.medicine} {dose.dosage}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {dose.dateDisplay} {dose.note ? `· ${dose.note}` : ""}
                  </p>
                </div>
                <StatusBadge status="missed" className="shrink-0 text-[10px]" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 2. Full Recent Dose History */}
      <SectionCard
        title="Dose History"
        description="Chronological log of taken and recorded medication events."
      >
        {history.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No dose history recorded for this period.
          </div>
        ) : (
          <ul className="space-y-3 pt-1">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-muted text-muted-foreground"
                  >
                    <Clock className="size-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-foreground">
                      {entry.medicine} <span className="font-normal text-muted-foreground">({entry.dosage})</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {entry.dateDisplay} {entry.note ? `· ${entry.note}` : ""}
                    </p>
                  </div>
                </div>

                <StatusBadge status={entry.status} className="shrink-0 text-[10px]" />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}
