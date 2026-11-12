import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Heading level to use for the title. Defaults to h2. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="flex items-center gap-2.5 text-sm font-semibold text-primary-ink">
          <span className="h-px w-7 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <Heading className="mt-3 text-balance font-display text-3xl font-bold leading-[1.35] sm:text-4xl">
          {title}
        </Heading>
        {description ? (
          <p className="mt-3 max-w-xl text-[15px] leading-8 text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
