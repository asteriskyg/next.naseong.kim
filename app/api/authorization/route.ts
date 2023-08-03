import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (!process.env.NEXT_PUBLIC_APP_HOST) return NextResponse.json({ error: 'NEXT_PUBLIC_APP_HOST is not defined.' })
  if (!searchParams.get('code')) return NextResponse.json({ error: 'Cannot find authorization code.' })

  const tokenResponse = await fetch(`https://dev.naseong.kim/api/auth/login?code=${searchParams.get('code')}`)
  if(!tokenResponse.ok) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_HOST}`);

  const token = await tokenResponse.json();
  const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_HOST}`);

  res.cookies.set('authorization', token.access, {
    domain: 'next.naseong.kim',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 30,
  });

  res.cookies.set('refresh', token.refresh, {
    domain: 'next.naseong.kim',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  });

  return res;
}