import { cookies } from "next/headers";

import { getIdentity } from "@/services/auth";
import { getTwitchStream } from "@/services/stream";

import { CreateClipComponent } from "./CreateClipComponent";

export const CreateClip = async () => {
  const token = cookies().get("authorization");
  const identityResponse = getIdentity(token);
  const streamResponse = getTwitchStream();

  const [identity, stream] = await Promise.all([
    identityResponse,
    streamResponse,
  ]);

  return <CreateClipComponent stream={stream} identity={identity} />;
};
