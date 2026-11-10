import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { InlineScript } from "@/components/layout/inline-script";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { OfflineIndicator } from "@/components/pwa/offline-indicator";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import "./globals.css";

/*
 * KFGQPC Uthmanic Script HAFS (الإصدار 0.09) — الخط الأصلي لخط الرسم
 * العثماني من مجمع الملك فهد لطباعة المصحف الشريف, مع جداول GSUB/GPOS
 * كاملة (init/medi/fina/liga/calt وmark/mkmk/curs).
 * الملف المرخص: app/fonts/uthmanic-hafs.otf (راجع app/fonts/README.md).
 * next/font/local يقدّمه دون تعديل فيبقى التركيب الرسومي سليمًا, مع
 * تحميل مسبق تلقائي وخط احتياطي مضبوط المقاييس لتقليل CLS.
 * هذا الخط هو الخط الأساسي لجميع نصوص الموقع (عربي).
 */
const quranFont = localFont({
  variable: "--font-kfgqpc",
  src: "./fonts/uthmanic-hafs.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
});

const themeScript = `(function(){try{var t=localStorage.getItem("qareeb-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var v=d?"dark":"light";document.documentElement.dataset.theme=v;document.documentElement.style.colorScheme=v;}catch(e){}})();`;

const description =
  "مساحتك في قريب للذكر والطمأنينة: أذكار وقرآن وأدعية في مكان واحد, بخط مريح وتصفح بسيط.";

export const metadata: Metadata = {
  title: "قريب | للذكر والقرآن",
  description,
  applicationName: "قريب",
  icons: {
    icon: [
      {
        url: "/icons/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    apple: "/icons/icon.svg",
  },
  keywords: ["قريب", "أذكار", "قرآن", "أدعية", "تسبيح"],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "قريب",
    title: "قريب | للذكر والقرآن",
    description,
    url: "https://qareeb.sifrmind.com",
  },
  alternates: {
    canonical: "https://qareeb.sifrmind.com",
    languages: { ar: "https://qareeb.sifrmind.com" },
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1411" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="light"
      suppressHydrationWarning
      className={`${quranFont.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          انتقل إلى المحتوى الرئيسي
        </a>
        <Header />
        <main
          id="main-content"
          className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))]"
        >
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "قريب",
              url: "https://qareeb.sifrmind.com",
              inLanguage: "ar",
              description:
                "أذكار وقرآن وأدعية في مكان واحد, بخط مريح وتصفح بسيط.",
            }),
          }}
        />
        <OfflineIndicator />
        <InstallPrompt />
        <ServiceWorkerRegister />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
