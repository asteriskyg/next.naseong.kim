import { NextRequest, NextResponse } from "next/server";

import { getHmac, verifyMessage } from "@/utils/crypto";
import { revalidateByToken } from "@/services/revalidate";

const TWITCH_MESSAGE_ID = "twitch-eventsub-message-id";
const TWITCH_MESSAGE_TIMESTAMP = "twitch-eventsub-message-timestamp";
const TWITCH_MESSAGE_SIGNATURE = "twitch-eventsub-message-signature";
const MESSAGE_TYPE = "twitch-eventsub-message-type";

const MESSAGE_TYPE_VERIFICATION = "webhook_callback_verification";
const MESSAGE_TYPE_NOTIFICATION = "notification";
const MESSAGE_TYPE_REVOCATION = "revocation";

const getHmacMessage = async (request: Request) => {
  const id = request.headers.get(TWITCH_MESSAGE_ID) || "";
  const timestamp = request.headers.get(TWITCH_MESSAGE_TIMESTAMP) || "";
  const { body } = request;

  return id + timestamp + body;
};

export async function POST(request: NextRequest) {
  if (!process.env.TWITCH_WEBHOOK_SECRET) {
    throw new Error("TWITCH_WEBHOOK_SECRET is not defined.");
  }

  const secret = process.env.TWITCH_WEBHOOK_SECRET;
  const message = await getHmacMessage(request);

  if (!message) {
    return new NextResponse(undefined, { status: 400 });
  }

  const hmac = `sha256=${getHmac(secret, message)}`;

  if (
    !verifyMessage(hmac, request.headers.get(TWITCH_MESSAGE_SIGNATURE)) ||
    !request.headers.get(MESSAGE_TYPE)
  ) {
    return new NextResponse(undefined, { status: 403 });
  }

  const notification = await request.json();

  if (MESSAGE_TYPE_NOTIFICATION === request.headers.get(MESSAGE_TYPE)) {
    const event = notification.subscription.type;

    if (event === "channel.update") {
      await revalidateByToken("StreamStatus");
    }

    return new NextResponse(undefined, { status: 204 });
  }

  if (MESSAGE_TYPE_VERIFICATION === request.headers.get(MESSAGE_TYPE)) {
    return new NextResponse(notification.challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (MESSAGE_TYPE_REVOCATION === request.headers.get(MESSAGE_TYPE)) {
    return new NextResponse(undefined, { status: 204 });
  }

  return new NextResponse(undefined, { status: 204 });
}
