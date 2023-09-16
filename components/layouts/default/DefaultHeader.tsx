import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import Link from "next/link";

import { getIdentity } from "@/services/auth";

import { AwaitStream } from "./StreamBadge";
import { ProfileMenu } from "./ProfileMenu";

const StreamBadge = dynamic(
  () =>
    import("@/components/layouts/default/StreamBadge").then(
      (mod) => mod.StreamBadge,
    ),
  {
    loading: () => <AwaitStream />,
  },
);

export const DefaultHeader = async () => {
  const token = cookies().get("authorization");
  const me = await getIdentity(token);

  return (
    <header className="relative z-10 flex h-14 justify-center border-b bg-slate-50/90 backdrop-blur-xl dark:border-neutral-600 dark:bg-twitch-dark/90">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-x-3">
          <Link href="/" className="-m-1.5 flex items-start p-1.5">
            <span className="text-2xl text-black dark:text-slate-200">
              na.<b>clip</b>
            </span>
            <span className="-m-1.5 p-1.5 text-2xl font-medium text-blue-600">
              _next
            </span>
          </Link>
          <StreamBadge />
        </div>
        <ProfileMenu user={me} />
      </nav>
    </header>
  );
};
