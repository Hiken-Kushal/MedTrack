import { ShieldAlert, ShieldCheck } from "lucide-react";
import type { InteractionWarning } from "@/lib/mock-data";

export function InteractionAlert({ warnings }: { warnings: InteractionWarning[] }) {
  if (warnings.length === 0) {
    return (
      <section
        aria-labelledby="interaction-heading"
        className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-success-soft text-success"
          >
            <ShieldCheck className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 id="interaction-heading" className="text-section-title text-foreground">
              You're all clear for now
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No interaction warnings were returned for your current medication list. This does not
              guarantee that a combination is safe — always check with a qualified healthcare
              professional.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const high = warnings.some((w) => w.severity === "high");

  return (
    <section
      aria-labelledby="interaction-heading"
      className={`rounded-3xl border p-6 shadow-[var(--shadow-card)] ${
        high
          ? "border-danger/30 bg-danger-soft"
          : "border-warning/40 bg-warning-soft"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground ${
            high ? "bg-danger" : "bg-warning"
          }`}
        >
          <ShieldAlert className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 id="interaction-heading" className="text-section-title font-bold text-foreground">
            Safety alert
          </h2>
          <p className={`mt-1 text-sm ${high ? "text-danger-foreground/80" : "text-warning-foreground/80"}`}>
            Review this warning and consult a qualified healthcare professional before making
            changes. Do not stop or change a dose on your own.
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {warnings.map((w) => (
          <li
            key={w.id}
            className={`rounded-2xl border bg-card p-4 ${
              high ? "border-danger/30" : "border-warning/30"
            }`}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
              <p className="min-w-0 truncate text-card-title font-semibold text-foreground">
                {w.medicines[0]} + {w.medicines[1]}
              </p>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
                  high
                    ? "border-danger/40 bg-danger-soft text-danger-foreground"
                    : "border-warning/40 bg-warning-soft text-warning-foreground"
                }`}
              >
                {w.severity} · flagged
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{w.summary}</p>
            <p className="mt-2 text-xs text-muted-foreground">Reported by {w.source}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}