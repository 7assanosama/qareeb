import type { IconName } from "@/components/ui/icon";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "الرئيسية", href: "#home" },
  { label: "الأذكار", href: "#adhkar" },
  { label: "القرآن", href: "/quran" },
  { label: "التسبيح", href: "#tasbih" },
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
    description: "بداية هادئة ليومك، تفتتحها بحمد الله وذكره.",
    icon: "sunrise",
    sectionId: "morning",
  },
  {
    title: "أذكار المساء",
    description: "سكينة تختم بها يومك، وتستقبل بها ليلك.",
    icon: "moon-star",
    sectionId: "evening",
  },
  {
    title: "أذكار النوم",
    description: "نَمْ على ذكر الله، واطمئن قلبك قبل أن تغفو.",
    icon: "bed",
    sectionId: "sleep",
  },
  {
    title: "أذكار الاستيقاظ",
    description: "أول ما تفتح به عينيك حمد وشكر لله.",
    icon: "sun",
    sectionId: "waking",
  },
  {
    title: "أذكار بعد الصلاة",
    description: "لحظة ذكر تختم بها فريضتك قبل أن تنصرف.",
    icon: "prayer",
    sectionId: "after-prayer",
  },
  {
    title: "الأدعية المأثورة",
    description: "دعوات ثابتة من الكتاب والسنة، بلا زيادة ولا نقصان.",
    icon: "hands",
    sectionId: "prophetic-duas",
  },
];
