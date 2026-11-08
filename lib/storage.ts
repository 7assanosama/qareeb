export type StorageState = {
  version: 1;
  adhkarProgress: Record<
    string,
    { index: number; count: number; completed: boolean; updatedAt: number }
  >;
  tasbih: { count: number; target: number };
  quranProgress: { surah: number; ayah: number; fontSize: number };
  favorites: string[];
};

const STORAGE_KEY = "qareeb-data";
const DEFAULT_STATE: StorageState = {
  version: 1,
  adhkarProgress: {},
  tasbih: { count: 0, target: 33 },
  quranProgress: { surah: 1, ayah: 1, fontSize: 18 },
  favorites: [],
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadState(): StorageState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed)) return { ...DEFAULT_STATE };
    if (parsed.version !== 1) return { ...DEFAULT_STATE };

    const adhkarProgress: StorageState["adhkarProgress"] = {};
    const rawProgress = parsed.adhkarProgress;
    if (isObject(rawProgress)) {
      for (const [key, value] of Object.entries(rawProgress)) {
        if (!isObject(value)) continue;
        const index = typeof value.index === "number" ? value.index : 0;
        const count = typeof value.count === "number" ? value.count : 0;
        const completed = value.completed === true;
        const updatedAt =
          typeof value.updatedAt === "number" ? value.updatedAt : Date.now();
        adhkarProgress[key] = { index, count, completed, updatedAt };
      }
    }

    const tasbihRaw = parsed.tasbih;
    const tasbih =
      isObject(tasbihRaw) &&
      typeof tasbihRaw.count === "number" &&
      typeof tasbihRaw.target === "number"
        ? { count: tasbihRaw.count, target: tasbihRaw.target }
        : { ...DEFAULT_STATE.tasbih };

    const quranRaw = parsed.quranProgress;
    const quranProgress =
      isObject(quranRaw) &&
      typeof quranRaw.surah === "number" &&
      typeof quranRaw.ayah === "number" &&
      typeof quranRaw.fontSize === "number"
        ? {
            surah: quranRaw.surah,
            ayah: quranRaw.ayah,
            fontSize: quranRaw.fontSize,
          }
        : { ...DEFAULT_STATE.quranProgress };

    const favorites = Array.isArray(parsed.favorites)
      ? parsed.favorites.filter((item): item is string => typeof item === "string")
      : [];

    return {
      version: 1,
      adhkarProgress,
      tasbih,
      quranProgress,
      favorites,
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: StorageState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}