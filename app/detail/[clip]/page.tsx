import Link from "next/link";
import Image from "next/image";

import { getUserDetail } from "@/services/users";
import { getClipDetail, getRecentClips } from "@/services/clips";
import {
  getFormattedDate,
  getTimeFromNow,
  getClippedTimestamp,
  getTimeDiff,
} from "@/utils/date";

import { DefaultHeader } from "@/components/layouts/default/DefaultHeader";
import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";
import { RecentClips } from "@/components/RecentClips";
import { StaggerChildren } from "@/components/motion";

export default async function ClipDetail({
  params,
}: {
  params: {
    clip: string;
  };
}) {
  const clipData = getClipDetail(params.clip);
  const clipListsData = getRecentClips(0);
  const [clip, clipLists] = await Promise.all([clipData, clipListsData]);
  const user = await getUserDetail(clip?.creatorId);

  if (!clip || !user) return <div>404</div>;

  const clipLastEdited = getTimeDiff(Date.now(), clip.clipLastEdited, "m");
  const streamDate = getFormattedDate(clip.streamStartedAt, "YYYY년 MM월 DD일");
  const timeFromNow = getTimeFromNow(clip.streamStartedAt);
  const timestamp = getClippedTimestamp(
    clip.streamStartedAt,
    clip.clipCreatedAt
  );

  return (
    <>
      <DefaultHeader />
      <StaggerChildren className="mx-auto max-w-7xl sm:p-6 sm:pb-0">
        <div className="relative pt-[56.25%] sm:overflow-hidden sm:rounded-lg border-b sm:border bg-slate-200 dark:bg-neutral-800 dark:border-neutral-600">
          <iframe
            title={clip.contentName}
            src={`https://${process.env.NEXT_PUBLIC_STREAM_HOSTNAME}/clip/${clip.contentId}/iframe?preload=true&loop=true`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            className="border-0 absolute top-0 left-0 w-full h-full"
            allowFullScreen
          />
        </div>
        {clipLastEdited <= 10 ? (
          <div className="sm:text-md mx-6 mt-6 sm:mx-0 flex flex-col md:flex-row items-start md:items-center rounded-3xl bg-orange-100 dark:bg-yellow-800/50 p-4 sm:text-lg text-dark dark:text-slate-200">
            <svg
              className="animate-spin mr-3 mb-3 md:mb-0 h-6 w-6 text-orange-500 dark:text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <div className="flex flex-wrap gap-x-1">
              <span>아직 동영상을 처리하고 있어요.</span>
              <span>클립이 보이지 않거나, 화질이 나쁠 수 있어요.</span>
            </div>
          </div>
        ) : undefined}
        <div className="flex flex-col items-start justify-between p-6 sm:my-6 text-black dark:text-slate-200 sm:bg-slate-100 sm:dark:bg-neutral-800 rounded-3xl">
          <div>
            <div className="text-xl line-clamp-1 sm:text-2xl">
              {clip.contentName}
            </div>
            <div className="mb-3">{clip.gameName}</div>
          </div>
          <div>
            <div>
              <span className="text-gray-400">방송일자: </span>
              {streamDate} ({timeFromNow})
            </div>
            <div>
              <span className="text-gray-400">타임스탬프: </span>
              {timestamp.hours}시간 {timestamp.minutes}분 {timestamp.seconds}초
            </div>
          </div>
        </div>
        <div className="flex px-6 sm:px-0 mb-6">
          <Link
            href={`/profile/${user.twitchUserId}`}
            className="w-full sm:w-auto flex items-center justify-between bg-slate-100 dark:bg-neutral-800 rounded-3xl px-4 sm:pl-4 sm:pr-0 py-3 text-dark dark:text-slate-200 hover:bg-slate-200 hover:dark:bg-neutral-700 transition-all ease-in-out sm:hover:pr-4 after:w-2 sm:after:block after:content-['>'] after:-translate-x-full hover:after:translate-x-0 after:opacity-0 hover:after:opacity-100 after:transition-all after:ease-in-out after:sm:ml-2"
          >
            <span className="flex items-center justify-center">
              <Image
                width={32}
                height={32}
                className="rounded-full border dark:border-neutral-600 mr-3"
                src={user.profileImageUrl}
                alt={`${user.displayName}님의 프로필 사진`}
              />
              {user.displayName}
            </span>
          </Link>
        </div>
        <div className="mx-auto max-w-7xl py-8 px-6 sm:px-0">
          <div className="relative mb-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t dark:border-neutral-600" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white dark:bg-twitch-dark pr-3 text-xl font-semibold leading-6 text-gray-900 dark:text-slate-200">
                다른 클립 더 보기
              </span>
            </div>
          </div>
          <RecentClips initialClips={clipLists} />
        </div>
      </StaggerChildren>
      <DefaultFooter />
    </>
  );
}
