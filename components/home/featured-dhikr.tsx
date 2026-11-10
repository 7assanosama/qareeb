import { afterPrayer } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { toArabicDigits } from "@/lib/utils";

export function FeaturedDhikrCard() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-5xl bg-brand text-white shadow-lift">
      <div
        className="geometric-pattern absolute inset-0 text-white"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-e-24 -top-24 size-72 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:p-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
            أتمم صلاتك بذكر الله
          </span>

          <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl lg:text-[2.35rem]">
            أذكار ما بعد الصلاة
          </h3>

          <p className="mt-4 max-w-lg text-[15px] leading-8 text-white/75">
            لا تجعل سلامك نهاية لحظاتك مع الله. خذ من وقتك دقائق للتسبيح
            والتحميد والتكبير, وأتبع صلاتك بذكره.
          </p>

          <ul className="mt-6 space-y-2">
            {afterPrayer.items.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                <span className="leading-7">{item.text}</span>
                <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/70">
                  ×{toArabicDigits(item.repeat)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="#tasbih" variant="light" withArrow>
              ابدأ التسبيح
            </ButtonLink>

            <a
              href="#categories"
              className="text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              تصفّح باقي الأذكار
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-4xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
            <p className="font-quran text-2xl leading-[2.1] sm:text-[1.75rem]">
              فَاذْكُرُونِي أَذْكُرْكُمْ
            </p>

            <p className="mt-4 text-xs text-white/65">
              سورة البقرة · الآية ١٥٢
            </p>

            <div className="mt-6 h-px w-full bg-white/10" aria-hidden="true" />

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-white/70">
                اجعل ذكر الله حاضرًا في يومك
              </span>

              <span className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Icon name="check" className="size-3.5 text-accent" />
                خير وطمأنينة
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
