import { useState } from "react";
import { Plus, Pill } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { MedicationItem } from "@/lib/mock-data";

export function AddMedicationModal({
  open,
  onOpenChange,
  onAddMedication,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMedication: (newMed: MedicationItem) => void;
}) {
  const [name, setName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [dosage, setDosage] = useState("");
  const [form, setForm] = useState<MedicationItem["form"]>("Tablet");
  const [frequency, setFrequency] = useState("Once daily");
  const [timing, setTiming] = useState("");
  const [condition, setCondition] = useState("");
  const [prescribedBy, setPrescribedBy] = useState("");
  const [instructions, setInstructions] = useState("");
  const [totalPills, setTotalPills] = useState("30");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dosage.trim()) return;

    const count = parseInt(totalPills, 10) || 30;
    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      genericName: genericName.trim() || name.trim(),
      dosage: dosage.trim(),
      form,
      frequency,
      timing: timing.trim() || "As directed by physician",
      condition: condition.trim() || "General health",
      prescribedBy: prescribedBy.trim() || "Dr. Sharma",
      nextDose: "Today, 8:00 PM",
      status: "active",
      refillInfo: {
        pillsRemaining: count,
        totalPills: count,
        daysLeft: Math.round(count / (frequency.toLowerCase().includes("twice") ? 2 : 1)),
      },
      instructions: instructions.trim() || "Take as prescribed with water.",
      startDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    onAddMedication(newMed);
    onOpenChange(false);

    // Reset form
    setName("");
    setGenericName("");
    setDosage("");
    setForm("Tablet");
    setFrequency("Once daily");
    setTiming("");
    setCondition("");
    setPrescribedBy("");
    setInstructions("");
    setTotalPills("30");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-left">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary"
              >
                <Pill className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  Add New Medication
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Enter your prescription details to start tracking this medicine.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-5 space-y-4 text-xs sm:text-sm">
            {/* Name and Dosage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="med-name" className="text-xs font-semibold">
                  Medication Name *
                </Label>
                <Input
                  id="med-name"
                  placeholder="e.g. Metformin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="med-dosage" className="text-xs font-semibold">
                  Dosage *
                </Label>
                <Input
                  id="med-dosage"
                  placeholder="e.g. 500 mg"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Form & Generic Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="med-form" className="text-xs font-semibold">
                  Medication Form
                </Label>
                <Select
                  value={form}
                  onValueChange={(val) => setForm(val as MedicationItem["form"])}
                >
                  <SelectTrigger id="med-form" className="rounded-xl">
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Tablet">Tablet</SelectItem>
                    <SelectItem value="Capsule">Capsule</SelectItem>
                    <SelectItem value="Liquid">Liquid</SelectItem>
                    <SelectItem value="Injection">Injection</SelectItem>
                    <SelectItem value="Drops">Drops</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="med-generic" className="text-xs font-semibold">
                  Generic Name / Formula
                </Label>
                <Input
                  id="med-generic"
                  placeholder="e.g. Metformin HCl"
                  value={genericName}
                  onChange={(e) => setGenericName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Frequency & Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="med-freq" className="text-xs font-semibold">
                  Frequency
                </Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="med-freq" className="rounded-xl">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                    <SelectItem value="Once weekly">Once weekly</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="med-timing" className="text-xs font-semibold">
                  Timing
                </Label>
                <Input
                  id="med-timing"
                  placeholder="e.g. After breakfast"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Condition & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="med-condition" className="text-xs font-semibold">
                  Condition / Purpose
                </Label>
                <Input
                  id="med-condition"
                  placeholder="e.g. Type 2 Diabetes"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="med-doctor" className="text-xs font-semibold">
                  Prescribing Doctor
                </Label>
                <Input
                  id="med-doctor"
                  placeholder="e.g. Dr. Sharma"
                  value={prescribedBy}
                  onChange={(e) => setPrescribedBy(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Supply count */}
            <div className="space-y-1.5">
              <Label htmlFor="med-supply" className="text-xs font-semibold">
                Initial Supply (Units / Pills)
              </Label>
              <Input
                id="med-supply"
                type="number"
                min="1"
                placeholder="30"
                value={totalPills}
                onChange={(e) => setTotalPills(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Instructions */}
            <div className="space-y-1.5">
              <Label htmlFor="med-instructions" className="text-xs font-semibold">
                Special Instructions
              </Label>
              <Input
                id="med-instructions"
                placeholder="e.g. Take with food. Do not crush."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || !dosage.trim()}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-1.5 size-4" /> Add Medication
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
