import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar as CalendarIcon } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { multiDaySchedules } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// August 2026 calendar days data (August 1 is Saturday)
// Padding: 6 empty cells for Sunday to Friday
const augustDays = [
  ...Array.from({ length: 6 }, () => null),
  ...Array.from({ length: 31 }, (_, i) => i + 1),
];

export function DashboardCalendarCard({ className }: { className?: string }) {
  const [selectedDay, setSelectedDay] = useState(29); // 29 August (Today in mock data)

  // Map of days that have scheduled medication / appointments
  const scheduledDays = new Set(
    multiDaySchedules.map((s) => parseInt(s.dayNum, 10)),
  );

  return (
    <SectionCard
      title="Calendar"
      description="August 2026"
      action={
        <Link
          to="/schedule"
          className="text-xs font-semibold text-primary hover:text-primary-strong transition-colors"
        >
          Schedule →
        </Link>
      }
      className={cn("p-4 sm:p-5", className)}
    >
      <div className="space-y-2.5">
        {/* Month Header Sub-bar */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-foreground">
            <CalendarIcon className="size-3.5 text-primary" aria-hidden="true" />
            August 2026
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Today: <strong className="text-foreground">29 Aug</strong>
          </span>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 text-center">
          {weekdays.map((day) => (
            <span
              key={day}
              className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground py-0.5"
            >
              {day}
            </span>
          ))}
        </div>

        {/* Compact date grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {augustDays.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="size-7 sm:size-7.5" />;
            }

            const isToday = day === 29;
            const isSelected = day === selectedDay;
            const hasActivity = scheduledDays.has(day);

            return (
              <button
                key={`day-${day}`}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "relative flex size-7 sm:size-7.5 mx-auto flex-col items-center justify-center rounded-lg text-xs font-medium transition-all",
                  isSelected
                    ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                    : isToday
                      ? "bg-primary-soft text-primary font-bold border border-primary/30"
                      : "text-foreground hover:bg-surface-muted",
                )}
                aria-label={`August ${day}, 2026`}
              >
                <span>{day}</span>
                {hasActivity && !isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 size-1 rounded-full bg-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
