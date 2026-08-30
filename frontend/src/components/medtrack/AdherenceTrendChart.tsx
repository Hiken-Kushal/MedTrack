import { useState } from "react";
import { BarChart3, Info } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { cn } from "@/lib/utils";
import type { DailyAdherencePoint } from "@/lib/mock-data";

export function AdherenceTrendChart({
  trendData,
  timeframeLabel,
}: {
  trendData: DailyAdherencePoint[];
  timeframeLabel: string;
}) {
  const [hoveredPoint, setHoveredPoint] = useState<DailyAdherencePoint | null>(null);

  return (
    <SectionCard
      title="Adherence Trend"
      description={`Daily breakdown of taken vs scheduled doses over ${timeframeLabel}.`}
      action={
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
            <span>Optimal (≥80%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-warning" aria-hidden="true" />
            <span>Review (&lt;80%)</span>
          </span>
        </div>
      }
    >
      <div className="pt-4 pb-2">
        {/* Chart container */}
        <div className="relative flex h-52 sm:h-56 items-end gap-2 sm:gap-4 border-b border-border pb-2">
          {/* 80% Target threshold guide */}
          <div
            className="pointer-events-none absolute inset-x-0 border-b border-dashed border-border-strong flex items-center justify-end pr-2"
            style={{ bottom: "80%" }}
          >
            <span className="text-[10px] font-semibold text-muted-foreground bg-card px-1.5 rounded-sm">
              80% Target
            </span>
          </div>

          {/* 50% threshold guide */}
          <div
            className="pointer-events-none absolute inset-x-0 border-b border-dashed border-border/50"
            style={{ bottom: "50%" }}
          />

          {/* Bars */}
          {trendData.map((item, idx) => {
            const isOptimal = item.percent >= 80;
            const isHovered = hoveredPoint?.day === item.day;

            return (
              <div
                key={idx}
                className="group relative flex flex-1 flex-col items-center h-full justify-end cursor-pointer"
                onMouseEnter={() => setHoveredPoint(item)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Floating tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 whitespace-nowrap rounded-xl border border-border bg-foreground px-2.5 py-1 text-center text-[11px] font-semibold text-background shadow-lg">
                    {item.day}: {item.percent}% ({item.taken}/{item.total} doses)
                  </div>
                )}

                {/* Percentage label */}
                <span className="mb-1.5 text-[10px] sm:text-xs font-bold text-foreground tabular">
                  {item.percent}%
                </span>

                {/* Bar pill */}
                <div className="w-full max-w-[48px] rounded-t-xl bg-surface-muted relative overflow-hidden flex flex-col justify-end h-full">
                  <div
                    className={cn(
                      "w-full rounded-t-xl transition-all duration-500",
                      isOptimal
                        ? "bg-primary group-hover:bg-primary/90"
                        : "bg-warning group-hover:bg-warning/90",
                    )}
                    style={{ height: `${item.percent}%` }}
                  />
                </div>

                {/* Day label */}
                <div className="mt-2 text-center">
                  <span className="block text-xs font-bold text-foreground">{item.day}</span>
                  <span className="block text-[10px] text-muted-foreground">{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Info className="size-3.5 text-primary" /> Hover over bars to view specific dose counts.
          </span>
          <span className="font-semibold text-foreground">
            Target consistency: ≥80% for therapy maintenance
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
