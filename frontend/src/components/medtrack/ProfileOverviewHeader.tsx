import {
  Calendar,
  Droplet,
  Edit3,
  Fingerprint,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PatientProfile } from "@/lib/mock-data";

export function ProfileOverviewHeader({
  profile,
  onEditClick,
}: {
  profile: PatientProfile;
  onEditClick: () => void;
}) {
  return (
    <section
      aria-label="Patient profile summary"
      className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] transition-all"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Avatar & Personal Info */}
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <span
              aria-hidden="true"
              className="grid size-16 sm:size-20 place-items-center rounded-3xl bg-primary text-2xl sm:text-3xl font-extrabold text-primary-foreground shadow-md"
            >
              {profile.initials}
            </span>
            <span
              title="Verified Patient Account"
              className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-success text-primary-foreground ring-2 ring-card shadow-xs"
            >
              <ShieldCheck className="size-3.5" />
            </span>
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground truncate">
                {profile.fullName}
              </h2>
              <span className="rounded-full border border-primary/30 bg-primary-soft px-2.5 py-0.5 text-[11px] font-bold text-primary">
                {profile.accountType}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Fingerprint className="size-3.5 text-primary" /> ID: {profile.id}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="size-3.5 text-primary" /> {profile.email}
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <Phone className="size-3.5 text-primary" /> {profile.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick action button */}
        <div className="shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditClick}
            className="rounded-2xl border-border text-xs font-semibold h-9 px-3.5 hover:bg-surface-muted"
          >
            <Edit3 className="mr-1.5 size-3.5 text-primary" /> Edit Personal Info
          </Button>
        </div>
      </div>

      {/* Metric / Clinical telemetry badges strip */}
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 border-t border-border pt-4 text-xs">
        <div className="rounded-2xl bg-surface-muted/60 p-3 border border-border/50">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Blood Group
          </span>
          <span className="mt-1 flex items-center gap-1.5 font-bold text-foreground">
            <Droplet className="size-3.5 text-danger" />
            {profile.bloodGroup}
          </span>
        </div>

        <div className="rounded-2xl bg-surface-muted/60 p-3 border border-border/50">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Primary Physician
          </span>
          <span className="mt-1 flex items-center gap-1.5 font-bold text-foreground truncate">
            <Stethoscope className="size-3.5 text-primary" />
            {profile.primaryPhysician}
          </span>
        </div>

        <div className="rounded-2xl bg-surface-muted/60 p-3 border border-border/50">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Active Prescriptions
          </span>
          <span className="mt-1 flex items-center gap-1.5 font-bold text-foreground">
            <Pill className="size-3.5 text-primary" />
            4 Active Regimens
          </span>
        </div>

        <div className="rounded-2xl bg-surface-muted/60 p-3 border border-border/50">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Member Since
          </span>
          <span className="mt-1 flex items-center gap-1.5 font-bold text-foreground">
            <Calendar className="size-3.5 text-primary" />
            {profile.memberSince}
          </span>
        </div>
      </div>
    </section>
  );
}
