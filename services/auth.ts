import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { IdentityType } from "type";

export const getServiceToken = async (code: string | null) => {
  if(!process.env.NEXT_PUBLIC_API_URL)
    throw new Error('NEXT_PUBLIC_API_URL is not defined.');

  if(!code) return undefined;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login?code=${code}`)

  if(!res.ok) return undefined;
  return res.json() as Promise<{
    access: string,
    refresh: string
  }>;
}

// @TODO: Type 제대로 선언
export const getTwitchAccessToken = async() => {
  if(!process.env.TWITCH_CLIENT_ID)
    throw new Error('TWITCH_CLIENT_ID is not defined.');

  if(!process.env.TWITCH_CLIENT_SECRET)
    throw new Error('TWITCH_CLIENT_SECRET is not defined.');

  const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
    next: { revalidate: 5000000 },
    method: 'POST'
  });

  if(!res.ok) return undefined;
  return res.json() as Promise<{
    access_token: string
  }>;
}

export const getIdentity = async (token?: RequestCookie) => {
  if(!process.env.NEXT_PUBLIC_API_URL)
    throw new Error('NEXT_PUBLIC_API_URL is not defined.');

  if(!token) return undefined;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/detail`, {
    headers: {
      Cookie: `Authorization=${token?.value}`
    }
  });

  if(!res.ok) return undefined;
  return res.json() as Promise<IdentityType>;
}

export const refreshIdentity = async (token: string | undefined) => {
  if(!process.env.NEXT_PUBLIC_API_URL)
    throw new Error('NEXT_PUBLIC_API_URL is not defined.');

  if(!token) return undefined;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    headers: {
      Cookie: `Refresh=${token}`,
    }
  });

  if(!res.ok) return undefined;
  return res.json() as Promise<{
    access: string,
    refresh: string
  }>;
}