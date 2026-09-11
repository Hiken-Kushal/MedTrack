import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
return (
    <section
      className={cn(
        "rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className={cn("mt-4", contentClassName)}>{children}</div>
    </section>
  );
}
