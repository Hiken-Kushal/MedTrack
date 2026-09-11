import { AlertCircle, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { SectionCard } from "@/components/medtrack/SectionCard";

export function InteractionSafetyNotice() {
  return (
    <SectionCard
      title="Safety & Clinical Guidelines"
      description="Important information regarding drug interaction evaluations."
    >
      <div className="space-y-3.5 pt-1 text-xs text-muted-foreground leading-relaxed">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted/50 p-3.5">
          <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-foreground block mb-0.5">
              Informational Demonstration Tool
            </span>
            <span>
              This tool provides educational interaction warnings based on common clinical pharmacology rules. It does not replace individualized clinical judgment.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted/50 p-3.5">
          <Stethoscope className="size-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-foreground block mb-0.5">
              Do Not Alter Doses Independently
            </span>
            <span>
              Never discontinue, split, or alter the schedule of your prescribed medications without explicit guidance from your prescribing doctor.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted/50 p-3.5">
          <AlertCircle className="size-4 text-warning shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-foreground block mb-0.5">
              Include Over-the-Counter Drugs & Supplements
            </span>
            <span>
              Always inform your healthcare team about non-prescription vitamins, NSAID painkillers, herbal remedies, and dietary supplements you consume.
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
