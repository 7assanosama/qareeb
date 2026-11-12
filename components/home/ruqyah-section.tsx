import Link from "next/link";
import { QuranText } from "@/components/quran/quran-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { ruqyah } from "@/lib/content/ruqyah";
import type { HadithGrade } from "@/lib/types/content";
import { toArabicDigits } from "@/lib/utils";

const gradeLabels: Record<HadithGrade, string> = {
  quran: "قرآن",
  sahih: "صحيح",
  hasan: "حسن",
  daif: "ضعيف",
  general: "عام",
};

const features: readonly {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "book",
    title: "نصوص موثقة",
    description: "آيات وأدعية من الكتاب والسنة, دون إضافة غير ثابت.",
  },
  {
    icon: "check",
    title: "المصدر والدرجة",
    description: "مرجع كل نص ودرجته ظاهرة معه.",
  },
  {
    icon: "play",
    title: "تلاوة صوتية",
    description: "استمع للآيات, وتعمل دون اتصال بعد أول تشغيل.",
  },
  {
    icon: "bookmark",
    title: "متابعة ومفضلة",
    description: "يحفظ موضعك ويجمع ما تحب الرجوع إليه.",
  },
];

export function RuqyahSection() {
  const featuredVerse =
    ruqyah.verses.find((item) => item.id === "ruqyah-verse-ayat-al-kursi") ??
    ruqyah.verses[0];
  const featuredDuas = ruqyah.duas.slice(0, 2);

  return (
    <section
      id="ruqyah"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -inset-s-24 top-12 size-72 rounded-full bg-primary-soft/40 blur-3xl dark:bg-primary-soft/20" />
        <div className="absolute -inset-e-28 bottom-0 size-80 rounded-full bg-accent-soft/50 blur-3xl dark:bg-accent-soft/20" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          eyebrow="الرقية الشرعية"
          title="شِفاءٌ وطمأنينة من كتاب الله وسنة نبيه"
          description="آيات وأدعية ثابتة مع بيان المصدر ودرجة الحديث, وقارئ يحفظ موضعك ويدعم التلاوة والمفضلة."
          action={
            <ButtonLink href="/ruqyah" withArrow>
              ابدأ الرقية
            </ButtonLink>
          }
        />

        <div className="relative mt-10 overflow-hidden rounded-5xl border border-line bg-surface shadow-soft">
          <div
            className="geometric-pattern absolute inset-0 text-primary-ink"
            aria-hidden="true"
          />

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-line/70 p-6 sm:p-9 lg:border-b-0 lg:border-e lg:p-11">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-primary-ink">
                  <Icon name="book" className="size-3.5" />
                  من القرآن الكريم
                </span>

                <span className="text-xs text-muted">
                  {toArabicDigits(ruqyah.verses.length)} مواضع قرآنية
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold">
                {featuredVerse.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted">
                {featuredVerse.description}
              </p>

              <div className="mt-6 rounded-3xl border border-accent/25 bg-primary-soft/45 p-5 sm:p-6">
                <QuranText
                  ayahs={featuredVerse.ayahs}
                  fontSize={21}
                  className="text-center"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-xs text-muted">
                  <span className="h-px w-4 bg-accent" aria-hidden="true" />
                  {featuredVerse.source.reference}
                </p>

                <Link
                  href={`/ruqyah?item=${featuredVerse.id}`}
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-primary-ink"
                >
                  اقرأها في القارئ
                  <Icon
                    name="arrow-left"
                    className="size-3.5 transition-transform group-hover:-translate-x-1"
                  />
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-9 lg:p-11">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-medium text-gold-ink">
                  <Icon name="hands" className="size-3.5" />
                  من السنة النبوية
                </span>

                <span className="text-xs text-muted">
                  {toArabicDigits(ruqyah.duas.length)} أدعية ثابتة
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {featuredDuas.map((dua) => (
                  <li
                    key={dua.id}
                    className="rounded-3xl border border-line bg-background/60 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base font-bold">
                        {dua.title}
                      </h4>

                      <span className="rounded-full border border-primary/15 bg-primary-soft px-2.5 py-0.5 text-[11px] font-medium text-primary-ink">
                        {gradeLabels[dua.source.grade]}
                      </span>
                    </div>

                    <p className="mt-2 font-quran text-[1.15rem] leading-[2.1] text-foreground">
                      {dua.text}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-[11px] text-muted">
                      <Icon name="check" className="size-3 text-primary-ink" />
                      {dua.source.source} · {dua.source.reference}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                href={
                  featuredDuas[0]
                    ? `/ruqyah?item=${featuredDuas[0].id}`
                    : "/ruqyah"
                }
                className="group mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-ink"
              >
                تصفّح جميع الأدعية
                <Icon
                  name="arrow-left"
                  className="size-3.5 transition-transform group-hover:-translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="relative border-t border-line/70 bg-background/40 px-6 py-6 sm:px-9 lg:px-11">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-primary-ink shadow-soft">
                    <Icon name={feature.icon} className="size-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="mt-1 text-xs leading-6 text-muted">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-muted">
          <Icon name="sparkle" className="mt-1 size-3.5 shrink-0 text-accent" />
          الرقية سبب, ولا تغني عن مراجعة الطبيب عند الحاجة. ولا تجوز بالطلاسم أو
          التمائم أو الاستعانة بغير الله.
        </p>
      </div>
    </section>
  );
}
