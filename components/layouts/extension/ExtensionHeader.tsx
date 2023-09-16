import Link from "next/link";
import { cookies } from "next/headers";

import { getIdentity } from "@/services/auth";

import { ProfileMenu } from "@/components/layouts/default/ProfileMenu";

export const ExtensionHeader = async () => {
  const token = cookies().get("authorization");
  const me = await getIdentity(token);

  return (
    <header className="relative z-10 flex h-14 justify-center border-b bg-slate-50/90 backdrop-blur-xl dark:border-neutral-600 dark:bg-twitch-dark/90">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 flex items-start p-1.5">
            <span className="text-2xl text-black dark:text-slate-200">
              na.<b>clip</b>
            </span>
          </Link>
          <Link
            href="/create"
            className="-m-1.5 p-1.5 text-2xl font-medium text-blue-600"
          >
            _create
          </Link>
        </div>
        <ProfileMenu user={me} />
      </nav>
    </header>
  );
};
