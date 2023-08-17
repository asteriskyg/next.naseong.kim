import { NextRequest, NextResponse } from 'next/server'
import { getServiceToken } from '@/services/auth';

export async function GET(req: NextRequest) {
  if(!process.env.NEXT_PUBLIC_APP_URL)
    throw new Error('NEXT_PUBLIC_APP_URL is not defined.');

  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code');
  
  const token = await getServiceToken(code);
  if(!token) return NextResponse
    .redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=invalid_request`);

  const res = NextResponse
    .redirect(process.env.NEXT_PUBLIC_APP_URL);

  res.cookies.set('authorization', token.access, {
    domain: process.env.NEXT_PUBLIC_APP_URL,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 30, // 30분
  });

  res.cookies.set('refresh', token.refresh, {
    domain: process.env.NEXT_PUBLIC_APP_URL,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 14일
  });

  return res;
}