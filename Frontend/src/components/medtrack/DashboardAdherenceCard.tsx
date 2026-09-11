import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { adherence } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DashboardAdherenceCard({ className }: { className?: string }) {
  const percent = adherence.weekPercent;
  // SVG circle: circumference of r=16 ≈ 100.53
  const dash = (percent / 100) * 100;

  return (
    <SectionCard
      title="Adherence"
      description="Last 7 days consistency"
      action={
        <Link
          to="/adherence"
          className="text-xs font-semibold text-primary hover:text-primary-strong transition-colors"
        >
          Analytics →
        </Link>
      }
      className={cn("p-4 sm:p-5", className)}
    >
      <div className="flex items-center gap-4 py-1">
        {/* Circular Progress Gauge */}
        <div className="relative size-22 shrink-0 sm:size-24">
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
              className="stroke-primary"
              strokeWidth="3.2"
              strokeDasharray={`${dash}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold tracking-tight text-foreground tabular">
              {percent}%
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              Score
            </span>
          </div>
        </div>

        {/* Consistency summary text */}
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-success">
            <CheckCircle2 className="size-3.5 shrink-0" />
            <span className="truncate">Optimal Routine</span>
          </div>
          <p className="text-xs text-muted-foreground leading-tight">
            {adherence.todayTaken} of {adherence.todayTotal} doses logged today.
          </p>
          <p className="text-xs font-semibold text-foreground pt-0.5">
            You're on track!
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
