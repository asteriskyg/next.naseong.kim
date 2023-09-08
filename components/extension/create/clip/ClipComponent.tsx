"use client";

import type { ReactElement } from "react";
import type { ClipType } from "type";

import { Card, AnchorButton, NormalButton } from "../baseComponent";

export const ClipCreate = () => {
  return (
    <Card
      emoji="💾"
      title="클립을 만들고 있어요."
      subtitle="잠시만 기다려 주세요."
      color="blue"
    />
  );
};

export const ClipCreateSuccess = ({ clip }: { clip: ClipType }) => {
  return (
    <Card
      emoji="🎉"
      title="클립을 만들었어요."
      color="green"
      buttons={[
        <AnchorButton
          key={0}
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/detail/${clip.clipName}`}
          text="클립 보기"
          color="green"
        />,
      ]}
    />
  );
};

export const ClipCreateError = ({
  button,
}: {
  button: typeof NormalButton & ReactElement;
}) => {
  return (
    <Card
      emoji="⚠️"
      title="클립을 만들지 못했어요."
      subtitle="다시 시도해 주세요."
      color="orange"
      buttons={[button]}
    />
  );
};

export const ClipCreateFail = () => {
  return (
    <Card
      emoji="⚠️"
      title="지금은 클립을 만들 수 없어요."
      subtitle="잠시 후 다시 시도해 주세요. 문제가 지속되면 아래 버튼을 눌러서 관리자에게 알려주세요."
      color="red"
      buttons={[
        <AnchorButton
          key={0}
          target="_blank"
          href="https://naseongkim.channel.io"
          text="오류 제보하기"
          color="red"
        />,
      ]}
    />
  );
};
