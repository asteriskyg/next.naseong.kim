import { ReactNode } from "react";

import { ExtensionHeader } from "@/components/layouts/extension/ExtensionHeader";
import { DefaultFooter } from "@/components/layouts/default/DefaultFooter";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ExtensionHeader />
      <main>{children}</main>
      <DefaultFooter />
    </>
  );
}
