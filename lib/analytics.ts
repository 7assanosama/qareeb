/**
 * Privacy-first analytics integration point.
 *
 * By default, no analytics script is rendered and no data is sent.
 * To enable a provider, set the following environment variables:
 *
 * - NEXT_PUBLIC_ANALYTICS_PROVIDER: "plausible" | "umami"
 * - NEXT_PUBLIC_ANALYTICS_ID: site/domain or website id
 * - NEXT_PUBLIC_ANALYTICS_SRC: (optional) script URL override
 *
 * Only aggregated, non-personal page usage should be collected.
 * No advertising trackers, no personal/demographic profiling, no cookies.
 */

export type AnalyticsProviderName = "plausible" | "umami";

export function getAnalyticsConfig(): {
  provider: AnalyticsProviderName | null;
  id: string | null;
  src: string | null;
} {
  const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? null) as
    | AnalyticsProviderName
    | null;
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID ?? null;
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? null;
  if (!provider || !id) {
    return { provider: null, id: null, src: null };
  }
  return { provider, id, src };
}

export function trackPageView(path: string): void {
  // No-op by default. Providers can be wired here when enabled.
  if (typeof window === "undefined") return;
  // Intentionally empty: avoids sending data unless a provider is configured.
  void path;
}