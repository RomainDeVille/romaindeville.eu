import Link from "next/link";
import { ui, type Locale } from "@/lib/i18n";

export interface Crumb {
  label: string;
  href?: string;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

export function Breadcrumbs({ items, locale = "fr" }: { items: Crumb[]; locale?: Locale }) {
  const home: Crumb = { label: ui[locale].crumbHome, href: locale === "en" ? "/en" : "/" };
  const all: Crumb[] = [home, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${BASE}${c.href}` } : {}),
    })),
  };

  return (
    <nav className="crumbs" aria-label={locale === "en" ? "Breadcrumb" : "Fil d'Ariane"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {all.map((c, i) => (
        <span key={i} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          {i > 0 && <span className="sep">/</span>}
          {c.href && i < all.length - 1 ? (
            <Link href={c.href}>{c.label}</Link>
          ) : (
            <span className="here">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
