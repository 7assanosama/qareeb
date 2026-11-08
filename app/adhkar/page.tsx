import type { Metadata } from "next";
import Link from "next/link";
import { adhkarSections } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "الأذكار | قريب",
  description: "أقسام الأذكار: صبح، مساء، نوم، استيقاظ، بعد الصلاة، والأدعية النبوية.",
};

export default function AdhkarIndexPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="الأذكار"
          title="أقسام الأذكار"
          description="اختر قسماً للقراءة مع عداد تفاعلي وحفظ تقدمك."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adhkarSections.map((section) => (
            <Link
              key={section.id}
              href={`/adhkar/${section.id}`}
              className="group block rounded-4xl border border-line bg-surface p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift"
            >
              <h3 className="font-display text-lg font-bold">{section.title}</h3>
              {section.description ? (
                <p className="mt-2 text-sm leading-7 text-muted">
                  {section.description}
                </p>
              ) : null}
              <p className="mt-4 text-xs text-muted">
                {section.items.length} ذكر
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary-ink">
                افتح القسم
                <Icon name="arrow-left" className="size-3.5 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}