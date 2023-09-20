export const TWITCH_MESSAGE = {
  ID: "twitch-eventsub-message-id",
  TIMESTAMP: "twitch-eventsub-message-timestamp",
  SIGNATURE: "twitch-eventsub-message-signature",
  MESSAGE: "twitch-eventsub-message-type",
  MESSAGE_TYPE: {
    VERIFICATION: "webhook_callback_verification",
    NOTIFICATION: "notification",
    REVOCATION: "revocation",
  },
} as const;

export type TWITCH_MESSAGE =
  (typeof TWITCH_MESSAGE)[keyof typeof TWITCH_MESSAGE]; // 'iOS' | 'Android'
