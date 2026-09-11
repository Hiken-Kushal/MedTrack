import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Filter,
  History,
  Pill,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

import { AppShell } from "@/components/medtrack/AppShell";
import { HistoryOverviewCards } from "@/components/medtrack/HistoryOverviewCards";
import { HistoryEntryCard } from "@/components/medtrack/HistoryEntryCard";
import { HistoryDetailsModal } from "@/components/medtrack/HistoryDetailsModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  detailedMedicationHistoryList,
  type DetailedHistoryEntry,
  type HistoryFilterStatus,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const title = "Medication History — MedTrack";
const description =
  "Review your medication activity, doses, and treatment history with MedTrack.";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MedicationHistoryPage,
});

const statusFilterOptions: { id: HistoryFilterStatus; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "taken", label: "Taken" },
  { id: "missed", label: "Missed" },
  { id: "delayed", label: "Delayed" },
  { id: "skipped", label: "Skipped" },
];

const medicationOptions = [
  "All Medications",
  "Metformin",
  "Amlodipine",
  "Atorvastatin",
  "Vitamin D3",
];

export function MedicationHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<HistoryFilterStatus>("all");
  const [selectedMedication, setSelectedMedication] = useState("All Medications");
  const [selectedEntry, setSelectedEntry] = useState<DetailedHistoryEntry | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return detailedMedicationHistoryList.filter((item) => {
      // Status filter
      if (selectedStatus !== "all") {
        if (selectedStatus === "skipped") {
          if (item.status !== "skipped") return false;
        } else if (item.status !== selectedStatus) {
          return false;
        }
      }

      // Medication filter
      if (
        selectedMedication !== "All Medications" &&
        item.medicine.toLowerCase() !== selectedMedication.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (query) {
        const matchesMed = item.medicine.toLowerCase().includes(query);
        const matchesGeneric = item.genericName.toLowerCase().includes(query);
        const matchesDoctor = item.doctorName.toLowerCase().includes(query);
        const matchesCondition = item.condition.toLowerCase().includes(query);
        const matchesDate = item.dateDisplay.toLowerCase().includes(query);
        const matchesNote = item.notes?.toLowerCase().includes(query) ?? false;

        if (
          !matchesMed &&
          !matchesGeneric &&
          !matchesDoctor &&
          !matchesCondition &&
          !matchesDate &&
          !matchesNote
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedStatus, selectedMedication]);

  // Group entries by date
  const groupedEntries = useMemo(() => {
    const groups: { dateGroupTitle: string; items: DetailedHistoryEntry[] }[] = [];

    for (const entry of filteredEntries) {
      let group = groups.find((g) => g.dateGroupTitle === entry.dateGroupTitle);
      if (!group) {
        group = { dateGroupTitle: entry.dateGroupTitle, items: [] };
        groups.push(group);
      }
      group.items.push(entry);
    }

    return groups;
  }, [filteredEntries]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("all");
    setSelectedMedication("All Medications");
  };

  const handleViewDetails = (entry: DetailedHistoryEntry) => {
    setSelectedEntry(entry);
    setDetailsModalOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Page Header */}
        <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">Medication History</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review your medication activity, doses, and treatment history.
            </p>
          </div>
        </header>

        {/* 2. Overview Stat Cards */}
        <HistoryOverviewCards />

        {/* 3. Search and Filter Bar */}
        <section
          aria-label="Filter medication history"
          className="rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-[var(--shadow-card)] space-y-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history by medicine, doctor, condition, or date..."
                className="h-11 rounded-2xl border-border bg-surface-muted/60 pl-10 pr-9 text-xs sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Medication Filter Dropdown */}
            <div className="w-full md:w-56">
              <Select
                value={selectedMedication}
                onValueChange={setSelectedMedication}
              >
                <SelectTrigger
                  aria-label="Filter by medication"
                  className="h-11 rounded-2xl border-border bg-card text-xs font-semibold"
                >
                  <SelectValue placeholder="All Medications" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {medicationOptions.map((med) => (
                    <SelectItem key={med} value={med} className="rounded-xl text-xs py-2">
                      {med}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist">
              {statusFilterOptions.map((opt) => {
                const active = selectedStatus === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedStatus(opt.id)}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-xs font-semibold transition-all",
                      active
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "bg-surface-muted text-muted-foreground hover:bg-surface-muted/90 hover:text-foreground",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {(searchQuery ||
              selectedStatus !== "all" ||
              selectedMedication !== "All Medications") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-7 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="mr-1 size-3" /> Reset Filters
              </Button>
            )}
          </div>
        </section>

        {/* 4. Chronological Grouped History List */}
        <div className="space-y-6">
          {groupedEntries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-card)]">
              <span
                aria-hidden="true"
                className="mx-auto grid size-12 place-items-center rounded-2xl bg-surface-muted text-muted-foreground"
              >
                <History className="size-6" />
              </span>
              <h3 className="mt-3 text-base font-bold text-foreground">
                No medication history found
              </h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
                {searchQuery || selectedStatus !== "all" || selectedMedication !== "All Medications"
                  ? "No activity entries matched your current search or filter criteria. Try resetting filters."
                  : "You have no recorded medication logs."}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="mt-4 rounded-xl text-xs font-semibold"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            groupedEntries.map((group) => (
              <section
                key={group.dateGroupTitle}
                aria-label={group.dateGroupTitle}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 px-1">
                  <Calendar className="size-4 text-primary" aria-hidden="true" />
                  <h2 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">
                    {group.dateGroupTitle}
                  </h2>
                  <span className="text-xs text-muted-foreground font-normal">
                    ({group.items.length} {group.items.length === 1 ? "dose" : "doses"})
                  </span>
                </div>

                <div className="space-y-2.5">
                  {group.items.map((entry) => (
                    <HistoryEntryCard
                      key={entry.id}
                      entry={entry}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {/* 5. History Details Modal */}
        <HistoryDetailsModal
          entry={selectedEntry}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
        />

        {/* 6. Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack chronological history compiles your logged dose events and prescribers for personal health tracking.
          It is not an official medical record and should be corroborated with your care team. Demo data shown.
        </p>
      </div>
    </AppShell>
  );
}
