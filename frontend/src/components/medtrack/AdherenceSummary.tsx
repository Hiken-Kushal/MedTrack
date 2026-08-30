import { SectionCard } from "./SectionCard";
import { adherence } from "@/lib/mock-data";

export function AdherenceSummary() {
  const percent = adherence.weekPercent;
  // SVG circle: circumference of r=16 ≈ 100.53
  const dash = (percent / 100) * 100;

  return (
    <SectionCard title="Weekly adherence" description="Your consistency over the last 7 days.">
      <div className="flex items-center justify-center py-4">
        <div className="relative size-36">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-surface-muted"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-primary"
              strokeWidth="3"
              strokeDasharray={`${dash}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tracking-tight text-foreground">{percent}%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Score
            </span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {adherence.todayTaken} of {adherence.todayTotal} doses logged today.{" "}
        <span className="font-semibold text-foreground">You're on track!</span>
      </p>
    </SectionCard>
  );
}