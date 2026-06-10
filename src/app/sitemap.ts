import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { EXPERTISES } from "@/lib/expertises";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/etudes-de-cas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/parcours`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/plan-du-site`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const expertiseEntries: MetadataRoute.Sitemap = EXPERTISES.map((e) => ({
    url: `${BASE}/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const caseEntries: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${BASE}/etudes-de-cas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...expertiseEntries, ...caseEntries];
}
