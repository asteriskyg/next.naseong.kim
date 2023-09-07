import { cookies } from "next/headers";

import { getIdentity } from "@/services/auth";

import { AdCard } from "@/components/extension/create/AdCard";
import { CreateClip } from "@/components/extension/create/CreateClip";
import { Card, AnchorButton } from "@/components/extension/create/layout";

// eslint-disable-next-line react/function-component-definition
export default async function Index() {
  const token = cookies().get("authorization");
  const identity = await getIdentity(token);

  return (
    <div className="bg-white dark:bg-twitch-dark">
      <div className="flex flex-col m-auto max-w-[26rem] p-6 gap-6">
        <AdCard />
        <CreateClip identity={identity} />
        <Card
          emoji="🎬"
          title="유튜브 다시보기에서 클립을 만들어 보세요."
          color="slate"
          buttons={[
            <AnchorButton
              key={0}
              target="_self"
              href="/import"
              text="바로가기"
              color="blue"
            />,
          ]}
        />
        <Card
          emoji="💢"
          title="사용하는데 문제가 있나요?"
          subtitle="내용을 알려주시면 빠르게 도와드릴 수 있어요."
          color="slate"
          buttons={[
            <AnchorButton
              key={0}
              target="_self"
              href="https://naseongkim.channel.io"
              text="의견 보내기"
              color="blue"
            />,
          ]}
        />
      </div>
    </div>
  );
}
