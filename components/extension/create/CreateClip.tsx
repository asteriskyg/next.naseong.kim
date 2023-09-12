"use client";

import { ReactElement, useEffect, useState } from "react";
import { ClipType, IdentityType, StreamInfoType } from "type";

import { createClip } from "@/services/clips";

import {
  StreamFetching,
  StreamFetchingFail,
  StreamOnline,
  StreamOffline,
} from "./clip/StreamComponent";
import {
  ClipCreate,
  ClipCreateSuccess,
  ClipCreateFail,
} from "./clip/ClipComponent";
import { NormalButton } from "./baseComponent";

export const CreateClip = ({
  stream,
  identity,
}: {
  stream?: StreamInfoType;
  identity?: IdentityType;
}) => {
  const [status, setStatus] = useState("streamFetching");
  const [clip, setClip] = useState<ClipType | undefined>(undefined);
  const [component, setComponent] = useState<ReactElement | undefined>(
    <StreamFetching />
  );

  useEffect(() => {
    const updateComponent = () => {
      if (status === "streamFetchingFail")
        return setComponent(<StreamFetchingFail />);
      if (status === "streamOnline")
        return setComponent(
          <StreamOnline
            stream={stream as StreamInfoType}
            identity={identity}
            button={
              <NormalButton
                key={1}
                color="blue"
                effect={() => {
                  setStatus("clipCreate");
                }}
                text="클립 만들기"
              />
            }
          />
        );
      if (status === "streamOffline") return setComponent(<StreamOffline />);
      if (status === "clipCreate") return setComponent(<ClipCreate />);
      if (status === "clipCreateSuccess")
        return setComponent(<ClipCreateSuccess clip={clip as ClipType} />);
      if (status === "clipCreateFail") return setComponent(<ClipCreateFail />);

      return setComponent(undefined);
    };

    updateComponent();
  }, [status, stream, clip, identity]);

  useEffect(() => {
    const checkStream = () => {
      if (!stream) return setStatus("streamFetchingFail");
      if (stream.data.length === 0) return setStatus("streamOffline");

      return setStatus("streamOnline");
    };

    checkStream();
  }, [stream]);

  useEffect(() => {
    const create = async () => {
      const response = await createClip();

      if (!response) return setStatus("clipCreateFail");

      setClip(response);
      return setStatus("clipCreateSuccess");
    };

    if (status === "clipCreate") {
      create();
    }
  }, [status]);

  return component;
};
