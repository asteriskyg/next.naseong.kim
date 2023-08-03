import Link from "next/link";

interface ButtonProps {
  name: string;
  description?: string;
  href: string;
  icon: any;
}

export default function VerticalNavigation({ button }: { button: ButtonProps }) {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-slate-100 transition-all duration-300">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg overflow-hidden bg-slate-100 group-hover:bg-white transition-all duration-300">
        <button.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-all duration-300" aria-hidden="true" />
      </div>
      <div>
        <Link href={button.href} className="font-semibold text-gray-900">
          {button.name}
          <span className="absolute inset-0" />
        </Link>
        <p className="text-gray-600">{button.description}</p>
      </div>
    </div>
  )
}