"use client";

/**
 * Renders an inline script that executes while the browser parses the
 * server-rendered HTML, then switches to a non-executable type on the client,
 * where React never executes scripts anyway. This prevents React's development
 * warning about script tags encountered while rendering a component.
 *
 * See https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
