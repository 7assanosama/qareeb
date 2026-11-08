import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

const highlights = ["أذكار مأثورة", "قرآن كريم", "أدعية مختارة"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -start-32 -top-24 size-[30rem] rounded-full bg-primary-soft/70 blur-3xl dark:bg-primary-soft/40" />
        <div className="absolute -end-24 top-44 size-80 rounded-full bg-accent-soft/80 blur-3xl dark:bg-accent-soft/30" />
      </div>

      <div className="container-page relative grid items-center gap-16 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pb-28 lg:pt-24">
        <div className="text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs font-medium text-muted shadow-soft backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            أهلاً بك في قريب
          </span>

          <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-[2.65rem] font-bold leading-[1.28] sm:text-5xl lg:mx-0 lg:text-[3.55rem]">
            طمأنينة تبدأ بذكرٍ{" "}
            <span className="relative inline-block text-primary-ink">
              قريب
              <svg
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-1.5 start-0 h-2.5 w-full text-accent"
              >
                <path
                  d="M2 8c24-6 64-7 116-3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-muted sm:text-base lg:mx-0">
            مساحة هادئة تجمع الأذكار والقرآن والأدعية، لتكون رفيقك اليومي في
            لحظات السكينة، بعيداً عن التشتت.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <ButtonLink href="#adhkar" withArrow className="w-full sm:w-auto">
              ابدأ الآن
            </ButtonLink>
            <ButtonLink
              href="#quran"
              variant="outline"
              className="w-full sm:w-auto"
            >
              استكشف القرآن
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted lg:justify-start">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Icon name="check" className="size-3.5 text-primary-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[24rem] pb-8">
          <div
            className="absolute inset-x-4 top-8 h-full rounded-[3rem] bg-primary-soft/80 blur-2xl dark:bg-primary-soft/50"
            aria-hidden="true"
          />
          <div className="arch-frame relative overflow-hidden border border-accent/30 bg-primary-soft px-6 pb-10 pt-12 text-center shadow-soft sm:px-8 sm:pt-14">
            <div
              className="geometric-pattern absolute inset-0 text-primary-ink"
              aria-hidden="true"
            />
            <span className="relative mx-auto grid size-11 place-items-center rounded-full border border-accent/30 bg-surface/70 text-accent">
              <Icon name="sparkle" className="size-4" />
            </span>
            <p className="relative mt-7 font-quran text-[1.65rem] leading-[2.15] text-foreground sm:text-[1.85rem]">
              أَلَا بِذِكْرِ اللَّهِ
              <br />
              تَطْمَئِنُّ الْقُلُوبُ
            </p>
            <div
              className="relative mx-auto mt-6 h-px w-10 bg-accent/50"
              aria-hidden="true"
            />
            <p className="relative mt-4 text-xs text-muted">
              سورة الرعد · الآية ٢٨
            </p>
          </div>

          <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-2.5 shadow-lift sm:left-4 sm:translate-x-0">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon name="sparkle" className="size-3.5" />
            </span>
            <span className="text-start">
              <span className="block text-[10px] text-muted">لحظة سكينة</span>
              <span className="block whitespace-nowrap text-xs font-semibold text-foreground">
                ذكرٌ يطمئن القلب
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
