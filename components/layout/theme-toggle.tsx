"use client";

import { useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const STORAGE_KEY = "qareeb-theme";

export function ThemeToggle({ className }: { className?: string }) {
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        document.documentElement.dataset.theme = stored;
        document.documentElement.style.colorScheme = stored;
      }
    } catch {
      // The inline script already applied the system preference.
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    root.style.colorScheme = next;

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The theme still changes for the current visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="تبديل الوضع الليلي والنهاري"
      title="تبديل الوضع الليلي والنهاري"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-200 hover:border-line-strong hover:text-foreground",
        className,
      )}
    >
      <Icon name="moon" className="size-[18px] dark:hidden" />
      <Icon name="sun" className="hidden size-[18px] dark:block" />
    </button>
  );
}
