import { Suspense } from "react";

import { StreamFetching } from "@/components/extension/create/clip/StreamComponent";
import { AdCard } from "@/components/extension/create/AdCard";
import {
  Card,
  AnchorButton,
} from "@/components/extension/create/baseComponent";
import { StaggerChildren } from "@/components/motion";
import { CreateClip } from "@/components/extension/create/CreateClip";

export default async function Index() {
  return (
    <div className="bg-white dark:bg-twitch-dark">
      <StaggerChildren className="flex flex-col m-auto max-w-[26rem] p-6 gap-6">
        <AdCard />
        <Suspense fallback={<StreamFetching />}>
          <CreateClip />
        </Suspense>
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
      </StaggerChildren>
    </div>
  );
}
