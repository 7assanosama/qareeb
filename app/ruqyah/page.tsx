import type { Metadata } from "next";
import { RuqyahPageContent } from "@/components/ruqyah/ruqyah-page";

const description =
  "آيات وأدعية الرقية الشرعية من الكتاب والسنة, مع بيان المصدر ودرجة الحديث, وقارئ يحفظ تقدمك ويدعم التلاوة والمفضلة.";

export const metadata: Metadata = {
  title: "الرقية الشرعية | قريب",
  description,
  alternates: {
    canonical: "https://qareeb.sifrmind.com/ruqyah",
  },
  openGraph: {
    type: "article",
    locale: "ar_SA",
    siteName: "قريب",
    title: "الرقية الشرعية | قريب",
    description,
    url: "https://qareeb.sifrmind.com/ruqyah",
  },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function RuqyahPage({ searchParams }: Props) {
  return <RuqyahPageContent searchParams={searchParams} />;
}

export const instant = false;
