/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

function isActiveLink(href: string, pathname: string, hash: string): boolean {
  if (href === "/") {
    return pathname === "/" && (hash === "" || hash === "#");
  }

  if (href.startsWith("/#")) {
    const targetHash = href.slice(1); // "#adhkar"
    if (pathname === "/") {
      return hash === targetHash;
    }
    // Highlight the corresponding top-level section link while reading
    // its dedicated page as well.
    if (href === "/#adhkar" && pathname.startsWith("/adhkar")) return true;
    if (href === "/#quran" && pathname.startsWith("/quran")) return true;
    if (href === "/#ruqyah" && pathname.startsWith("/ruqyah")) return true;
    if (href === "/#tasbih") return false;
    return false;
  }

  if (href === "/favorites") {
    return pathname === "/favorites" || pathname.startsWith("/favorites");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  const nodes = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  return Array.from(nodes).filter(
    (node) => !node.hasAttribute("disabled") && node.tabIndex !== -1,
  );
}

export function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  // Focus management + focus trap for the mobile menu.
  useEffect(() => {
    if (!isMenuOpen) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    if (!menu) return;

    const rafId = requestAnimationFrame(() => {
      const focusables = getFocusable(menu);
      (focusables[0] ?? menu).focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable(menu);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeyDown);
      toggle?.focus();
    };
  }, [isMenuOpen]);

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
          className="hidden items-center gap-5 md:flex lg:gap-8"
        >
          {navLinks.map((link) => {
            const active = isActiveLink(link.href, pathname, hash);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-foreground hover:after:scale-x-100",
                  active
                    ? "text-foreground after:scale-x-100"
                    : "text-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            ref={toggleRef}
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
        ref={menuRef}
        id="mobile-menu"
        inert={!isMenuOpen}
        tabIndex={-1}
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
            {navLinks.map((link) => {
              const active = isActiveLink(link.href, pathname, hash);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-primary-soft/70 hover:text-foreground",
                    active
                      ? "bg-primary-soft/70 text-foreground"
                      : "text-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
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