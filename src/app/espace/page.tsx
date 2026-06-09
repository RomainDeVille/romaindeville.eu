import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Mon espace",
  robots: { index: false, follow: false },
};

export default function Espace() {
  return (
    <div className="wrap">
      <header className="phead">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div className="eyebrow">Espace consultant</div>
          <LogoutButton />
        </div>
        <h1 className="title">Mon espace</h1>
        <p>Outils internes pour generer des rapports clients.</p>
      </header>

      <section className="psec">
        <h2>Outils disponibles</h2>
        <div className="cards">
          <Link href="/espace/audit" className="card" style={{ textDecoration: "none" }}>
            <div className="n">01</div>
            <h3>Audit PageSpeed</h3>
            <p>Analysez les performances, le SEO, l&apos;accessibilite et les bonnes pratiques d&apos;un site. Rapport PDF avec recommandations IA.</p>
          </Link>
          <Link href="/espace/tools" className="card" style={{ textDecoration: "none" }}>
            <div className="n">02</div>
            <h3>Analyse multi-outils</h3>
            <p>DNS, securite, carbone, HTML, mots-cles, autorite, historique CWV : lancez les outils de votre choix en parallele, recevez un rapport unifie.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
