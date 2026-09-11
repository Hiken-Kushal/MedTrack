import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  CalendarClock,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  Pill,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { patient } from "@/lib/mock-data";

type NavItem = {
  label: string;
  id: string;
  path: string;
  icon: typeof LayoutDashboard;
  /** Built in this iteration; remaining screens come in later iterations. */
  ready?: boolean;
};

const navItems: NavItem[] = [
  { label: "Dashboard", id: "dashboard", path: "/", icon: LayoutDashboard, ready: true },
  { label: "My Medications", id: "medications", path: "/medications", icon: Pill, ready: true },
  { label: "Schedule", id: "schedule", path: "/schedule", icon: CalendarClock, ready: true },
  { label: "Adherence", id: "adherence", path: "/adherence", icon: ClipboardList, ready: true },
  { label: "Interactions", id: "interactions", path: "/interactions", icon: ShieldAlert, ready: true },
];

const mobileNav: NavItem[] = navItems;

function Wordmark() {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
      >
        <Activity className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-bold tracking-tight text-foreground">
          MedTrack
        </span>
        <span className="block truncate text-[11px] text-muted-foreground">
          Medication support
        </span>
      </span>
    </span>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-1">
      {navItems.map(({ label, id, path, icon: Icon, ready }) => {
        const active = Boolean(ready) && (pathname === path || (path !== "/" && pathname.startsWith(path)));
        const classes = cn(
          "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors",
          active
            ? "bg-primary-soft font-semibold text-accent-foreground"
            : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          !ready && "cursor-default opacity-70 hover:bg-transparent hover:text-muted-foreground",
        );
        const inner = (
          <>
            <Icon aria-hidden="true" className="size-[18px] shrink-0" />
            <span className="min-w-0 truncate">{label}</span>
            {active ? (
              <span aria-hidden="true" className="ml-auto h-5 w-1 rounded-full bg-primary" />
            ) : null}
            {!ready ? (
              <span className="ml-auto shrink-0 rounded-full border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                Soon
              </span>
            ) : null}
          </>
        );

        if (!ready) {
          return (
            <button key={id} type="button" aria-disabled="true" className={classes}>
              {inner}
            </button>
          );
        }

        return (
          <Link
            key={id}
            to={path}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={classes}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}

function ProfileBlock({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isSettings = pathname === "/settings";

  return (
    <Link
      to="/settings"
      onClick={onNavigate}
      aria-label="Profile & Settings"
      aria-current={isSettings ? "page" : undefined}
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 transition-all group",
        isSettings
          ? "border-primary/40 bg-primary-soft/80 shadow-xs"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-muted",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors",
          isSettings
            ? "bg-primary text-primary-foreground font-bold"
            : "bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground",
        )}
      >
        {patient.initials}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate text-sm font-semibold transition-colors",
            isSettings ? "text-foreground font-bold" : "text-foreground group-hover:text-primary",
          )}
        >
          {patient.fullName}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          Profile & Settings
        </span>
      </span>
      <Settings
        className={cn(
          "size-4 shrink-0 transition-colors",
          isSettings ? "text-primary" : "text-muted-foreground group-hover:text-primary",
        )}
        aria-hidden="true"
      />
    </Link>
  );
}

function NotificationButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Notifications, 2 unread"
      className="relative min-h-10 min-w-10 sm:min-h-11 sm:min-w-11 rounded-xl"
    >
      <Bell className="size-[18px]" />
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-card"
      />
    </Button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[260px] flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 lg:flex">
        <div className="px-1">
          <Wordmark />
        </div>
        <div className="mt-7 flex-1 overflow-y-auto">
          <NavList />
        </div>
        <div className="mt-4">
          <ProfileBlock />
        </div>
      </aside>

      <div className="lg:pl-[260px] min-w-0">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3.5 py-2.5 sm:px-6 sm:py-3">
            <div className="flex min-w-0 items-center gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="min-h-10 min-w-10 rounded-xl lg:hidden"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-sidebar p-0">
                  <SheetTitle className="sr-only">MedTrack navigation</SheetTitle>
                  <div className="flex h-full flex-col px-4 py-5">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                      <Wordmark />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close navigation menu"
                        className="min-h-10 min-w-10 rounded-xl"
                        onClick={() => setMobileOpen(false)}
                      >
                        <X className="size-5" />
                      </Button>
                    </div>
                    <div className="mt-6 flex-1 overflow-y-auto">
                      <NavList onNavigate={() => setMobileOpen(false)} />
                    </div>
                    <div className="mt-4">
                      <ProfileBlock onNavigate={() => setMobileOpen(false)} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <span className="truncate text-sm font-semibold text-foreground sm:text-base">
                {pathname === "/"
                  ? "Dashboard"
                  : pathname === "/medications"
                    ? "My Medications"
                    : pathname === "/schedule"
                      ? "Schedule"
                      : pathname === "/adherence"
                        ? "Adherence"
                        : pathname === "/interactions"
                          ? "Drug Interactions"
                          : pathname === "/history"
                            ? "Medication History"
                            : pathname === "/settings"
                              ? "Profile & Settings"
                              : pathname === "/documents"
                                ? "My Documents"
                                : "MedTrack"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl border-border bg-card text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-surface-muted hover:border-border-strong px-2.5 sm:px-3 h-9"
              >
                <Link to="/documents" className="inline-flex items-center gap-1.5">
                  <FileText className="size-3.5 text-primary" aria-hidden="true" />
                  <span className="font-semibold uppercase tracking-wider text-[11px] hidden sm:inline">My Documents</span>
                  <span className="font-semibold uppercase tracking-wider text-[11px] sm:hidden">Docs</span>
                </Link>
              </Button>
              <NotificationButton />
              <Link
                to="/settings"
                aria-label={`Signed in as ${patient.fullName} — Profile & Settings`}
                className="grid size-9 sm:size-10 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors lg:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shrink-0"
              >
                {patient.initials}
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-3.5 pb-24 pt-4 sm:px-6 sm:pb-28 sm:pt-5 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-1.5 py-1">
          {mobileNav.map(({ label, id, path, icon: Icon, ready }) => {
            const active = Boolean(ready) && (pathname === path || (path !== "/" && pathname.startsWith(path)));
            const classes = cn(
              "flex min-h-12 w-full flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-medium transition-colors",
              active ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground",
              !ready && "opacity-70",
            );
            const inner = (
              <>
                <Icon aria-hidden="true" className={cn("size-4.5 sm:size-5 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                <span className="max-w-full truncate">{label.replace("My ", "")}</span>
              </>
            );
            return (
              <li key={id} className="flex-1 min-w-0">
                {ready ? (
                  <Link to={path} aria-current={active ? "page" : undefined} className={classes}>
                    {inner}
                  </Link>
                ) : (
                  <button type="button" aria-disabled="true" className={classes}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
