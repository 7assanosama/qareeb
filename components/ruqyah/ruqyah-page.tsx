import { Suspense } from "react";
import { ruqyah } from "@/lib/content";
import { ruqyahCopy } from "./copy";
import { RuqyahReader } from "./ruqyah-reader";

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

type Props = {
  searchParams: SearchParams;
};

async function RuqyahContent({ searchParams }: Props) {
  const params = await searchParams;
  const item = params.item;
  const initialItemId = typeof item === "string" ? item : undefined;

  return (
    <RuqyahReader
      key={initialItemId ?? "default"}
      verses={ruqyah.verses}
      duas={ruqyah.duas}
      guidance={ruqyah.guidance}
      initialItemId={initialItemId}
    />
  );
}

/**
 * Reads the optional `item` search param so favorites can deep-link into the
 * reader. The access lives behind Suspense to keep the rest of the route in
 * the static shell with Cache Components enabled.
 */
export function RuqyahPageContent({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="container-page py-16 text-center text-muted">
          {ruqyahCopy.loading}
        </div>
      }
    >
      <RuqyahContent searchParams={searchParams} />
    </Suspense>
  );
}
