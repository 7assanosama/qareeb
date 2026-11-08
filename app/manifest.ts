import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "قريب",
    short_name: "قريب",
    description:
      "منصة إسلامية هادئة للأذكار والقرآن والأدعية، للذكر والطمأنينة.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F8F7F2",
    theme_color: "#174C3C",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}