import axios from 'axios'
import Identity from '../scripts/handleIdentity';
import type { GetServerSidePropsContext } from 'next'
import type { StreamInfoType, IdentityType, ClipListsType } from 'type';
import DefaultHeader from '@/components/layouts/default/DefaultHeader';
import DefaultFooter from '@/components/layouts/default/DefaultFooter';
import RecentClipLists from '@/components/RecentClipLists';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const identity = new Identity(context);
  let me = await identity.get();

  const appAccessToken = await axios
    .post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    .catch(function () {
      return undefined;
    }) as { data: { access_token: string } } | undefined;

  const streamData = await axios
    .get(`https://api.twitch.tv/helix/streams?user_id=${process.env.TWITCH_BROADCASTER_ID}`, {
      headers: {
        'Authorization': `Bearer ${appAccessToken?.data.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    })
    .catch(function () {
      return undefined;
    }) as { data: StreamInfoType } | undefined;

  const clipListsData = await axios
    .get('https://dev.naseong.kim/api/clip/recent')
    .catch(function () {
      return undefined;
    }) as { data: ClipListsType } | undefined;

  if(!me) {
    const getIdentity = await identity.refresh();
    if(getIdentity) {
      me = await identity.get();
    }
  }

  const stream = streamData?.data || null;
  const clipLists = clipListsData?.data || [];

  return {
    props: { stream, clipLists, me }
  }
}

export default function Home({ stream, clipLists, me }: {
    stream: StreamInfoType | null,
    clipLists: ClipListsType | [],
    me: IdentityType | null
  }) {
  return (
    <main>
      <DefaultHeader
        stream={stream}
        me={me}
      />
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">클립 목록</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-8 px-6 lg:px-8">
            <RecentClipLists clipLists={clipLists} />
          </div>
        </main>
      </div>
    <DefaultFooter />
  </main>
  )
}
