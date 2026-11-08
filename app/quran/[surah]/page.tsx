import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSurah, quran } from "@/lib/content";
import { QuranReader } from "@/components/quran/quran-reader";

type Params = { surah: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { surah: surahParam } = await params;
  const number = Number(surahParam);
  const surah = getSurah(number);
  if (!surah) return {};
  return {
    title: `سورة ${surah.name} | قريب`,
    description: `قراءة سورة ${surah.name} (${surah.ayahCount} آية) بالرسم العثماني.`,
  };
}

export default async function QuranSurahPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { surah: surahParam } = await params;
  const number = Number(surahParam);
  if (!Number.isInteger(number)) notFound();
  const surah = getSurah(number);
  if (!surah) notFound();

  const surahs = quran.surahs.map((item) => item.number);
  const position = surahs.indexOf(number);
  const prevSurah = position > 0 ? surahs[position - 1] : null;
  const nextSurah =
    position >= 0 && position < surahs.length - 1
      ? surahs[position + 1]
      : null;

  return (
    <QuranReader surah={surah} prevSurah={prevSurah} nextSurah={nextSurah} />
  );
}

export const instant = false;

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ surah: String(i + 1) }));
}