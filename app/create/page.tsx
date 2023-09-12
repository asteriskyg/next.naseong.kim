import { cookies } from "next/headers";

import { getIdentity } from "@/services/auth";
import { getTwitchStream } from "@/services/stream";

import { AdCard } from "@/components/extension/create/AdCard";
import { CreateClip } from "@/components/extension/create/CreateClip";
import {
  Card,
  AnchorButton,
} from "@/components/extension/create/baseComponent";

export default async function Index() {
  const token = cookies().get("authorization");
  const identity = await getIdentity(token);
  const stream = await getTwitchStream();

  return (
    <div className="bg-white dark:bg-twitch-dark">
      <div className="flex flex-col m-auto max-w-[26rem] p-6 gap-6">
        <AdCard />
        <CreateClip stream={stream} identity={identity} />
        <Card
          emoji="💢"
          title="사용하는데 문제가 있나요?"
          subtitle="내용을 알려주시면 빠르게 도와드릴게요."
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
