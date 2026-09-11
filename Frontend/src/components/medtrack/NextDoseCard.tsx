import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nextDose } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function NextDoseCard({
  logged,
  onLog,
  loading = false,
  className,
}: {
  logged: boolean;
  onLog: () => void;
  loading?: boolean;
  className?: string;
}) {
  return (
    <article
      aria-labelledby="next-dose-heading"
      className={cn(
        "relative overflow-hidden rounded-3xl bg-primary p-5 sm:p-6 text-primary-foreground shadow-[0_12px_28px_-8px_oklch(0.52_0.09_195_/0.4)] transition-all",
        className,
      )}
    >
      {/* Decorative subtle blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -bottom-12 size-48 rounded-full bg-white/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 size-28 rounded-full bg-white/10 blur-xl"
      />

      <div className="relative z-10 space-y-4">
        {/* Top bar: Badge & timing remaining */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground/90">
            <Clock aria-hidden="true" className="size-3.5" />
            {logged ? "Dose recorded" : "Next scheduled dose"}
          </span>
          <span className="rounded-full bg-primary-foreground/15 px-2.5 py-0.5 text-xs font-medium text-primary-foreground/90">
            {nextDose.timeRemaining}
          </span>
        </div>

        {/* Content & Action grid */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3
                id="next-dose-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              >
                {nextDose.medicine}
              </h3>
              <span className="rounded-xl bg-white/20 px-2.5 py-0.5 text-xs sm:text-sm font-bold text-primary-foreground backdrop-blur-xs">
                {nextDose.dosage}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-primary-foreground/90">
              {nextDose.instruction}
            </p>
            <div className="inline-flex items-center gap-1.5 pt-0.5 text-xs font-medium text-primary-foreground/85">
              <Clock aria-hidden="true" className="size-3.5" />
              <span>
                {logged ? "Logged for " : "Due at "}
                <strong className="underline underline-offset-2 decoration-white/40">
                  {nextDose.time}
                </strong>
              </span>
            </div>
          </div>

          <Button
            onClick={onLog}
            disabled={logged || loading}
            className="h-11 shrink-0 rounded-2xl bg-primary-foreground px-6 text-sm sm:text-base font-bold text-primary shadow-sm transition-all hover:bg-primary-foreground/90 active:scale-98 w-full sm:w-auto"
          >
            {logged ? (
              <>
                <Check className="size-4 mr-1.5" aria-hidden="true" /> Dose logged
              </>
            ) : (
              <>
                <Check className="size-4 mr-1.5" aria-hidden="true" /> {loading ? "Logging…" : "Log dose"}
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}