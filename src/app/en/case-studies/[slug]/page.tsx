import type { Metadata } from "next";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudiesEn, getCaseStudyEn } from "@/lib/case-studies-en";
import { profile } from "@/lib/data";
import { altMeta } from "@/lib/i18n";

export function generateStaticParams() {
  return caseStudiesEn.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyEn(slug);
  if (!cs) return {};
  return {
    title: `${cs.client}: ${cs.title}`,
    description: cs.intro.slice(0, 155),
    alternates: altMeta(`/etudes-de-cas/${cs.slug}`, `/en/case-studies/${cs.slug}`, "en"),
    openGraph: { locale: "en_GB" },
  };
}

function Block({ label, items }: { label: string; items: string[] }) {
  return (
    <section className="block">
      <h2>{label}</h2>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted)", marginBottom: 10 }}>{it}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function CaseStudyPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyEn(slug);
  if (!cs) notFound();

  return (
    <div className="wrap">
      <Breadcrumbs locale="en" items={[
        { label: "Case studies", href: "/en/case-studies" },
        { label: cs.client, href: `/en/case-studies/${cs.slug}` },
      ]} />

      <header className="phead">
        <div className="eyebrow">Case study · {cs.sector}</div>
        <h1 className="title">{cs.title}</h1>
        <p style={{ fontSize: 14, color: "var(--muted)" }}>{cs.client} · {cs.period}</p>
        <p>{cs.intro}</p>
      </header>

      <Block label="The problem" items={cs.problem} />
      <Block label="The deployed solution" items={cs.solution} />
      <Block label="The results" items={cs.results} />
      {cs.resultNote && (
        <p style={{ fontSize: 13, color: "var(--muted)", opacity: 0.7, marginTop: -16 }}>{cs.resultNote}</p>
      )}

      <section className="block">
        <h2>Related services</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {cs.relatedServices.map((s) => (
            <Link key={s.href} href={s.href} className="btn btn-ghost">{s.label}</Link>
          ))}
          <Link href="/en/case-studies" className="btn btn-ghost">All case studies</Link>
        </div>
      </section>

      <section className="closer">
        <h2>A comparable challenge?</h2>
        <p>In 20 minutes, we look at your situation and what this method would give at your company.</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
      </section>
    </div>
  );
}
