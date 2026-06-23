import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

/** Ajoute l'en-tete x-locale (lu par le layout pour <html lang> et la traduction de la nav). */
function withLocale(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const locale = path === "/en" || path.startsWith("/en/") ? "en" : "fr";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApi = path.startsWith("/api/");
  const isProtected = path.startsWith("/espace") || path.startsWith("/api/v1/");

  /* La route de login reste publique */
  if (path.startsWith("/api/v1/auth")) {
    return withLocale(request);
  }

  /* Routes publiques : on pose seulement la locale */
  if (!isProtected) {
    return withLocale(request);
  }

  const unauthorized = () => {
    if (isApi) return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  };

  const session = request.cookies.get("rdv_session")?.value;
  if (!session) return unauthorized();

  const secret = process.env.AUTH_SECRET;
  if (!secret) return unauthorized();

  const { valid } = await verifyToken(session, secret);
  if (!valid) {
    if (isApi) return NextResponse.json({ error: "Session expiree" }, { status: 401 });
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("rdv_session");
    return res;
  }

  return withLocale(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|portrait.jpg|llms.txt|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf|txt|xml)).*)",
  ],
};
