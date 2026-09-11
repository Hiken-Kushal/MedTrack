import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { cn } from "@/lib/utils";

const insights = [
  {
    id: "adherence",
    title: "Medication Adherence",
    description: "You've taken 4 of 6 scheduled doses today. Keep following your routine.",
    Icon: CheckCircle2,
    tone: "text-success",
    bgTone: "bg-success-soft",
  },
  {
    id: "consistency",
    title: "Consistency",
    description: "Your 7-day adherence score is 82%. You're building a consistent medication habit.",
    Icon: TrendingUp,
    tone: "text-primary",
    bgTone: "bg-primary-soft",
  },
  {
    id: "reminder",
    title: "Next Reminder",
    description: "Your next medication is scheduled for 9:00 PM.",
    Icon: Clock,
    tone: "text-primary",
    bgTone: "bg-primary-soft",
  },
];

export function HealthInsightsCard({ className }: { className?: string }) {
  return (
    <SectionCard
      title="Health Insights"
      description="Personalized insights based on your medication routine"
      className={cn("p-4 sm:p-5", className)}
    >
      <div className="space-y-3 pt-1">
        {insights.map(({ id, title, description, Icon, tone, bgTone }) => (
          <div
            key={id}
            className="flex items-start gap-3 rounded-2xl border border-border/80 bg-surface-muted/60 p-3 sm:p-3.5 transition-all hover:border-border hover:bg-surface-muted"
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-xl",
                bgTone,
                tone,
              )}
            >
              <Icon className="size-4" />
            </span>
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-xs font-bold text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
