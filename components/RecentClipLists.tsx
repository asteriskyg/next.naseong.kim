"use client";

import { useState } from "react";

import type { ClipListsType, ClipType, UserType } from "type";
import { getRecentClips } from "@/services/clips";
import { getUserClips } from "@/services/users";

import { ClipItem } from "./ClipItem";

export const RecentClipLists = ({
  initialClips,
  user,
}: {
  initialClips?: ClipListsType;
  user?: UserType["twitchUserId"];
}) => {
  const [clips, setClips] = useState(initialClips);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading) return undefined;
    setLoading(true);

    let newClips: ClipListsType | undefined;

    if (user) newClips = await getUserClips(user, offset);
    else newClips = await getRecentClips(offset);

    if (!clips || !newClips) return undefined;

    setOffset(offset + 1);
    setClips(clips.concat(newClips));
    setLoading(false);

    return undefined;
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 bg-white dark:bg-twitch-dark">
        {clips ? (
          clips?.map((clip: ClipType) => {
            return <ClipItem key={clip.contentId} clip={clip} />;
          })
        ) : (
          <div className="p-6 rounded-3xl bg-slate-100 dark:bg-neutral-800 dark:text-slate-200">
            <div className="text-4xl mb-6 tossface">⚠️</div>
            <span className="text-xl">클립을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</span>
          </div>
        )}
      </div>
      <div className="mt-6 flex w-full items-center justify-center">
        {clips && clips.length % 12 !== 0 ? (
          <span className="py-4 px-6 bg-slate-100 dark:bg-neutral-800 rounded-3xl dark:text-slate-200">
            🎉 모든 클립을 확인했어요. 🎉
          </span>
        ) : (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-2xl bg-slate-100 dark:bg-neutral-800 px-5 py-3 text-sm dark:text-slate-200 shadow-sm hover:bg-slate-200 dark:hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors">
            {loading ? "로딩중..." : "더보기"}
          </button>
        )}
      </div>
    </>
  );
};
