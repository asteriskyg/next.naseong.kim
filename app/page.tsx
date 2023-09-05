import { getRecentClips } from "@/services/clips";

import { RecentClips } from "@/components/RecentClips";

export default async function Index() {
  const clips = await getRecentClips(0);

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-black dark:text-slate-200 suite">
          클립 목록
        </h1>
      </div>
      <div className="mx-auto max-w-7xl py-8 px-6">
        <RecentClips initialClips={clips} />
      </div>
    </div>
  );
}
