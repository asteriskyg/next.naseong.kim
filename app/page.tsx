import { Suspense } from "react";

import { getRecentClips } from "@/services/clips";

import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";
import { DefaultHeader } from "@/components/layouts/default/DefaultHeader";
import { StaggerChildren } from "@/components/motion";
import { RecentClips } from "@/components/RecentClips";
import { StreamFetching } from "@/components/extension/create/clip/StreamComponent";
import { CreateClip } from "@/components/extension/create/CreateClip";
import {
  Card,
  AnchorButton,
} from "@/components/extension/create/baseComponent";

export default async function Index() {
  const clips = await getRecentClips(0);

  return (
    <>
      <DefaultHeader />
      <StaggerChildren className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-12 flex w-full snap-x snap-mandatory gap-6 overflow-auto">
          <Suspense fallback={<StreamFetching />}>
            <CreateClip />
          </Suspense>
          <Card
            emoji="💡"
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
        <h1 className="suite mb-3 text-3xl font-bold leading-tight tracking-tight text-black dark:text-slate-200">
          클립 목록
        </h1>
        <RecentClips initialClips={clips} />
      </StaggerChildren>
      <DefaultFooter />
    </>
  );
}
