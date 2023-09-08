import "@/styles/globals.css";

import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white dark:bg-twitch-dark">
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
