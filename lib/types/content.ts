export type HadithGrade = "sahih" | "hasan" | "daif" | "quran" | "general";

export type SourceReference = {
  source: string;
  reference: string;
  grade: HadithGrade;
  note?: string;
};

export type Dhikr = {
  id: string;
  text: string;
  repeat: number;
  source: SourceReference;
  explanation?: string;
  order: number;
};

export type DhikrSection = {
  id: string;
  title: string;
  description?: string;
  items: readonly Dhikr[];
};

export type HisnCategory = {
  id: string;
  title: string;
  description?: string;
  items: readonly Dhikr[];
};

export type QuranAyah = {
  number: number;
  text: string;
};

export type QuranSurah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: "Meccan" | "Medinan";
  ayahCount: number;
  ayahs: readonly QuranAyah[];
};

export type QuranData = {
  source: string;
  edition: string;
  surahs: readonly QuranSurah[];
};