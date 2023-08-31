import "@/styles/globals.css";

import React from "react";
import { Analytics } from "@vercel/analytics/react";

import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";
import { DefaultHeader } from "@/components/layouts/default/DefaultHeader";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
};

export default RootLayout;
