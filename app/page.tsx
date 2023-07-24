import { cookies } from 'next/headers';
import DefaultHeader from '@/components/layouts/default/DefaultHeader';
import DefaultFooter from '@/components/layouts/default/DefaultFooter';
import RecentClipLists from '@/components/RecentClipLists';
import type { StreamInfoType, ClipListsType, IdentityType } from 'type';

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
    headers: {
      'Authorization': `Bearer ${appAccessToken?.access_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID
    }
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<StreamInfoType>;
}

async function GetRecentClips() {
  const res = await fetch('https://dev.naseong.kim/api/clip/recent', {
    method: 'GET',
  })

  if (!res.ok) return undefined;

  return res.json() as Promise<ClipListsType>;
}

export default async function Index() {
  const streamData = GetStream();
  const IdentityData = GetIdentity();
  const clipsData = GetRecentClips();
  
  const [stream, identity, clips] = await Promise.all([streamData, IdentityData, clipsData]);
  return (
    <main>
      <DefaultHeader
        stream={stream?.data[0]}
        me={identity}
      />
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">클립 목록</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-8 px-6 lg:px-8">
            <RecentClipLists clipLists={clips} />
          </div>
        </main>
      </div>
      <DefaultFooter />
    </main>
  )
}