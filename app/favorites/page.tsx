import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/favorites-view";

export const metadata: Metadata = {
  title: "المفضلة | قريب",
  description: "الأذكار التي حفظتها في المفضلة، جاهزة لك في أي وقت.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return <FavoritesView />;
}