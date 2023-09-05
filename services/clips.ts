import { ClipListsType, ClipType } from "type";

export const getClipDetail = async (clip: string) => {
  if (!process.env.NEXT_PUBLIC_API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined.");

  if (!clip) return undefined;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clip/detail?id=${clip}`);

  if (!res.ok) return undefined;
  return res.json() as Promise<ClipType>;
};

export const getRecentClips = async (offset: number) => {
  if (!process.env.NEXT_PUBLIC_API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined.");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clip/recent?offset=${offset}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<ClipListsType>;
};
