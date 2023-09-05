import { NextRequest, NextResponse } from "next/server";

import { getServiceToken } from "@/services/auth";

const getParams = (url: string | undefined, key: string) => {
  if (!url) return null;

  const { searchParams } = new URL(url);
  return searchParams.get(key);
};

export const GET = async (req: NextRequest) => {
  if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error("NEXT_PUBLIC_APP_URL is not defined.");

  const code = getParams(req.url, "code");
  const token = await getServiceToken(code);

  if (!token) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=invalid_request`);

  const res = NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL);

  res.cookies.set("authorization", token.access, {
    domain: process.env.NEXT_PUBLIC_APP_HOST,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 30, // 30분
  });

  res.cookies.set("refresh", token.refresh, {
    domain: process.env.NEXT_PUBLIC_APP_HOST,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 2, // 14일
  });

  return res;
};
