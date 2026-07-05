import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { profile } from "@/lib/data";
import { articles, getArticle, type Block } from "@/lib/articles";
import { altMeta } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: altMeta(`/blog/${a.slug}`, `/blog/${a.slug}`, "fr"),
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
}

function Renderer({ block }: { block: Block }) {
  switch (block.t) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p style={{ lineHeight: 1.8, color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "ul":
      return (
        <ul style={{ margin: "0 0 8px", paddingLeft: 20 }}>
          {block.items.map((it, i) => (
            <li key={i} style={{ lineHeight: 1.8, color: "var(--muted)", marginBottom: 8 }}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          style={{
            borderLeft: "3px solid var(--accent)",
            margin: "24px 0",
            padding: "8px 0 8px 20px",
            fontFamily: "var(--heading)",
            fontSize: 20,
            lineHeight: 1.5,
          }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = `${BASE}/blog/${a.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: a.h1,
    description: a.description,
    inLanguage: "fr-BE",
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    mainEntityOfPage: url,
    keywords: a.tags.join(", "),
    author: { "@id": `${BASE}/#person` },
    publisher: { "@id": `${BASE}/#organization` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fr-BE",
    mainEntity: a.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: a.h1, href: `/blog/${a.slug}` },
      ]} />

      <header className="phead">
        <div className="eyebrow">{a.tags.join(" · ")}</div>
        <h1 className="title">{a.h1}</h1>
        <p style={{ fontSize: 14, color: "var(--muted)" }}>
          Par {profile.name} · {formatDate(a.datePublished)} · {a.readingMinutes} min de lecture
        </p>
      </header>

      <section className="block" style={{ maxWidth: 760 }}>
        {a.body.map((block, i) => (
          <Renderer key={i} block={block} />
        ))}
      </section>

      <section className="block" id="faq" style={{ maxWidth: 760 }}>
        <h2>Questions fréquentes</h2>
        {a.faq.map((f) => (
          <details key={f.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
            <summary style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              {f.q}
            </summary>
            <p style={{ marginTop: 10, lineHeight: 1.75, color: "var(--muted)" }}>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="block">
        <h2>Pour aller plus loin</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {a.related.map((r) => (
            <Link key={r.href} href={r.href} className="btn btn-ghost">{r.label}</Link>
          ))}
          <Link href="/blog" className="btn btn-ghost">Tous les articles</Link>
        </div>
      </section>

      <section className="closer">
        <h2>Envie d'en discuter pour votre marque ?</h2>
        <p>En 20 minutes, on regarde votre situation sur ce sujet précis, sans préparation ni engagement.</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
