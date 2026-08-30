import { Flame, Package, Pill, TrendingUp } from "lucide-react";
import { overview } from "@/lib/mock-data";

const items = [
  {
    label: "Total meds",
    value: String(overview.activeMedications),
    Icon: Pill,
    tone: "text-primary",
  },
  {
    label: "Taken today",
    value: `${overview.dosesCompletedToday}/${overview.dosesScheduledToday}`,
    Icon: Package,
    tone: "text-primary",
  },
  {
    label: "Refills due",
    value: String(overview.refillsDue),
    Icon: TrendingUp,
    tone: "text-warning",
  },
  {
    label: "Streak",
    value: `${overview.streakDays} days`,
    Icon: Flame,
    tone: "text-primary",
  },
];

export function MedicationOverview() {
  return (
    <section aria-label="Medication overview">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map(({ label, value, Icon, tone }) => (
          <li
            key={label}
            className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
              <Icon aria-hidden="true" className={`size-5 shrink-0 ${tone}`} />
              {value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}