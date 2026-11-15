# قريب — Qareeb

> مساحتك للذكر والطمأنينة: أذكار، قرآن، أدعية، رقية، وتسبيح في مكان واحد،
> بخط مريح وتصفح بسيط.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)

- **الموقع (live):** https://qareeb.sifrmind.com
- **اللغة:** العربية (RTL) — واجهة عربية بالكامل
- **النوع:** تطبيق ويب تقدمي (PWA) — قابل للتثبيت والعمل دون اتصال (جزئيًا)

## المزايا

- **الأذكار** — 6 أقسام: أذكار الصباح، المساء، النوم، الاستيقاظ، ما بعد الصلاة، والأدعية النبوية، مع مصادر وأعداد التكرار.
- **القرآن** — فهرس 114 سورة مع قارئ للآيات، تنقل بين السور، وبحث عن السورة.
- **الرقية** — آيات (الفاتحة، آية الكرسي، المعوذات، …) وأدعية نبوية (رقية جبريل، دعاء الشفاء، …) مع مصادر ودرجات التصحيح، وإرشادات (الرقية على النفس، النفث، الماء، تجنب الطلاسم).
- **التسبيح** — مسبحة إلكترونية.
- **المفضلة** — حفظ الأذكار والرقى محليًا (localStorage).
- **PWA** — manifest، service worker، مؤشر عدم الاتصال، ومطالبة بالتثبيت.
- **الثيم** — فاتح/داكن مع احترام تفضيل النظام.
- **Accessibility (a11y)** — رابط "انتقل إلى المحتوى الرئيسي"، فخ تركيز في القائمة mobile، دعم لوحة المفاتيح.
- **SEO** — sitemap، robots، JSON-LD، OpenGraph، عناوين بديلة (ar).

## التقنيات

| التقنية | الإصدار | الاستخدام |
|---|---|---|
| Next.js (App Router) | 16 | الإطار (server components، metadata، sitemap/robots) |
| React | 19 | واجهة المستخدم |
| TypeScript | 5 | كتابة typed |
| Tailwind CSS | 4 | التصميم |
| next/font (local) | — | خط KFGQPC Uthmanic HAFS (عربي) |
| Playwright | — | اختبارات E2E |
| ESLint | 9 | lint |

## متطلبات التشغيل

- Node.js 20+
- npm (أو yarn/pnpm/bun)

## البدء

```bash
# تثبيت الاعتماديات
npm install

# تشغيل خادم التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### أوامر أخرى

```bash
npm run build       # بناء للإنتاج
npm run start       # تشغيل بناء الإنتاج
npm run lint        # فحص ESLint
npx playwright test # اختبارات E2E
```

## هيكل المشروع

```
qareeb/
├── app/                  # Next.js App Router (صفحات، layout، manifest، sitemap، robots)
│   ├── adhkar/           # صفحة الأذكار (index + [section])
│   ├── quran/            # صفحة القرآن (index + [surah])
│   ├── ruqyah/           # صفحة الرقية
│   ├── favorites/        # صفحة المفضلة
│   └── ...
├── components/
│   ├── adhkar/           # قارئ الأذكار
│   ├── quran/            # قارئ القرآن
│   ├── ruqyah/           # قارئ الرقية
│   ├── home/             # أقسام الصفحة الرئيسية
│   ├── layout/           # header، footer، theme-toggle
│   ├── pwa/              # service worker، install prompt، offline indicator
│   └── ui/               # مكونات عامة
├── lib/
│   ├── content/          # محتوى (أذكار، قرآن، رقية، حصن Muslim)
│   ├── storage.ts        # localStorage (المفضلة، التقدم)
│   └── types/            # أنواع TypeScript
├── public/               # أيقونات، صور، sw.js
├── tests/e2e/            # اختبارات Playwright
└── playwright.config.ts
```

## النشر (Vercel)

أسهل طريقة للنشر هي [Vercel Platform](https://vercel.com/new). اربط المستودع وانشر. المتغيرات البيئية غير مطلوبة (المشروع لا يستخدم .env).

## المساهمة

1. Fork المستودع.
2. أنشئ فرعًا: `git checkout -b feat/your-feature`.
3. التزم بالتغييرات: `git commit -m "feat: ..."`.
4. ادفع: `git push origin feat/your-feature`.
5. افتح Pull Request.

يرجى الحفاظ على:
- RTL واللغة العربية في الواجهة.
- أنواع TypeScript (strict).
- اجتياز `npm run lint` و `npx playwright test`.

## الترخيص

جميع الحقوق محفوظة © ٢٠٢٦ قريب. (راجع footer.)

---

### English (short)

**Qareeb** is an Arabic (RTL) Next.js 16 web app offering dhikr (morning/evening/sleep/waking/after-prayer/prophetic du'as), a full Quran reader (114 surahs), ruqyah (verses & authenticated du'as with sources), a tasbih counter, and local favorites — as an installable PWA with dark/light theme. Live: https://qareeb.sifrmind.com. Run `npm install && npm run dev`.