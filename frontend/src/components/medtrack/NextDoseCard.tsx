import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nextDose } from "@/lib/mock-data";

export function NextDoseCard({
  logged,
  onLog,
  loading = false,
}: {
  logged: boolean;
  onLog: () => void;
  loading?: boolean;
}) {
  return (
    <section
      aria-labelledby="next-dose-heading"
      className="relative overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground shadow-[0_20px_40px_-16px_oklch(0.52_0.09_195_/0.5)] sm:p-8"
    >
      {/* Decorative blurs */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-16 size-64 rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground/90">
            <Clock aria-hidden="true" className="size-3.5" />
            {logged ? "Dose recorded" : "Next scheduled dose"}
          </span>
          <h2
            id="next-dose-heading"
            className="mt-4 truncate text-4xl font-bold tracking-tight"
          >
            {nextDose.medicine}
          </h2>
          <p className="mt-2 text-lg text-primary-foreground/90">
            {nextDose.dosage} · {nextDose.instruction}
          </p>
          <p className="mt-6 flex items-center gap-2 text-xl font-medium">
            <Clock aria-hidden="true" className="size-5 opacity-90" />
            {logged ? "Logged for " : "Due at "}
            {nextDose.time}
          </p>
        </div>

        <Button
          onClick={onLog}
          disabled={logged || loading}
          className="h-auto min-h-12 w-full shrink-0 rounded-2xl bg-primary-foreground px-8 py-4 text-lg font-bold text-primary shadow-lg transition-transform hover:bg-primary-foreground/90 active:scale-95 md:w-auto"
        >
          {logged ? (
            <>
              <Check aria-hidden="true" /> Dose logged
            </>
          ) : (
            <>
              <Check aria-hidden="true" /> {loading ? "Logging…" : "Log dose"}
            </>
          )}
        </Button>
      </div>
    </section>
  );
}