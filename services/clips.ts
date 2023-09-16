import type { ClipListsType, ClipType, IdentityType } from "type";

import { revalidateByPath, revalidateByToken } from "./revalidate";

export const getClipDetail = async (clip: string) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not defined.");

  if (!clip) return undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clip/detail?id=${clip}`,
  );

  if (!res.ok) return undefined;
  return (await res.json()) as Promise<ClipType>;
};

export const getRecentClips = async (offset: number) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not defined.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clip/recent?offset=${offset}`,
    { next: { tags: ["RecentClipList"] } },
  );

  if (!res.ok) return undefined;
  return (await res.json()) as Promise<ClipListsType>;
};

export const createClip = async (identity: IdentityType) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not defined.");

  if (!identity) throw new Error("Identity is undefined.");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clip/create`, {
    credentials: "include",
  });

  if (!res.ok) return undefined;

  await revalidateByToken("RecentClipList");
  await revalidateByPath(
    `${process.env.NEXT_PUBLIC_API_URL}/clip/user?id=${identity.twitchUserId}&offset=0`,
  );
  return (await res.json()) as Promise<ClipType>;
};
