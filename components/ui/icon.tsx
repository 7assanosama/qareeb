import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow-left"
  | "bookmark"
  | "bed"
  | "book"
  | "check"
  | "close"
  | "hands"
  | "menu"
  | "moon"
  | "moon-star"
  | "plus"
  | "prayer"
  | "reset"
  | "sparkle"
  | "sun"
  | "sunrise";

const paths: Record<IconName, ReactNode> = {
  "arrow-left": (
    <>
      <path d="M20 12H4" />
      <path d="m10 18-6-6 6-6" />
    </>
  ),
  bookmark: (
    <>
      <path d="M6 4h12v17l-6-4-6 4V4Z" />
    </>
  ),
  bed: (
    <>
      <path d="M3.5 19.5V8.5" />
      <path d="M20.5 19.5v-5a2 2 0 0 0-2-2h-15" />
      <path d="M2 19.5h20" />
      <path d="M7 12.5v-2a1 1 0 0 1 1-1h3v3" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10.5 5 8 4.5 4 5v13c4-.5 6.5 0 8 1.5 1.5-1.5 4-2 8-1.5V5c-4-.5-6.5 0-8 1.5Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  hands: (
    <>
      <path d="M6.5 12V6.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M9.5 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12.5 11V5a1.5 1.5 0 0 1 3 0v7" />
      <path d="M15.5 9.5v-1a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-4.1-2.1l-2.7-3.9a1.6 1.6 0 0 1 2.4-2.1L9 16" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  "moon-star": (
    <>
      <path d="M19.5 14.2A7.6 7.6 0 0 1 9.8 4.5 7.6 7.6 0 1 0 19.5 14.2Z" />
      <path d="M17.5 3.5v2.4" />
      <path d="M16.3 4.7h2.4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  prayer: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 20v-6a3 3 0 0 1 6 0v6" />
      <path d="M12 4v3" />
    </>
  ),
  reset: (
    <>
      <path d="M3 12a9 9 0 1 0 2.6-6.4" />
      <path d="M3 4v5h5" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5L4.5 11 10 9l2-5.5Z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.3 4.3l1.4 1.4M18.3 18.3l1.4 1.4M2.5 12h2M19.5 12h2M4.3 19.7l1.4-1.4M18.3 5.7l1.4-1.4" />
    </>
  ),
  sunrise: (
    <>
      <path d="M4 18h16" />
      <path d="M7.5 18a4.5 4.5 0 0 1 9 0" />
      <path d="M12 3.5v2" />
      <path d="m5.5 7.5 1.4 1.4" />
      <path d="m18.5 7.5-1.4 1.4" />
      <path d="M2.5 13.5h2" />
      <path d="M19.5 13.5h2" />
    </>
  ),
};

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  strokeWidth?: number;
};

export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.6,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
