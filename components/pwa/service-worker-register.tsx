"use client";

import { useEffect, useState } from "react";

async function clearDevelopmentServiceWorker() {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );
  } catch {
    // Ignore cleanup failures.
  }

  if (typeof caches === "undefined") return;

  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  } catch {
    // Ignore cleanup failures.
  }
}

export function ServiceWorkerRegister() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // Dev chunk URLs are not content-addressed, so a cached service worker
      // can serve stale bundles after edits and cause hydration mismatches.
      void clearDevelopmentServiceWorker();
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        if (reg.waiting) {
          setWaitingWorker(reg.waiting);
          setUpdateAvailable(true);
        }
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
              setUpdateAvailable(true);
            }
          });
        });
      })
      .catch(() => {
        // Registration failed; app still works online.
      });

    return () => {
      // no-op cleanup
    };
  }, []);

  function applyUpdate() {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  }

  if (!updateAvailable) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-2xl border border-line bg-surface p-4 shadow-lift sm:inset-x-auto sm:start-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-foreground">
          هناك نسخة أحدث من «قريب» جاهزة.
        </p>
        <button
          type="button"
          onClick={applyUpdate}
          className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-strong"
        >
          حدّث الآن
        </button>
      </div>
    </div>
  );
}
