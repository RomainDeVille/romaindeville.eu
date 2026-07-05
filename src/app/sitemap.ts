import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { EXPERTISES } from "@/lib/expertises";
import { EXPERTISE_SLUG_FR_EN } from "@/lib/i18n";
import { articles } from "@/lib/articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";
const abs = (p: string) => `${BASE}${p === "/" ? "" : p}`;

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const e = (path: string, changeFrequency: Freq, priority: number) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  const fr: MetadataRoute.Sitemap = [
    e("/", "weekly", 1),
    e("/etudes-de-cas", "monthly", 0.8),
    e("/parcours", "monthly", 0.6),
    e("/plan-du-site", "monthly", 0.3),
    e("/blog", "weekly", 0.6),
    ...articles.map((x) => e(`/blog/${x.slug}`, "monthly", 0.7)),
    ...EXPERTISES.map((x) => e(`/${x.slug}`, "monthly", 0.9)),
    ...caseStudies.map((c) => e(`/etudes-de-cas/${c.slug}`, "monthly", 0.7)),
  ];

  const en: MetadataRoute.Sitemap = [
    e("/en", "weekly", 1),
    e("/en/case-studies", "monthly", 0.8),
    e("/en/about", "monthly", 0.6),
    e("/en/site-map", "monthly", 0.3),
    ...EXPERTISES.map((x) => e(`/en/${EXPERTISE_SLUG_FR_EN[x.slug]}`, "monthly", 0.9)),
    ...caseStudies.map((c) => e(`/en/case-studies/${c.slug}`, "monthly", 0.7)),
  ];

  return [...fr, ...en];
}
