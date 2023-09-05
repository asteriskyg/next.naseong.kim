"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, LockClosedIcon } from "@heroicons/react/24/outline";

import type { IdentityType } from "type";

export const ProfileMenu = ({ user }: { user?: IdentityType }) => {
  return (
    <div className="relative flex">
      <Menu>
        <Menu.Button>
          {() => {
            if (!user) {
              return <Bars3Icon className="shrink-0 h-6 w-6 text-neutral-600" aria-hidden="true" />;
            }

            return (
              <Image
                src={user.profileImageUrl}
                className="h-7 w-7 rounded-full border dark:border-neutral-600"
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
          <Menu.Items className="fixed sm:absolute right-0 top-14 sm:top-9 p-3 sm:p-0 w-screen rounded-b-3xl dark:border-neutral-600 bg-slate-50 dark:bg-twitch-dark sm:rounded-none sm:bg-transparent sm:max-w-sm">
            <div className="w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-3">
                <Menu.Item>
                  {() => {
                    if (!user) {
                      return (
                        <Link
                          href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/authorization&scope=clips%3Aedit%20user%3Aread%3Aemail%20user%3Aread%3Asubscriptions`}>
                          <div className="group relative flex items-center gap-x-6 rounded-3xl p-4 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-all duration-300">
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-700 group-hover:bg-white dark:group-hover:bg-neutral-600 transition-all duration-300">
                              <LockClosedIcon className="h-6 w-6 text-gray-600 dark:text-slate-200 group-hover:text-indigo-400 transition-all duration-300" />
                            </div>
                            <div>
                              <span className="font-semibold text-black dark:text-slate-200">트위치로 로그인</span>
                              <p className="text-gray-600 dark:text-slate-400">로그인 하고 클립 만들기</p>
                            </div>
                          </div>
                        </Link>
                      );
                    }

                    return (
                      <Link href={`/profile/${user.twitchUserId}`}>
                        <div className="group relative flex items-center gap-x-6 rounded-3xl p-4 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-all duration-300">
                          <div className="border dark:border-neutral-600 flex h-11 w-11 flex-none items-center justify-center rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-700 group-hover:bg-white dark:group-hover:bg-neutral-600 transition-all duration-300">
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
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
