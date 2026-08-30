import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Info,
  Pill,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Stethoscope,
} from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { cn } from "@/lib/utils";
import type {
  DrugInteractionEvaluation,
  DrugInteractionSeverity,
} from "@/lib/mock-data";

const severityConfig: Record<
  DrugInteractionSeverity,
  { label: string; badgeClass: string; iconClass: string }
> = {
  none: {
    label: "No Interaction",
    badgeClass: "bg-success-soft text-success border-success/30",
    iconClass: "text-success",
  },
  low: {
    label: "Low Severity",
    badgeClass: "bg-primary-soft text-primary border-primary/30",
    iconClass: "text-primary",
  },
  moderate: {
    label: "Moderate Severity",
    badgeClass: "bg-warning-soft text-warning-foreground border-warning/40",
    iconClass: "text-warning",
  },
  high: {
    label: "High Severity · Caution",
    badgeClass: "bg-danger-soft text-danger border-danger/40",
    iconClass: "text-danger",
  },
};

export function InteractionResultCard({
  result,
  hasChecked,
  selectedMeds,
}: {
  result: DrugInteractionEvaluation | null;
  hasChecked: boolean;
  selectedMeds: string[];
}) {
  // 1. Initial Empty State (before user runs a check)
  if (!hasChecked || !result) {
    return (
      <SectionCard
        title="Interaction Analysis"
        description="Results and safety precautions will appear here."
        className="h-full flex flex-col justify-between"
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-2xl bg-surface-muted text-muted-foreground/70"
          >
            <ShieldQuestion className="size-8 text-primary" />
          </span>
          <h3 className="mt-4 text-base font-bold text-foreground">
            Select at least two medications
          </h3>
          <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
            Choose two or more medications in the checker on the left and click{" "}
            <strong className="text-foreground">"Check Interactions"</strong> to screen for potential drug-drug interactions.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-muted/40 p-3 text-center text-xs text-muted-foreground">
          Informational prototype. Precaution guidance is generated for demonstration.
        </div>
      </SectionCard>
    );
  }

  // 2. Clear / Safe State: No interaction found
  if (!result.hasInteraction) {
    return (
      <SectionCard
        title="Interaction Analysis"
        description={`Evaluated ${result.medicinesChecked.length} medications.`}
        className="h-full flex flex-col justify-between"
      >
        <div className="space-y-4 pt-1">
          <div className="rounded-2xl border border-success/30 bg-success-soft/40 p-5">
            <div className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-success text-primary-foreground shadow-sm"
              >
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  No potential interactions found
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  No documented adverse pharmacokinetic or pharmacodynamic interactions were found among the selected medications (
                  <span className="font-semibold text-foreground">
                    {result.medicinesChecked.join(", ")}
                  </span>
                  ) in our database.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <CheckCircle2 className="size-4 text-success" /> General Guidance
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Continue taking your medications according to your physician's prescribed schedule and instructions (e.g. with meals or water as specified).
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Evaluated at {result.evaluatedAt}</span>
          <span className="font-semibold text-success">Status: All Clear</span>
        </div>
      </SectionCard>
    );
  }

  // 3. Interactions Found (Moderate or High)
  const isHigh = result.maxSeverity === "high";

  return (
    <SectionCard
      title="Interaction Analysis"
      description={`Found ${result.pairs.length} potential interaction warning${result.pairs.length > 1 ? "s" : ""}.`}
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-4 pt-1">
        {/* Banner Alert */}
        <div
          className={cn(
            "rounded-2xl border p-4 sm:p-5",
            isHigh
              ? "border-danger/30 bg-danger-soft/60"
              : "border-warning/35 bg-warning-soft/60",
          )}
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-sm",
                isHigh ? "bg-danger" : "bg-warning",
              )}
            >
              <ShieldAlert className="size-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  {isHigh ? "High Severity Interaction" : "Moderate Interaction"}
                </h3>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
                    severityConfig[result.maxSeverity].badgeClass,
                  )}
                >
                  {severityConfig[result.maxSeverity].label}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {isHigh
                  ? "This combination carries significant clinical risks and may require urgent physician review or alternative therapy."
                  : "These medications may require dose spacing, lab monitoring, or caution when taken together."}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Pair List */}
        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
          {result.pairs.map((pair) => {
            const meta = severityConfig[pair.severity];
            return (
              <div
                key={pair.id}
                className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-foreground">
                    {pair.title}
                  </h4>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize shrink-0",
                      meta.badgeClass,
                    )}
                  >
                    {pair.severity}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pair.summary}
                </p>

                {/* Precaution Box */}
                <div className="rounded-xl bg-surface-muted p-3 border border-border space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Stethoscope className="size-3.5 text-primary" /> Recommended Precaution
                  </div>
                  <p className="text-xs font-medium text-foreground/90 leading-relaxed">
                    {pair.precaution}
                  </p>
                </div>

                {pair.additionalInfo && (
                  <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                    <Info className="size-3 text-primary shrink-0 mt-0.5" />
                    <span>{pair.additionalInfo}</span>
                  </p>
                )}

                <div className="pt-1 text-[10px] text-muted-foreground">
                  Source: {pair.clinicalSource}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Evaluated at {result.evaluatedAt}</span>
        <span className="font-semibold text-warning-foreground">
          Consult physician before making changes
        </span>
      </div>
    </SectionCard>
  );
}
