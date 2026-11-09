/* Qareeb Service Worker */
const CACHE_VERSION = "qareeb-v2";
const SHELL_CACHE = "qareeb-shell-" + CACHE_VERSION;
const RUNTIME_CACHE = "qareeb-runtime-" + CACHE_VERSION;

const ADHKAR_SECTIONS = [
  "after-prayer",
  "morning",
  "evening",
  "sleep",
  "waking",
  "prophetic-duas",
];

const PRECACHE_ROUTES = ["/", "/adhkar", "/favorites", "/quran"]
  .concat(ADHKAR_SECTIONS.map((id) => "/adhkar/" + id))
  .concat(Array.from({ length: 114 }, (_, i) => "/quran/" + (i + 1)));

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      for (const url of PRECACHE_ROUTES) {
        try {
          await cache.add(url);
        } catch {
          // Ignore individual failures to keep install resilient.
        }
      }
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/");
          return fallback || new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
        }
      })(),
    );
    return;
  }

  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".webmanifest") ||
    url.pathname.endsWith(".json");

  if (isStaticAsset) {
    event.respondWith(
      (async () => {
        try {
          // Network-first so a stale cached bundle can never be served after
          // a deployment or a development rebuild.
          const networkResponse = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response("", { status: 504 });
        }
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response("", { status: 504 });
      }
    })(),
  );
});