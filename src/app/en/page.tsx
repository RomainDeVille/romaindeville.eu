import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { profile, clients } from "@/lib/data";
import { CORE_EXPERTISES_EN } from "@/lib/expertises-en";
import { altMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Romain De Ville · Senior SEO, GEO and Content Strategy Consultant",
  description:
    "Independent consultant in SEO, GEO (visibility in AI answers) and content strategy. 10+ years of experience. Brussels, Belgium. FR/NL/EN.",
  alternates: altMeta("/", "/en", "en"),
  openGraph: {
    locale: "en_GB",
    title: "Romain De Ville · Senior SEO, GEO and Content Strategy Consultant",
    description:
      "Independent consultant in SEO, GEO and content strategy. Brussels, Belgium.",
  },
};

export default function HomeEn() {
  return (
    <div className="wrap">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div>
          <div className="eyebrow">Senior consultant · Brussels · FR, NL, EN</div>
          <h1 className="title">
            Found, chosen and cited:{" "}
            <span className="gradient-text">in Google as in AI answers</span>.
          </h1>
          <p className="sub">
            For 10 years, I have helped media, institutions and companies build
            visibility that lasts: technical and editorial SEO, visibility in AI
            engines (GEO), acquisition and content strategy. By installing in
            your teams a culture that stays after I leave.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={profile.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 20-min call
            </a>
            <Link className="btn btn-ghost" href="/en/about">
              About me
            </Link>
          </div>
        </div>

        <div className="facts" aria-label="Key figures">
          <div className="fact">
            <div className="v">~10 yrs</div>
            <div className="k">SEO, GEO and content strategy</div>
          </div>
          <div className="fact">
            <div className="v">220K+</div>
            <div className="k">Pages optimised on client assignments</div>
          </div>
          <div className="fact">
            <div className="v">FR · NL · EN</div>
            <div className="k">End-to-end multilingual strategies</div>
          </div>
          <div className="fact">
            <div className="v">Solo</div>
            <div className="k">You talk to the person who executes</div>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISES ===== */}
      <section className="block" id="services">
        <h2>Nine services, <span className="gradient-text">one logic</span>: visibility that converts.</h2>
        <p className="lead">
          Discoverability cannot be cut into silos. Content that ranks well but
          loads slowly loses its traffic; a fast site absent from AI answers
          loses the decision. Each lever serves the others.
        </p>
        <div className="cards">
          {CORE_EXPERTISES_EN.map((e, i) => (
            <Link key={e.slug} href={`/en/${e.slug}`} className="card" style={{ textDecoration: "none" }}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <h3>{e.name}</h3>
              <p>{e.cardText} Discover &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== METHOD ===== */}
      <section className="block" id="method">
        <h2>How I work</h2>
        <p className="lead">
          No 80-page report gathering dust in a drawer. A quantified diagnosis,
          clear priorities, and execution carried out with your teams.
        </p>
        <div className="timeline">
          <div className="step">
            <div className="step-dot">🔍</div>
            <div className="step-content">
              <div className="step-label">Step 1</div>
              <h3>Quantified diagnosis</h3>
              <p>
                Audit of the existing setup on the relevant levers: real data,
                competitor benchmark, verifiable findings. You know exactly
                where you stand.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-dot">🎯</div>
            <div className="step-content">
              <div className="step-label">Step 2</div>
              <h3>Prioritised roadmap</h3>
              <p>
                Each action ranked by impact and effort, with a measurable
                expected result. Your team can start the next day.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-dot">🤝</div>
            <div className="step-content">
              <div className="step-label">Step 3</div>
              <h3>Execution and transfer</h3>
              <p>
                I execute with your teams, I train, I document. Pedagogy is part
                of the engagement: you become autonomous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REFERENCES ===== */}
      <section className="block">
        <h2>They trusted me</h2>
        <p className="lead">
          National telecom operator, European institution, international media,
          e-commerce: different contexts, the same standard.
        </p>
        <div className="clients-row">
          {clients.map((c) => (
            <span className="client-tag" key={c}>
              {c}
            </span>
          ))}
        </div>
        <p style={{ marginTop: 20 }}>
          <Link href="/en/case-studies" className="btn btn-ghost">Read the case studies &rarr;</Link>
        </p>
      </section>

      {/* ===== WHO I AM ===== */}
      <section className="block">
        <h2>Who I am</h2>
        <div className="why-grid">
          <div className="portrait-wrap">
            <Image
              src="/portrait.jpg"
              alt="Romain De Ville, SEO, GEO and content strategy consultant in Brussels"
              width={280}
              height={280}
              className="portrait"
              priority={false}
            />
          </div>
          <div>
            <p className="lead" style={{ marginBottom: 16 }}>
              Romain De Ville, senior SEO, GEO and content strategy consultant,
              based in Brussels. I work in French, Dutch and English, in
              newsrooms as well as with product and marketing teams.
            </p>
            <p className="lead" style={{ marginBottom: 24 }}>
              My stance: integrate visibility concerns upstream of projects
              rather than fixing them afterwards, and pass on the method rather
              than create dependence.
            </p>
            <Link className="btn btn-ghost" href="/en/about">
              See my full background
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CLOSER ===== */}
      <section className="closer">
        <h2>Let’s talk about your visibility.</h2>
        <p>
          In 20 minutes, we look together at where you stand: Google rankings,
          presence in AI answers, friction points. No preparation needed on your
          side, no commitment.
        </p>
        <a
          className="btn btn-primary"
          href={profile.calendly}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
      </section>
    </div>
  );
}
