import type { Metadata } from "next";
import { quran } from "@/lib/content";
import { SurahIndex } from "@/components/quran/surah-index";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "القرآن الكريم | قريب",
  description: "فهرس سور القرآن الكريم (١١٤ سورة) للقراءة بخط عثماني.",
};

export default function QuranIndexPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="القرآن الكريم"
          title="فهرس السور"
          description="١١٤ سورة. ابحث واختر سورة للقراءة."
        />
        <div className="mt-8">
          <SurahIndex surahs={quran.surahs} />
        </div>
      </div>
    </section>
  );
}