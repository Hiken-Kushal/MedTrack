import { Flame, Sparkles } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { overview } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DashboardStreakCard({ className }: { className?: string }) {
  return (
    <SectionCard
      title="Current Streak"
      description="Consistent daily habits"
      className={cn("p-4 sm:p-5", className)}
    >
      <div className="space-y-3">
        {/* Streak Hero Badge */}
        <div className="flex items-center gap-3.5 rounded-2xl bg-primary-soft/80 border border-primary/20 p-3.5">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"
          >
            <Flame className="size-6 fill-primary-foreground/20" />
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
              Active Routine
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular">
              {overview.streakDays} Days
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
              Personal Best: <strong className="text-foreground font-semibold">21 days</strong>
            </p>
          </div>
        </div>

        {/* Motivational note */}
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>Consistent daily timing improves therapeutic stability.</span>
        </p>
      </div>
    </SectionCard>
  );
}
