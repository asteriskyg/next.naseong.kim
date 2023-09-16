import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

import type { JwtPayload } from "jwt-decode";
import { refreshIdentity } from "@/services/auth";

export const middleware = async (req: NextRequest) => {
  if (!process.env.NEXT_PUBLIC_APP_URL)
    throw new Error("NEXT_PUBLIC_APP_URL is not defined.");

  const nextRes = NextResponse.next();
  const RedirectRes = NextResponse.redirect(req.url);

  const authorization = req.cookies.get("authorization");
  if (authorization) {
    const jwt = jwtDecode(authorization.value) as JwtPayload;
    if (jwt?.exp && jwt.exp * 1000 > Date.now()) return nextRes;
  }

  const refresh = req.cookies.get("refresh");
  const token = await refreshIdentity(refresh?.value);

  if (!token) return nextRes;

  RedirectRes.cookies.set("authorization", token.access, {
    domain: process.env.NEXT_PUBLIC_APP_HOST,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 30,
  });

  RedirectRes.cookies.set("refresh", token.refresh, {
    domain: process.env.NEXT_PUBLIC_APP_HOST,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 2,
  });

  return RedirectRes;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
