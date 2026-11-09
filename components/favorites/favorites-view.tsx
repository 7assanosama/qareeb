/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, saveState } from "@/lib/storage";
import { adhkarSections } from "@/lib/content/adhkar";
import { hisnCategories } from "@/lib/content/hisn";
import type { Dhikr } from "@/lib/types/content";
import { formatSavedDhikrCount, toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

function buildIndex(): Map<string, { item: Dhikr; sectionId: string; sectionTitle: string }> {
  const map = new Map<string, { item: Dhikr; sectionId: string; sectionTitle: string }>();
  for (const section of adhkarSections) {
    for (const item of section.items) {
      map.set(item.id, { item, sectionId: section.id, sectionTitle: section.title });
    }
  }
  for (const category of hisnCategories) {
    for (const item of category.items) {
      map.set(item.id, {
        item,
        sectionId: category.id,
        sectionTitle: category.title,
      });
    }
  }
  return map;
}

const INDEX = buildIndex();

export function FavoritesView() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(loadState().favorites);
    setHydrated(true);
  }, []);

  function remove(id: string) {
    const next = ids.filter((item) => item !== id);
    setIds(next);
    const state = loadState();
    saveState({ ...state, favorites: next });
  }

  if (!hydrated) {
    return (
      <div className="container-page py-16 text-center text-muted">
        لحظة، نفتح لك مفضلتك…
      </div>
    );
  }

  const resolved = ids
    .map((id) => INDEX.get(id))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  if (resolved.length === 0) {
    return (
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-xl rounded-5xl border border-line bg-surface p-8 text-center shadow-soft">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft text-primary-ink">
              <Icon name="sparkle" className="size-5" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold">
              لم تحفظ شيئًا بعد
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              إذا أعجبك ذكر وأردت العودة إليه، اضغط أيقونة الحفظ وسيظهر هنا.
            </p>
            <Link
              href="/adhkar"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-strong"
            >
              تصفّح الأذكار
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">المفضلة</h1>
          <p className="mt-2 text-sm text-muted">
            في مفضلتك {formatSavedDhikrCount(resolved.length)}
          </p>

          <ul className="mt-8 space-y-4">
            {resolved.map(({ item, sectionId, sectionTitle }) => (
              <li
                key={item.id}
                className="rounded-4xl border border-line bg-surface p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-quran text-lg leading-[2] text-foreground">
                    {item.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label="إزالة من المفضلة"
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                  >
                    <Icon name="close" className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>×{toArabicDigits(item.repeat)}</span>
                  <span>·</span>
                  <Link
                    href={`/adhkar/${sectionId}`}
                    className="text-primary-ink transition-colors hover:underline"
                  >
                    {sectionTitle}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}