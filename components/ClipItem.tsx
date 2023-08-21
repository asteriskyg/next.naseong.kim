import Image from 'next/image';
import Link from 'next/link';
import { ClipType } from 'type';

import { getTimeFromNow } from '@/utils/date';


export const ClipItem = ({ clip }: { clip: ClipType }) => {
  return (
    <Link
      href={`/detail/${clip.clipName}`}
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white hover:bg-stone-100 hover:shadow-lg border transition-all"
    >
      <div className="relative bg-slate-100 dark:bg-neutral-800">
        <Image
          src={`https://customer-lsoi5zwkd51of53g.cloudflarestream.com/${clip.contentId}/thumbnails/thumbnail.jpg`}
          alt=""
          width={640}
          height={360}
        />
        <span className="absolute bottom-1 right-1 inline-flex items-center rounded-lg bg-gray-50/90 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {
            clip.clipDuration > 59
              ? clip.clipDuration - 60 < 10
                ? `1:0${clip.clipDuration - 60}`
                : `1:${clip.clipDuration - 60}`
              : clip.clipDuration < 10
                ? `0:0${clip.clipDuration}`
                : `0:${clip.clipDuration}`
            }
        </span>
      </div>
      <div className="px-4 py-4 sm:px-6">
      <div className=" text-black dark:text-slate-200">
        <div className="line-clamp-1 text-xl font-semibold">
          { clip.contentName }
        </div>
        <div className="mb-3">
          { clip.gameName }
        </div>
        <div style={{overflowWrap: 'anywhere'}}>
          { clip.creatorName }
        </div>
        <div style={{overflowWrap: 'anywhere'}}>
          { getTimeFromNow(clip.clipCreatedAt) }
        </div>
      </div>
      </div>
    </Link>
  );
}
