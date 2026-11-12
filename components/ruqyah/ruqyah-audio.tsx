"use client";

import { useEffect, useRef, useState } from "react";
import type { QuranAyah } from "@/lib/types/content";
import { cn, toArabicDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import type { RuqyahCopy } from "./copy";

const AUDIO_CACHE = "qareeb-audio-v3";
const RECITER_PATH = "Alafasy_128kbps";

type Status = "idle" | "loading" | "playing" | "paused" | "error";

type Props = {
  surahNumber: number;
  ayahs: readonly QuranAyah[];
  copy: RuqyahCopy;
  className?: string;
};

function audioUrl(surahNumber: number, ayahNumber: number): string {
  return `https://everyayah.com/data/${RECITER_PATH}/${String(surahNumber).padStart(3, "0")}${String(ayahNumber).padStart(3, "0")}.mp3`;
}

/**
 * Fetches the full ayah audio and stores it in the Cache API. Using a blob URL
 * for playback keeps seeking reliable, and makes the recitation available
 * offline after the first successful play.
 */
async function getPlayableUrl(url: string): Promise<string> {
  if (typeof window === "undefined" || typeof caches === "undefined") return url;

  try {
    const cache = await caches.open(AUDIO_CACHE);
    const cached = await cache.match(url);
    if (cached) {
      return URL.createObjectURL(await cached.blob());
    }
  } catch {
    // Fall back to the network below.
  }

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    return url;
  }

  if (!response.ok) return url;

  try {
    const cache = await caches.open(AUDIO_CACHE);
    await cache.put(url, response.clone());
  } catch {
    // Quota or unsupported storage: still play the downloaded response.
  }

  return URL.createObjectURL(await response.blob());
}

function formatAyahProgress(
  template: string,
  current: number,
  total: number,
): string {
  return template
    .replace("{current}", toArabicDigits(current))
    .replace("{total}", toArabicDigits(total));
}

export function RuqyahAudio({ surahNumber, ayahs, copy, className }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const blobUrls = useRef<string[]>([]);
  const playToken = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      playToken.current += 1;
      audio?.pause();
      for (const url of blobUrls.current) {
        URL.revokeObjectURL(url);
      }
      blobUrls.current = [];
    };
  }, []);

  async function playAtIndex(index: number) {
    const audio = audioRef.current;
    if (!audio) return;

    const token = playToken.current + 1;
    playToken.current = token;

    audio.pause();

    // Release blobs from the previous ayah before loading the next one.
    for (const url of blobUrls.current) {
      URL.revokeObjectURL(url);
    }
    blobUrls.current = [];

    setCurrentIndex(index);
    setStatus("loading");

    const url = await getPlayableUrl(
      audioUrl(surahNumber, ayahs[index].number),
    );

    if (playToken.current !== token) {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      return;
    }

    if (url.startsWith("blob:")) {
      blobUrls.current.push(url);
    }

    audio.src = url;

    try {
      await audio.play();
      if (playToken.current === token) setStatus("playing");
    } catch {
      if (playToken.current === token) setStatus("error");
    }
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === "loading") return;

    if (status === "playing") {
      audio.pause();
      setStatus("paused");
      return;
    }

    if (status === "paused" && audio.src) {
      void audio
        .play()
        .then(() => setStatus("playing"))
        .catch(() => setStatus("error"));
      return;
    }

    void playAtIndex(0);
  }

  function handleEnded() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < ayahs.length) {
      void playAtIndex(nextIndex);
      return;
    }
    setStatus("idle");
    setCurrentIndex(0);
  }

  const isPlaying = status === "playing";
  const statusLabel =
    status === "loading"
      ? copy.audioLoading
      : status === "error"
        ? copy.audioError
        : formatAyahProgress(
            copy.audioAyah,
            currentIndex + 1,
            ayahs.length,
          );

  return (
    <div
      className={cn(
        "mt-5 rounded-2xl border border-line bg-background/60 p-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? copy.audioPause : copy.audioPlay}
          aria-pressed={isPlaying}
          disabled={status === "loading"}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full border transition-colors",
            isPlaying
              ? "border-primary/30 bg-primary text-white"
              : "border-line bg-surface text-primary-ink hover:border-line-strong",
            status === "loading" && "opacity-60",
          )}
        >
          <Icon name={isPlaying ? "pause" : "play"} className="size-4.5" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-foreground">
            {copy.audioReciter}
          </p>
          <p
            className={cn(
              "mt-0.5 text-xs",
              status === "error" ? "text-accent" : "text-muted",
            )}
            aria-live="polite"
          >
            {statusLabel}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[11px] leading-5 text-muted">
        {copy.audioOfflineNote}
      </p>

      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onError={() => setStatus("error")}
        preload="none"
        className="hidden"
      />
    </div>
  );
}
