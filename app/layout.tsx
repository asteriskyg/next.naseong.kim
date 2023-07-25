import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}