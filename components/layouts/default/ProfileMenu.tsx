"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, LockClosedIcon, ChatBubbleLeftRightIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

import type { IdentityType } from "type";

import { PopoverButton } from "@/components/PopoverButton";

const lists = [
  {
    name: "김나성 트위치",
    href: "https://twitch.tv/naseongkim",
    icon: VideoCameraIcon,
  },
  {
    name: "김나성 트게더",
    href: "https://tgd.kr/s/naseongkim",
    icon: ChatBubbleLeftRightIcon,
  },
];

export const ProfileMenu = ({ user }: { user?: IdentityType }) => {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          {() => {
            if (!user) {
              return <Bars3Icon className="shrink-0 h-6 w-6 text-gray-600" aria-hidden="true" />;
            }

            return (
              <Image
                src={user.profileImageUrl}
                className="rounded-full border border-neutral-600"
                width={32}
                height={32}
                alt={`${user.displayName}님의 프로필 사진`}
              />
            );
          }}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1">
          <Menu.Items className="absolute right-0 top-0 mt-10 w-screen max-w-sm">
            <div className="w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-3 border-b dark:border-neutral-600">
                <Menu.Item>
                  {() => {
                    if (!user) {
                      return (
                        <PopoverButton
                          button={{
                            name: "트위치로 로그인",
                            description: "로그인 하고 클립 만들기",
                            href: `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/authorization&scope=clips%3Aedit%20user%3Aread%3Aemail%20user%3Aread%3Asubscriptions`,
                            icon: LockClosedIcon,
                          }}
                        />
                      );
                    }

                    return (
                      <Link href={`/profile/${user.twitchUserId}`}>
                        <div className="group relative flex items-center gap-x-6 rounded-3xl p-4 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-all duration-300">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-700 group-hover:bg-white dark:group-hover:bg-neutral-600 transition-all duration-300">
                            <Image
                              src={user.profileImageUrl}
                              width={64}
                              height={64}
                              alt={`${user.displayName}님의 프로필 사진`}
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-black dark:text-slate-200">{user.displayName}</span>
                            <p className="text-gray-600 dark:text-slate-400">프로필 보기</p>
                          </div>
                        </div>
                      </Link>
                    );
                  }}
                </Menu.Item>
              </div>
              <div className="p-3">
                {lists.map((item) => (
                  <PopoverButton key={item.name} button={item} />
                ))}
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
