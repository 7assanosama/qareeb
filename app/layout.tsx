import type { Metadata, Viewport } from "next";
import {
  Alexandria,
  Amiri_Quran,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { OfflineIndicator } from "@/components/pwa/offline-indicator";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import "./globals.css";

const headingFont = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const quranFont = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem("qareeb-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var v=d?"dark":"light";document.documentElement.dataset.theme=v;document.documentElement.style.colorScheme=v;}catch(e){}})();`;

const description =
  "قريب منصة إسلامية هادئة للأذكار والقرآن والأدعية، تساعدك على الوصول إلى الذكر بسهولة وطمأنينة.";

export const metadata: Metadata = {
  title: "قريب | للذكر والقرآن",
  description,
  applicationName: "قريب",
  icons: {
    icon: "/icon.svg",
    apple: "/icons/icon-180.png",
  },
  keywords: ["قريب", "أذكار", "قرآن", "أدعية", "تسبيح"],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "قريب",
    title: "قريب | للذكر والقرآن",
    description,
    url: "https://qareeb.app",
  },
  alternates: {
    canonical: "https://qareeb.app",
    languages: { ar: "https://qareeb.app" },
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
      className={`${headingFont.variable} ${bodyFont.variable} ${quranFont.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          انتقل إلى المحتوى
        </a>
        <Header />
        <main id="main-content" className="flex-1">
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
              url: "https://qareeb.app",
              inLanguage: "ar",
              description:
                "منصة إسلامية هادئة للأذكار والقرآن والأدعية.",
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
