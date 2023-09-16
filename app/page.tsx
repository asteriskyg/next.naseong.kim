import { getRecentClips } from "@/services/clips";

import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";
import { DefaultHeader } from "@/components/layouts/default/DefaultHeader";
import { StaggerChildren } from "@/components/motion";
import { RecentClips } from "@/components/RecentClips";

export default async function Index() {
  const clips = await getRecentClips(0);

  return (
    <>
      <DefaultHeader />
      <StaggerChildren className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="suite mb-3 text-3xl font-bold leading-tight tracking-tight text-black dark:text-slate-200">
          클립 목록
        </h1>
        <RecentClips initialClips={clips} />
      </StaggerChildren>
      <DefaultFooter />
    </>
  );
}
