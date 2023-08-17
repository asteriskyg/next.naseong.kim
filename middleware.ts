import { NextRequest, NextResponse } from "next/server";
import jwt_decode from "jwt-decode";
import { refreshIdentity } from "@/services/auth";

interface JWT {
  exp: number;
  iat: number;
  sub: string;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const authorization = req.cookies.get('authorization');
  if(authorization) {
    const jwt = jwt_decode(authorization.value) as JWT;
    if(jwt.exp * 1000 > Date.now()) return res;
  }

  const refresh = req.cookies.get('refresh');
  const token = await refreshIdentity(refresh?.value);

  if(!token) return res;

  res.cookies.set("authorization", token.access, {
    domain: process.env.NEXT_PUBLIC_APP_URL,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 30,
  });

  res.cookies.set("refresh", token.refresh, {
    domain: process.env.NEXT_PUBLIC_APP_URL,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  });

  return res;
}