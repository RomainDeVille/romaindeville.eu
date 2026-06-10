import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { Workbench } from "./workbench";

export const metadata: Metadata = {
  title: "Mon espace",
  robots: { index: false, follow: false },
};

export default function Espace() {
  return (
    <div className="wrap" style={{ maxWidth: "min(1500px, 96vw)" }}>
      <header className="phead">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div className="eyebrow">Espace consultant</div>
          <LogoutButton />
        </div>
        <h1 className="title">Mon espace</h1>
        <p>
          Choisissez un profil ou des outils, lancez tout en parallele, recevez un rapport unifie au format constant.{" "}
          <Link href="/espace/audit" style={{ color: "var(--accent)" }}>Rapport PageSpeed detaille avec export PDF</Link>.
        </p>
      </header>
      <Workbench />
    </div>
  );
}
