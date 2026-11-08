/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState } from "@/lib/storage";
import type { QuranSurah } from "@/lib/types/content";
import { Icon } from "@/components/ui/icon";

type Props = {
  surah: QuranSurah;
  prevSurah: number | null;
  nextSurah: number | null;
};

const FONT_MIN = 16;
const FONT_MAX = 28;
const FONT_STEP = 2;

export function QuranReader({ surah, prevSurah, nextSurah }: Props) {
  const [fontSize, setFontSize] = useState(18);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const state = loadState();
    setFontSize(state.quranProgress.fontSize || 18);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state = loadState();
    saveState({
      ...state,
      quranProgress: {
        surah: surah.number,
        ayah: 1,
        fontSize,
      },
    });
  }, [hydrated, surah.number, fontSize]);

  function increaseFont() {
    setFontSize((size) => Math.min(FONT_MAX, size + FONT_STEP));
  }

  function decreaseFont() {
    setFontSize((size) => Math.max(FONT_MIN, size - FONT_STEP));
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/quran"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <Icon name="arrow-left" className="size-4" />
              فهرس السور
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decreaseFont}
                aria-label="تصغير الخط"
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                <span className="text-sm font-bold">أ-</span>
              </button>
              <button
                type="button"
                onClick={increaseFont}
                aria-label="تكبير الخط"
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                <span className="text-sm font-bold">أ+</span>
              </button>
            </div>
          </div>

          <header className="mt-6 text-center">
            <p className="text-sm font-semibold text-primary-ink">
              سورة {surah.name}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {surah.name}
            </h1>
            <p className="mt-2 text-xs text-muted">
              {surah.ayahCount} آية ·{" "}
              {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
            </p>
          </header>

          <article
            className="mt-8 rounded-5xl border border-line bg-surface p-6 shadow-soft sm:p-8"
            style={{ fontSize: `${fontSize}px` }}
          >
            <p
              className="font-quran leading-[2.4] text-foreground"
              dir="rtl"
            >
              {surah.ayahs.map((ayah) => (
                <span key={ayah.number} className="inline">
                  {ayah.text}
                  <span className="mx-1 inline-flex size-6 items-center justify-center rounded-full bg-primary-soft text-[0.6em] font-semibold text-primary-ink align-middle">
                    {ayah.number}
                  </span>{" "}
                </span>
              ))}
            </p>
          </article>

          <nav className="mt-8 flex items-center justify-between gap-3">
            {prevSurah ? (
              <Link
                href={`/quran/${prevSurah}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground"
              >
                <Icon name="arrow-left" className="size-4 rotate-180" />
                السورة السابقة
              </Link>
            ) : (
              <span />
            )}
            {nextSurah ? (
              <Link
                href={`/quran/${nextSurah}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-strong"
              >
                السورة التالية
                <Icon name="arrow-left" className="size-4" />
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </section>
  );
}