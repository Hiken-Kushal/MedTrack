import { Package, Pill, TrendingUp } from "lucide-react";
import { overview } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
];

export function MedicationOverview({ className }: { className?: string }) {
  return (
    <section aria-label="Medication summary metrics" className={className}>
      <ul className="flex flex-col gap-3.5 sm:gap-4">
        {items.map(({ label, value, Icon, tone }) => (
          <li
            key={label}
            className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-[var(--shadow-card)] flex flex-col justify-between"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-2.5 flex items-center gap-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              <Icon aria-hidden="true" className={cn("size-5 sm:size-6 shrink-0", tone)} />
              <span className="tabular">{value}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}