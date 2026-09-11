import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  Filter,
  History,
  Package,
  Pill,
  Plus,
  RotateCcw,
  Search,
  TrendingUp,
} from "lucide-react";

import { AppShell } from "@/components/medtrack/AppShell";
import { MedicationCard } from "@/components/medtrack/MedicationCard";
import { MedicationDetailsModal } from "@/components/medtrack/MedicationDetailsModal";
import { AddMedicationModal } from "@/components/medtrack/AddMedicationModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialMedicationsList, type MedicationItem, type MedicationStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const title = "My Medications — MedTrack";
const description =
  "Manage your current medications and keep track of your treatment. MedTrack provides informational medication tracking.";

export const Route = createFileRoute("/medications")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MedicationsPage,
});

type FilterOption = "all" | MedicationStatus;

export function MedicationsPage() {
  const [medications, setMedications] = useState<MedicationItem[]>(initialMedicationsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");
  const [selectedMed, setSelectedMed] = useState<MedicationItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Compute metrics dynamically from state
  const metrics = useMemo(() => {
    const total = medications.length;
    const active = medications.filter((m) => m.status === "active").length;
    const refillsDue = medications.filter(
      (m) => m.status === "refill_due" || (m.status === "active" && m.refillInfo.daysLeft <= 4),
    ).length;
    const dueToday = medications.filter(
      (m) => m.status === "active" || m.status === "refill_due",
    ).length;

    return { total, active, refillsDue, dueToday };
  }, [medications]);

  // Filter and search medications
  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || med.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [medications, searchQuery, selectedFilter]);

  const handleLogDose = (med: MedicationItem) => {
    toast.success("Dose logged successfully", {
      description: `${med.name} ${med.dosage} recorded at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`,
    });
  };

  const handleViewDetails = (med: MedicationItem) => {
    setSelectedMed(med);
    setDetailsOpen(true);
  };

  const handleEdit = (med: MedicationItem) => {
    toast.info(`Edit medication: ${med.name}`, {
      description: "Medication edit mode is ready in the management prototype.",
    });
  };

  const handleAddMedication = (newMed: MedicationItem) => {
    setMedications((prev) => [newMed, ...prev]);
    toast.success("Medication added", {
      description: `${newMed.name} (${newMed.dosage}) has been added to your prescription list.`,
    });
  };

  const filterOptions: { id: FilterOption; label: string; count: number }[] = [
    { id: "all", label: "All", count: medications.length },
    {
      id: "active",
      label: "Active",
      count: medications.filter((m) => m.status === "active").length,
    },
    {
      id: "refill_due",
      label: "Refill Due",
      count: medications.filter((m) => m.status === "refill_due").length,
    },
    {
      id: "paused",
      label: "Paused",
      count: medications.filter((m) => m.status === "paused").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: medications.filter((m) => m.status === "completed").length,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Page Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">My Medications</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your current medications and keep track of your treatment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              asChild
              variant="outline"
              className="inline-flex items-center gap-2 rounded-2xl border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:bg-surface-muted hover:border-border-strong"
            >
              <Link to="/history">
                <History className="size-4 text-primary" aria-hidden="true" />
                <span>Medication History</span>
              </Link>
            </Button>
            <Button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 font-bold text-primary-foreground shadow-sm transition-transform hover:bg-primary/90 active:scale-98"
            >
              <Plus className="size-4" aria-hidden="true" />
              <span>Add Medication</span>
            </Button>
          </div>
        </header>

        {/* 2. Medication Summary Metrics */}
        <section aria-label="Medications summary">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <li className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Total meds
              </p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                <Pill aria-hidden="true" className="size-5 shrink-0 text-primary" />
                {metrics.total}
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Active meds
              </p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-success" />
                {metrics.active}
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Due today
              </p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                <Package aria-hidden="true" className="size-5 shrink-0 text-primary" />
                {metrics.dueToday}
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Refills due
              </p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                <TrendingUp aria-hidden="true" className="size-5 shrink-0 text-warning" />
                {metrics.refillsDue}
              </p>
            </li>
          </ul>
        </section>

        {/* 3. Search and Filter Bar */}
        <section
          aria-label="Filter medications"
          className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Search box */}
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              aria-label="Search medications"
              placeholder="Search by medicine, condition, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-border bg-surface pl-10 text-xs sm:text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {filterOptions.map((opt) => {
              const active = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFilter(opt.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-surface-muted text-muted-foreground hover:bg-surface-muted/80 hover:text-foreground",
                  )}
                >
                  <span>{opt.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px]",
                      active
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-border text-muted-foreground",
                    )}
                  >
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Medication List / Grid */}
        <section aria-label="Medication items">
          {filteredMedications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-4 py-16 text-center shadow-[var(--shadow-card)]">
              <span
                aria-hidden="true"
                className="grid size-14 place-items-center rounded-2xl bg-surface-muted text-muted-foreground"
              >
                <Pill className="size-7" />
              </span>
              <h2 className="mt-4 text-base font-bold text-foreground sm:text-lg">
                No medications found
              </h2>
              <p className="mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
                {searchQuery || selectedFilter !== "all"
                  ? "No medications match your current search query or active filter."
                  : "You haven't added any medications yet."}
              </p>
              {(searchQuery || selectedFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="mt-4 rounded-xl text-xs font-semibold"
                >
                  <RotateCcw className="mr-1.5 size-3.5" /> Reset search & filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredMedications.map((med) => (
                <MedicationCard
                  key={med.id}
                  medication={med}
                  onViewDetails={handleViewDetails}
                  onLogDose={handleLogDose}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Modals */}
        <MedicationDetailsModal
          medication={selectedMed}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onLogDose={handleLogDose}
        />

        <AddMedicationModal
          open={addModalOpen}
          onOpenChange={setAddModalOpen}
          onAddMedication={handleAddMedication}
        />

        {/* 6. Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack organizes medication information and surfaces safety warnings reported by its
          interaction checker. It does not diagnose conditions, prescribe or change medication, or
          replace advice from a qualified healthcare professional. Demo data shown.
        </p>
      </div>
    </AppShell>
  );
}
