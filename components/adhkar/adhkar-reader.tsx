/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadState, saveState, type StorageState } from "@/lib/storage";
import type { Dhikr, DhikrSection } from "@/lib/types/content";
import { cn, toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

type Props = {
  section: DhikrSection;
};

export function AdhkarReader({ section }: Props) {
  const items = section.items;
  const total = items.length;

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load progress on mount
  useEffect(() => {
    const state = loadState();
    const progress = state.adhkarProgress[section.id];

    if (progress) {
      const safeIndex = Math.min(
        Math.max(progress.index, 0),
        Math.max(total - 1, 0),
      );

      setIndex(safeIndex);
      setCount(progress.count);
      setCompleted(progress.completed);
    }

    setFavorites(state.favorites);
    setHydrated(true);
  }, [section.id, total]);

  const current: Dhikr | undefined = items[index];

  const persist = useCallback(
    (nextIndex: number, nextCount: number, nextCompleted: boolean) => {
      const state = loadState();

      const next: StorageState = {
        ...state,
        adhkarProgress: {
          ...state.adhkarProgress,
          [section.id]: {
            index: nextIndex,
            count: nextCount,
            completed: nextCompleted,
            updatedAt: Date.now(),
          },
        },
      };

      saveState(next);
    },
    [section.id],
  );

  const target = current?.repeat ?? 1;
  const isDone = count >= target;

  function increment() {
    if (!current || completed) return;

    const nextCount = Math.min(count + 1, target);

    setCount(nextCount);

    const justFinished = nextCount >= target;

    if (justFinished && index === total - 1) {
      setCompleted(true);
      persist(index, nextCount, true);
    } else {
      persist(index, nextCount, completed);
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // ignore
      }
    }
  }

  function reset() {
    setCount(0);
    persist(index, 0, false);
    setCompleted(false);
  }

  function toggleFavorite() {
    if (!current) return;

    const state = loadState();
    const exists = state.favorites.includes(current.id);

    const next = exists
      ? state.favorites.filter((id) => id !== current.id)
      : [...state.favorites, current.id];

    setFavorites(next);
    saveState({ ...state, favorites: next });
  }

  function goNext() {
    if (index >= total - 1) return;

    const nextIndex = index + 1;

    setIndex(nextIndex);
    setCount(0);
    persist(nextIndex, 0, completed);
  }

  function goPrev() {
    if (index <= 0) return;

    const prevIndex = index - 1;

    setIndex(prevIndex);
    setCount(0);
    persist(prevIndex, 0, completed);
  }

  function restart() {
    setIndex(0);
    setCount(0);
    setCompleted(false);
    persist(0, 0, false);
  }

  const progressPercent = useMemo(() => {
    if (total === 0) return 0;

    const base = (index / total) * 100;
    const within = (count / target) * (100 / total);

    return Math.min(100, base + within);
  }, [index, count, target, total]);

  if (!hydrated) {
    return (
      <div className="container-page py-16 text-center text-muted">
        نهيّئ لك أذكارك, لحظات وتبدأ…
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="container-page py-16 text-center text-muted">
        لا توجد أذكار في هذا القسم حاليًا.
        <br />
        يمكنك استكشاف بقية الأقسام والعودة لاحقًا.
      </div>
    );
  }

  if (completed) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-xl rounded-5xl border border-line bg-surface p-8 text-center shadow-soft sm:p-10">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-soft text-primary-ink">
              <Icon name="check" className="size-6" />
            </span>

            <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
              أتممت {section.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted">
              تقبّل الله منك, وجعل ذكرك له نورًا وطمأنينة لقلبك.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={restart}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-strong"
              >
                <Icon name="reset" className="size-4" />
                أبدأ من جديد
              </button>

              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                العودة إلى الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <Icon name="arrow-left" className="size-4" />
            الرئيسية
          </Link>

          <div className="mt-6">
            <SectionHeading
              eyebrow="لحظات مع الذكر"
              title={section.title}
              description={section.description}
            />
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                الذكر {toArabicDigits(index + 1)} من {toArabicDigits(total)}
              </span>

              <span>أتممت {toArabicDigits(Math.round(progressPercent))}%</span>
            </div>

            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <article className="mt-6 rounded-5xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-ink">
                <Icon name="sparkle" className="size-3.5" />
                يُقرأ {toArabicDigits(current.repeat)} مرة
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">
                  {current.source.grade === "sahih"
                    ? "صحيح"
                    : current.source.grade === "hasan"
                      ? "حسن"
                      : current.source.grade === "quran"
                        ? "من القرآن الكريم"
                        : "المصدر"}
                </span>

                <button
                  type="button"
                  onClick={toggleFavorite}
                  aria-label={
                    favorites.includes(current.id)
                      ? "إزالة الذكر من المفضلة"
                      : "إضافة الذكر إلى المفضلة"
                  }
                  aria-pressed={favorites.includes(current.id)}
                  className={cn(
                    "grid size-8 place-items-center rounded-full border transition-colors",
                    favorites.includes(current.id)
                      ? "border-accent/60 bg-accent-soft text-accent"
                      : "border-line text-muted hover:border-line-strong hover:text-foreground",
                  )}
                >
                  <Icon name="bookmark" className="size-4" />
                </button>
              </div>
            </div>

            <p className="mt-5 font-quran text-[1.5rem] leading-[2.2] text-foreground sm:text-[1.75rem]">
              {current.text}
            </p>

            {current.explanation ? (
              <p className="mt-5 rounded-2xl border border-line bg-background/60 p-4 text-sm leading-7 text-muted">
                {current.explanation}
              </p>
            ) : null}

            <div className="mt-5 border-t border-line pt-4 text-xs leading-6 text-muted">
              <span className="font-medium text-foreground">المصدر: </span>
              {current.source.source} — {current.source.reference}
            </div>

            {/* Counter */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={increment}
                disabled={isDone}
                aria-label="تسجيل مرة جديدة"
                className={cn(
                  "grid size-16 place-items-center rounded-full text-lg font-bold shadow-soft transition-[background-color,transform] duration-200 active:scale-95",
                  isDone
                    ? "bg-primary-soft text-primary-ink"
                    : "bg-primary text-white hover:bg-primary-strong",
                )}
              >
                {toArabicDigits(count)}
              </button>

              <div className="flex-1 text-sm leading-7 text-muted">
                {isDone ? (
                  <span className="font-medium text-primary-ink">
                    أحسنت, أتممت هذا الذكر. يمكنك الانتقال إلى التالي.
                  </span>
                ) : count === 0 ? (
                  <span>خذ وقتك في القراءة, واضغط على العداد بعد كل مرة.</span>
                ) : (
                  <span>
                    أتممت {toArabicDigits(count)} من {toArabicDigits(target)}.{` `}
                    {target - count === 1
                      ? "باقية لك مرة واحدة."
                      : `تبقّت ${toArabicDigits(target - count)} مرات.`}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={reset}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                aria-label="إعادة العداد إلى الصفر"
                title="إعادة العداد"
              >
                <Icon name="reset" className="size-4" />
              </button>
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="arrow-left" className="size-4 rotate-180" />
              السابق
            </button>

            {isDone && index < total - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-strong"
              >
                الذكر التالي
                <Icon name="arrow-left" className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={index === total - 1}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                التالي
                <Icon name="arrow-left" className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
