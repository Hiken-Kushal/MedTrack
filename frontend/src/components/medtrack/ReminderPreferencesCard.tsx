import { useState } from "react";
import { Bell, Clock, Pill, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionCard } from "@/components/medtrack/SectionCard";
import type { PatientPreferences } from "@/lib/mock-data";

export function ReminderPreferencesCard({
  preferences,
  onSave,
}: {
  preferences: PatientPreferences;
  onSave: (updated: PatientPreferences) => void;
}) {
  const [prefs, setPrefs] = useState<PatientPreferences>(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(prefs);
      setIsSaving(false);
    }, 250);
  };

  return (
    <SectionCard
      title="Medical & Reminder Preferences"
      description="Configure default timing windows and delivery methods for dosage alarms."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Preferred delivery channel */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-foreground">
            Preferred Notification Method
          </Label>
          <Select
            value={prefs.preferredReminderMethod}
            onValueChange={(val: any) =>
              setPrefs((prev) => ({ ...prev, preferredReminderMethod: val }))
            }
          >
            <SelectTrigger className="h-10 rounded-xl border-border bg-card text-xs font-medium">
              <SelectValue placeholder="Select delivery method" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="push">Push Notification (Mobile & Web)</SelectItem>
              <SelectItem value="sms">SMS Text Message</SelectItem>
              <SelectItem value="email">Email Summary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Morning & Evening Windows */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">
              Morning Reminder Time
            </Label>
            <Select
              value={prefs.morningReminderTime}
              onValueChange={(val) =>
                setPrefs((prev) => ({ ...prev, morningReminderTime: val }))
              }
            >
              <SelectTrigger className="h-10 rounded-xl border-border bg-card text-xs font-medium">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="07:00">7:00 AM</SelectItem>
                <SelectItem value="07:30">7:30 AM</SelectItem>
                <SelectItem value="08:00">8:00 AM (Default)</SelectItem>
                <SelectItem value="08:30">8:30 AM</SelectItem>
                <SelectItem value="09:00">9:00 AM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">
              Evening Reminder Time
            </Label>
            <Select
              value={prefs.eveningReminderTime}
              onValueChange={(val) =>
                setPrefs((prev) => ({ ...prev, eveningReminderTime: val }))
              }
            >
              <SelectTrigger className="h-10 rounded-xl border-border bg-card text-xs font-medium">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
                <SelectItem value="20:00">8:00 PM (Default)</SelectItem>
                <SelectItem value="20:30">8:30 PM</SelectItem>
                <SelectItem value="21:00">9:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Refill notice window */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-foreground">
            Advance Notice for Prescription Refills
          </Label>
          <Select
            value={String(prefs.advanceRefillDays)}
            onValueChange={(val) =>
              setPrefs((prev) => ({ ...prev, advanceRefillDays: Number(val) }))
            }
          >
            <SelectTrigger className="h-10 rounded-xl border-border bg-card text-xs font-medium">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="3">3 days before supply ends</SelectItem>
              <SelectItem value="7">7 days before supply ends (Recommended)</SelectItem>
              <SelectItem value="14">14 days before supply ends</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Save */}
        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 h-9 px-4 shadow-2xs"
          >
            {isSaving ? (
              <span className="flex items-center gap-1.5">
                <span className="size-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save className="size-3.5" /> Save Preferences
              </span>
            )}
          </Button>
        </div>
      </form>
    </SectionCard>
  );
}
