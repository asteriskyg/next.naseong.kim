"use client";

import { useState, useEffect } from "react";

import { CreateClip } from "@/components/extension/createClip";
import { Card, AnchorButton, NormalButton } from "@/components/extension/layout";

// eslint-disable-next-line react/function-component-definition
export default function Index() {
  const [adStatus, setAdStatus] = useState(false);

  useEffect(() => {
    const checkAdOption = () => {
      const status = localStorage.getItem("hide-extension-ad");
      if (status === "true") return setAdStatus(false);
      return setAdStatus(true);
    };

    checkAdOption();
  }, []);

  return (
    <div className="bg-white dark:bg-twitch-dark">
      <div className="flex flex-col m-auto max-w-[26rem] p-6 gap-6">
        {adStatus ? (
          <Card
            emoji="💡"
            title="나클립 확장 프로그램으로 더욱 편리하게 이용해 보세요."
            color="slate"
            buttons={[
              <AnchorButton
                key={0}
                target="_blank"
                href="https://chrome.google.com/webstore/detail/pccdeccoompikgkmcepmnmlggefjilfm"
                text="다운로드"
                color="blue"
              />,
              <NormalButton
                color="slate"
                key={1}
                effect={() => {
                  localStorage.setItem("hide-extension-ad", "true");
                  setAdStatus(true);
                }}
                text="7일간 보지 않기"
              />,
            ]}
          />
        ) : undefined}
        <CreateClip />
        <Card
          emoji="🎬"
          title="유튜브 다시보기에서 클립을 만들어 보세요."
          color="slate"
          buttons={[<AnchorButton key={0} target="_self" href="/import" text="바로가기" color="red" />]}
        />
        <Card
          emoji="💢"
          title="사용하는데 문제가 있나요?"
          subtitle="내용을 알려주시면 빠르게 도와드릴 수 있어요."
          color="slate"
          buttons={[<AnchorButton key={0} target="_self" href="https://naseongkim.channel.io" text="의견 보내기" color="blue" />]}
        />
      </div>
    </div>
  );
}
