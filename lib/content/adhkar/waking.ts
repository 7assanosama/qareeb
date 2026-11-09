import type { DhikrSection } from "@/lib/types/content";

export const waking: DhikrSection = {
  id: "waking",
  title: "أذكار الاستيقاظ",
  description: "أول ما تستيقظ، احمد الله وابدأ يومك بذكره.",
  items: [
    {
      id: "waking-alhamd",
      text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      repeat: 1,
      source: {
        source: "صحيح البخاري",
        reference: "رقم 6312",
        grade: "sahih",
      },
      order: 1,
    },
    {
      id: "waking-la-ilaha",
      text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ. رَبِّ اغْفِرْ لِي",
      repeat: 1,
      source: {
        source: "صحيح البخاري",
        reference: "رقم 1154",
        grade: "sahih",
      },
      order: 2,
    },
    {
      id: "waking-alhamd-eyes",
      text: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ",
      repeat: 1,
      source: {
        source: "سنن الترمذي",
        reference: "رقم 3401",
        grade: "hasan",
      },
      order: 3,
    },
  ],
};