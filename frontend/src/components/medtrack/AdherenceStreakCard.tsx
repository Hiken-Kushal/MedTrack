import { Award, Flame, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";

export function AdherenceStreakCard({
  streakDays,
  bestStreakDays,
}: {
  streakDays: number;
  bestStreakDays: number;
}) {
  return (
    <SectionCard
      title="Medication Streak"
      description="Consistent daily habits improve treatment outcomes."
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Hero streak badge */}
        <div className="flex items-center gap-4 rounded-2xl bg-primary-soft/80 border border-primary/20 p-4 sm:p-5">
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md"
          >
            <Flame className="size-8" />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Active Routine Streak
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground tabular">
              {streakDays} Days
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Personal Best: <strong className="text-foreground">{bestStreakDays} days</strong>
            </p>
          </div>
        </div>

        {/* Motivational clinical note */}
        <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Keep it going!
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You're building a consistent medication routine. Regular adherence ensures optimal therapeutic blood levels and reduces health risks.
          </p>
        </div>

        {/* Clinical benefits */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-success shrink-0" />
            <span>Reduces risk of blood pressure spikes and missed dose side effects</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse className="size-3.5 text-primary shrink-0" />
            <span>Provides reliable treatment telemetry for your next doctor checkup</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
