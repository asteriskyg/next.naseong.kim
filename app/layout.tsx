import "@/styles/globals.css";

import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";
import { DefaultHeader } from "@/components/layouts/default/DefaultHeader";

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white dark:bg-twitch-dark">
        <DefaultHeader />
        <main>{children}</main>
        <DefaultFooter />
        <Analytics />
      </body>
    </html>
  );
}
