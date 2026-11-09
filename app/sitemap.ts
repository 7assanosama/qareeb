import type { MetadataRoute } from "next";
import { adhkarSections } from "@/lib/content/adhkar";
import { quran } from "@/lib/content/quran";

const BASE_URL = "https://qareeb.sifrmind.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/adhkar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quran`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/favorites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  for (const section of adhkarSections) {
    routes.push({
      url: `${BASE_URL}/adhkar/${section.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const surah of quran.surahs) {
    routes.push({
      url: `${BASE_URL}/quran/${surah.number}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return routes;
}
