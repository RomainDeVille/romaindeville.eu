import type { Metadata } from "next";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { profile } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.client} : ${cs.title}`,
    description: cs.intro.slice(0, 155),
    alternates: { canonical: `/etudes-de-cas/${cs.slug}` },
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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <div className="wrap">
      <Breadcrumbs items={[
        { label: "Études de cas", href: "/etudes-de-cas" },
        { label: cs.client, href: `/etudes-de-cas/${cs.slug}` },
      ]} />

      <header className="phead">
        <div className="eyebrow">Étude de cas · {cs.sector}</div>
        <h1 className="title">{cs.title}</h1>
        <p style={{ fontSize: 14, color: "var(--muted)" }}>{cs.client} · {cs.period}</p>
        <p>{cs.intro}</p>
      </header>

      <Block label="Le problème" items={cs.problem} />
      <Block label="La solution déployée" items={cs.solution} />
      <Block label="Les résultats" items={cs.results} />
      {cs.resultNote && (
        <p style={{ fontSize: 13, color: "var(--muted)", opacity: 0.7, marginTop: -16 }}>{cs.resultNote}</p>
      )}

      <section className="block">
        <h2>Services liés</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {cs.relatedServices.map((s) => (
            <Link key={s.href} href={s.href} className="btn btn-ghost">{s.label}</Link>
          ))}
          <Link href="/etudes-de-cas" className="btn btn-ghost">Toutes les études de cas</Link>
        </div>
      </section>

      <section className="closer">
        <h2>Un défi comparable ?</h2>
        <p>En 20 minutes, on regarde votre situation et ce que cette méthode donnerait chez vous.</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
