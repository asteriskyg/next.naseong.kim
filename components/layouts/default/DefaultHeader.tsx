'use client';
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Dialog } from '@headlessui/react'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Bar3Menu from './Bar3Menu'
import PopoverButton from '@/components/tailwind/PopoverButton'
import VerticalNavigation from '@/components/tailwind/Navigation/VerticalNavigation'
import type { IdentityType } from 'type'


const LiveBadge = dynamic(() => import('@/components/LiveBadge'))
const MemoizedLiveBadge = React.memo(LiveBadge);

const TwitchIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-gray-600 group-hover:text-indigo-600" viewBox="0 0 24 24">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" clipRule="evenodd" />
    </svg>
  )
}

function myProfile(me: IdentityType | undefined) {
  if(!me) {
    return (
      <PopoverButton
        button={{
          name: '트위치로 로그인',
          description: '로그인 하고 클립 만들기',
          href: 'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=0373yf8vzqpo4f9ln4ajqrq9fim3hd&redirect_uri=https://dev.next.naseong.kim/api/authorization&scope=clips%3Aedit%20user%3Aread%3Aemail%20user%3Aread%3Asubscriptions',
          icon: LockClosedIcon
        }}
      />
    )
  }

  const profileImage = () => {
    return (
      <Image className="border rounded-lg" src={me.profileImageUrl} width={128} height={128} alt="" />
    )
  }

  return (
    <PopoverButton
      button={{
        name: me.displayName,
        description: '내 프로필 보기',
        href: `/profile/${me?.twitchUserId}`,
        icon: profileImage
      }}
    />
  )
}

const lists = [
  { name: '김나성 트위치', description: undefined, href: 'https://twitch.tv/naseongkim', icon: TwitchIcon },
  { name: '김나성 트게더', description: undefined, href: 'https://tgd.kr/s/naseongkim', icon: ChatBubbleLeftRightIcon }
]

export default function DefaultHeader({ me }: {
  me: IdentityType | undefined
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 py-3">
        <div className="flex items-center gap-x-3">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl">
            <span className="text-2xl text-black">
              na.<b>clip</b>
            </span>
          </Link>
          <MemoizedLiveBadge />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 h-8 w-8"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">메뉴 열기</span>
            <Bars3Icon className="shrink-0 h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex">
          <Bar3Menu me={me} />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3 sm:opacity-0 sm:pointer-events-none">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl text-black">
                  na.<b>clip</b>
                </span>
              </Link>
              <MemoizedLiveBadge />
            </div>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 h-8 w-8"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">메뉴 닫기</span>
              <XMarkIcon className="shrink-0 h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                {myProfile(me)}
              </div>
              <div className="space-y-2 py-6">
                <VerticalNavigation items={lists} />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
