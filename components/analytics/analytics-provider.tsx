"use client";

import { getAnalyticsConfig } from "@/lib/analytics";

export function AnalyticsProvider() {
  const config = getAnalyticsConfig();
  if (!config.provider || !config.id) return null;

  if (config.provider === "plausible") {
    const src = config.src ?? "https://plausible.io/js/script.js";
    return (
      <script
        defer
        data-domain={config.id}
        src={src}
      />
    );
  }

  if (config.provider === "umami") {
    const src = config.src ?? "https://analytics.umami.is/script.js";
    return (
      <script
        defer
        data-website-id={config.id}
        src={src}
      />
    );
  }

  return null;
}