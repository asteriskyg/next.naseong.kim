"use client";

import { useState, useEffect } from "react";

import { Card, AnchorButton, NormalButton } from "./layout";

export const AdCard = () => {
  const [adStatus, setAdStatus] = useState(false);

  useEffect(() => {
    const checkAdOption = () => {
      const status = localStorage.getItem("hide-extension-ad");
      if (status === "true") return setAdStatus(false);
      return setAdStatus(true);
    };

    checkAdOption();
  }, [adStatus]);

  if (!adStatus) return undefined;
  return (
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
            setAdStatus(false);
          }}
          text="7일간 보지 않기"
        />,
      ]}
    />
  );
};
