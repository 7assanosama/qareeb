import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "onDark";
  showTagline?: boolean;
  className?: string;
};

export function Logo({
  variant = "default",
  showTagline = true,
  className,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-2xl",
          variant === "onDark"
            ? "bg-white/10 text-white ring-1 ring-white/15"
            : "bg-brand text-white shadow-soft",
        )}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className="size-8"
        >
          <path
            d="M14 34V24c0-5.5 4.5-10 10-10s10 4.5 10 10v10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M19 34V25.5c0-2.8 2.2-5 5-5s5 2.2 5 5V34"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="24" cy="10" r="1.8" fill="var(--accent)" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold">قريب</span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[11px] font-medium",
              variant === "onDark" ? "text-white/60" : "text-muted",
            )}
          >
            للذكر والقرآن
          </span>
        ) : null}
      </span>
    </span>
  );
}
