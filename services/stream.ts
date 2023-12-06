import type { StreamInfoType } from "type";

import { getTwitchAccessToken } from "./auth";

export const getTwitchStream = async () => {
  if (!process.env.TWITCH_BROADCASTER_ID)
    throw new Error("TWITCH_BROADCASTER_ID is not defined.");

  if (!process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID)
    throw new Error("TWITCH_CLIENT_ID is not defined.");

  const token = await getTwitchAccessToken();
  if (!token) throw new Error("Failed to get Twitch Access Token");

  const res = await fetch(
    `https://api.twitch.tv/helix/streams?user_id=${process.env.TWITCH_BROADCASTER_ID}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      },
      cache: "force-cache",
      next: { tags: ["stream-status"] },
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to get Twitch Stream: ${res.statusText} ${token} ${await res.text()}`,
    );
  return (await res.json()) as Promise<StreamInfoType>;
};
