import type { Metadata } from "next";
import { quran } from "@/lib/content";
import { SurahIndex } from "@/components/quran/surah-index";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "القرآن الكريم | قريب",
  description: "تصفّح سور القرآن الكريم كاملة، واقرأ بخط عثماني مريح للعين.",
};

export default function QuranIndexPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="القرآن الكريم"
          title="سور القرآن"
          description="اختر سورة واقرأها على مهل. يمكنك البحث باسمها أو رقمها."
        />
        <div className="mt-8">
          <SurahIndex surahs={quran.surahs} />
        </div>
      </div>
    </section>
  );
}