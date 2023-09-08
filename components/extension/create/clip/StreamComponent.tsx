"use client";

import { ReactElement } from "react";
import { IdentityType, StreamInfoType } from "type";

import { Card, AnchorButton } from "../baseComponent";

export const StreamFetching = () => {
  return (
    <Card
      emoji="🐌"
      title="방송 정보를 불러오고 있어요."
      subtitle="잠시만 기다려 주세요."
      color="slate"
    />
  );
};

export const StreamFetchingFail = () => {
  return (
    <Card
      emoji="⚠️"
      title="방송 정보를 확인할 수 없어요."
      subtitle="잠시 후 다시 시도해 주세요. 문제가 지속되면 아래 버튼을 눌러서 관리자에게 알려주세요."
      color="red"
      buttons={[
        <AnchorButton
          key={0}
          target="_blank"
          href="https://twitch.tv/naseongkim"
          text="트위치 바로가기"
          color="purple"
        />,
        <AnchorButton
          key={1}
          target="_blank"
          href="https://naseongkim.channel.io"
          text="오류 제보하기"
          color="red"
        />,
      ]}
    />
  );
};

export const StreamOnline = ({
  stream,
  identity,
  button,
}: {
  stream: StreamInfoType;
  identity?: IdentityType;
  button: ReactElement;
}) => {
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
        identity ? (
          button
        ) : (
          <AnchorButton
            key={1}
            text="로그인"
            color="blue"
            target="_blank"
            href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/authorization&scope=clips%3Aedit%20user%3Aread%3Aemail%20user%3Aread%3Asubscriptions`}
          />
        ),
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
