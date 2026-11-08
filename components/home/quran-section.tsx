import { getAyah, quran } from "@/lib/content";
import { Icon } from "@/components/ui/icon";

const totalAyahs = quran.surahs.reduce((sum, surah) => sum + surah.ayahCount, 0);
const facts = [`${quran.surahs.length} سورة`, `${totalAyahs} آية`];

export function QuranSection() {
  return (
    <section
      id="quran"
      className="border-y border-line/70 bg-surface-muted/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <div className="relative overflow-hidden rounded-5xl border border-line bg-surface shadow-soft">
          <div
            className="geometric-pattern absolute inset-0 text-primary-ink"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:p-14">
            <div>
              <p className="flex items-center gap-2.5 text-sm font-semibold text-primary-ink">
                <span className="h-px w-7 bg-accent" aria-hidden="true" />
                القرآن الكريم
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold leading-[1.35] sm:text-4xl">
                اقرأ على مهل، وتدبر بطمأنينة
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-8 text-muted sm:text-base">
                مساحة للقراءة الهادئة بعيداً عن التشتت، بخط عربي أصيل ومساحات
                بيضاء تريح العين وتترك للنص سكينته.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full border border-line bg-background px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {fact}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex max-w-md items-start gap-3 rounded-2xl border border-line bg-background/60 p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-ink">
                  <Icon name="book" className="size-4" />
                </span>
                <p className="text-sm leading-6 text-muted">
                  نص قرآني واضح بخط مخصص للقراءة، مع تباين مريح في الوضعين
                  النهاري والليلي.
                </p>
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-4xl border border-accent/25 bg-primary-soft p-7 text-center sm:p-9">
              <div
                className="geometric-pattern absolute inset-0 text-primary-ink"
                aria-hidden="true"
              />
              <span className="relative mx-auto grid size-10 place-items-center rounded-full border border-accent/30 bg-surface/70 text-accent">
                <Icon name="sparkle" className="size-4" />
              </span>
              <blockquote className="relative mt-6 font-quran text-[1.8rem] leading-[2.1] text-foreground sm:text-[2.1rem]">
                {getAyah(73, 4)}
              </blockquote>
              <figcaption className="relative mt-5 flex items-center justify-center gap-2 text-xs text-muted">
                <span className="h-px w-4 bg-accent" aria-hidden="true" />
                سورة المزمل · الآية ٤
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
