import { JSX } from "react";
import Link from "next/link";

import type { HTMLAttributeAnchorTarget, MouseEventHandler } from "react";

import { MouseHover } from "@/components/motion";

const bgColorSchemePicker = (color: string) => {
  if (color === "red") return "bg-red-100 dark:bg-red-900/50";
  if (color === "orange") return "bg-orange-100 dark:bg-orange-900/50";
  if (color === "green") return "bg-green-100 dark:bg-green-900/50";
  if (color === "sky") return "bg-sky-100 dark:bg-sky-900/50";
  if (color === "blue") return "bg-blue-100 dark:bg-blue-900/50";
  if (color === "pink") return "bg-pink-100 dark:bg-pink-900/50";
  if (color === "purple") return "bg-purple-100 dark:bg-purple-900/50";
  if (color === "rose") return "bg-rose-100 dark:bg-rose-900/50";
  if (color === "slate") return "bg-slate-100 dark:bg-neutral-800";
  return "";
};

const btnColorSchemePicker = (color: string) => {
  if (color === "slate")
    return "bg-slate-200 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600 disabled:hover:bg-slate-600 text-black dark:text-slate-200";
  if (color === "red")
    return "bg-red-500 dark:bg-red-800/50 hover:bg-red-600 dark:hover:bg-red-800 disabled:hover:bg-red-800/50 text-white dark:text-slate-200";
  if (color === "blue")
    return "bg-blue-500 dark:bg-blue-800/50 hover:bg-blue-600 dark:hover:bg-blue-800 disabled:hover:bg-blue-800/50 text-white dark:text-slate-200";
  if (color === "green")
    return "bg-green-500 dark:bg-green-800/50 hover:bg-green-600 dark:hover:bg-green-800 disabled:hover:bg-green-800/50 text-white dark:text-slate-200";
  if (color === "orange")
    return "bg-orange-500 dark:bg-orange-800/50 hover:bg-orange-600 dark:hover:bg-orange-800 disabled:hover:bg-orange-800/50 text-white dark:text-slate-200";
  if (color === "purple")
    return "bg-twitch-purple dark:bg-twitch-purple/50 hover:bg-violet-600 dark:hover:bg-violet-800 disabled:hover:bg-violet-800/50 text-white dark:text-slate-200";
  return "";
};

export const Card = ({
  emoji,
  title,
  subtitle,
  buttons,
  color,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  buttons?: JSX.Element[];
  color: string;
}) => {
  const buttonList = buttons?.map((item) => {
    return item;
  });

  return (
    <div
      className={`w-full max-w-sm shrink-0 snap-start snap-always flex-col justify-between rounded-3xl p-6 selection:items-center md:flex ${bgColorSchemePicker(
        color,
      )}`}
    >
      <div className="flex flex-col gap-3">
        <span className="tossface text-4xl">{emoji}</span>
        <div className="mb-6 flex flex-col gap-1">
          <div className="overflow-hidden pr-6 text-xl text-black dark:text-slate-200">
            {title}
          </div>
          {subtitle ? (
            <div className="overflow-hidden text-black dark:text-slate-200">
              {subtitle}
            </div>
          ) : undefined}
        </div>
      </div>
      <div className="flex w-full gap-3">{buttonList}</div>
    </div>
  );
};

export const MiniCard = ({
  icon,
  url,
  title,
  color,
}: {
  icon: string;
  url: string;
  title: string;
  color: string;
}) => {
  return (
    <MouseHover>
      <Link
        className={`flex h-32 w-full cursor-pointer flex-col items-start justify-between rounded-3xl p-5 transition-colors duration-300 ease-in-out ${bgColorSchemePicker(
          color,
        )}`}
        href={url}
        target="_blank"
      >
        <div className="tossface text-3xl">{icon}</div>
        <span className="text-black dark:text-slate-200">{title}</span>
      </Link>
    </MouseHover>
  );
};

export const NormalButton = ({
  effect,
  text,
  color,
}: {
  effect: MouseEventHandler<HTMLButtonElement>;
  text: string;
  color: string;
}) => {
  return (
    <button
      type="button"
      onClick={effect}
      className={`w-full rounded-2xl p-4 text-center text-sm transition-colors ${btnColorSchemePicker(
        color,
      )}`}
    >
      {text}
    </button>
  );
};

export const AnchorButton = ({
  target,
  href,
  text,
  color,
}: {
  target: HTMLAttributeAnchorTarget;
  href: string;
  text: string;
  color: string;
}) => {
  return (
    <a
      target={target}
      href={href}
      className={`w-full rounded-2xl p-4 text-center text-sm transition-colors ${btnColorSchemePicker(
        color,
      )}`}
    >
      {text}
    </a>
  );
};

export const DefaultModal = ({
  title,
  content,
  buttons,
}: {
  title: string;
  content: string;
  buttons: JSX.Element[];
}) => {
  const buttonList = buttons?.map((item) => {
    return item;
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white p-6">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-black dark:text-slate-200">
          {title}
        </div>
        <div className="text-black dark:text-slate-200">{content}</div>
      </div>
      <div className="flex flex-col gap-2">{buttonList}</div>
    </div>
  );
};
