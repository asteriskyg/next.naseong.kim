import { NextRequest, NextResponse } from "next/server";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { refreshIdentity } from "@/services/auth";

export const middleware = async(req: NextRequest) => {
  const res = NextResponse.next();

  const authorization = req.cookies.get('authorization');
  if(authorization) {
    const jwt = jwtDecode(authorization.value) as JwtPayload;
    if(jwt?.exp && jwt.exp * 1000 > Date.now()) return res;
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