import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost";
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-primary text-white shadow-soft hover:bg-primary-strong hover:shadow-lift",
  outline:
    "border border-line-strong bg-transparent text-foreground hover:border-primary/35 hover:bg-primary-soft/60",
  light: "bg-white text-brand shadow-soft hover:bg-[#eef2ee]",
  ghost: "text-primary-ink hover:bg-primary-soft/70",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className,
  onClick,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      {children}
      {withArrow ? (
        <Icon
          name="arrow-left"
          className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
        />
      ) : null}
    </a>
  );
}
