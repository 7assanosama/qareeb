"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { QuranSurah } from "@/lib/types/content";
import { toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

type Props = {
  surahs: readonly QuranSurah[];
};

export function SurahIndex({ surahs }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (surah) =>
        surah.name.includes(q) ||
        surah.englishName.toLowerCase().includes(q) ||
        String(surah.number).includes(q),
    );
  }, [query, surahs]);

  return (
    <div>
      <div className="relative">
        <Icon
          name="book"
          className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="ابحث عن سورة"
          placeholder="ابحث باسم السورة أو رقمها"
          className="w-full rounded-full border border-line bg-surface py-3 ps-11 pe-4 text-sm text-foreground placeholder:text-muted focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <p className="mt-4 text-xs text-muted">
        {query.trim()
          ? `${toArabicDigits(filtered.length)} من ${toArabicDigits(surahs.length)} سورة`
          : `${toArabicDigits(surahs.length)} سورة جاهزة للقراءة`}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((surah) => (
          <li key={surah.number}>
            <Link
              href={`/quran/${surah.number}`}
              className="group flex items-center justify-between gap-3 rounded-3xl border border-line bg-surface p-4 shadow-soft transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary-ink">
                  {toArabicDigits(surah.number)}
                </span>
                <div>
                  <p className="font-display text-base font-bold">{surah.name}</p>
                  <p className="text-xs text-muted">
                    {toArabicDigits(surah.ayahCount)} آية ·{" "}
                    {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                  </p>
                </div>
              </div>
              <Icon
                name="arrow-left"
                className="size-4 text-muted transition-transform group-hover:-translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">
          لم نجد سورة بهذا البحث. جرّب اسمًا آخر أو رقم السورة.
        </p>
      ) : null}
    </div>
  );
}