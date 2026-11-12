import type { HadithGrade } from "@/lib/types/content";

export type RuqyahCopy = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: string;
  tabsLabel: string;
  tabs: {
    verses: string;
    duas: string;
  };
  progressVerse: string;
  progressDua: string;
  completedPercent: string;
  repeatOne: string;
  repeatTwo: string;
  repeatMany: string;
  repeatNoteLabel: string;
  sourceLabel: string;
  grade: Record<HadithGrade, string>;
  favoriteAdd: string;
  favoriteRemove: string;
  counterAction: string;
  counterReset: string;
  counterPrompt: string;
  counterDone: string;
  counterProgress: string;
  counterRemainingOne: string;
  counterRemainingTwo: string;
  counterRemainingMany: string;
  previous: string;
  next: string;
  nextDua: string;
  nextVerse: string;
  completedTitle: string;
  completedDescription: string;
  restart: string;
  openVerses: string;
  openDuas: string;
  home: string;
  empty: string;
  loading: string;
  guidanceTitle: string;
  guidanceDescription: string;
  evidenceLabel: string;
  audioPlay: string;
  audioPause: string;
  audioLoading: string;
  audioError: string;
  audioAyah: string;
  audioReciter: string;
  audioOfflineNote: string;
  verseLabel: string;
  duaLabel: string;
};

export const ruqyahCopy: RuqyahCopy = {
  eyebrow: "الرقية الشرعية",
  title: "آيات وأدعية الرقية",
  description:
    "نصوص ثابتة من الكتاب والسنة، مع بيان المصدر ودرجة الحديث. اقرأ بتأنٍّ، وتوجّه إلى الله وحده بالشفاء.",
  breadcrumb: "الرئيسية",
  tabsLabel: "أقسام الرقية",
  tabs: {
    verses: "آيات الرقية",
    duas: "الأدعية النبوية",
  },
  progressVerse: "الآية {current} من {total}",
  progressDua: "الدعاء {current} من {total}",
  completedPercent: "أتممت {percent}%",
  repeatOne: "تُقرأ مرة واحدة",
  repeatTwo: "تُقرأ مرتين",
  repeatMany: "تُقرأ {count} مرات",
  repeatNoteLabel: "ملاحظة العدد",
  sourceLabel: "المصدر",
  grade: {
    sahih: "صحيح",
    hasan: "حسن",
    daif: "ضعيف",
    quran: "من القرآن الكريم",
    general: "عام",
  },
  favoriteAdd: "إضافة إلى المفضلة",
  favoriteRemove: "إزالة من المفضلة",
  counterAction: "تسجيل مرة جديدة",
  counterReset: "إعادة العداد إلى الصفر",
  counterPrompt: "خذ وقتك في القراءة، واضغط على العداد بعد كل مرة.",
  counterDone: "أحسنت، أتممت القراءة. يمكنك الانتقال إلى التالي.",
  counterProgress: "أتممت {count} من {target}.",
  counterRemainingOne: "باقية لك مرة واحدة.",
  counterRemainingTwo: "تبقّت لك مرتان.",
  counterRemainingMany: "تبقّت {count} مرات.",
  previous: "السابق",
  next: "التالي",
  nextDua: "الدعاء التالي",
  nextVerse: "الآيات التالية",
  completedTitle: "أتممت {title}",
  completedDescription:
    "تقبّل الله منك، وجعل قراءتك نورًا وطمأنينة لقلبك. يمكنك العودة إلى هذا القسم في أي وقت.",
  restart: "أبدأ من جديد",
  openVerses: "العودة إلى الآيات",
  openDuas: "الانتقال إلى الأدعية",
  home: "العودة إلى الرئيسية",
  empty: "لا توجد نصوص في هذا القسم حاليًا.",
  loading: "نهيّئ لك الرقية، لحظات وتبدأ…",
  guidanceTitle: "طريقة الرقية",
  guidanceDescription:
    "إرشادات مختصرة مبنية على الكتاب والسنة، مع التنبيه إلى ما يجب تجنبه. الرقية سبب، ولا تغني عن مراجعة الطبيب عند الحاجة.",
  evidenceLabel: "الدليل",
  audioPlay: "تشغيل التلاوة",
  audioPause: "إيقاف التلاوة",
  audioLoading: "جارٍ تحميل التلاوة…",
  audioError: "تعذّر تشغيل التلاوة. تحقّق من الاتصال أو أعد المحاولة.",
  audioAyah: "الآية {current} من {total}",
  audioReciter: "القارئ: مشاري العفاسي",
  audioOfflineNote: "تُحفظ التلاوة بعد أول تشغيل لتعمل دون اتصال.",
  verseLabel: "آية",
  duaLabel: "دعاء",
};
