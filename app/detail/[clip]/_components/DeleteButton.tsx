"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { ClipType, IdentityType } from "type";

import { deleteClip } from "@/services/clips";

import { NormalButton } from "@/components/extension/create/baseComponent";

export const DeleteButton = ({
  clip,
  identity,
}: {
  clip: ClipType;
  identity: IdentityType | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className="text-dark flex w-auto items-center rounded-3xl bg-red-100 px-4 py-3 pl-4 pr-0 transition-all ease-in-out after:ml-2 after:block after:w-2 after:-translate-x-full after:opacity-0 after:transition-all after:ease-in-out after:content-['>'] hover:bg-red-200 hover:pr-4 hover:after:translate-x-0 hover:after:opacity-100 dark:bg-red-950 dark:text-slate-200 hover:dark:bg-red-900 sm:rounded-2xl"
      >
        <span className="mr-2 text-xl">🗑</span> 삭제
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex w-screen items-end justify-center p-3 sm:items-center">
          <Dialog.Panel className="mx-auto flex w-full max-w-sm flex-col gap-6 rounded-3xl border bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-twitch-dark">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-black dark:text-slate-200">
                클립을 삭제할까요?
              </Dialog.Title>
              <Dialog.Description className="text-black dark:text-slate-200">
                클립을 삭제하면 되돌릴 수 없어요.
              </Dialog.Description>
            </div>
            <div className="flex flex-col gap-3">
              <NormalButton
                text="삭제"
                color="red"
                effect={async () => {
                  await deleteClip(identity, clip);
                  router.push("/");
                }}
              />
              <NormalButton
                text="닫기"
                color="slate"
                effect={() => setIsOpen(false)}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
