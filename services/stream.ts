import type { StreamInfoType } from "type";

import { getTwitchAccessToken } from "./auth";

export const getTwitchStream = async () => {
  if (!process.env.TWITCH_BROADCASTER_ID) throw new Error("TWITCH_BROADCASTER_ID is not defined.");

  if (!process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID) throw new Error("TWITCH_CLIENT_ID is not defined.");

  const token = await getTwitchAccessToken();
  if (!token) return undefined;

  const res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${process.env.TWITCH_BROADCASTER_ID}`, {
    next: { revalidate: 0 },
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
    },
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<StreamInfoType>;
};

export const getTwitchStreamProxy = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/streamV2`).catch(() => undefined);

  if (!res?.ok) return undefined;
  return res.json() as Promise<StreamInfoType>;
};
