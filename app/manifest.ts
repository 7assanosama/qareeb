import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "قريب – للذكر والطمأنينة",
    short_name: "قريب",
    description: "أذكارك وقرآنك وأدعيتك في مكان واحد، أينما كنت.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F8F7F2",
    theme_color: "#174C3C",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
