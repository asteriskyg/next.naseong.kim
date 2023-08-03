import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import RecentClipLists from '@/components/RecentClipLists';
import ProfileBackground from '@/components/ProfileBackground';
import type { IdentityType, ClipListsType } from 'type';
dayjs.extend(relativeTime);

async function GetRecentClips() {
  const res = await fetch('https://dev.naseong.kim/api/clip/recent')

  if (!res.ok) return undefined;
  return res.json() as Promise<ClipListsType>;
}

async function GetUserData(id: string) {
  const res = await fetch(`https://dev.naseong.kim/api/user/detail?id=${id}`, {
    next: { revalidate: 0 }
  }
    )

  if (!res.ok) return undefined;
  return res.json() as Promise<IdentityType>;
}

export default async function Profile({ params }: { params: { id: string } }) {
  const userData = GetUserData(params.id);
  const clipsData = GetRecentClips();
  const [user, clips] = await Promise.all([userData, clipsData]);

  if(!user) return (
    <div>404</div>
  )

  return (
    <div>
      <ProfileBackground user={user} />
      <div className="relative bg-white border-t">
        <div className="mx-auto max-w-7xl pb-8 px-6">
          <div className="mb-8">
            <div className="z-10 -translate-y-1/3">
              <Image
                src={user.profileImageUrl}
                alt=""
                width={128}
                height={128}
                className="w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 rounded-full border-2 shadow-lg sm:shadow-xl bg-white"
              />
            </div>
            <div className='flex flex-col md:flex-row gap-3 justify-between md:items-center mb-6'>
              <div className="flex items-baseline text-3xl font-bold leading-tight text-gray-900 suite">
                <span className="line-clamp-1">
                  { user.displayName }
                </span>
                <span className="shrink-0 text-gray-400 text-sm ml-2">
                  #{ user.twitchUserId }
                </span>
              </div>
              <div className='flex gap-3 overflow-scroll'>
                {(() => {
                  if(user.userType === 'broadcaster' || !user.follow) return undefined
                  return (
                    <span className="shrink-0 inline-flex items-center gap-x-1.5 rounded-xl leading-1 tracking-tight bg-red-100 px-3 py-2 text-sm sm:text-base font-medium text-red-600">
                      <span className='text-base sm:text-lg'>❤️</span> 
                      <b>{ dayjs().diff(dayjs(user.follow), "M") }개월</b> 팔로우 중
                    </span>
                  )
                })()}
                {(() => {
                  if(user.userType === 'broadcaster' || !user.subscription) return undefined
                  return (
                    <span className="shrink-0 inline-flex items-center gap-x-1.5 rounded-xl leading-2 tracking-tight bg-blue-100 px-3 py-2 text-sm sm:text-base font-medium text-blue-600">
                      <span className='text-base sm:text-lg'>💎</span>
                      <b>{(() => {
                        if(user.subscription === 1000) return '1'
                        else if(user.subscription === 2000) return '2'
                        else return '3'
                      })()}티어</b> 구독
                    </span>
                  )
                })()}
                {(() => {
                  if(user.userType === 'viewer') return undefined
                  return (
                    <span className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-sm sm:text-base font-medium text-slate-600">
                      {(() => {
                        if(user.userType === 'developer') return <span className='inline-flex items-center gap-x-1.5'><span className='text-base sm:text-lg'>🔧</span> 개발자</span>
                        else if(user.userType === 'editor') return <span className='inline-flex items-center gap-x-1.5'><span className='text-base sm:text-lg'>🐼</span> 편집자</span>
                        else return <span><span className='inline-flex items-center gap-x-1.5 text-base sm:text-lg'>🔧</span> 스트리머</span>
                      })()}
                    </span>
                  )
                })()}
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-3 text-xl font-semibold leading-6 text-gray-900">{user?.displayName}님의 클립</span>
            </div>
          </div>
          <RecentClipLists clipLists={clips} />
        </div>
      </div>
    </div>
  )
}