import quranData from "./quran.json";
import type { QuranData, QuranSurah } from "@/lib/types/content";

export const quran: QuranData = quranData as QuranData;

export function getSurah(number: number): QuranSurah | undefined {
  return quran.surahs.find((surah) => surah.number === number);
}

export function getAyah(surahNumber: number, ayahNumber: number): string | undefined {
  const surah = getSurah(surahNumber);
  return surah?.ayahs.find((ayah) => ayah.number === ayahNumber)?.text;
}

export function searchSurahs(query: string): readonly QuranSurah[] {
  const normalized = query.trim();
  if (!normalized) return quran.surahs;
  return quran.surahs.filter(
    (surah) =>
      surah.name.includes(normalized) ||
      surah.englishName.toLowerCase().includes(normalized.toLowerCase()),
  );
}