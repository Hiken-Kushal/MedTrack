import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  Pill,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/medtrack/SectionCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectableMedicationsList } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function InteractionCheckerCard({
  selectedMeds,
  onAddMed,
  onRemoveMed,
  onClearAll,
  onAddPrescribed,
  onCheck,
  isLoading,
}: {
  selectedMeds: string[];
  onAddMed: (name: string) => void;
  onRemoveMed: (name: string) => void;
  onClearAll: () => void;
  onAddPrescribed: () => void;
  onCheck: () => void;
  isLoading: boolean;
}) {
  const [selectValue, setSelectValue] = useState<string>("");

  // Available medications that haven't been selected yet
  const availableToAdd = selectableMedicationsList.filter(
    (med) => !selectedMeds.includes(med.name),
  );

  const handleSelect = (val: string) => {
    if (!val) return;
    onAddMed(val);
    setSelectValue("");
  };

  const canCheck = selectedMeds.length >= 2;

  return (
    <SectionCard
      title="Check Medication Combinations"
      description="Select two or more medications to analyze potential pharmacokinetic or clinical interactions."
      className="h-full flex flex-col justify-between"
      action={
        selectedMeds.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="mr-1 size-3" /> Clear
          </Button>
        )
      }
    >
      <div className="space-y-4 pt-1">
        {/* Quick fill preset button */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-surface-muted/60 p-3 border border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span className="text-xs text-foreground font-medium">
              Want to check your active prescribed regimen?
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddPrescribed}
            className="rounded-xl text-xs font-semibold h-7 border-border hover:bg-card"
          >
            + Add 3 Active Prescriptions
          </Button>
        </div>

        {/* Medication Selector Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="med-selector"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground block"
          >
            Select Medication to Add
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Select value={selectValue} onValueChange={handleSelect}>
                <SelectTrigger
                  id="med-selector"
                  className="w-full rounded-2xl border-border bg-card text-xs font-medium h-11"
                >
                  <SelectValue placeholder="Search or choose a medication..." />
                </SelectTrigger>
                <SelectContent className="rounded-2xl max-h-64">
                  {availableToAdd.length === 0 ? (
                    <div className="p-3 text-center text-xs text-muted-foreground">
                      All available mock medications are selected.
                    </div>
                  ) : (
                    availableToAdd.map((med) => (
                      <SelectItem
                        key={med.id}
                        value={med.name}
                        className="rounded-xl text-xs py-2"
                      >
                        <div className="flex items-center justify-between gap-2 w-full">
                          <span className="font-semibold text-foreground">
                            {med.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {med.category}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Selected Medications Chip Container */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground">
              Selected Medications ({selectedMeds.length})
            </span>
            <span
              className={cn(
                "text-[11px] font-semibold",
                canCheck ? "text-success" : "text-muted-foreground",
              )}
            >
              {selectedMeds.length < 2
                ? `Add ${2 - selectedMeds.length} more to check`
                : "Ready to analyze"}
            </span>
          </div>

          {selectedMeds.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface-muted/30 p-6 text-center">
              <Pill className="mx-auto size-6 text-muted-foreground opacity-50" />
              <p className="mt-2 text-xs font-medium text-muted-foreground">
                No medications selected yet. Use the dropdown above or click "+ Add 3 Active Prescriptions".
              </p>
            </div>
          ) : (
            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Selected medications">
              {selectedMeds.map((medName) => {
                const details = selectableMedicationsList.find((m) => m.name === medName);
                return (
                  <li
                    key={medName}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 shadow-2xs transition-all hover:border-border-strong"
                  >
                    <span className="grid size-5 place-items-center rounded-md bg-primary-soft text-primary">
                      <Pill className="size-3" />
                    </span>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-foreground">
                        {medName}
                      </span>
                      {details && (
                        <span className="block text-[10px] text-muted-foreground">
                          {details.commonlyUsedFor}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveMed(medName)}
                      aria-label={`Remove ${medName}`}
                      className="ml-1 grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-surface-muted hover:text-foreground transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          type="button"
          disabled={!canCheck || isLoading}
          onClick={onCheck}
          className="w-full rounded-2xl bg-primary text-primary-foreground font-bold h-11 hover:bg-primary/90 transition-all shadow-sm"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Analyzing Combinations...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ShieldAlert className="size-4" />
              Check Interactions ({selectedMeds.length} Meds)
            </span>
          )}
        </Button>
      </div>
    </SectionCard>
  );
}
