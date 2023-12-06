import type {
  ClipListsType,
  ClipStatusType,
  ClipType,
  IdentityType,
} from "type";

export const getClipStatus = async (clip: ClipType) => {
  if (!process.env.CLOUDFLARE_ACCOUNT_ID)
    throw new Error("CLOUDFLARE_ACCOUNT_ID is not defined.");

  if (!process.env.CLOUDFLARE_ACCOUNT_SECRET)
    throw new Error("CLOUDFLARE_ACCOUNT_SECRET is not defined.");

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/${clip.contentId}/downloads`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_ACCOUNT_SECRET}`,
      },
      next: {
        tags: ["activate-clip"],
      },
    },
  );

  if (!res.ok) return undefined;
  return (await res.json()) as Promise<ClipStatusType>;
};

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
    {
      cache: "no-store",
    },
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
  return (await res.json()) as Promise<ClipType>;
};

export const deleteClip = async (
  identity: IdentityType | undefined,
  clip: ClipType,
) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not defined.");

  if (!identity) throw new Error("Identity is undefined.");
  if (!clip) throw new Error("Clip is undefined.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clip/delete?id=${clip.clipName}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!res.ok) return undefined;
  return null;
};
