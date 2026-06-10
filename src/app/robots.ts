import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/espace", "/login", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
