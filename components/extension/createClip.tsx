"use client";

import { ReactElement, useEffect, useState } from "react";
import { StreamInfoType } from "type";

import { getTwitchStreamProxy } from "@/services/stream";

import { Card, AnchorButton, NormalButton } from "./layout";

export const FetchStream = () => {
  return <Card emoji="🐌" title="방송 정보를 불러오고 있어요." subtitle="잠시만 기다려 주세요." color="slate" />;
};

export const FetchError = () => {
  return <Card emoji="⚠️" title="방송 정보를 불러오지 못했어요." subtitle="잠시 후 다시 시도해 주세요." color="red" />;
};

export const StreamOnline = ({ stream }: { stream: StreamInfoType }) => {
  return (
    <Card
      emoji="🔖"
      title={stream.data[0].title}
      subtitle={stream.data[0].game_name}
      color="blue"
      buttons={[
        <AnchorButton
          key={0}
          target="_blank"
          href={`https://twitch.tv/${stream.data[0].user_name}`}
          text="방송 보기"
          color="purple"
        />,
        <NormalButton
          key={1}
          color="blue"
          effect={() => {
            localStorage.setItem("test", "true");
          }}
          text="클립 만들기"
        />,
      ]}
    />
  );
};

export const StreamOffline = () => {
  return (
    <Card
      emoji="💤"
      title="오프라인"
      color="slate"
      buttons={[
        <AnchorButton
          key={0}
          target="_blank"
          href="https://tgd.kr/s/naseongkim"
          text="트게더 바로가기"
          color="purple"
        />,
        <AnchorButton
          key={1}
          target="_blank"
          href="https://www.youtube.com/channel/UCfLvxrf3KoKpUG0bBHIZJ-g"
          text="유튜브 다시보기"
          color="red"
        />,
      ]}
    />
  );
};

export const CreateClip = () => {
  const [status, setStatus] = useState("fetching");
  const [stream, setStream] = useState<StreamInfoType | undefined>(undefined);
  const [component, setComponent] = useState<ReactElement | undefined>(<FetchStream />);

  useEffect(() => {
    const updateComponent = () => {
      if (status === "fetching") return setComponent(<FetchStream />);
      if (status === "fetchError") return setComponent(<FetchError />);
      if (status === "online") return setComponent(<StreamOnline stream={stream as StreamInfoType} />);
      if (status === "offline") return setComponent(<StreamOffline />);
      return setComponent(undefined);
    };

    updateComponent();
  }, [status, stream]);

  useEffect(() => {
    const getTwitchStream = async () => {
      const response = await getTwitchStreamProxy();

      if (!response) return setStatus("fetchError");
      if (response?.data.length === 0) return setStatus("offline");

      setStream(response);
      return setStatus("online");
    };

    getTwitchStream();
  }, []);

  return component;
};
