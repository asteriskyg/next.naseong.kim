import Link from "next/link";

interface ButtonProps {
  name: string;
  description?: string;
  href: string;
  icon: any;
}

export const PopoverButton = ({ button }: { button: ButtonProps }) => {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-3xl p-4 hover:bg-slate-100 dark:hover:bg-neutral-700 transition-all duration-300">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl overflow-hidden bg-slate-100 dark:bg-neutral-700 group-hover:bg-white dark:group-hover:bg-neutral-600 transition-all duration-300">
        <button.icon
          className="h-6 w-6 text-gray-600 dark:text-slate-200 group-hover:text-indigo-400 transition-all duration-300"
          aria-hidden="true"
        />
      </div>
      <div>
        <Link href={button.href} className="font-semibold text-black dark:text-slate-200">
          {button.name}
          <span className="absolute inset-0" />
        </Link>
        <p className="text-gray-600 dark:text-slate-400">{button.description}</p>
      </div>
    </div>
  );
};
