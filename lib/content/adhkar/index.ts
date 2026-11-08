import { afterPrayer } from "./after-prayer";
import { morning } from "./morning";
import { evening } from "./evening";
import { sleep } from "./sleep";
import { waking } from "./waking";
import { propheticDuas } from "./prophetic-duas";
import type { DhikrSection } from "@/lib/types/content";

export const adhkarSections: readonly DhikrSection[] = [
  afterPrayer,
  morning,
  evening,
  sleep,
  waking,
  propheticDuas,
];

export function getAdhkarSection(id: string): DhikrSection | undefined {
  return adhkarSections.find((section) => section.id === id);
}

export {
  afterPrayer,
  morning,
  evening,
  sleep,
  waking,
  propheticDuas,
};