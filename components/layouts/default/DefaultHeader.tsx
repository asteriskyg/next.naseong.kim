import Link from "next/link";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { getIdentity } from "@/services/auth";
import Bar3Menu from "./Bar3Menu";

const LiveBadge = dynamic(() => import("@/components/LiveBadge"));

export default async function DefaultHeader() {
  const token = cookies().get("authorization");
  const me = await getIdentity(token);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 py-3">
        <div className="flex items-center gap-x-3">
          <Link href="/" className="flex items-start -m-1.5 p-1.5">
            <span className="text-2xl text-black">
              na.<b>clip</b>
            </span>
            <span className="text-sm font-black text-blue-600 ml-1 mt-0.5">NEXT</span>
          </Link>
          <LiveBadge />
        </div>
        <Bar3Menu me={me} />
      </nav>
    </header>
  );
}
