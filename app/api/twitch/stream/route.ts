import { NextResponse } from 'next/server'
import type { StreamInfoType } from 'type';

async function GetTwitchAccessToken() {
  const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
    next: { revalidate: 5000000 },
    method: 'POST'
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<{ access_token: string }>;
}

async function GetStream() {
  const appAccessToken = await GetTwitchAccessToken();
  if(!appAccessToken || !process.env.TWITCH_BROADCASTER_ID || !process.env.TWITCH_CLIENT_ID) return undefined;

  const res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${process.env.TWITCH_BROADCASTER_ID}`, {
    next: { revalidate: 300 },
    headers: {
      'Authorization': `Bearer ${appAccessToken?.access_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID
    }
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<StreamInfoType>;
}

export async function GET() {
  const stream = await GetStream();
  console.log(stream)
  if(!stream?.data[0]) return NextResponse.json({}, { status: 404 });
  return NextResponse.json(stream.data[0]);
}