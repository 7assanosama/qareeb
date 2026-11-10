import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdhkarSection } from "@/lib/content";
import { AdhkarReader } from "@/components/adhkar/adhkar-reader";

type Params = { section: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { section: sectionId } = await params;
  const section = getAdhkarSection(sectionId);
  if (!section) return {};
  return {
    title: `${section.title} | قريب`,
    description:
      section.description ?? "أذكار ثابتة من الكتاب والسنة, مع عداد يحفظ تقدمك.",
  };
}

export default async function AdhkarSectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { section: sectionId } = await params;
  const section = getAdhkarSection(sectionId);
  if (!section) notFound();

  return <AdhkarReader section={section} />;
}

export const instant = false;

export function generateStaticParams() {
  return [
    { section: "after-prayer" },
    { section: "morning" },
    { section: "evening" },
    { section: "sleep" },
    { section: "waking" },
    { section: "prophetic-duas" },
  ];
}