import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("rdv_session")?.value;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { valid } = await verifyToken(session, secret);

  if (!valid) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("rdv_session");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/espace/:path*"],
};
