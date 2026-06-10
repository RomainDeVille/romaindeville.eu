import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const maxDuration = 60;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      clientEmail: string;
      clientName?: string;
      siteUrl: string;
      summary?: string;
      pdfBase64: string;
    };

    if (!body.clientEmail || !EMAIL_RE.test(body.clientEmail)) {
      return NextResponse.json({ error: "Email client invalide" }, { status: 400 });
    }
    if (!body.siteUrl || !body.pdfBase64) {
      return NextResponse.json({ error: "siteUrl et pdfBase64 requis" }, { status: 400 });
    }
    if (body.pdfBase64.length > 10_000_000) {
      return NextResponse.json({ error: "PDF trop volumineux" }, { status: 413 });
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      return NextResponse.json(
        { error: "SMTP_USER et SMTP_PASS non configures sur Vercel" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: (process.env.SMTP_PORT || "465") === "465",
      auth: { user, pass },
    });

    let domain = body.siteUrl;
    try {
      domain = new URL(body.siteUrl.startsWith("http") ? body.siteUrl : `https://${body.siteUrl}`).hostname;
    } catch {
      // garde la valeur brute
    }

    const greeting = body.clientName?.trim() ? `Bonjour ${body.clientName.trim()},` : "Bonjour,";
    const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://romaindeville.eu";

    const text = `${greeting}

Votre rapport d'analyse pour ${domain} est pret : vous le trouverez en piece jointe.

Il a ete realise ce ${date} et couvre l'ensemble des volets analyses : performance, securite, visibilite dans les moteurs d'IA, ainsi que les actions prioritaires classees par impact et par effort.

Je vous propose d'en parcourir les conclusions ensemble. Repondez simplement a cet email, ou reservez directement un creneau : ${calendly}

Bien a vous,

Romain De Ville
Consultant SEO, GEO et Performance Web
romaindeville.eu`;

    const html = text
      .split("\n\n")
      .map((p) => `<p style="margin:0 0 14px;line-height:1.6">${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");

    await transporter.sendMail({
      from: `"Romain De Ville" <${user}>`,
      to: body.clientEmail,
      bcc: user,
      replyTo: user,
      subject: `Votre rapport d'analyse web : ${domain}`,
      text,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f172a;max-width:640px">${html}</div>`,
      attachments: [
        {
          filename: `analyse-${domain.replace(/\./g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`,
          content: body.pdfBase64,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send report error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur d'envoi" },
      { status: 500 }
    );
  }
}
