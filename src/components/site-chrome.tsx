"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { profile } from "@/lib/data";
import { CORE_EXPERTISES } from "@/lib/expertises";
import { CORE_EXPERTISES_EN } from "@/lib/expertises-en";
import { caseStudies } from "@/lib/case-studies";
import { caseStudiesEn } from "@/lib/case-studies-en";
import { ui, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

/**
 * Nav + footer rendus côté client : la langue est déduite du chemin d'URL
 * (usePathname), ce qui reste correct en génération statique ET à la
 * navigation client. C'est ce qui garantit que la langue sélectionnée
 * persiste d'une page à l'autre.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const locale: Locale = isEn ? "en" : "fr";
  const t = ui[locale];
  const prefix = isEn ? "/en" : "";
  const coreExpertises = isEn ? CORE_EXPERTISES_EN : CORE_EXPERTISES;
  const cases = isEn ? caseStudiesEn : caseStudies;

  const homeHref = isEn ? "/en" : "/";
  const casesHref = isEn ? "/en/case-studies" : "/etudes-de-cas";
  const aboutHref = isEn ? "/en/about" : "/parcours";

  // Met à jour l'attribut <html lang> en fonction de la langue de la page.
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  return (
    <>
      <nav className="nav">
        <Link href={homeHref} className="name">
          Romain De Ville<span className="dot">.</span>
        </Link>
        <div className="right">
          <details className="nav-dd">
            <summary><span className="btn btn-ghost">{t.navExpertises}</span></summary>
            <div className="nav-dd-menu">
              {coreExpertises.map((e) => (
                <Link key={e.slug} href={`${prefix}/${e.slug}`}>{e.name}</Link>
              ))}
            </div>
          </details>
          <Link className="btn btn-ghost" href={casesHref}>{t.navCases}</Link>
          {!isEn && <Link className="btn btn-ghost" href="/blog">{t.navBlog}</Link>}
          <Link className="btn btn-ghost" href={aboutHref}>{t.navAbout}</Link>
          <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">{t.navBook}</a>
          <LanguageSwitcher locale={locale} />
          <Link className="btn btn-outline" href="/espace">{t.navSpace}</Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">Romain De Ville<span className="dot">.</span></div>
              <p className="foot-desc">{t.footDesc} {profile.city}.</p>
            </div>
            <div className="foot-col">
              <div className="foot-title">{t.footExpertises}</div>
              {coreExpertises.map((e) => (
                <Link key={e.slug} href={`${prefix}/${e.slug}`}>{e.name}</Link>
              ))}
            </div>
            <div className="foot-col">
              <div className="foot-title">{t.footReferences}</div>
              {cases.map((c) => (
                <Link key={c.slug} href={`${casesHref}/${c.slug}`}>{c.client}</Link>
              ))}
              <Link href={casesHref}>{t.footAllCases}</Link>
            </div>
            <div className="foot-col">
              <div className="foot-title">{t.footContact}</div>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={profile.calendly} target="_blank" rel="noopener noreferrer">{t.navBook}</a>
              <Link href={aboutHref}>{t.footAbout}</Link>
            </div>
          </div>
          <div className="foot-copy">
            © {new Date().getFullYear()} Romain De Ville. {t.footRights} · <Link href={isEn ? "/en/site-map" : "/plan-du-site"}>{t.footSitemap}</Link>{!isEn && (<> · <Link href="/blog">Blog</Link></>)}
          </div>
        </div>
      </footer>
    </>
  );
}
