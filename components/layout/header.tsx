"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-2">
        <Link
          href="/"
          aria-label="قريب — الصفحة الرئيسية"
          className="shrink-0 rounded-xl"
        >
          <Logo />
        </Link>
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-muted transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-foreground hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-line-strong md:hidden"
          >
            <Icon name={isMenuOpen ? "close" : "menu"} className="size-4.5" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        className={cn(
          "grid overflow-hidden border-t border-line/70 bg-background/95 transition-all duration-300 ease-out md:hidden",
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] border-transparent opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="قائمة التنقل في الهاتف"
            className="container-page flex flex-col gap-1 py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-primary-soft/70 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href="/#adhkar"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 w-full"
              withArrow
            >
              ابدأ بذكرك
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
