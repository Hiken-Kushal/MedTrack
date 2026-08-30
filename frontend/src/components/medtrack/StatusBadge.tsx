import { Check, Clock, CircleAlert, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DoseStatus } from "@/lib/mock-data";

const config: Record<
  DoseStatus,
  { label: string; className: string; Icon: typeof Check }
> = {
  taken: {
    label: "Taken",
    className: "bg-success-soft text-success border-success/25",
    Icon: Check,
  },
  missed: {
    label: "Missed",
    className: "bg-danger-soft text-danger border-danger/25",
    Icon: CircleAlert,
  },
  delayed: {
    label: "Delayed",
    className: "bg-warning-soft text-warning-foreground border-warning/35",
    Icon: Timer,
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-surface-muted text-muted-foreground border-border-strong",
    Icon: Clock,
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: DoseStatus;
  className?: string;
}) {
  const { label, className: tone, Icon } = config[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        tone,
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  );
}
