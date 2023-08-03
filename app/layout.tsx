import '@/styles/globals.css'
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import DefaultFooter from '@/components/layouts/default/DefaultFooter';
import DefaultHeader from '@/components/layouts/default/DefaultHeader';
import type { IdentityType } from 'type';

async function GetIdentity() {
  const authorization = cookies().get('authorization');
  if (!authorization) return undefined;

  const res = await fetch('https://dev.naseong.kim/api/user/detail', {
    headers: {
      Cookie: `Authorization=${authorization.value}`
    }
  });

  if(!res.ok) return undefined;
  return res.json() as Promise<IdentityType>;
}

export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const identity = await GetIdentity();
  return (
    <html lang="ko">
      <body>
        <DefaultHeader me={ identity } />
        <main>{ children }</main>
        <DefaultFooter />
        <Analytics />
      </body>
    </html>
  )
}