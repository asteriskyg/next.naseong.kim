import { Suspense } from "react";

import { StreamFetching } from "@/components/extension/create/clip/StreamComponent";
import { AdCard } from "@/components/extension/create/AdCard";
import {
  Card,
  AnchorButton,
  MiniCard,
} from "@/components/extension/create/baseComponent";
import { StaggerChildren } from "@/components/motion";
import { CreateClip } from "@/components/extension/create/CreateClip";

export default async function Index() {
  return (
    <div className="bg-white dark:bg-twitch-dark">
      <StaggerChildren className="m-auto flex max-w-sm flex-col gap-6 p-6">
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
        <div className="-mb-4 text-lg text-black dark:text-slate-200">
          바로가기
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MiniCard
            icon="❤️"
            url="https://app.twip.kr/donate/naseongkim"
            title="방송 후원하기"
            color="rose"
          />
          <MiniCard
            icon="🪐"
            url="https://tgd.kr/s/naseongkim"
            title="트게더"
            color="purple"
          />
        </div>
        <div className="-mb-4 text-lg text-black dark:text-slate-200">
          유튜브
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MiniCard
            icon="▶️"
            url="https://www.youtube.com/@Naseongkim"
            title="김나성"
            color="orange"
          />
          <MiniCard
            icon="🛌"
            url="https://www.youtube.com/channel/UCxbWbdvNz3VCTVumDIc0XrA"
            title="긴나성"
            color="sky"
          />
          <MiniCard
            icon="💾"
            url="https://www.youtube.com/channel/UCfLvxrf3KoKpUG0bBHIZJ-g"
            title="딥나성"
            color="slate"
          />
        </div>
        <div className="-mb-4 text-lg text-black dark:text-slate-200">
          다른 링크
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MiniCard
            icon="🗓"
            url="https://bit.ly/3QeyGNd"
            title="!일정"
            color="red"
          />
          <MiniCard
            icon="🚛"
            url="https://bit.ly/2N1X9Gp"
            title="!과금"
            color="green"
          />
          <MiniCard
            icon="📕"
            url="https://naseongkim.channel.io"
            title="!명령어"
            color="pink"
          />
        </div>
      </StaggerChildren>
    </div>
  );
}
