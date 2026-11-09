import { navLinks } from "@/lib/content/site";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand text-white">
      <div
        className="geometric-pattern absolute inset-0 text-white"
        aria-hidden="true"
      />

      <div className="container-page relative pt-4 pb-7">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <Logo variant="onDark" />

            <p className="max-w-sm text-sm leading-5 text-white/70">
              مساحة تجمع لك الأذكار والقرآن والأدعية، لتجد طريقك إلى ذكر الله في
              تفاصيل يومك، وتبقى على صلة به في كل حين.
            </p>

            <nav aria-label="روابط الموقع" className="mt-5">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <figure className="relative overflow-hidden rounded-4xl border border-white/12 bg-white/[0.06] px-9 pt-5 pb-8">
            <blockquote className="font-quran text-2xl text-center text-white leading-12">
              رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ
              عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ
              وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-2 text-xs text-white/70">
              <span className="h-px w-4 bg-accent" aria-hidden="true" />
              من دعاء سليمان عليه السلام · سورة النمل، الآية ١٩
            </figcaption>
          </figure>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© ٢٠٢٦ قريب. جميع الحقوق محفوظة.</p>
          <p>نسأل الله أن يجعلنا وإياكم من الذاكرين له كثيرًا.</p>
        </div>
      </div>
    </footer>
  );
}
