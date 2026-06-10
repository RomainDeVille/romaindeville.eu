import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApi = path.startsWith("/api/");

  /* La route de login reste publique */
  if (path.startsWith("/api/v1/auth")) {
    return NextResponse.next();
  }

  const unauthorized = () =>
    isApi
      ? NextResponse.json({ error: "Non autorise" }, { status: 401 })
      : (() => {
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("from", path);
          return NextResponse.redirect(loginUrl);
        })();

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/espace/:path*", "/api/v1/:path*"],
};
