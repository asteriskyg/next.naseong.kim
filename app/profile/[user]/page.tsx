import Image from "next/image";
import { UserType } from "type";

import { getUserDetail, getUserClips } from "@/services/users";
import { getTimeDiff } from "@/utils/date";

import { DefaultHeader } from "@/components/layouts/default/DefaultHeader";
import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";
import { ProfileBackground } from "@/components/ProfileBackground";
import { RecentClips } from "@/components/RecentClips";
import { StaggerChildren } from "@/components/motion";

const followDuration = (
  type: UserType["userType"],
  follow: UserType["follow"],
) => {
  if (type === "broadcaster" || !follow) return undefined;

  return (
    <span className="leading-1 inline-flex shrink-0 items-center gap-x-1.5 rounded-xl bg-red-100 px-3 py-2 text-sm font-medium tracking-tight text-red-600 dark:bg-red-900 dark:text-red-200 sm:text-base">
      <span className="text-base sm:text-lg">♥️</span>
      <b>{getTimeDiff(undefined, follow, "M")}개월</b> 팔로우 중
    </span>
  );
};

const subscriptionTier = (
  type: UserType["userType"],
  subscription: UserType["subscription"],
) => {
  if (type === "broadcaster" || !subscription) return undefined;

  const tier = subscription / 1000;

  return (
    <span className="leading-2 inline-flex shrink-0 items-center gap-x-1.5 rounded-xl bg-blue-100 px-3 py-2 text-sm font-medium tracking-tight text-blue-600 dark:bg-blue-900 dark:text-blue-200 sm:text-base">
      <span className="text-base sm:text-lg">💎</span>
      <b>{tier}티어</b> 구독
    </span>
  );
};

const userType = (type: UserType["userType"]) => {
  if (type === "viewer") return undefined;

  const badge = {
    developer: {
      emoji: "🔧",
      text: "개발자",
    },
    editor: {
      emoji: "🐼",
      text: "편집자",
    },
    broadcaster: {
      emoji: "📺",
      text: "스트리머",
    },
  };

  return (
    <span className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200 sm:text-base">
      <span className="inline-flex items-center gap-x-1.5">
        <span className="text-base sm:text-lg">{badge[type].emoji}</span>{" "}
        {badge[type].text}
      </span>
    </span>
  );
};

export default async function UserProfile({
  params,
}: {
  params: {
    user: number;
  };
}) {
  const userData = getUserDetail(params.user);
  const clipsData = getUserClips(params.user, 0);
  const [user, clips] = await Promise.all([userData, clipsData]);

  if (!user) return <div>404</div>;

  return (
    <>
      <DefaultHeader />
      <StaggerChildren className="relative bg-white dark:border-neutral-600 dark:bg-twitch-dark">
        <ProfileBackground user={user} />
        <div className="relative border-t bg-white dark:border-neutral-600 dark:bg-twitch-dark">
          <div className="mx-auto max-w-7xl px-6 pb-8">
            <div className="z-10 -translate-y-1/3">
              <Image
                src={user.profileImageUrl}
                alt=""
                width={128}
                height={128}
                className="h-24 w-24 rounded-full border bg-white shadow-lg dark:border-neutral-600 dark:bg-twitch-dark sm:shadow-xl md:h-28 md:w-28 xl:h-32 xl:w-32"
              />
            </div>
            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div className="suite flex items-baseline text-3xl font-bold leading-tight text-black dark:text-slate-200">
                <span className="line-clamp-1">{user.displayName}</span>
                <span className="ml-2 shrink-0 text-sm text-gray-400">
                  #{user.twitchUserId}
                </span>
              </div>
              <div className="flex gap-3 overflow-auto">
                {followDuration(user.userType, user.follow)}
                {subscriptionTier(user.userType, user.subscription)}
                {userType(user.userType)}
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative mb-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t dark:border-neutral-600" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-3 text-xl font-semibold leading-6 text-black dark:bg-twitch-dark dark:text-slate-200">
                  {user?.displayName}님의 클립
                </span>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-6 pb-8">
            <RecentClips initialClips={clips} user={user.twitchUserId} />
          </div>
        </div>
      </StaggerChildren>
      <DefaultFooter />
    </>
  );
}
