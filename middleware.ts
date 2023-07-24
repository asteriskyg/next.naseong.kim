import { NextRequest, NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

interface Token {
  access: string;
  refresh: string;
}

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
    if (jwt.exp * 1000 > Date.now()) return res;
  }

  const refresh = req.cookies.get('refresh');
  if(!refresh) return res;

  const token = await refreshIdentity(refresh.value);
  if (!token) return res;

  res.cookies.set("authorization", token?.access, {
    domain: 'next.naseong.kim',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 30,
  });

  res.cookies.set("authorization", token?.refresh, {
    domain: 'next.naseong.kim',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  });

  return res;
}

async function refreshIdentity(token: String): Promise<Token | undefined> {
  const res = await fetch('https://dev.naseong.kim/api/auth/refresh', {
    headers: {
      Cookie: `Refresh=${token}`,
    }
  });

  if(!res.ok) return undefined;
  return res.json();
}