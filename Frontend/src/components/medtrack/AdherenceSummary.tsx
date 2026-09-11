import { Link } from "@tanstack/react-router";
import { CheckCircle2, Flame, HeartPulse, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { adherence, overview } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AdherenceSummary({ className }: { className?: string }) {
  const percent = adherence.weekPercent;
  // SVG circle: circumference of r=16 ≈ 100.53
  const dash = (percent / 100) * 100;

  return (
    <SectionCard
      title="Medication Adherence & Routine Streak"
      description="Consistency over the last 7 days."
      action={
        <Link
          to="/adherence"
          className="text-xs font-semibold text-primary hover:text-primary-strong transition-colors"
        >
          View Full Analytics →
        </Link>
      }
      className={cn("p-5 sm:p-6", className)}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Circular Score Gauge */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative size-24 shrink-0 sm:size-28">
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
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular">
                {percent}%
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Score
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-success">
              <CheckCircle2 className="size-4" />
              <span>Optimal Consistency</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {adherence.todayTaken} of {adherence.todayTotal} doses logged today.
            </p>
            <span className="inline-block text-xs font-semibold text-foreground">
              You're on track!
            </span>
          </div>
        </div>

        {/* Right: Active Routine Streak Badge */}
        <div className="flex-1 max-w-md rounded-2xl bg-primary-soft/80 border border-primary/20 p-4 flex items-center justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5 text-primary">
              <Flame className="size-4 shrink-0 fill-primary/20" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Current Streak
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular">
              {overview.streakDays} Days
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Personal Best: <strong className="text-foreground">21 days</strong>
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1 text-right text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Sparkles className="size-3.5 text-primary" /> Daily routine
            </span>
            <span>Regular blood level stability</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}