import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/medtrack/AppShell";
import { InteractionCheckerCard } from "@/components/medtrack/InteractionCheckerCard";
import { InteractionResultCard } from "@/components/medtrack/InteractionResultCard";
import { RecentInteractionChecks } from "@/components/medtrack/RecentInteractionChecks";
import { InteractionSafetyNotice } from "@/components/medtrack/InteractionSafetyNotice";
import {
  checkMockDrugInteractions,
  recentInteractionChecksList,
  type DrugInteractionEvaluation,
} from "@/lib/mock-data";

const title = "Drug Interactions — MedTrack";
const description =
  "Check your medications for potential interactions and understand important precautions with MedTrack.";

export const Route = createFileRoute("/interactions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: InteractionsPage,
});

export function InteractionsPage() {
  // Start with empty or popular test pair
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [result, setResult] = useState<DrugInteractionEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMed = (name: string) => {
    if (selectedMeds.includes(name)) return;
    setSelectedMeds((prev) => [...prev, name]);
  };

  const handleRemoveMed = (name: string) => {
    const updated = selectedMeds.filter((m) => m !== name);
    setSelectedMeds(updated);
    if (updated.length < 2) {
      setHasChecked(false);
      setResult(null);
    }
  };

  const handleClearAll = () => {
    setSelectedMeds([]);
    setHasChecked(false);
    setResult(null);
  };

  const handleAddPrescribed = () => {
    const prescribed = ["Metformin", "Amlodipine", "Atorvastatin"];
    setSelectedMeds(prescribed);
    toast.info("Added 3 Active Prescriptions", {
      description: "Metformin, Amlodipine, and Atorvastatin loaded into the checker.",
    });
  };

  const runEvaluation = (meds: string[]) => {
    if (meds.length < 2) {
      toast.error("Select at least 2 medications", {
        description: "Drug interaction analysis requires two or more medications.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const evalResult = checkMockDrugInteractions(meds);
      setResult(evalResult);
      setHasChecked(true);
      setIsLoading(false);

      if (evalResult.hasInteraction) {
        if (evalResult.maxSeverity === "high") {
          toast.error("High Interaction Alert", {
            description: `Found ${evalResult.pairs.length} high-risk medication interaction(s).`,
          });
        } else {
          toast.warning("Interaction Warning", {
            description: `Found ${evalResult.pairs.length} potential interaction(s) to review.`,
          });
        }
      } else {
        toast.success("No Interactions Found", {
          description: "No known adverse interactions detected for this combination.",
        });
      }
    }, 350);
  };

  const handleSelectRecentPair = (pair: string[]) => {
    setSelectedMeds(pair);
    runEvaluation(pair);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Page Header */}
        <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">Drug Interactions</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Check your medications for potential interactions and understand important precautions.
            </p>
          </div>
        </header>

        {/* 2. Primary Checker & Results Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
          <InteractionCheckerCard
            selectedMeds={selectedMeds}
            onAddMed={handleAddMed}
            onRemoveMed={handleRemoveMed}
            onClearAll={handleClearAll}
            onAddPrescribed={handleAddPrescribed}
            onCheck={() => runEvaluation(selectedMeds)}
            isLoading={isLoading}
          />

          <InteractionResultCard
            result={result}
            hasChecked={hasChecked}
            selectedMeds={selectedMeds}
          />
        </div>

        {/* 3. Secondary Row: Recent Checks + Safety Guidelines */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentInteractionChecks
            checks={recentInteractionChecksList}
            onSelectPair={handleSelectRecentPair}
          />

          <InteractionSafetyNotice />
        </div>

        {/* 4. Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack interaction checker is an educational prototype tool. It does not replace professional
          medical advice, diagnosis, or clinical pharmacology evaluations. Always consult a qualified healthcare provider.
        </p>
      </div>
    </AppShell>
  );
}
