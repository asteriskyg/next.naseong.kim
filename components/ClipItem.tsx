import Image from 'next/image';
import Link from 'next/link';
import { Clip } from 'type';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);

export default function ClipItem({ clip }: { clip: Clip }) {
  return (
    <Link
      href={`/detail/${clip.contentId}`}
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
    >
      <div>
        <div className="relative aspect-video bg-slate-100 dark:bg-neutral-800">
          <Image
            src={`https://customer-lsoi5zwkd51of53g.cloudflarestream.com/${clip.contentId}/thumbnails/thumbnail.jpg`}
            alt=""
            width={720}
            height={480}
          />
          <div
            className="absolute bottom-2 right-2 flex h-6 w-11 items-center justify-center rounded-lg bg-twitch-dark/60 text-sm text-white backdrop-blur-md"
          >
            { 
              clip.clipDuration > 59
                ? clip.clipDuration - 60 < 10
                  ? `1:0${clip.clipDuration - 60}`
                  : `1:${clip.clipDuration - 60}`
                : clip.clipDuration < 10
                  ? `0:0${clip.clipDuration}`
                  : `0:${clip.clipDuration}`
              }
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
      <div className=" text-black dark:text-slate-200">
        <div className="line-clamp-1 text-xl font-semibold tossface">
          { clip.contentName }
        </div>
        <div className="mb-3">
          { clip.gameName }
        </div>
        <div style={{overflowWrap: 'anywhere'}}>
          { clip.creatorName }
        </div>
        <div style={{overflowWrap: 'anywhere'}}>
          { dayjs().locale("ko").to(dayjs(clip.clipCreatedAt)) }
        </div>
      </div>
      </div>
    </Link>
  );
}
