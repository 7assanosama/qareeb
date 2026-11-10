import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="mx-auto max-w-xl rounded-5xl border border-line bg-surface p-8 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-soft text-primary-ink">
            <Icon name="book" className="size-6" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
            404
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            لم نعثر على الصفحة التي تبحث عنها. قد تكون حُذفت أو تغيّر عنوانها.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary-strong"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}