import Link from "next/link";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { getIdentity } from "@/services/auth";

import { Bar3Menu } from "./Bar3Menu";

const LiveBadge = dynamic(() => import("@/components/LiveBadge").then((mod) => mod.LiveBadge));

export const DefaultHeader = async () => {
  const token = cookies().get("authorization");
  const me = await getIdentity(token);

  return (
    <header className="sticky top-0 z-10 border-b bg-slate-50/90 backdrop-blur-xl dark:border-neutral-600 dark:bg-twitch-dark/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 py-3">
        <div className="flex items-center gap-x-3">
          <Link href="/" className="-m-1.5 flex items-start p-1.5">
            <span className="text-2xl text-black dark:text-slate-200">
              na.<b>clip</b>
            </span>
            <span className="ml-1 mt-0.5 text-sm font-black text-blue-600">NEXT</span>
          </Link>
          <LiveBadge />
        </div>
        <Bar3Menu me={me} />
      </nav>
    </header>
  );
};
