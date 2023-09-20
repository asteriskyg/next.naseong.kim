import { createHmac, timingSafeEqual } from "crypto";

export const getHmac = (secret: string, message: string) => {
  return createHmac("sha256", secret).update(message).digest("hex");
};

export const verifyMessage = (hmac: string, verifySignature: string | null) => {
  if (!verifySignature) return false;

  return timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
};
