import { adhkarSections } from "./adhkar";
import { hisnCategories } from "./hisn";
import { quran } from "./quran";
import { ruqyah, ruqyahDuas, ruqyahVerses } from "./ruqyah";
import type {
  DhikrSection,
  HisnCategory,
  QuranData,
  RuqyahContent,
} from "@/lib/types/content";

export type ContentLibrary = {
  adhkar: readonly DhikrSection[];
  hisn: readonly HisnCategory[];
  quran: QuranData;
  ruqyah: RuqyahContent;
};

export const contentLibrary: ContentLibrary = {
  adhkar: adhkarSections,
  hisn: hisnCategories,
  quran,
  ruqyah,
};

export * from "./adhkar";
export * from "./hisn";
export * from "./quran";
export * from "./ruqyah";
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

function validateRuqyah(content: RuqyahContent): void {
  const ids = new Set<string>();

  for (const item of [...content.verses, ...content.duas]) {
    if (!item.id || ids.has(item.id)) {
      throw new Error(`Duplicate or missing ruqyah id: ${item.id}`);
    }
    ids.add(item.id);

    if (!item.text || item.text.trim().length === 0) {
      throw new Error(`Empty ruqyah text: ${item.id}`);
    }
    if (typeof item.repeat !== "number" || item.repeat < 1) {
      throw new Error(`Invalid ruqyah repeat count: ${item.id}`);
    }
    if (!item.source?.source || !item.source?.reference) {
      throw new Error(`Missing source for ruqyah item: ${item.id}`);
    }
    if (typeof item.order !== "number") {
      throw new Error(`Missing order for ruqyah item: ${item.id}`);
    }
    if (item.kind === "dua" && !item.title.trim()) {
      throw new Error(`Missing title for ruqyah dua: ${item.id}`);
    }

    if (item.kind === "verse") {
      if (item.ayahs.length === 0) {
        throw new Error(`Ruqyah verse item has no ayahs: ${item.id}`);
      }
      if (item.ayahs.length !== item.toAyah - item.fromAyah + 1) {
        throw new Error(`Ruqyah verse range mismatch: ${item.id}`);
      }
      if (item.ayahs.some((ayah) => !ayah.text || ayah.text.trim().length === 0)) {
        throw new Error(`Ruqyah verse item contains an empty ayah: ${item.id}`);
      }
      if (item.text !== item.ayahs.map((ayah) => ayah.text).join(" ")) {
        throw new Error(`Ruqyah verse text does not match its ayahs: ${item.id}`);
      }
    }
  }

  const guideIds = new Set<string>();
  for (const guide of content.guidance) {
    if (!guide.id || guideIds.has(guide.id)) {
      throw new Error(`Duplicate or missing ruqyah guidance id: ${guide.id}`);
    }
    guideIds.add(guide.id);
    if (!guide.title.trim() || !guide.body.trim()) {
      throw new Error(`Invalid ruqyah guidance: ${guide.id}`);
    }
    if (typeof guide.order !== "number") {
      throw new Error(`Missing order for ruqyah guidance: ${guide.id}`);
    }
  }
}

// Cross-collection id uniqueness (adhkar, hisn, and ruqyah ids must not clash)
function validateCrossIds(): void {
  const all = new Set<string>();
  const add = (id: string) => {
    if (all.has(id)) {
      throw new Error(`Duplicate id across collections: ${id}`);
    }
    all.add(id);
  };

  for (const section of adhkarSections) {
    for (const item of section.items) add(item.id);
  }
  for (const category of hisnCategories) {
    for (const item of category.items) add(item.id);
  }
  for (const item of [...ruqyahVerses, ...ruqyahDuas]) add(item.id);
}

validateAdhkar(adhkarSections);
validateHisn(hisnCategories);
validateQuran(quran);
validateRuqyah(ruqyah);
validateCrossIds();