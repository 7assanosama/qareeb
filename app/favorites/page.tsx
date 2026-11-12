import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/favorites-view";
import { buildFavoriteIndex } from "@/lib/content/favorites";

export const metadata: Metadata = {
  title: "المفضلة | قريب",
  description: "الأذكار والرقية التي حفظتها في المفضلة, جاهزة لك في أي وقت.",
  robots: { index: false, follow: true },
};

const favoriteIndex = buildFavoriteIndex();

export default function FavoritesPage() {
  return <FavoritesView index={favoriteIndex} />;
}