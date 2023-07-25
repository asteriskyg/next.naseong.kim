import RecentClipLists from '@/components/RecentClipLists';
import type { ClipListsType } from 'type';

async function GetRecentClips() {
  const res = await fetch('https://dev.naseong.kim/api/clip/recent', {
    method: 'GET',
  })

  if (!res.ok) return undefined;
  return res.json() as Promise<ClipListsType>;
}

export default async function Index() {
  const clips = await GetRecentClips();

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">클립 목록</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-8 px-6">
          <RecentClipLists clipLists={clips} />
        </div>
      </main>
    </div>
  )
}