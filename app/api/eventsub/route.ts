import { NextRequest, NextResponse } from "next/server";

import { TWITCH_MESSAGE } from "@/constants/twitch";
import { getHmac, verifyMessage } from "@/utils/crypto";
import { revalidateByTag } from "@/services/revalidate";

const getHmacMessage = (
  id: string,
  timestamp: string,
  notification: string,
) => {
  const stringify = JSON.stringify(notification);
  return id + timestamp + stringify;
};

export async function POST(request: NextRequest) {
  if (!process.env.TWITCH_WEBHOOK_SECRET) {
    throw new Error("TWITCH_WEBHOOK_SECRET is not defined.");
  }

  const id = request.headers.get(TWITCH_MESSAGE.ID);
  const timestamp = request.headers.get(TWITCH_MESSAGE.TIMESTAMP);
  const signature = request.headers.get(TWITCH_MESSAGE.SIGNATURE);
  const message = request.headers.get(TWITCH_MESSAGE.MESSAGE);

  if (!id || !timestamp || !signature || !message) {
    return new NextResponse(undefined, { status: 400 });
  }

  const secret = process.env.TWITCH_WEBHOOK_SECRET;
  const notification = await request.json();
  const hmacMessage = getHmacMessage(id, timestamp, notification);

  if (!hmacMessage) {
    return new NextResponse(undefined, { status: 400 });
  }

  const hmac = `sha256=${getHmac(secret, hmacMessage)}`;

  if (!verifyMessage(hmac, signature) || !message) {
    return new NextResponse(undefined, { status: 403 });
  }

  if (TWITCH_MESSAGE.MESSAGE_TYPE.NOTIFICATION === message) {
    const event = notification.subscription.type;

    if (
      event === "channel.update" ||
      event === "stream.online" ||
      event === "stream.offline"
    ) {
      await revalidateByTag("StreamStatus");
      return new NextResponse(undefined, { status: 204 });
    }

    return new NextResponse(undefined, { status: 400 });
  }

  if (TWITCH_MESSAGE.MESSAGE_TYPE.VERIFICATION === message) {
    return new NextResponse(notification.challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (TWITCH_MESSAGE.MESSAGE_TYPE.REVOCATION === message) {
    return new NextResponse(undefined, { status: 204 });
  }

  return new NextResponse(undefined, { status: 204 });
}
