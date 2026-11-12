import { getSurah } from "../quran";
import { toArabicDigits } from "@/lib/utils";
import type {
  Dhikr,
  RuqyahContent,
  RuqyahDuaItem,
  RuqyahGuidance,
  RuqyahVerseItem,
  SourceReference,
} from "@/lib/types/content";

type VerseGroup = {
  id: string;
  title: string;
  description: string;
  surah: number;
  fromAyah: number;
  toAyah: number;
  repeat: number;
  repeatNote?: string;
  explanation?: string;
  order: number;
};

const verseGroups: readonly VerseGroup[] = [
  {
    id: "ruqyah-verse-fatiha",
    title: "سورة الفاتحة",
    description: "أمّ الكتاب والسبع المثاني, تُقرأ في الرقية وغيرها.",
    surah: 1,
    fromAyah: 1,
    toAyah: 7,
    repeat: 1,
    order: 1,
  },
  {
    id: "ruqyah-verse-ayat-al-kursi",
    title: "آية الكرسي",
    description: "آية من سورة البقرة, تُقرأ للتحصين والتعوذ.",
    surah: 2,
    fromAyah: 255,
    toAyah: 255,
    repeat: 1,
    order: 2,
  },
  {
    id: "ruqyah-verse-baqarah-end",
    title: "آخر آيتين من سورة البقرة",
    description: "خواتيم سورة البقرة, ورد الحث على قراءتهما.",
    surah: 2,
    fromAyah: 285,
    toAyah: 286,
    repeat: 1,
    order: 3,
  },
  {
    id: "ruqyah-verse-araf",
    title: "آيات السحر من سورة الأعراف",
    description: "من قصة موسى عليه السلام مع السحرة.",
    surah: 7,
    fromAyah: 116,
    toAyah: 122,
    repeat: 1,
    order: 4,
  },
  {
    id: "ruqyah-verse-yunus",
    title: "آيات السحر من سورة يونس",
    description: "بيان أن الله يبطل السحر ويحق الحق بكلماته.",
    surah: 10,
    fromAyah: 81,
    toAyah: 82,
    repeat: 1,
    order: 5,
  },
  {
    id: "ruqyah-verse-taha",
    title: "آيات السحر من سورة طه",
    description: "من قصة موسى عليه السلام مع السحرة.",
    surah: 20,
    fromAyah: 65,
    toAyah: 69,
    repeat: 1,
    order: 6,
  },
  {
    id: "ruqyah-verse-ikhlas",
    title: "سورة الإخلاص",
    description: "تُقرأ مع المعوذتين, وورد النفث بها في اليدين عند النوم.",
    surah: 112,
    fromAyah: 1,
    toAyah: 4,
    repeat: 3,
    repeatNote:
      "ورد في حديث عائشة رضي الله عنها أن النبي ﷺ كان يقرأ بها مع المعوذتين وينفث في يديه ويمسح جسده ثلاث مرات.",
    explanation: "ثبت العدد في حديث النوم: صحيح البخاري ٥٠١٧, وصحيح مسلم ٢١٩٢.",
    order: 7,
  },
  {
    id: "ruqyah-verse-falaq",
    title: "سورة الفلق",
    description: "من المعوذتين, تُقرأ للاستعاذة من الشرور.",
    surah: 113,
    fromAyah: 1,
    toAyah: 5,
    repeat: 3,
    repeatNote:
      "ورد في حديث عائشة رضي الله عنها أن النبي ﷺ كان يقرأ بها مع الإخلاص والناس وينفث في يديه ويمسح جسده ثلاث مرات.",
    explanation: "ثبت العدد في حديث النوم: صحيح البخاري ٥٠١٧, وصحيح مسلم ٢١٩٢.",
    order: 8,
  },
  {
    id: "ruqyah-verse-nas",
    title: "سورة الناس",
    description: "من المعوذتين, تُقرأ للاستعاذة من الوسواس.",
    surah: 114,
    fromAyah: 1,
    toAyah: 6,
    repeat: 3,
    repeatNote:
      "ورد في حديث عائشة رضي الله عنها أن النبي ﷺ كان يقرأ بها مع الإخلاص والفلق وينفث في يديه ويمسح جسده ثلاث مرات.",
    explanation: "ثبت العدد في حديث النوم: صحيح البخاري ٥٠١٧, وصحيح مسلم ٢١٩٢.",
    order: 9,
  },
];

function buildVerseSource(
  group: VerseGroup,
  surahName: string,
): SourceReference {
  const ayahLabel =
    group.fromAyah === group.toAyah
      ? `الآية ${toArabicDigits(group.fromAyah)}`
      : `الآيات ${toArabicDigits(group.fromAyah)}-${toArabicDigits(group.toAyah)}`;

  return {
    source: "القرآن الكريم",
    reference: `${surahName}, ${ayahLabel}`,
    grade: "quran",
  };
}

function buildVerseItem(group: VerseGroup): RuqyahVerseItem {
  const surah = getSurah(group.surah);

  if (!surah) {
    throw new Error(
      `Ruqyah verse group references a missing surah: ${group.surah}`,
    );
  }

  const ayahs = surah.ayahs.filter(
    (ayah) => ayah.number >= group.fromAyah && ayah.number <= group.toAyah,
  );

  if (ayahs.length !== group.toAyah - group.fromAyah + 1) {
    throw new Error(
      `Ruqyah verse group has an invalid ayah range: ${group.id}`,
    );
  }

  return {
    id: group.id,
    kind: "verse",
    title: group.title,
    description: group.description,
    text: ayahs.map((ayah) => ayah.text).join(" "),
    repeat: group.repeat,
    repeatNote: group.repeatNote,
    source: buildVerseSource(group, surah.name),
    explanation: group.explanation,
    ayahs,
    surahNumber: group.surah,
    surahName: surah.name,
    fromAyah: group.fromAyah,
    toAyah: group.toAyah,
    order: group.order,
  };
}

export const ruqyahVerses: readonly RuqyahVerseItem[] =
  verseGroups.map(buildVerseItem);

export const ruqyahDuas: readonly RuqyahDuaItem[] = [
  {
    id: "ruqyah-dua-jibril",
    kind: "dua",
    title: "رقية جبريل عليه السلام",
    text: "بِسْمِ اللَّهِ أَرْقِيكَ مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ, مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ, اللَّهُ يَشْفِيكَ, بِسْمِ اللَّهِ أَرْقِيكَ",
    repeat: 1,
    source: {
      source: "صحيح مسلم",
      reference: "٢١٨٦",
      grade: "sahih",
      note: "رقية جبريل عليه السلام للنبي ﷺ",
    },
    explanation:
      "رقية جامعة من جبريل عليه السلام للنبي ﷺ, فيها الاستعانة بالله والاستشفاء بكلامه.",
    order: 1,
  },
  {
    id: "ruqyah-dua-rabb-al-nas",
    kind: "dua",
    title: "دعاء الشفاء",
    text: "اللَّهُمَّ رَبَّ النَّاسِ, أَذْهِبِ الْبَاسَ, اشْفِ أَنْتَ الشَّافِي, لَا شَافِيَ إِلَّا أَنْتَ, شِفَاءً لَا يُغَادِرُ سَقَمًا",
    repeat: 1,
    source: {
      source: "صحيح البخاري, صحيح مسلم",
      reference: "البخاري ٥٦٧٥, مسلم ٢١٩١",
      grade: "sahih",
    },
    explanation:
      "كان النبي ﷺ يقوله للمريض, ويسأل الله الشفاء التام الذي لا يترك مرضًا.",
    order: 2,
  },
  {
    id: "ruqyah-dua-kalimat",
    kind: "dua",
    title: "التعوذ بكلمات الله التامات",
    text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    repeat: 1,
    source: {
      source: "صحيح مسلم",
      reference: "٢٧٠٨",
      grade: "sahih",
    },
    explanation:
      "يُقال عند نزول المنزل وعند التعوذ من الشرور, ولم يثبت تخصيصه بعدد معين في الرقية.",
    order: 3,
  },
  {
    id: "ruqyah-dua-izzah",
    kind: "dua",
    title: "التعوذ بعزة الله وقدرته",
    text: "أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
    repeat: 7,
    source: {
      source: "صحيح مسلم",
      reference: "٢٢٠٢",
      grade: "sahih",
    },
    explanation:
      "يضع يده على موضع الألم ويقول: بسم الله ثلاثًا, ثم يقول هذا الدعاء سبع مرات.",
    order: 4,
  },
  {
    id: "ruqyah-dua-shifa",
    kind: "dua",
    title: "سؤال الشفاء للمريض",
    text: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
    repeat: 7,
    source: {
      source: "سنن أبي داود, سنن الترمذي",
      reference: "أبو داود ٣١٠٦, الترمذي ٢٠٨٣",
      grade: "sahih",
      note: "صححه الألباني",
    },
    explanation:
      "تُقال عند المريض سبع مرات؛ ومن قالها له عوفي من ذلك المرض بإذن الله. ويجوز للمرء أن يدعو لنفسه بصيغة المتكلم.",
    order: 5,
  },
  {
    id: "ruqyah-dua-afiyah",
    kind: "dua",
    title: "دعاء العافية",
    text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي, اللَّهُمَّ عَافِنِي فِي سَمْعِي, اللَّهُمَّ عَافِنِي فِي بَصَرِي, لَا إِلَهَ إِلَّا أَنْتَ",
    repeat: 1,
    source: {
      source: "سنن أبي داود, مسند أحمد",
      reference: "أبو داود ٥٠٩٠, أحمد ٢٠٤٣٠",
      grade: "hasan",
      note: "حسّنه الألباني",
    },
    explanation:
      "دعاء ثابت للعافية في البدن والسمع والبصر, وكان ابن أبي بكرة رضي الله عنه يعيده ثلاثًا في الصباح.",
    order: 6,
  },
];

export const ruqyahGuidance: readonly RuqyahGuidance[] = [
  {
    id: "ruqyah-guide-self",
    title: "الرقية على النفس",
    body: "اقرأ على نفسك ما تيسر من القرآن, ومنه الفاتحة وآية الكرسي والمعوذات, وادعُ الله بأدعية الشفاء الثابتة. استحضر افتقارك إلى الله, وتوكل عليه مع الأخذ بالأسباب الطبية. لا تلتزم عددًا أو وقتًا لم يثبت به دليل.",
    evidence:
      "أصل مشروعية الرقية: صحيح مسلم ٢٢٠٠ — «لا بأس بالرقى ما لم تكن شركًا».",
    order: 1,
  },
  {
    id: "ruqyah-guide-hands",
    title: "النفث في اليدين والمسح على الجسد",
    body: "يجمع كفيه, وينفث فيهما نفخًا لطيفًا, ويقرأ الإخلاص والفلق والناس, ثم يمسح بهما وجهه وما استطاع من جسده, ويفعل ذلك ثلاث مرات عند النوم. النفث هنا نفخ لطيف لا ريق فيه.",
    evidence: "صحيح البخاري ٥٠١٧, صحيح مسلم ٢١٩٢ — عن عائشة رضي الله عنها.",
    order: 2,
  },
  {
    id: "ruqyah-guide-water",
    title: "الرقية بالماء",
    body: "قراءة القرآن على الماء ثم الشرب منه أو الاغتسال به جائزة عند جمهور أهل العلم, ولا يثبت لها عدد أو صفة ملزمة, ولا يُعتقد أن للماء خصائص ذاتية؛ فالشفاء بتقدير الله وحده. لا تُترك المراجعة الطبية, ولا تُنسب إلى الماء فوائد غير ثابتة.",
    evidence:
      "الأصل جواز الرقية بالقرآن والأدعية المشروعة, ولا يُثبت تخصيص في العدد أو الصفة إلا بدليل.",
    order: 3,
  },
  {
    id: "ruqyah-guide-prohibited",
    title: "تجنب الطلاسم والتمائم والاستعانة بغير الله",
    body: "لا تجوز الرقية بالطلاسم أو الكلمات المجهولة, ولا تعليق التمائم, ولا الاستعانة بالجن أو السحرة أو الكهان. تكون الرقية بكلام الله أو بأسمائه وصفاته وبالدعاء المشروع, مع اعتقاد أن النفع والضر بيد الله وحده.",
    evidence:
      "سنن أبي داود ٣٨٨٣ — «إن الرقى والتمائم والتولة شرك», وصححه الألباني. وانظر: القرآن الكريم, الإسراء ٥٦.",
    order: 4,
  },
];

export const ruqyah: RuqyahContent = {
  verses: ruqyahVerses,
  duas: ruqyahDuas,
  guidance: ruqyahGuidance,
};

export function getRuqyahItem(
  id: string,
): RuqyahVerseItem | RuqyahDuaItem | undefined {
  return [...ruqyahVerses, ...ruqyahDuas].find((item) => item.id === id);
}

export function toFavoriteDhikr(item: RuqyahVerseItem | RuqyahDuaItem): Dhikr {
  return {
    id: item.id,
    text: item.text,
    repeat: item.repeat,
    source: item.source,
    explanation: item.explanation,
    order: item.order,
  };
}
