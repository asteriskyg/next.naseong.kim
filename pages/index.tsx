import type { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import Identity from '../scripts/handleIdentity';
import type { StreamInfoType, IdentityType, ClipListsType } from 'type';
import DefaultHeader from '@/components/layouts/default/DefaultHeader';
import DefaultFooter from '@/components/layouts/default/DefaultFooter';
import RecentClipLists from '@/components/RecentClipLists';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const identity = new Identity(context);

  const streamData = await axios
    .get('https://dev.naseong.kim/api/stream')
    .catch(function () {
      return undefined;
    }) as { data: StreamInfoType } | undefined;

  const stream = streamData?.data || null;

  let me = await identity.get();

  if(!me) {
    const getIdentity = await identity.refresh();
    if(getIdentity) {
      me = await identity.get();
    }
  }

  const clipListsData = await axios
    .get('https://dev.naseong.kim/api/clip/recent')
    .catch(function () {
      return undefined;
    }) as { data: ClipListsType } | undefined;

  const clipLists = clipListsData?.data || [];

  return {
    props: { stream, me, clipLists }
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
