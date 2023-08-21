import { getRecentClips } from '@/services/clips';

import { RecentClipLists } from '@/components/RecentClipLists';

export const Index = async() => {
  const clips = await getRecentClips();

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 suite">클립 목록</h1>
      </div>
      <div className="mx-auto max-w-7xl py-8 px-6">
        <RecentClipLists clipLists={ clips } />
      </div>
    </div>
  )
}