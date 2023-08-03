import Link from "next/link";
import type { StreamInfoType } from "type";

async function GetStream() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_HOST}/api/twitch/stream`)

  if (!res.ok) return undefined;
  return res.json() as Promise<StreamInfoType>;
}

export default async function LiveBadge() {
  const stream = await GetStream();
  if (!stream) return undefined;

  return (
    <Link
      href="/live"
      target="_blank"
      className="inline-flex items-center gap-x-2 rounded-lg bg-red-100 hover:bg-red-200 px-2 py-1 text-sm font-medium text-red-500 transition-colors"
    >
      <svg className="h-2 w-2 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
        <circle cx={3} cy={3} r={3} />
      </svg>
      LIVE
    </Link>
  )
}