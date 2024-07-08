import { Inter } from 'next/font/google'
import { Header } from './components/header/header'
import './globals.css'
import { Footer } from './components/footer/footer'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/providers'
import { Toaster } from '@/components/ui/sonner/sonner'
import { CookieBar } from './components/cookie-bar/cookie-bar'
import { GoogleTagManager } from '@next/third-parties/google'

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
  const trackAnalytics = !!process.env.NEXT_PUBLIC_GTM_ID
  return (
    <ClerkProvider>
      <html lang="en">
        {trackAnalytics && <GoogleTagManager gtmId="GTM-T54GCTKG" />}
        <body className={inter.className}>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            <main className="flex-auto">
              <Providers>{children}</Providers>
            </main>
            <Toaster richColors position="top-right" />
            <Footer />
          </div>
          <CookieBar />
        </body>
      </html>
    </ClerkProvider>
  )
}
