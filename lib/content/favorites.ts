import { adhkarSections } from "./adhkar";
import { hisnCategories } from "./hisn";
import { ruqyahDuas, ruqyahVerses, toFavoriteDhikr } from "./ruqyah";
import type { Dhikr } from "@/lib/types/content";

export type FavoriteEntry = {
  item: Dhikr;
  sectionId: string;
  sectionTitle: string;
  href: string;
  linkLabel: string;
};

/**
 * Builds the lookup used by the favorites page.
 *
 * This lives on the server so the client bundle does not have to include the
 * full Quran data just to resolve the selected ruqyah verses.
 */
export function buildFavoriteIndex(): Record<string, FavoriteEntry> {
  const index: Record<string, FavoriteEntry> = {};

  for (const section of adhkarSections) {
    for (const item of section.items) {
      index[item.id] = {
        item,
        sectionId: section.id,
        sectionTitle: section.title,
        href: `/adhkar/${section.id}`,
        linkLabel: section.title,
      };
    }
  }

  for (const category of hisnCategories) {
    for (const item of category.items) {
      index[item.id] = {
        item,
        sectionId: category.id,
        sectionTitle: category.title,
        // Hisn categories do not have dedicated routes; offer the adhkar
        // index as a clear, valid fallback destination instead of a 404.
        href: "/adhkar",
        linkLabel: "تصفح الأذكار",
      };
    }
  }

  for (const item of ruqyahVerses) {
    index[item.id] = {
      item: toFavoriteDhikr(item),
      sectionId: "ruqyah-verses",
      sectionTitle: "الرقية الشرعية — الآيات",
      href: `/ruqyah?item=${item.id}`,
      linkLabel: "الرقية الشرعية — الآيات",
    };
  }

  for (const item of ruqyahDuas) {
    index[item.id] = {
      item: toFavoriteDhikr(item),
      sectionId: "ruqyah-duas",
      sectionTitle: "الرقية الشرعية — الأدعية",
      href: `/ruqyah?item=${item.id}`,
      linkLabel: "الرقية الشرعية — الأدعية",
    };
  }

  return index;
}
