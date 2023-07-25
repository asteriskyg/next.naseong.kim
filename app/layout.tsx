import '@/styles/globals.css'
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import DefaultFooter from '@/components/layouts/default/DefaultFooter';
import DefaultHeader from '@/components/layouts/default/DefaultHeader';
import type { IdentityType, StreamInfoType } from 'type';

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

async function GetTwitchAccessToken() {
  const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
    next: { revalidate: 5000000 },
    method: 'POST'
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<{ access_token: string }>;
}

async function GetStream() {
  const appAccessToken = await GetTwitchAccessToken();
  if(!appAccessToken || !process.env.TWITCH_BROADCASTER_ID || !process.env.TWITCH_CLIENT_ID) return undefined;

  const res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${process.env.TWITCH_BROADCASTER_ID}`, {
    next: { revalidate: 300 },
    headers: {
      'Authorization': `Bearer ${appAccessToken?.access_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID
    }
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<StreamInfoType>;
}

export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const streamData = GetStream();
  const IdentityData = GetIdentity();
  
  const [stream, identity] = await Promise.all([streamData, IdentityData]);
  return (
    <html lang="ko">
      <body>
        <main>
          <DefaultHeader
            stream={stream?.data[0]}
            me={identity}
          />
          {children}
          <DefaultFooter />
        </main>
        <Analytics />
      </body>
    </html>
  )
}