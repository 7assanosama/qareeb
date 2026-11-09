import type { IconName } from "@/components/ui/icon";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الأذكار", href: "/#adhkar" },
  { label: "القرآن", href: "/#quran" },
  { label: "التسبيح", href: "/#tasbih" },
  { label: "المفضلة", href: "/favorites" },
];

export type DhikrCategory = {
  title: string;
  description: string;
  icon: IconName;
  sectionId: string;
};

export const dhikrCategories: DhikrCategory[] = [
  {
    title: "أذكار الصباح",
    description: "ابدأ يومك بذكر الله، واستودعه قلبك ووقتك وكل خطواتك.",
    icon: "sunrise",
    sectionId: "morning",
  },
  {
    title: "أذكار المساء",
    description: "اجعل ختام يومك ذكرًا لله، وجدّد صلتك به قبل أن يمضي النهار.",
    icon: "moon-star",
    sectionId: "evening",
  },
  {
    title: "أذكار النوم",
    description: "قبل أن تغمض عينيك، اذكر ربك وفوّض أمرك إليه ونم على ذكره.",
    icon: "bed",
    sectionId: "sleep",
  },
  {
    title: "أذكار الاستيقاظ",
    description: "لك يوم جديد أنعم الله به عليك، فابدأه بالحمد والشكر والذكر.",
    icon: "sun",
    sectionId: "waking",
  },
  {
    title: "أذكار ما بعد الصلاة",
    description: "لا تجعل سلامك نهاية لحظاتك مع الله، وأتبع صلاتك بذكره.",
    icon: "prayer",
    sectionId: "after-prayer",
  },
  {
    title: "الأدعية النبوية",
    description:
      "من جوامع دعاء النبي ﷺ، كلمات تسأل بها الله الخير وتلجأ إليه في كل حال.",
    icon: "hands",
    sectionId: "prophetic-duas",
  },
];
