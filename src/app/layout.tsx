import { Inter } from 'next/font/google'
import { Header } from './_components/layout/header/header'
import './globals.css'
import { Footer } from './_components/layout/footer/footer'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/providers'
import { Toaster } from '@/components/ui/sonner/sonner'
import { CookieBar } from './_components/cookie-bar/cookie-bar'
import { GoogleTagManager } from '@next/third-parties/google'
import { InstallPrompt } from './_components/install-prompt/install-prompt'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rate Watch',
  description: 'Get the best exchange rates from different providers in a single place',
  keywords: ['exchange rate', 'currency', 'rate watch', 'rate alert', 'foreign exchange'],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const analyticsKey = process.env.NEXT_PUBLIC_GTM_ID
  return (
    <ClerkProvider>
      <html lang="en">
        {analyticsKey && <GoogleTagManager gtmId={analyticsKey} />}
        <body className={inter.className}>
          <Providers>
            <div className="flex flex-col justify-between w-full h-screen min-h-screen overflow-auto">
              <Header />
              <main className="flex-auto">{children}</main>
              <Toaster richColors position="top-right" />
              <Footer />
            </div>
            <CookieBar />
            <InstallPrompt />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
