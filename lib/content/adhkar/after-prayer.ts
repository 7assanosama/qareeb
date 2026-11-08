import type { DhikrSection } from "@/lib/types/content";

export const afterPrayer: DhikrSection = {
  id: "after-prayer",
  title: "أذكار ما بعد الصلاة",
  description: "أذكار ثابتة تُقال بعد الفريضة قبل الانصراف.",
  items: [
    {
      id: "after-prayer-istighfar-3",
      text: "أَسْتَغْفِرُ اللَّهَ",
      repeat: 3,
      source: {
        source: "صحيح مسلم",
        reference: "كتاب المساجد، باب الذكر بعد الصلاة",
        grade: "sahih",
      },
      order: 1,
    },
    {
      id: "after-prayer-salam",
      text: "اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      repeat: 1,
      source: {
        source: "صحيح مسلم",
        reference: "رقم 591",
        grade: "sahih",
      },
      order: 2,
    },
    {
      id: "after-prayer-subhan-33",
      text: "سُبْحَانَ اللَّهِ",
      repeat: 33,
      source: {
        source: "صحيح مسلم",
        reference: "رقم 597",
        grade: "sahih",
      },
      explanation: "يُقال بعد كل فريضة.",
      order: 3,
    },
    {
      id: "after-prayer-alhamd-33",
      text: "الْحَمْدُ لِلَّهِ",
      repeat: 33,
      source: {
        source: "صحيح مسلم",
        reference: "رقم 597",
        grade: "sahih",
      },
      order: 4,
    },
    {
      id: "after-prayer-akbar-33",
      text: "اللَّهُ أَكْبَرُ",
      repeat: 33,
      source: {
        source: "صحيح مسلم",
        reference: "رقم 597",
        grade: "sahih",
      },
      order: 5,
    },
    {
      id: "after-prayer-tawhid-1",
      text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      repeat: 1,
      source: {
        source: "صحيح مسلم",
        reference: "رقم 597",
        grade: "sahih",
      },
      explanation: "تمام المائة (٣٣ + ٣٣ + ٣٣ + ١).",
      order: 6,
    },
    {
      id: "after-prayer-ayat-kursi",
      text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      repeat: 1,
      source: {
        source: "القرآن الكريم — سورة البقرة، الآية ٢٥٥",
        reference: "البقرة ٢٥٥",
        grade: "quran",
      },
      explanation: "من قرأ آية الكرسي دبر كل صلاة لم يمنعه من دخول الجنة إلا الموت (النسائي، صححه الألباني).",
      order: 7,
    },
  ],
};