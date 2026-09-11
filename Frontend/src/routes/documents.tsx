import { createFileRoute } from "@tanstack/react-router";
import { FileText, Upload } from "lucide-react";
import { AppShell } from "@/components/medtrack/AppShell";
import { SectionCard } from "@/components/medtrack/SectionCard";
import { Button } from "@/components/ui/button";

const title = "My Documents — MedTrack";
const description = "View and manage your prescriptions, medical reports, and clinical documents.";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: DocumentsPage,
});

export function DocumentsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">My Documents</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Prescription records, lab diagnostics, and clinical discharge summaries.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="inline-flex items-center gap-2 rounded-2xl border-border text-xs font-semibold opacity-70"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            <span>Upload Document</span>
          </Button>
        </header>

        {/* Placeholder List Card */}
        <SectionCard
          title="Prescriptions & Medical Records"
          description="Archived medical documentation and doctor notes."
        >
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-2xl bg-surface-muted text-muted-foreground"
            >
              <FileText className="size-7 text-primary" />
            </span>
            <h2 className="mt-4 text-base font-bold text-foreground sm:text-lg">
              No documents stored yet
            </h2>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
              Your uploaded prescriptions, lab reports, and doctor discharge summaries will be
              accessible here.
            </p>
          </div>
        </SectionCard>

        {/* Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack organizes health documents and medication information for informational support.
          It does not provide diagnosis or replace consultation with a qualified medical professional.
        </p>
      </div>
    </AppShell>
  );
}
