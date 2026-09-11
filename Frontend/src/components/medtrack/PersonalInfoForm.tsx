import { useState, useId } from "react";
import { Check, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionCard } from "@/components/medtrack/SectionCard";
import type { PatientProfile } from "@/lib/mock-data";

export function PersonalInfoForm({
  profile,
  onSave,
}: {
  profile: PatientProfile;
  onSave: (updated: PatientProfile) => void;
}) {
  const [formData, setFormData] = useState<PatientProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const dobId = useId();
  const addressId = useId();
  const emNameId = useId();
  const emPhoneId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 300);
  };

  return (
    <SectionCard
      title="Personal Information"
      description="Update your contact details, emergency contacts, and personal information."
    >
      <form id="personal-info-form" onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Name and Email Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor={nameId} className="text-xs font-bold text-foreground">
              Full Legal Name
            </Label>
            <Input
              id={nameId}
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              required
              className="h-10 rounded-xl border-border bg-card text-xs font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={emailId} className="text-xs font-bold text-foreground">
              Email Address
            </Label>
            <Input
              id={emailId}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="h-10 rounded-xl border-border bg-card text-xs font-medium"
            />
          </div>
        </div>

        {/* Phone, DOB, Gender Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor={phoneId} className="text-xs font-bold text-foreground">
              Primary Phone Number
            </Label>
            <Input
              id={phoneId}
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
              className="h-10 rounded-xl border-border bg-card text-xs font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={dobId} className="text-xs font-bold text-foreground">
              Date of Birth
            </Label>
            <Input
              id={dobId}
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dob: e.target.value }))
              }
              required
              className="h-10 rounded-xl border-border bg-card text-xs font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">
              Gender
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(val: any) =>
                setFormData((prev) => ({ ...prev, gender: val }))
              }
            >
              <SelectTrigger className="h-10 rounded-xl border-border bg-card text-xs font-medium">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <Label htmlFor={addressId} className="text-xs font-bold text-foreground">
            Residential Address
          </Label>
          <Input
            id={addressId}
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            className="h-10 rounded-xl border-border bg-card text-xs font-medium"
          />
        </div>

        {/* Emergency Contact */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-1 border-t border-border">
          <div className="space-y-1.5">
            <Label htmlFor={emNameId} className="text-xs font-bold text-foreground">
              Emergency Contact Name
            </Label>
            <Input
              id={emNameId}
              type="text"
              value={formData.emergencyContactName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emergencyContactName: e.target.value,
                }))
              }
              className="h-10 rounded-xl border-border bg-card text-xs font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={emPhoneId} className="text-xs font-bold text-foreground">
              Emergency Contact Phone
            </Label>
            <Input
              id={emPhoneId}
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emergencyContactPhone: e.target.value,
                }))
              }
              className="h-10 rounded-xl border-border bg-card text-xs font-medium"
            />
          </div>
        </div>

        {/* Form Action */}
        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 h-9 px-4 shadow-2xs"
          >
            {isSaving ? (
              <span className="flex items-center gap-1.5">
                <span className="size-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Saving Changes...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save className="size-3.5" /> Save Personal Information
              </span>
            )}
          </Button>
        </div>
      </form>
    </SectionCard>
  );
}
