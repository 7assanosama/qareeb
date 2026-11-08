import { adhkarSections } from "./adhkar";
import { hisnCategories } from "./hisn";
import { quran } from "./quran";
import type {
  DhikrSection,
  HisnCategory,
  QuranData,
} from "@/lib/types/content";

export type ContentLibrary = {
  adhkar: readonly DhikrSection[];
  hisn: readonly HisnCategory[];
  quran: QuranData;
};

export const contentLibrary: ContentLibrary = {
  adhkar: adhkarSections,
  hisn: hisnCategories,
  quran,
};

export * from "./adhkar";
export * from "./hisn";
export * from "./quran";
export * from "./site";

// --- Validation (runs on import in dev/build) ---
function validateAdhkar(sections: readonly DhikrSection[]): void {
  const ids = new Set<string>();
  for (const section of sections) {
    if (!section.id || !section.title) {
      throw new Error(`Invalid adhkar section: ${JSON.stringify(section.id)}`);
    }
    for (const item of section.items) {
      if (!item.id || ids.has(item.id)) {
        throw new Error(`Duplicate or missing dhikr id: ${item.id}`);
      }
      ids.add(item.id);
      if (!item.text || item.text.trim().length === 0) {
        throw new Error(`Empty dhikr text: ${item.id}`);
      }
      if (typeof item.repeat !== "number" || item.repeat < 1) {
        throw new Error(`Invalid repeat count: ${item.id}`);
      }
      if (!item.source?.source || !item.source?.reference) {
        throw new Error(`Missing source for dhikr: ${item.id}`);
      }
      if (typeof item.order !== "number") {
        throw new Error(`Missing order for dhikr: ${item.id}`);
      }
    }
  }
}

function validateHisn(categories: readonly HisnCategory[]): void {
  const ids = new Set<string>();
  for (const category of categories) {
    if (!category.id || !category.title) {
      throw new Error(`Invalid hisn category: ${JSON.stringify(category.id)}`);
    }
    for (const item of category.items) {
      if (!item.id || ids.has(item.id)) {
        throw new Error(`Duplicate or missing hisn id: ${item.id}`);
      }
      ids.add(item.id);
      if (!item.text || item.text.trim().length === 0) {
        throw new Error(`Empty hisn text: ${item.id}`);
      }
      if (!item.source?.source || !item.source?.reference) {
        throw new Error(`Missing source for hisn: ${item.id}`);
      }
    }
  }
}

function validateQuran(data: QuranData): void {
  if (data.surahs.length !== 114) {
    throw new Error(`Expected 114 surahs, got ${data.surahs.length}`);
  }
  const seen = new Set<number>();
  let totalAyahs = 0;
  for (const surah of data.surahs) {
    if (seen.has(surah.number)) {
      throw new Error(`Duplicate surah number: ${surah.number}`);
    }
    seen.add(surah.number);
    if (surah.ayahs.length !== surah.ayahCount) {
      throw new Error(
        `Ayah count mismatch for surah ${surah.number}: ${surah.ayahs.length} vs ${surah.ayahCount}`,
      );
    }
    const ayahNumbers = new Set<number>();
    for (const ayah of surah.ayahs) {
      if (ayahNumbers.has(ayah.number)) {
        throw new Error(`Duplicate ayah ${ayah.number} in surah ${surah.number}`);
      }
      ayahNumbers.add(ayah.number);
      if (!ayah.text || ayah.text.trim().length === 0) {
        throw new Error(`Empty ayah text: ${surah.number}:${ayah.number}`);
      }
    }
    totalAyahs += surah.ayahs.length;
  }
  if (totalAyahs !== 6236) {
    throw new Error(`Expected 6236 ayahs, got ${totalAyahs}`);
  }
}

// Cross-collection id uniqueness (adhkar ids must not clash with hisn ids)
function validateCrossIds(): void {
  const all = new Set<string>();
  for (const section of adhkarSections) {
    for (const item of section.items) {
      if (all.has(item.id)) {
        throw new Error(`Duplicate id across collections: ${item.id}`);
      }
      all.add(item.id);
    }
  }
  for (const category of hisnCategories) {
    for (const item of category.items) {
      if (all.has(item.id)) {
        throw new Error(`Duplicate id across collections: ${item.id}`);
      }
      all.add(item.id);
    }
  }
}

validateAdhkar(adhkarSections);
validateHisn(hisnCategories);
validateQuran(quran);
validateCrossIds();