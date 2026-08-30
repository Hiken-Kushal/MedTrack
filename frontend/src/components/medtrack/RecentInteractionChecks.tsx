import { History, Play, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { cn } from "@/lib/utils";
import type {
  DrugInteractionSeverity,
  RecentInteractionCheck,
} from "@/lib/mock-data";

const severityBadges: Record<
  DrugInteractionSeverity,
  { label: string; className: string }
> = {
  none: {
    label: "No Alert",
    className: "bg-success-soft text-success border-success/30",
  },
  low: {
    label: "Low",
    className: "bg-primary-soft text-primary border-primary/30",
  },
  moderate: {
    label: "Moderate",
    className: "bg-warning-soft text-warning-foreground border-warning/35",
  },
  high: {
    label: "High Risk",
    className: "bg-danger-soft text-danger border-danger/35",
  },
};

export function RecentInteractionChecks({
  checks,
  onSelectPair,
}: {
  checks: RecentInteractionCheck[];
  onSelectPair: (meds: string[]) => void;
}) {
  return (
    <SectionCard
      title="Recent Interaction Checks"
      description="Previously evaluated medication combinations."
    >
      <div className="space-y-3 pt-1">
        {checks.map((item) => {
          const badgeMeta = severityBadges[item.severity];
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-border-strong sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    {item.medicines.join(" + ")}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      badgeMeta.className,
                    )}
                  >
                    {badgeMeta.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {item.summary}
                </p>
                <span className="block text-[11px] text-muted-foreground/80">
                  Checked {item.date}
                </span>
              </div>

              <div className="shrink-0 pt-1 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectPair(item.medicines)}
                  className="rounded-xl border-border text-xs font-semibold h-8 w-full sm:w-auto hover:bg-surface-muted"
                >
                  <Play className="mr-1.5 size-3 text-primary" /> Test Again
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
