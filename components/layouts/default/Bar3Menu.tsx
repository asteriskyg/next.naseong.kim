import Image from 'next/image'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { Bars3Icon, LockClosedIcon } from '@heroicons/react/24/outline'
import type { IdentityType } from 'type';
import VerticalNavigation from '@/components/tailwind/Navigation/VerticalNavigation'
import CustomIcon from '@/components/CustomIcon';
import PopoverButton from '@/components/tailwind/PopoverButton';

const TwitchIcon = () => {
  return (
    <CustomIcon className="w-6 h-6 text-gray-600 group-hover:text-indigo-600">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" clipRule="evenodd" />
    </CustomIcon>
  )
}

const lists = [
  { name: '김나성 트위치', href: 'https://twitch.tv/naseongkim', icon: TwitchIcon },
  { name: '김나성 트게더', href: 'https://tgd.kr/s/naseongkim', icon: ChatBubbleLeftRightIcon }
]

export default function MenuComponent({ me }: { me: IdentityType | undefined }) {
  if(!me) {
    return (
      <Popover className="relative flex flex-col">
        <Popover.Button className="inline-flex items-center justify-end gap-x-1 text-sm font-semibold leading-6 text-gray-900 h-8 w-8">
          <Bars3Icon className="shrink-0 h-6 w-6 text-gray-600" aria-hidden="true" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
        <Popover.Panel className="absolute right-0 mt-10 w-screen max-w-sm">
          <div className="w-full overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4 border-b">
            <PopoverButton
              button={{
                name: '트위치로 로그인',
                description: '로그인 하고 클립 만들기',
                href: `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=0373yf8vzqpo4f9ln4ajqrq9fim3hd&redirect_uri=${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_HOST}/api/authorization&scope=clips%3Aedit%20user%3Aread%3Aemail%20user%3Aread%3Asubscriptions`,
                icon: LockClosedIcon
              }}
            />
            </div>
            <div className="p-4">
              <VerticalNavigation items={lists} />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
    )
  }

  const profileImage = () => {
    return (
      <Image className="border rounded-lg" src={me.profileImageUrl} width={128} height={128} alt="" />
    )
  }

  return (
    <Popover className="relative flex flex-col">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <Image src={me.profileImageUrl} className="rounded-full border" width={32} height={32} alt="" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 mt-10 w-screen max-w-sm">
          <div className="w-full overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4 border-b">
              <PopoverButton
                button={{
                  name: me.displayName,
                  description: '내 프로필 보기',
                  href: `/profile/${me.twitchUserId}`,
                  icon: profileImage
                }}
              />
            </div>
            <div className="p-4">
              <VerticalNavigation items={lists} />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
