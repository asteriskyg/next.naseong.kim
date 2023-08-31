import Image from "next/image";
import { UserType } from "type";

import { getUserDetail, getUserClips } from "@/services/users";
import { getTimeDiff } from "@/utils/date";

import { RecentClipLists } from "@/components/RecentClipLists";
import { ProfileBackground } from "@/components/ProfileBackground";

const followDuration = (type: UserType["userType"], follow: UserType["follow"]) => {
  if (type === "broadcaster" || !follow) return undefined;

  return (
    <span className="shrink-0 inline-flex items-center gap-x-1.5 rounded-xl leading-1 tracking-tight bg-red-100 dark:bg-red-900 px-3 py-2 text-sm sm:text-base font-medium text-red-600 dark:text-red-200">
      <span className="text-base sm:text-lg">♥️</span>
      <b>{getTimeDiff(undefined, follow, "M")}개월</b> 팔로우 중
    </span>
  );
};

const subscriptionTier = (type: UserType["userType"], subscription: UserType["subscription"]) => {
  if (type === "broadcaster" || !subscription) return undefined;

  const tier = subscription / 1000;
  return (
    <span className="shrink-0 inline-flex items-center gap-x-1.5 rounded-xl leading-2 tracking-tight bg-blue-100 dark:bg-blue-900 px-3 py-2 text-sm sm:text-base font-medium text-blue-600 dark:text-blue-200">
      <span className="text-base sm:text-lg">💎</span>
      <b>{tier}티어</b> 구독
    </span>
  );
};

const userType = (type: UserType["userType"]) => {
  if (type === "viewer") return undefined;

  const badgeConfig = {
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
    <span className="shrink-0 rounded-xl bg-slate-100 dark:bg-slate-700 px-3 py-2 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-200">
      <span className="inline-flex items-center gap-x-1.5">
        <span className="text-base sm:text-lg">{badgeConfig[type].emoji}</span> {badgeConfig[type].text}
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
    <div className="bg-white dark:bg-twitch-dark">
      <ProfileBackground user={user} />
      <div className="relative bg-white dark:bg-twitch-dark border-t dark:border-neutral-600">
        <div className="mx-auto max-w-7xl pb-8 px-6">
          <div className="mb-8">
            <div className="z-10 -translate-y-1/3">
              <Image
                src={user.profileImageUrl}
                alt=""
                width={128}
                height={128}
                className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full border dark:border-neutral-600 shadow-lg sm:shadow-xl bg-white dark:bg-twitch-dark"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center mb-6">
              <div className="flex items-baseline text-3xl font-bold leading-tight text-black dark:text-slate-200 suite">
                <span className="line-clamp-1">{user.displayName}</span>
                <span className="shrink-0 text-gray-400 text-sm ml-2">#{user.twitchUserId}</span>
              </div>
              <div className="flex gap-3 overflow-auto">
                {followDuration(user.userType, user.follow)}
                {subscriptionTier(user.userType, user.subscription)}
                {userType(user.userType)}
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t dark:border-neutral-600" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white dark:bg-twitch-dark pr-3 text-xl font-semibold leading-6 text-black dark:text-slate-200">
                {user?.displayName}님의 클립
              </span>
            </div>
          </div>
          <RecentClipLists clipLists={clips} />
        </div>
      </div>
    </div>
  );
}
