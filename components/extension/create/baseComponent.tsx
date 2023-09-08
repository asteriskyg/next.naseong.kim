import { JSX } from "react";

import type { HTMLAttributeAnchorTarget, MouseEventHandler } from "react";

const bgColorSchemePicker = (color: string) => {
  if (color === "slate") return "bg-slate-100 dark:bg-neutral-800";
  if (color === "red") return "bg-red-100 dark:bg-red-900/50";
  if (color === "blue") return "bg-blue-100 dark:bg-blue-900/50";
  if (color === "green") return "bg-green-100 dark:bg-green-900/50";
  if (color === "orange") return "bg-orange-100 dark:bg-orange-900/50";
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
    <div className={`flex-col rounded-3xl selection:items-center p-6 md:flex ${bgColorSchemePicker(color)}`}>
      <div className="flex flex-col gap-3">
        <span className="text-4xl tossface">{emoji}</span>
        <div className="flex flex-col gap-1 mb-6">
          <div className="overflow-hidden text-xl text-black dark:text-slate-200 pr-6">{title}</div>
          {subtitle ? (
            <div className="overflow-hidden text-black dark:text-slate-200">{subtitle}</div>
          ) : undefined}
        </div>
      </div>
      <div className="flex w-full gap-3">{buttonList}</div>
    </div>
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
      className={`w-full text-center text-sm rounded-2xl transition-colors p-4 ${btnColorSchemePicker(color)}`}>
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
      className={`w-full text-center text-sm rounded-2xl transition-colors p-4 ${btnColorSchemePicker(color)}`}>
      {text}
    </a>
  );
};
