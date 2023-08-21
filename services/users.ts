import { ClipListsType, IdentityType } from "type";

export const getUserDetail = async (user?: number) => {
  if(!process.env.NEXT_PUBLIC_API_URL)
    throw new Error('NEXT_PUBLIC_API_URL is not defined.');

  if(!user) return undefined;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/detail?id=${user}`)

  if(!res.ok) return undefined;
  // @TODO: IdentityType과 UserDetailType 분리
  return res.json() as Promise<IdentityType>;
}

export const getUserClips = async (
  user: number,
  offset: number,
) => {
  if(!process.env.NEXT_PUBLIC_API_URL)
    throw new Error('NEXT_PUBLIC_API_URL is not defined.');

  if(!user) return undefined;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clip/user?id=${user}&offset=${offset}`)

  if(!res.ok) return undefined;
  return res.json() as Promise<ClipListsType>;
}
