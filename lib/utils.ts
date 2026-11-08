const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function toArabicDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => arabicDigits[Number(digit)]);
}
