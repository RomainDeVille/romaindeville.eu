import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpertisePage } from "@/lib/expertise-template";
import { EXPERTISES_EN, getExpertiseEn } from "@/lib/expertises-en";
import { altMeta } from "@/lib/i18n";

export function generateStaticParams() {
  return EXPERTISES_EN.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getExpertiseEn(slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    alternates: altMeta(`/${e.frSlug}`, `/en/${e.slug}`, "en"),
    openGraph: { locale: "en_GB", title: e.title, description: e.description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = getExpertiseEn(slug);
  if (!e) notFound();
  return <ExpertisePage e={e} locale="en" />;
}
