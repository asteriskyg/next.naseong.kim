import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import RecentClipLists from "@/components/RecentClipLists";
import { Clip, ClipListsType } from "type";
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);

async function GetClipData(id: string) {
  const res = await fetch(`https://dev.naseong.kim/api/clip/detail?id=${id}`)

  if (!res.ok) return undefined;
  return res.json() as Promise<Clip>;
}

async function GetUserData(id: string) {
  const clip = await GetClipData(id);
  if (!clip) return undefined;

  const res = await fetch(`https://dev.naseong.kim/api/user/detail?id=${clip.creatorId}`)

  if (!res.ok) return undefined;
  return res.json();
}

async function GetRecentClips() {
  const res = await fetch('https://dev.naseong.kim/api/clip/recent', {
    method: 'GET',
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<ClipListsType>;
}

function TimeStamp(clip: Clip) {
  const toSeconds = dayjs(clip.clipCreatedAt).locale('ko').diff(clip.streamStartedAt, 's');
  const hour = Math.floor(toSeconds / 3600);
  const minutes = Math.floor((toSeconds % 3600) / 60);
  const secondsLeft = toSeconds % 60;

  if (hour === 0) return `${minutes}분 ${secondsLeft}초`;
  return `${hour}시간 ${minutes}분 ${secondsLeft}초`;
}

export default async function ClipDetail({ params }: { params: { clipId: string } }) {
  const clipData = GetClipData(params.clipId);
  const userData = GetUserData(params.clipId);
  const clipListsData = GetRecentClips();
  const [clip, user, clipLists] = await Promise.all([clipData, userData, clipListsData]);

  if(!clip) return (
    <div>
      <main>
        404
      </main>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl sm:p-6 sm:pb-0">
      <div className="relative aspect-video sm:overflow-hidden sm:rounded-lg sm:border border-b md:rounded-lg dark:border-neutral-600">
        <iframe
          src={`https://customer-lsoi5zwkd51of53g.cloudflarestream.com/${clip.contentId}/iframe?preload=true&loop=true&poster=https%3A%2F%2Fcustomer-lsoi5zwkd51of53g.cloudflarestream.com%2F${clip.contentId}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="h-full w-full"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col items-start justify-between gap-6 p-6 pb-3 sm:px-0 md:flex-row text-black dark:text-slate-200">
        <div>
          <div className="text-xl line-clamp-1 sm:text-2xl">
            { clip.contentName }
          </div>
          <div className="mb-3">
            { clip.gameName }
          </div>
          <div>
            <span className="text-gray-400">방송일자: </span>
            { dayjs(clip?.streamStartedAt).format("YYYY년 MM월 DD일") } ({
              dayjs().locale("ko").to(dayjs(clip.streamStartedAt))
            })
          </div>
          <div>
            <span className="text-gray-400">타임스탬프: </span>
            { TimeStamp(clip) }
          </div>
        </div>
      </div>
      <div className="flex px-6 sm:px-0 mb-6">
        <a
          href={`/profile/${user.twitchUserId}`}
          className="w-full sm:w-auto flex items-center justify-between bg-slate-100 dark:bg-neutral-800 rounded-2xl px-4 sm:pl-4 sm:pr-0 py-3 text-dark dark:text-slate-200 hover:bg-slate-200 hover:dark:bg-neutral-700 transition-all ease-in-out sm:hover:pr-4 after:w-2 sm:after:block after:content-['>'] after:-translate-x-full hover:after:translate-x-0 after:opacity-0 hover:after:opacity-100 after:transition-all after:ease-in-out after:sm:ml-2"
        >
          <span className="flex items-center justify-center">
            <Image
              width={32}
              height={32}
              className="rounded-full border dark:border-neutral-600 mr-3"
              src={user?.profileImageUrl}
              alt={`${user?.displayName}님의 프로필 사진`}
            />
            { user.displayName }
            </span>
        </a>
      </div>
      <div className="mx-auto max-w-7xl py-8 px-6 sm:px-0">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mb-6 suite">클립 목록</h1>
        <RecentClipLists clipLists={clipLists} />
      </div>
    </div>
  )
}