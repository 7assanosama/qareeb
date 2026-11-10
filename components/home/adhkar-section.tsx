import Link from "next/link";
import { dhikrCategories } from "@/lib/content/site";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedDhikrCard } from "./featured-dhikr";

export function AdhkarSection() {
  return (
    <section id="adhkar" className="py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="الأذكار"
          title="اجعل لسانك عامرًا بذكر الله"
          description="أذكار وأدعية من القرآن والسنة, تجد بينها ما تبدأ به يومك وما تختم به ليلتك."
        />

        <FeaturedDhikrCard />

        <div id="categories" className="mt-16 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                اختر ما يوافق وقتك
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                لكل لحظة ذكر يقرّبك من الله, ابدأ بما تحتاج إليه الآن.
              </p>
            </div>
            <span className="hidden items-center gap-2 text-xs text-muted sm:flex"> 
              الذكر حياة القلوب
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dhikrCategories.map((category) => (
              <Link
                key={category.title}
                href={`/adhkar/${category.sectionId}`}
                className="group relative block overflow-hidden rounded-4xl border border-line bg-surface p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift sm:p-7"
              >
                <div
                  className="absolute -inset-s-10 -top-10 size-28 rounded-full bg-primary-soft/0 blur-2xl transition-colors duration-300 group-hover:bg-primary-soft/80"
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon name={category.icon} className="size-6" />
                  </span> 
                <h4 className="relative font-display text-lg font-bold">
                  {category.title}
                </h4>
                </div>
                <p className="relative mt-2 text-sm leading-7 text-muted">
                  {category.description}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary-ink">
                  اقرأ الأذكار
                  <Icon
                    name="arrow-left"
                    className="size-3.5 transition-transform group-hover:-translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
