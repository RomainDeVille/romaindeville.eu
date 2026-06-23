import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { EXPERTISES } from "@/lib/expertises";
import { EXPERTISE_SLUG_FR_EN } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

const abs = (path: string) => `${BASE}${path === "/" ? "" : path}`;

/** Une paire FR/EN -> deux entrées de sitemap avec alternates hreflang réciproques. */
function pair(
  frPath: string,
  enPath: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number },
  now: Date
): MetadataRoute.Sitemap {
  const languages = { "fr-BE": abs(frPath), en: abs(enPath), "x-default": abs(frPath) };
  return [
    { url: abs(frPath), lastModified: now, alternates: { languages }, ...opts },
    { url: abs(enPath), lastModified: now, alternates: { languages }, ...opts },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    ...pair("/", "/en", { changeFrequency: "weekly", priority: 1 }, now),
    ...pair("/etudes-de-cas", "/en/case-studies", { changeFrequency: "monthly", priority: 0.8 }, now),
    ...pair("/parcours", "/en/about", { changeFrequency: "monthly", priority: 0.6 }, now),
    ...pair("/plan-du-site", "/en/site-map", { changeFrequency: "monthly", priority: 0.3 }, now),
  ];

  const expertiseEntries: MetadataRoute.Sitemap = EXPERTISES.flatMap((e) =>
    pair(`/${e.slug}`, `/en/${EXPERTISE_SLUG_FR_EN[e.slug]}`, { changeFrequency: "monthly", priority: 0.9 }, now)
  );

  const caseEntries: MetadataRoute.Sitemap = caseStudies.flatMap((c) =>
    pair(`/etudes-de-cas/${c.slug}`, `/en/case-studies/${c.slug}`, { changeFrequency: "monthly", priority: 0.7 }, now)
  );

  return [...statics, ...expertiseEntries, ...caseEntries];
}
