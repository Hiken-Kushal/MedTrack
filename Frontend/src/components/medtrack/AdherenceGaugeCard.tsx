import { CheckCircle2, CircleAlert, TrendingUp } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { cn } from "@/lib/utils";

export function AdherenceGaugeCard({
  overallPercent,
  dosesTaken,
  dosesTotal,
  dosesMissed,
  timeframeLabel,
}: {
  overallPercent: number;
  dosesTaken: number;
  dosesTotal: number;
  dosesMissed: number;
  timeframeLabel: string;
}) {
  // SVG circle: circumference of r=16 ≈ 100.53
  const dash = (overallPercent / 100) * 100;
  const isOptimal = overallPercent >= 80;

  return (
    <SectionCard
      title="Overall Adherence"
      description={`Medication consistency summary for ${timeframeLabel}.`}
      className="h-full flex flex-col justify-between"
    >
      <div className="flex flex-col items-center justify-center py-2 sm:py-4">
        <div className="relative size-40 sm:size-44">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-surface-muted"
              strokeWidth="3.2"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={cn(
                "transition-all duration-700",
                isOptimal ? "stroke-primary" : "stroke-warning",
              )}
              strokeWidth="3.2"
              strokeDasharray={`${dash}, 100`}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-foreground tabular">
              {overallPercent}%
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
              Score
            </span>
          </div>
        </div>

        <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground">
          {dosesTaken} of {dosesTotal} doses taken.{" "}
          <span className="font-semibold text-foreground">
            {isOptimal ? "You're consistently on track!" : "Attention recommended."}
          </span>
        </p>
      </div>

      {/* Metric strip inside the card */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        <div className="rounded-xl bg-surface-muted/60 p-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Taken
          </span>
          <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-success">
            <CheckCircle2 className="size-3.5" />
            {dosesTaken}
          </span>
        </div>

        <div className="rounded-xl bg-surface-muted/60 p-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Missed
          </span>
          <span className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-danger">
            <CircleAlert className="size-3.5" />
            {dosesMissed}
          </span>
        </div>

        <div className="rounded-xl bg-surface-muted/60 p-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Health Rating
          </span>
          <span
            className={cn(
              "mt-1 inline-flex items-center justify-center gap-1 text-xs font-bold",
              isOptimal ? "text-primary" : "text-warning",
            )}
          >
            <TrendingUp className="size-3.5" />
            {isOptimal ? "Optimal" : "Moderate"}
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
