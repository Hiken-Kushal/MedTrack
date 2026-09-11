import { useState } from "react";
import {
  AlertTriangle,
  Download,
  KeyRound,
  Lock,
  LogOut,
  Shield,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionCard } from "@/components/medtrack/SectionCard";

export function SecurityAndAccountCard() {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please ensure your new password and confirmation match.",
      });
      return;
    }

    toast.success("Password Updated", {
      description: "Your account password has been changed successfully.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordModalOpen(false);
  };

  const handleExportData = () => {
    toast.success("Health Data Export Initiated", {
      description: "Your clinical medication records and adherence logs are being compiled.",
    });
    setDataModalOpen(false);
  };

  const handleLogout = () => {
    toast.info("Logged Out (Prototype)", {
      description: "Session termination is simulated in prototype mode.",
    });
    setLogoutModalOpen(false);
  };

  const handleDeleteAccount = () => {
    toast.error("Account Deletion Requested (Prototype)", {
      description: "Account deletion protocol simulated in prototype mode.",
    });
    setDeleteModalOpen(false);
  };

  return (
    <SectionCard
      title="Privacy, Security & Account"
      description="Manage account credentials, data permissions, and session access."
    >
      <div className="space-y-4 pt-1">
        {/* Security Options List */}
        <div className="space-y-2.5">
          {/* Change Password */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-foreground"
              >
                <KeyRound className="size-4 text-primary" />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-foreground block">
                  Account Password
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  Last updated 3 months ago
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPasswordModalOpen(true)}
              className="rounded-xl border-border text-xs font-semibold h-8 shrink-0"
            >
              Change Password
            </Button>
          </div>

          {/* Data & Permissions */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-border-strong">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-foreground"
              >
                <Shield className="size-4 text-primary" />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-foreground block">
                  Data & Clinical Permissions
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  Export health logs & doctor sharing controls
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setDataModalOpen(true)}
              className="rounded-xl border-border text-xs font-semibold h-8 shrink-0"
            >
              Manage Data
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 rounded-2xl border border-border bg-card p-3.5">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-success-soft text-success"
              >
                <ShieldCheck className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-foreground block">
                  Two-Factor Authentication (2FA)
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  SMS / Authenticator verification active
                </span>
              </div>
            </div>

            <span className="rounded-full border border-success/30 bg-success-soft px-2.5 py-0.5 text-[10px] font-bold text-success shrink-0">
              Active
            </span>
          </div>
        </div>

        {/* Destructive / Session Actions */}
        <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setLogoutModalOpen(true)}
            className="rounded-xl border-border text-xs font-semibold text-foreground hover:bg-surface-muted h-9"
          >
            <LogOut className="mr-1.5 size-3.5 text-muted-foreground" /> Log Out
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-xl text-xs font-semibold text-danger hover:bg-danger-soft hover:text-danger h-9"
          >
            <Trash2 className="mr-1.5 size-3.5" /> Delete Account
          </Button>
        </div>
      </div>

      {/* 1. Change Password Dialog */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-bold text-foreground">
              Change Account Password
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Enter your current password and set a new secure password.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordSubmit} className="space-y-3.5 mt-2 text-xs">
            <div className="space-y-1">
              <Label className="font-bold text-foreground">Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <Label className="font-bold text-foreground">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <Label className="font-bold text-foreground">Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-10 rounded-xl"
              />
            </div>

            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPasswordModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90"
              >
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Data & Permissions Dialog */}
      <Dialog open={dataModalOpen} onOpenChange={setDataModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-bold text-foreground">
              Health Data & Permissions
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Export your medication history or manage clinical sharing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-2 text-xs">
            <div className="rounded-2xl border border-border bg-surface-muted/50 p-4 space-y-1">
              <span className="font-bold text-foreground block">
                Export Clinical Records (PDF / CSV)
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Download a compiled report of your prescriptions, adherence percentages, and logged dose events.
              </p>
              <Button
                type="button"
                onClick={handleExportData}
                className="mt-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 h-8"
              >
                <Download className="mr-1.5 size-3.5" /> Download Export
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
              <span className="font-bold text-foreground block">
                Care Team Access
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Your primary physician (Dr. Sharma) has authorized read access to your adherence logs.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDataModalOpen(false)}
              className="rounded-xl"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Log Out Confirmation Dialog */}
      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
        <DialogContent className="max-w-sm rounded-3xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-bold text-foreground">
              Confirm Sign Out
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to sign out of your MedTrack patient session?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLogoutModalOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90"
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Delete Account Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-2 text-danger">
              <AlertTriangle className="size-5" />
              <DialogTitle className="text-lg font-bold text-foreground">
                Delete Account
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
              This action is irreversible. Deleting your account will remove your medication tracking history, reminders, and profile telemetry.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl border border-danger/30 bg-danger-soft/50 p-3.5 text-xs text-danger-foreground">
            <strong>Prototype Note:</strong> Account deletion is simulated in this demonstration build.
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDeleteAccount}
              className="rounded-xl bg-danger text-primary-foreground font-bold hover:bg-danger/90"
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}
