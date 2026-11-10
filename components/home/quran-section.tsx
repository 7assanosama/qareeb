import { getAyah, quran } from "@/lib/content"; 
import { Icon } from "@/components/ui/icon";
import { toArabicDigits } from "@/lib/utils";
import { ButtonLink } from "../ui/button-link";

const totalAyahs = quran.surahs.reduce(
  (sum, surah) => sum + surah.ayahCount,
  0,
);

const facts = [`${toArabicDigits(quran.surahs.length)} سورة`, `${toArabicDigits(totalAyahs)} آية`];

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

              <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-[1.35] sm:text-4xl">
                هنا تبدأ رحلتك مع كتاب الله
              </h2>

              <p className="mt-3 max-w-xl text-[15px] leading-8 text-muted sm:text-base">
                افتح المصحف, واقرأ آيات الله بتأنٍّ وتدبّر. مساحة تجمع لك سور
                القرآن الكريم في تجربة قراءة هادئة ومريحة للعين.
              </p>

              <div className="mt-5 flex max-w-md items-start gap-3 rounded-2xl border border-line bg-background/60 p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-ink">
                  <Icon name="book" className="size-4" />
                </span>

                <p className="text-sm leading-6 text-muted">
                  خذ وقتك مع الآيات, وتوقّف عند معانيها؛ فليس المقصود أن تنتهي
                  من القراءة, بل أن تنتفع بها.
                </p>
              </div>
            </div>
            <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-4xl border border-accent/25 bg-primary-soft p-7 text-center sm:p-9">
              <div
                className="geometric-pattern absolute inset-0 text-primary-ink"
                aria-hidden="true"
              />

              <blockquote className="relative font-quran text-[1.8rem] leading-[2.1] text-foreground sm:text-[2.1rem]">
                {getAyah(73, 4)}
              </blockquote>

              <figcaption className="relative mt-5 flex items-center justify-center gap-2 text-xs text-muted">
                <span className="h-px w-4 bg-accent" aria-hidden="true" />
                سورة المزمل · الآية ٤
              </figcaption>
            </figure>
            <div className="flex max-w-md flex-col items-start gap-2 rounded-2xl border border-line bg-background/60 p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-ink">
                  <Icon name="hands" className="size-4" />
                </span>
                <p className="text-xs leading-6 text-muted">
                  يضم القرآن الكريم ١١٤ سورة, وأكثر من ٦ آلاف آية, نزلت هدايةً
                  ونورًا للناس.
                </p>
              </div>

              <ul className="ms-11 flex flex-wrap gap-2">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full border border-line bg-background px-5 py-1.5 text-xs font-bold text-muted"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            <ButtonLink href="/quran" variant="light" withArrow>
              افتح المصحف
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
