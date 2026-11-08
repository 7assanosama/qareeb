"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "qareeb-install-dismissed";

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(DISMISS_KEY) === "1") return;

    const handler = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || !deferred) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "dismissed") {
      window.localStorage.setItem(DISMISS_KEY, "1");
    }
    setVisible(false);
    setDeferred(null);
  }

  function dismiss() {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
    setDeferred(null);
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-2xl border border-line bg-surface p-4 shadow-lift sm:inset-x-auto sm:start-4">
      <p className="text-sm text-foreground">
        يمكنك تثبيت «قريب» على جهازك لاستخدامه كتطبيق.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={install}
          className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-strong"
        >
          تثبيت
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-line-strong hover:text-foreground"
        >
          لاحقاً
        </button>
      </div>
    </div>
  );
}