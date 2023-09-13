import Image from "next/image";
import Link from "next/link";
import { ClipType } from "type";

import { getTimeFromNow } from "@/utils/date";

const parseClipDuration = (duration: number) => {
  if (duration > 59) return duration - 60 < 10 ? `1:0${duration - 60}` : `1:${duration - 60}`;
  return duration < 10 ? `0:0${duration}` : `0:${duration}`;
};

export const ClipItem = ({ clip }: { clip: ClipType }) => {
  return (
    <Link
      href={`/detail/${clip.clipName}`}
      className="w-full inline-flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border bg-white transition-all hover:bg-slate-100 hover:shadow-lg dark:divide-neutral-600 dark:border-neutral-600 dark:bg-twitch-dark hover:dark:bg-neutral-800">
      <div className="relative bg-slate-100 dark:bg-neutral-800">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_STREAM_HOSTNAME}/clip/${clip.contentId}/thumbnails/thumbnail.jpg`}
          alt=""
          width={640}
          height={360}
        />
        <span className="absolute bottom-1 right-1 inline-flex items-center rounded-lg bg-gray-50/90 px-2 py-1 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-gray-500/10 dark:bg-twitch-dark/90 dark:text-white">
          {parseClipDuration(clip.clipDuration)}
        </span>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className=" text-black dark:text-slate-200">
          <div className="line-clamp-1 text-xl font-semibold">{clip.contentName}</div>
          <div className="mb-3">{clip.gameName}</div>
          <div style={{ overflowWrap: "anywhere" }}>{clip.creatorName}</div>
          <div style={{ overflowWrap: "anywhere" }}>{getTimeFromNow(clip.clipCreatedAt)}</div>
        </div>
      </div>
    </Link>
  );
};
