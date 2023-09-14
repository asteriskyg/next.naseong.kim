import Link from "next/link";
import { StreamType } from "type";

import { getTwitchStream } from "@/services/stream";

export const AwaitStream = async () => {
  return (
    <div className="inline-flex items-center gap-x-2 rounded-lg bg-blue-100 px-2 py-1 text-sm font-medium text-blue-500 transition-colors dark:bg-blue-900 dark:text-blue-200">
      <svg
        className="h-2 w-2 fill-blue-500 dark:fill-blue-200"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      불러오는 중...
    </div>
  );
};

export const StreamOnline = async ({
  id,
}: {
  id: StreamType["user_login"];
}) => {
  return (
    <Link
      href={`https://www.twitch.tv/${id}`}
      target="_blank"
      className="inline-flex items-center gap-x-2 rounded-lg bg-red-100 px-2 py-1 text-sm font-medium text-red-500 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
    >
      <svg
        className="h-2 w-2 fill-red-500 dark:fill-red-200"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      LIVE
    </Link>
  );
};

export const StreamOffline = async () => {
  return (
    <div className="inline-flex items-center gap-x-2 rounded-lg bg-slate-100 px-2 py-1 text-sm font-medium text-slate-500 transition-colors dark:bg-slate-700 dark:text-slate-300">
      <svg
        className="h-2 w-2 fill-slate-500 dark:fill-slate-300"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      오프라인
    </div>
  );
};

export const StreamBadge = async () => {
  const stream = await getTwitchStream();
  if (!stream || stream.data.length === 0) return <StreamOffline />;

  return <StreamOnline id={stream.data[0].user_login} />;
};
