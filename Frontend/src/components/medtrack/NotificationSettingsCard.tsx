import { useState } from "react";
import { Bell, Calendar, Pill, RefreshCw, Save, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/medtrack/SectionCard";
import type { PatientPreferences } from "@/lib/mock-data";

export function NotificationSettingsCard({
  preferences,
  onSave,
}: {
  preferences: PatientPreferences;
  onSave: (updated: PatientPreferences) => void;
}) {
  const [prefs, setPrefs] = useState<PatientPreferences>(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(prefs);
      setIsSaving(false);
    }, 250);
  };

  return (
    <SectionCard
      title="Notification Preferences"
      description="Manage individual alert categories and active push channels."
    >
      <div className="space-y-4 pt-1">
        {/* Medication Reminders */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary mt-0.5"
            >
              <Pill className="size-4" />
            </span>
            <div className="min-w-0">
              <Label className="text-xs font-bold text-foreground block cursor-pointer">
                Medication Dose Reminders
              </Label>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                Receive timing alerts for daily morning, afternoon, and evening doses.
              </p>
            </div>
          </div>

          <Switch
            checked={prefs.enableMedicationReminders}
            onCheckedChange={(checked) =>
              setPrefs((prev) => ({ ...prev, enableMedicationReminders: checked }))
            }
            aria-label="Toggle medication dose reminders"
          />
        </div>

        {/* Appointment Reminders */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground mt-0.5"
            >
              <Calendar className="size-4" />
            </span>
            <div className="min-w-0">
              <Label className="text-xs font-bold text-foreground block cursor-pointer">
                Appointment & Consultation Reminders
              </Label>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                Get notified 24 hours and 1 hour before scheduled doctor appointments.
              </p>
            </div>
          </div>

          <Switch
            checked={prefs.enableAppointmentReminders}
            onCheckedChange={(checked) =>
              setPrefs((prev) => ({ ...prev, enableAppointmentReminders: checked }))
            }
            aria-label="Toggle appointment reminders"
          />
        </div>

        {/* Refill Reminders */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-warning-soft text-warning-foreground mt-0.5"
            >
              <RefreshCw className="size-4" />
            </span>
            <div className="min-w-0">
              <Label className="text-xs font-bold text-foreground block cursor-pointer">
                Prescription Refill Alerts
              </Label>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                Alerts when your remaining pill count reaches the refill threshold.
              </p>
            </div>
          </div>

          <Switch
            checked={prefs.enableRefillReminders}
            onCheckedChange={(checked) =>
              setPrefs((prev) => ({ ...prev, enableRefillReminders: checked }))
            }
            aria-label="Toggle prescription refill alerts"
          />
        </div>

        {/* Interaction Safety Alerts */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-danger-soft text-danger mt-0.5"
            >
              <ShieldAlert className="size-4" />
            </span>
            <div className="min-w-0">
              <Label className="text-xs font-bold text-foreground block cursor-pointer">
                Safety & Interaction Warnings
              </Label>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                Instant alerts if new medications or OTC drugs present adverse combinations.
              </p>
            </div>
          </div>

          <Switch
            checked={prefs.enableInteractionAlerts}
            onCheckedChange={(checked) =>
              setPrefs((prev) => ({ ...prev, enableInteractionAlerts: checked }))
            }
            aria-label="Toggle interaction safety alerts"
          />
        </div>

        {/* Daily Adherence Summary Digest */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
          <div className="flex items-start gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-muted-foreground mt-0.5"
            >
              <Sparkles className="size-4 text-primary" />
            </span>
            <div className="min-w-0">
              <Label className="text-xs font-bold text-foreground block cursor-pointer">
                Daily Adherence Digest
              </Label>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                Evening progress summary and routine streak report at 9:30 PM.
              </p>
            </div>
          </div>

          <Switch
            checked={prefs.enableDailyAdherenceDigest}
            onCheckedChange={(checked) =>
              setPrefs((prev) => ({ ...prev, enableDailyAdherenceDigest: checked }))
            }
            aria-label="Toggle daily adherence digest"
          />
        </div>

        {/* Save */}
        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 h-9 px-4 shadow-2xs"
          >
            {isSaving ? (
              <span className="flex items-center gap-1.5">
                <span className="size-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save className="size-3.5" /> Save Notifications
              </span>
            )}
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}
