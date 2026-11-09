import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

interface HeroProps {
  highlights?: string[];
}

const DEFAULT_HIGHLIGHTS = [
  "أذكار من الكتاب والسنة",
  "قرآن كامل بخط واضح",
  "أدعية مختارة",
];

export function Hero({ highlights = DEFAULT_HIGHLIGHTS }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -inset-s-32 -top-24 size-120 rounded-full bg-primary-soft/70 blur-3xl dark:bg-primary-soft/40" />
        <div className="absolute -inset-e-24 top-44 size-80 rounded-full bg-accent-soft/80 blur-3xl dark:bg-accent-soft/30" />
      </div>

      <div className="container-page relative grid items-center gap-9 pt-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pt-24">
        {/* Visual Frame Section */}
        <div className="relative mx-auto w-full max-w-[24rem]">
          <div
            className="absolute inset-x-4 top-8 h-full rounded-[3rem] bg-primary-soft/80 blur-2xl dark:bg-primary-soft/50"
            aria-hidden="true"
          />
          <div className="arch-frame relative overflow-hidden border border-accent/30 bg-primary-soft px-6 pb-10 pt-12 text-center shadow-soft transition-transform duration-300 hover:scale-[1.01] sm:px-8 sm:pt-14">
            <div
              className="geometric-pattern absolute inset-0 text-primary-ink opacity-60"
              aria-hidden="true"
            />
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
        </div>
        {/* Content Section */}
        <div className="text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs font-medium text-muted shadow-soft backdrop-blur transition-all duration-300 hover:bg-surface">
            رفيقك اليومي في الذكر والطمأنينة
          </span>
          <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-[2.65rem] font-bold leading-[1.75] sm:text-5xl lg:mx-0 lg:text-[3.55rem]">
            اجعل لذكرِ الله مكانًا{" "}
            <span className="relative inline-block text-primary-ink">
              في يومك
              <svg
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-1.5 inset-s-0 h-2.5 w-full text-accent"
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
            في قريب تجد أذكارك وأدعيتك والقرآن كاملًا في مكان واحد. افتحه في
            أي لحظة تحتاج فيها إلى ذكر يطمئن قلبك.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <ButtonLink href="#adhkar" withArrow className="w-full sm:w-auto">
              ابدأ بذكرك
            </ButtonLink>
            <ButtonLink
              href="#quran"
              variant="outline"
              className="w-full sm:w-auto"
            >
              اقرأ القرآن
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted lg:justify-start">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Icon name="check" className="size-3.5 text-primary-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
