/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadState, saveState, type StorageState } from "@/lib/storage";
import type {
  RuqyahDuaItem,
  RuqyahGuidance,
  RuqyahVerseItem,
} from "@/lib/types/content";
import { ruqyahCopy } from "./copy";
import { cn, toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { QuranText } from "@/components/quran/quran-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { RuqyahAudio } from "./ruqyah-audio";

type RuqyahTab = "verses" | "duas";

type Props = {
  verses: readonly RuqyahVerseItem[];
  duas: readonly RuqyahDuaItem[];
  guidance: readonly RuqyahGuidance[];
  initialItemId?: string;
};

function progressKey(tab: RuqyahTab): string {
  return tab === "verses" ? "ruqyah-verses" : "ruqyah-duas";
}

function findInitialItem(
  verses: readonly RuqyahVerseItem[],
  duas: readonly RuqyahDuaItem[],
  initialItemId?: string,
): { tab: RuqyahTab; index: number } {
  if (initialItemId) {
    const verseIndex = verses.findIndex((item) => item.id === initialItemId);
    if (verseIndex >= 0) return { tab: "verses", index: verseIndex };

    const duaIndex = duas.findIndex((item) => item.id === initialItemId);
    if (duaIndex >= 0) return { tab: "duas", index: duaIndex };
  }

  return { tab: "verses", index: 0 };
}

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    return values[key] ?? match;
  });
}

export function RuqyahReader({
  verses,
  duas,
  guidance,
  initialItemId,
}: Props) {
  const copy = ruqyahCopy;
  const initial = findInitialItem(verses, duas, initialItemId);

  const [tab, setTab] = useState<RuqyahTab>(initial.tab);
  const [index, setIndex] = useState(initial.index);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const items = tab === "verses" ? verses : duas;
  const total = items.length;
  const current = items[index];
  const target = current?.repeat ?? 1;
  const isDone = count >= target;

  const initialTab = initial.tab;
  const initialIndex = initial.index;

  /**
   * A deep link starts the reader at the linked item. Persisting that position
   * once keeps the progress-restore effect idempotent, which matters because
   * React Strict Mode runs effects twice in development and a one-shot ref
   * would otherwise let the second run restore the saved progress instead.
   */
  useEffect(() => {
    if (initialItemId === undefined) return;

    const state = loadState();

    saveState({
      ...state,
      adhkarProgress: {
        ...state.adhkarProgress,
        [progressKey(initialTab)]: {
          index: initialIndex,
          count: 0,
          completed: false,
          updatedAt: Date.now(),
        },
      },
    });
  }, [initialItemId, initialTab, initialIndex]);

  useEffect(() => {
    const state = loadState();
    setFavorites(state.favorites);

    const progress = state.adhkarProgress[progressKey(tab)];

    if (progress) {
      const safeIndex = Math.min(
        Math.max(progress.index, 0),
        Math.max(total - 1, 0),
      );

      setIndex(safeIndex);
      setCount(progress.count);
      setCompleted(progress.completed);
    } else {
      setIndex(0);
      setCount(0);
      setCompleted(false);
    }

    setHydrated(true);
  }, [tab, total]);

  const persist = useCallback(
    (nextIndex: number, nextCount: number, nextCompleted: boolean) => {
      const state = loadState();

      const next: StorageState = {
        ...state,
        adhkarProgress: {
          ...state.adhkarProgress,
          [progressKey(tab)]: {
            index: nextIndex,
            count: nextCount,
            completed: nextCompleted,
            updatedAt: Date.now(),
          },
        },
      };

      saveState(next);
    },
    [tab],
  );

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
        // Ignore vibration failures.
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

  function switchTab(nextTab: RuqyahTab) {
    if (nextTab === tab) return;

    setTab(nextTab);
    setIndex(0);
    setCount(0);
    setCompleted(false);
  }

  const progressPercent = useMemo(() => {
    if (total === 0) return 0;
    if (completed) return 100;

    const base = (index / total) * 100;
    const within = (Math.min(count, target) / target) * (100 / total);

    return Math.min(100, base + within);
  }, [completed, count, index, target, total]);

  if (!hydrated) {
    return (
      <div className="container-page py-16 text-center text-muted">
        {copy.loading}
      </div>
    );
  }

  if (total === 0 || !current) {
    return (
      <div className="container-page py-16 text-center text-muted">
        {copy.empty}
      </div>
    );
  }

  const currentTitle = current.title;
  const currentDescription =
    current.kind === "verse" ? current.description : undefined;
  const currentExplanation = current.explanation;
  const currentRepeatNote =
    current.kind === "verse" ? current.repeatNote : undefined;

  const sourceName = current.source.source;
  const sourceReference = current.source.reference;
  const sourceNote = current.source.note;

  const repeatLabel =
    target === 1
      ? copy.repeatOne
      : target === 2
        ? copy.repeatTwo
        : fillTemplate(copy.repeatMany, {
            count: toArabicDigits(target),
          });

  const progressText = fillTemplate(
    tab === "verses" ? copy.progressVerse : copy.progressDua,
    {
      current: toArabicDigits(index + 1),
      total: toArabicDigits(total),
    },
  );

  const completedPercentText = fillTemplate(copy.completedPercent, {
    percent: toArabicDigits(Math.round(progressPercent)),
  });

  const remaining = target - count;
  const remainingText =
    remaining === 1
      ? copy.counterRemainingOne
      : remaining === 2
        ? copy.counterRemainingTwo
        : fillTemplate(copy.counterRemainingMany, {
            count: toArabicDigits(remaining),
          });

  const counterProgressText = fillTemplate(copy.counterProgress, {
    count: toArabicDigits(count),
    target: toArabicDigits(target),
  });

  const completedTitle = fillTemplate(copy.completedTitle, {
    title:
      tab === "verses"
        ? copy.tabs.verses
        : copy.tabs.duas,
  });

  const otherTab: RuqyahTab = tab === "verses" ? "duas" : "verses";

  return (
    <section className="py-10 sm:py-14" dir="rtl" lang="ar">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <Icon name="arrow-left" className="size-4" />
              {copy.breadcrumb}
            </Link>
          </div>

          <div className="mt-6">
            <SectionHeading
              as="h1"
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
          </div>

          <div
            role="tablist"
            aria-label={copy.tabsLabel}
            className="mt-7 grid grid-cols-2 gap-1 rounded-full border border-line bg-surface p-1"
          >
            <button
              type="button"
              role="tab"
              id="ruqyah-verses-tab"
              aria-selected={tab === "verses"}
              aria-controls="ruqyah-panel"
              onClick={() => switchTab("verses")}
              className={cn(
                "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
                tab === "verses"
                  ? "bg-primary text-white shadow-soft"
                  : "text-muted hover:text-foreground",
              )}
            >
              <Icon name="book" className="size-4" />
              {copy.tabs.verses}
              <span className="text-[11px] opacity-80">
                {toArabicDigits(verses.length)}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              id="ruqyah-duas-tab"
              aria-selected={tab === "duas"}
              aria-controls="ruqyah-panel"
              onClick={() => switchTab("duas")}
              className={cn(
                "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
                tab === "duas"
                  ? "bg-primary text-white shadow-soft"
                  : "text-muted hover:text-foreground",
              )}
            >
              <Icon name="hands" className="size-4" />
              {copy.tabs.duas}
              <span className="text-[11px] opacity-80">
                {toArabicDigits(duas.length)}
              </span>
            </button>
          </div>

          <div
            id="ruqyah-panel"
            role="tabpanel"
            aria-labelledby={
              tab === "verses" ? "ruqyah-verses-tab" : "ruqyah-duas-tab"
            }
          >
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3 text-xs text-muted">
                <span>{progressText}</span>
                <span>{completedPercentText}</span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {completed ? (
              <div className="mt-5 rounded-5xl border border-line bg-surface p-7 text-center shadow-soft sm:p-9">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-soft text-primary-ink">
                  <Icon name="check" className="size-6" />
                </span>

                <h3 className="mt-5 font-display text-2xl font-bold">
                  {completedTitle}
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted">
                  {copy.completedDescription}
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-strong"
                  >
                    <Icon name="reset" className="size-4" />
                    {copy.restart}
                  </button>

                  <button
                    type="button"
                    onClick={() => switchTab(otherTab)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground"
                  >
                    {otherTab === "duas" ? copy.openDuas : copy.openVerses}
                  </button>
                </div>

                <Link
                  href="/"
                  className="mt-5 inline-flex text-xs font-medium text-muted transition-colors hover:text-foreground"
                >
                  {copy.home}
                </Link>
              </div>
            ) : (
              <article className="mt-5 rounded-5xl border border-line bg-surface p-5 shadow-soft sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-ink">
                      <Icon
                        name={current.kind === "verse" ? "book" : "hands"}
                        className="size-3.5"
                      />
                      {current.kind === "verse"
                        ? copy.verseLabel
                        : copy.duaLabel}
                    </span>

                    <h3 className="mt-3 font-display text-xl font-bold sm:text-2xl">
                      {currentTitle}
                    </h3>

                    {currentDescription ? (
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {currentDescription}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={toggleFavorite}
                    aria-label={
                      favorites.includes(current.id)
                        ? copy.favoriteRemove
                        : copy.favoriteAdd
                    }
                    aria-pressed={favorites.includes(current.id)}
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border transition-colors",
                      favorites.includes(current.id)
                        ? "border-accent/60 bg-accent-soft text-accent"
                        : "border-line text-muted hover:border-line-strong hover:text-foreground",
                    )}
                  >
                    <Icon name="bookmark" className="size-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 font-medium text-primary-ink">
                    <Icon name="sparkle" className="size-3.5" />
                    {repeatLabel}
                  </span>

                  <span className="rounded-full border border-line px-3 py-1 text-muted">
                    {copy.grade[current.source.grade]}
                  </span>
                </div>

                <div className="mt-5">
                  {current.kind === "verse" ? (
                    <QuranText ayahs={current.ayahs} fontSize={26} />
                  ) : (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-quran text-[1.5rem] leading-[2.2] text-foreground sm:text-[1.75rem]"
                    >
                      {current.text}
                    </p>
                  )}
                </div>

                {current.kind === "verse" ? (
                  <RuqyahAudio
                    key={current.id}
                    surahNumber={current.surahNumber}
                    ayahs={current.ayahs}
                    copy={copy}
                  />
                ) : null}

                {currentExplanation ? (
                  <p className="mt-5 rounded-2xl border border-line bg-background/60 p-4 text-sm leading-7 text-muted">
                    {currentExplanation}
                  </p>
                ) : null}

                {currentRepeatNote ? (
                  <p className="mt-4 rounded-2xl border border-accent/25 bg-accent-soft/50 p-4 text-xs leading-6 text-muted">
                    <span className="font-medium text-foreground">
                      {copy.repeatNoteLabel}:{" "}
                    </span>
                    {currentRepeatNote}
                  </p>
                ) : null}

                <div className="mt-5 border-t border-line pt-4 text-xs leading-6 text-muted">
                  <span className="font-medium text-foreground">
                    {copy.sourceLabel}:{" "}
                  </span>
                  {sourceName} — {sourceReference}
                  {sourceNote ? (
                    <span className="text-muted"> ({sourceNote})</span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5">
                  <button
                    type="button"
                    onClick={increment}
                    disabled={isDone}
                    aria-label={copy.counterAction}
                    className={cn(
                      "grid size-16 place-items-center rounded-full text-lg font-bold shadow-soft transition-[background-color,transform] duration-200 active:scale-95",
                      isDone
                        ? "bg-primary-soft text-primary-ink"
                        : "bg-primary text-white hover:bg-primary-strong",
                    )}
                  >
                    <span>
                      {toArabicDigits(count)}
                    </span>
                  </button>

                  <div
                    aria-live="polite"
                    className="flex-1 text-sm leading-7 text-muted"
                  >
                    {isDone ? (
                      <span className="font-medium text-primary-ink">
                        {copy.counterDone}
                      </span>
                    ) : count === 0 ? (
                      <span>{copy.counterPrompt}</span>
                    ) : (
                      <span>
                        {counterProgressText} {remainingText}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    aria-label={copy.counterReset}
                    title={copy.counterReset}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                  >
                    <Icon name="reset" className="size-4" />
                  </button>
                </div>
              </article>
            )}

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <Icon name="arrow-left" className="size-4 rotate-180" />
                {copy.previous}
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={index === total - 1}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
                  isDone && index < total - 1
                    ? "bg-primary text-white shadow-soft hover:bg-primary-strong"
                    : "border border-line text-muted hover:border-line-strong hover:text-foreground",
                )}
              >
                {tab === "verses" ? copy.nextVerse : copy.nextDua}
                <Icon name="arrow-left" className="size-4" />
              </button>
            </div>
          </div>

          <section className="mt-12">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.guidanceTitle}
              description={copy.guidanceDescription}
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {guidance.map((item) => {
                return (
                  <article
                    key={item.id}
                    className="rounded-4xl border border-line bg-surface p-5 shadow-soft"
                  >
                    <h3 className="font-display text-lg font-bold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {item.body}
                    </p>
                    {item.evidence ? (
                      <p className="mt-3 rounded-2xl border border-line bg-background/60 p-3 text-xs leading-6 text-muted">
                        <span className="font-medium text-foreground">
                          {copy.evidenceLabel}:{" "}
                        </span>
                        {item.evidence}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
