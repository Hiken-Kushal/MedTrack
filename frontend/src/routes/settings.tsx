import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/medtrack/AppShell";
import { ProfileOverviewHeader } from "@/components/medtrack/ProfileOverviewHeader";
import { PersonalInfoForm } from "@/components/medtrack/PersonalInfoForm";
import { ReminderPreferencesCard } from "@/components/medtrack/ReminderPreferencesCard";
import { NotificationSettingsCard } from "@/components/medtrack/NotificationSettingsCard";
import { SecurityAndAccountCard } from "@/components/medtrack/SecurityAndAccountCard";
import {
  defaultPatientProfile,
  defaultPatientPreferences,
  type PatientProfile,
  type PatientPreferences,
} from "@/lib/mock-data";

const title = "Profile & Settings — MedTrack";
const description =
  "Manage your profile, preferences, and account settings with MedTrack.";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SettingsPage,
});

export function SettingsPage() {
  const [profile, setProfile] = useState<PatientProfile>(defaultPatientProfile);
  const [preferences, setPreferences] = useState<PatientPreferences>(defaultPatientPreferences);

  const handleSaveProfile = (updated: PatientProfile) => {
    setProfile(updated);
    toast.success("Profile Updated", {
      description: "Personal details and contact information have been saved.",
    });
  };

  const handleSavePreferences = (updated: PatientPreferences) => {
    setPreferences(updated);
    toast.success("Reminder Preferences Saved", {
      description: "Default dosage windows and delivery methods updated.",
    });
  };

  const handleSaveNotifications = (updated: PatientPreferences) => {
    setPreferences(updated);
    toast.success("Notification Settings Saved", {
      description: "Alert preferences have been updated successfully.",
    });
  };

  const handleScrollToForm = () => {
    const el = document.getElementById("personal-info-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* 1. Page Header */}
        <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-page-title text-foreground sm:text-3xl">Profile & Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your profile, preferences, and account settings.
            </p>
          </div>
        </header>

        {/* 2. Profile Overview Header */}
        <ProfileOverviewHeader
          profile={profile}
          onEditClick={handleScrollToForm}
        />

        {/* 3. Settings Two-Column Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
          {/* Left Column: Personal Info & Medical Preferences */}
          <div className="space-y-6">
            <PersonalInfoForm
              profile={profile}
              onSave={handleSaveProfile}
            />

            <ReminderPreferencesCard
              preferences={preferences}
              onSave={handleSavePreferences}
            />
          </div>

          {/* Right Column: Notification Preferences & Security */}
          <div className="space-y-6">
            <NotificationSettingsCard
              preferences={preferences}
              onSave={handleSaveNotifications}
            />

            <SecurityAndAccountCard />
          </div>
        </div>

        {/* 4. Footer Disclaimer */}
        <p className="pb-2 text-xs leading-relaxed text-muted-foreground">
          MedTrack settings and profile configurations are stored locally for demonstration purposes.
          Changes made here do not alter official hospital medical charts.
        </p>
      </div>
    </AppShell>
  );
}
