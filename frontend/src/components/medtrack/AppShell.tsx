import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  CalendarClock,
  ClipboardList,
  History,
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
  { label: "Medication History", id: "history", path: "/history", icon: History, ready: true },
  { label: "Profile & Settings", id: "settings", path: "/settings", icon: Settings, ready: true },
];

const mobileNav: NavItem[] = navItems.filter((item) =>
  ["dashboard", "medications", "schedule", "interactions"].includes(item.id),
);

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
        const active = Boolean(ready) && pathname === path;
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

function ProfileBlock() {
  return (
    <Link
      to="/settings"
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-all hover:border-border-strong hover:bg-surface-muted group"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
      >
        {patient.initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {patient.fullName}
        </span>
        <span className="block truncate text-xs text-muted-foreground">Patient account</span>
      </span>
    </Link>
  );
}

function NotificationButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Notifications, 2 unread"
      className="relative min-h-11 min-w-11 rounded-xl"
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
    <div className="min-h-screen w-full bg-background">
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

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="min-h-11 min-w-11 rounded-xl lg:hidden"
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
                        className="min-h-11 min-w-11 rounded-xl"
                        onClick={() => setMobileOpen(false)}
                      >
                        <X className="size-5" />
                      </Button>
                    </div>
                    <div className="mt-6 flex-1 overflow-y-auto">
                      <NavList onNavigate={() => setMobileOpen(false)} />
                    </div>
                    <div className="mt-4">
                      <ProfileBlock />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <span className="truncate text-sm font-semibold text-foreground lg:text-base">
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
                              : "MedTrack"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <NotificationButton />
              <span
                aria-label={`Signed in as ${patient.fullName}`}
                className="grid size-11 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground lg:hidden"
              >
                {patient.initials}
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-5 sm:px-6 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {mobileNav.map(({ label, id, path, icon: Icon, ready }) => {
            const active = Boolean(ready) && pathname === path;
            const classes = cn(
              "flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-medium",
              active ? "text-primary font-semibold" : "text-muted-foreground",
              !ready && "opacity-70",
            );
            const inner = (
              <>
                <Icon aria-hidden="true" className="size-5" />
                <span className="max-w-full truncate">{label.replace("My ", "")}</span>
              </>
            );
            return (
              <li key={id} className="flex-1">
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
