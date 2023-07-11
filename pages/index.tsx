import type { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import Identity from '../scripts/handleIdentity';
import type { StreamInfoType, IdentityType } from 'type';
import DefaultHeader from '@/components/layouts/default/DefaultHeader';
import DefaultFooter from '@/components/layouts/default/DefaultFooter';

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

  return {
    props: { stream, me }
  }
}

export default function Home({ stream, me }: {
    stream: StreamInfoType | null,
    me: IdentityType | null
  }) {
  return (
    <main>
      <DefaultHeader
        stream={stream}
        me={me}
      />
      <div className="py-10" />
    <DefaultFooter />
  </main>
  )
}
