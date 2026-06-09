import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mon espace",
  robots: { index: false, follow: false },
};

export default function Espace() {
  return (
    <div className="wrap">
      <header className="phead">
        <div className="eyebrow">Espace consultant</div>
        <h1 className="title">Mon espace</h1>
        <p>Outils internes pour générer des rapports clients.</p>
      </header>

      <section className="psec">
        <h2>Outils disponibles</h2>
        <div className="cards">
          <Link href="/espace/audit" className="card" style={{ textDecoration: "none" }}>
            <div className="n">01</div>
            <h3>Audit PageSpeed</h3>
            <p>
              Transforme un rapport Google PageSpeed Insights en rapport
              actionnable partageable avec vos clients.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
