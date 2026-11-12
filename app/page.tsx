import { AdhkarSection } from "@/components/home/adhkar-section";
import { Hero } from "@/components/home/hero";
import { QuranSection } from "@/components/home/quran-section";
import { RuqyahSection } from "@/components/home/ruqyah-section";
import { TasbihSection } from "@/components/home/tasbih-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AdhkarSection />
      <QuranSection />
      <RuqyahSection />
      <TasbihSection />
    </>
  );
}
