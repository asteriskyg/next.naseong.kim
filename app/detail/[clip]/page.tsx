import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import { getIdentity } from "@/services/auth";
import { getUserDetail } from "@/services/users";
import { getClipDetail, getClipStatus, getRecentClips } from "@/services/clips";
import {
  getFormattedDate,
  getTimeFromNow,
  getClippedTimestamp,
} from "@/utils/date";
import { revalidateByTag } from "@/services/revalidate";

import { DeleteButton } from "./_components/DeleteButton";
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
  const token = cookies().get("authorization");

  const identityData = getIdentity(token);
  const clipData = getClipDetail(params.clip);
  const clipListsData = getRecentClips(0);

  const [identity, clip, clipLists] = await Promise.all([
    identityData,
    clipData,
    clipListsData,
  ]);

  if (!clip) return <div>404</div>;

  const userData = getUserDetail(clip?.creatorId);
  const statusData = getClipStatus(clip);

  const [user, status] = await Promise.all([userData, statusData]);
  let isClipActivated = false;

  if (!user) return <div>404</div>;

  if (!status) {
    isClipActivated = false;
    revalidateByTag("activate-clip");
  } else if (status.result?.default.status === "ready") {
    isClipActivated = true;
  } else {
    isClipActivated = false;
    revalidateByTag("activate-clip");
  }

  const streamDate = getFormattedDate(clip.streamStartedAt, "YYYY년 MM월 DD일");
  const timeFromNow = getTimeFromNow(clip.streamStartedAt);
  const timestamp = getClippedTimestamp(
    clip.streamStartedAt,
    clip.clipCreatedAt,
  );

  return (
    <>
      <DefaultHeader />
      <StaggerChildren className="mx-auto max-w-7xl sm:p-6 sm:pb-0">
        <div className="relative border-b bg-slate-200 pt-[56.25%] dark:border-neutral-600 dark:bg-neutral-800 sm:overflow-hidden sm:rounded-lg sm:border">
          <iframe
            title={clip.contentName}
            src={`https://${process.env.NEXT_PUBLIC_STREAM_HOSTNAME}/clip/${clip.contentId}/iframe?preload=true&loop=true`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            className="absolute left-0 top-0 h-full w-full border-0"
            allowFullScreen
          />
        </div>
        {!isClipActivated ? (
          <div className="sm:text-md text-dark mx-6 mt-6 flex flex-col items-start rounded-3xl bg-orange-100 p-4 dark:bg-yellow-800/50 dark:text-slate-200 sm:mx-0 sm:text-lg md:flex-row md:items-center">
            <svg
              className="mb-3 mr-3 h-6 w-6 animate-spin text-orange-500 dark:text-yellow-600 md:mb-0"
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
                strokeWidth="4"
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
        <div className="flex flex-col items-start justify-between rounded-3xl p-6 pb-3 text-black dark:text-slate-200 sm:my-6 sm:bg-slate-100 sm:pb-6 sm:dark:bg-neutral-800">
          <div>
            <div className="line-clamp-1 text-xl sm:text-2xl">
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
        <div className="mb-6 flex flex-col-reverse items-start justify-between gap-y-6 px-6 sm:flex-row sm:items-center sm:px-0">
          <Link
            href={`/profile/${user.twitchUserId}`}
            className="text-dark flex w-full items-center justify-between rounded-3xl bg-slate-100 px-4 py-3 transition-all ease-in-out after:w-2 after:-translate-x-full after:opacity-0 after:transition-all after:ease-in-out after:content-['>'] hover:bg-slate-200 hover:after:translate-x-0 hover:after:opacity-100 dark:bg-neutral-800 dark:text-slate-200 hover:dark:bg-neutral-700 sm:w-auto sm:pl-4 sm:pr-0 after:sm:ml-2 sm:after:block sm:hover:pr-4"
          >
            <span className="flex items-center justify-center">
              <Image
                width={32}
                height={32}
                className="mr-3 rounded-full border dark:border-neutral-600"
                src={user.profileImageUrl}
                alt={`${user.displayName}님의 프로필 사진`}
              />
              {user.displayName}
            </span>
          </Link>
          {user.twitchUserId === identity?.twitchUserId ||
          identity?.userType !== "viewer" ? (
            <div className="flex gap-3">
              {isClipActivated ? (
                <Link
                  href={
                    isClipActivated
                      ? `https://videodelivery.net/${clip.contentId}/downloads/default.mp4?filename=naseongkim-clip__${clip.clipName}.mp4`
                      : "#"
                  }
                  className="text-dark flex w-auto items-center rounded-3xl bg-blue-100 px-4 py-3 pl-4 pr-0 transition-all ease-in-out after:ml-2 after:block after:w-2 after:-translate-x-full after:opacity-0 after:transition-all after:ease-in-out after:content-['>'] hover:bg-blue-200 hover:pr-4 hover:after:translate-x-0 hover:after:opacity-100 dark:bg-blue-950 dark:text-slate-200 hover:dark:bg-blue-900 sm:rounded-2xl"
                >
                  <span className="mr-2 text-xl">💾</span> 다운로드
                </Link>
              ) : (
                <button
                  disabled
                  type="button"
                  className="text-dark flex w-auto cursor-not-allowed items-center rounded-3xl bg-slate-100 px-4 py-3 opacity-60 transition-all ease-in-out dark:bg-neutral-800 dark:text-slate-200"
                >
                  <span className="mr-2 text-xl">💾</span> 동영상 처리 중
                </button>
              )}
              <DeleteButton clip={clip} identity={identity} />
            </div>
          ) : undefined}
        </div>
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-0">
          <div className="relative mb-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t dark:border-neutral-600" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-3 text-xl font-semibold leading-6 text-gray-900 dark:bg-twitch-dark dark:text-slate-200">
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
