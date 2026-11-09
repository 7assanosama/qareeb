/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { loadState, saveState } from "@/lib/storage";
import { cn, formatTasbihRemaining, toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TARGET_OPTIONS = [33, 99, 100];

export function TasbihSection() {
  const [target, setTarget] = useState(33);
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const state = loadState();
    setCount(state.tasbih.count);
    setTarget(state.tasbih.target || 33);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state = loadState();
    saveState({ ...state, tasbih: { count, target } });
  }, [hydrated, count, target]);

  const isComplete = count === target && count > 0;
  const progress = target > 0 ? count / target : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  function increment() {
    setCount((current) => Math.min(current + 1, target));

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        // ignore
      }
    }
  }

  function reset() {
    setCount(0);
  }

  function changeTarget(next: number) {
    setTarget(next);
    setCount(0);
  }

  return (
    <section
      id="tasbih"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-soft/50 blur-3xl dark:bg-primary-soft/30" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          eyebrow="لحظات مع الله"
          title="لا تنسَ ذكر الله"
          description="اجعل لسانك رطبًا بذكر الله، وابدأ تسبيحك خطوة بخطوة."
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          {TARGET_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => changeTarget(option)}
              aria-pressed={target === option}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                target === option
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface text-muted hover:border-line-strong hover:text-foreground",
              )}
            >
              {toArabicDigits(option)}
            </button>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-5xl border border-line bg-surface shadow-soft">
          <div
            className="geometric-pattern absolute inset-0 text-primary-ink"
            aria-hidden="true"
          />

          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-primary-ink">
                <Icon name="sparkle" className="size-3.5" />
                سبحان الله
              </span>

              <p className="mt-5 font-display text-3xl font-bold sm:text-4xl">
                سُبْحَانَ اللهِ
              </p>

              <p className="mt-4 max-w-md text-[15px] leading-8 text-muted">
                اختر عدد التسبيحات، وابدأ على مهل. كل ضغطة تقرّبك من إتمام وردك.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={increment}
                  disabled={isComplete}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-soft transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary-strong hover:shadow-lift active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                >
                  <Icon
                    name="plus"
                    className="size-4 transition-transform duration-200 group-hover:rotate-90"
                  />
                  سبّح الآن
                </button>

                <button
                  type="button"
                  onClick={reset}
                  disabled={count === 0}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-muted transition-colors duration-200 hover:border-line-strong hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  <Icon name="reset" className="size-4" />
                  ابدأ من جديد
                </button>
              </div>

              <p
                aria-live="polite"
                className="mt-5 min-h-6 text-sm font-medium text-muted"
              >
                {isComplete
                  ? `أتممت ${toArabicDigits(target)} تسبيحة، تقبّل الله منك.`
                  : formatTasbihRemaining(target - count)}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={increment}
                disabled={isComplete}
                aria-label={
                  isComplete
                    ? `أتممت ${toArabicDigits(target)} تسبيحة`
                    : `أضف تسبيحة، العدد الحالي ${toArabicDigits(count)} من ${toArabicDigits(target)}`
                }
                className="group relative grid size-60 place-items-center rounded-full transition-transform duration-200 active:scale-[0.98] disabled:cursor-default sm:size-64"
              >
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 size-full -rotate-90"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="tasbih-ring"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="var(--primary-ink)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="100"
                    cy="100"
                    r={RADIUS}
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="5"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r={RADIUS}
                    fill="none"
                    stroke="url(#tasbih-ring)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    className="transition-[stroke-dashoffset] duration-500 ease-out"
                  />
                </svg>

                <span
                  aria-hidden="true"
                  className="absolute inset-6 rounded-full border border-line/70 bg-background/35"
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex flex-col items-center transition-colors duration-300",
                    isComplete ? "text-gold-ink" : "text-foreground",
                  )}
                >
                  <span className="font-display text-6xl font-bold leading-none">
                    {toArabicDigits(count)}
                  </span>

                  <span className="mt-3 text-xs text-muted">
                    من {toArabicDigits(target)} تسبيحة
                  </span>

                  <span
                    className={cn(
                      "mt-2 inline-flex items-center gap-1 text-[11px]",
                      isComplete ? "text-gold-ink" : "text-muted opacity-70",
                    )}
                  >
                    {isComplete ? (
                      <>
                        <Icon name="check" className="size-3" />
                        اكتمل العدد
                      </>
                    ) : (
                      "اضغط للذكر"
                    )}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
