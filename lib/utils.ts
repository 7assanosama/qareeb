// Utility مركزية لتحويل الأرقام إلى الأرقام العربية-الهندية (٠١٢٣٤٥٦٧٨٩)
// لاستخدامها في الواجهة. الأرقام الإنجليزية تبقى في الأكواد والمعرفات والروابط.
const arabicIndicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function toArabicDigits(value: number | string): string {
  return String(value).replace(
    /\d/g,
    (digit) => arabicIndicDigits[Number(digit)],
  );
}

// علامات أرقام الآيات (KFGQPC) — للاستخدام داخل قارئ القرآن فقط.
export function toArabicIndicDigits(value: number | string): string {
  return toArabicDigits(value);
}

export const toAyahNumber = toArabicIndicDigits;

export function formatDhikrCount(count: number): string {
  if (count === 1) return "ذكر واحد";
  if (count === 2) return "ذكران";
  if (count >= 3 && count <= 10) return `${toArabicDigits(count)} أذكار`;
  return `${toArabicDigits(count)} ذكرًا`;
}

export function formatSavedDhikrCount(count: number): string {
  if (count === 1) return "ذكر واحد محفوظ";
  if (count === 2) return "ذكران محفوظان";
  if (count >= 3 && count <= 10) return `${toArabicDigits(count)} أذكار محفوظة`;
  return `${toArabicDigits(count)} ذكرًا محفوظًا`;
}

export function formatTasbihRemaining(count: number): string {
  if (count === 1) return "تبقّت تسبيحة واحدة";
  if (count === 2) return "تبقّت تسبيحتان";
  if (count >= 3 && count <= 10) return `تبقّت ${toArabicDigits(count)} تسبيحات`;
  return `تبقّى ${toArabicDigits(count)} تسبيحة`;
}
