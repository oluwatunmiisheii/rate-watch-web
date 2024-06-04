import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './components/header/header'
import './globals.css'
import { Footer } from './components/footer/footer'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/providers'
import { Toaster } from '@/components/ui/sonner/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rate Watch',
  description: 'Get the best exchange rates from different providers in a single place',
  keywords: ['exchange rate', 'currency', 'rate watch', 'rate alert', 'foreign exchange'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            <main className="flex-auto">
              <Providers>{children}</Providers>
            </main>
            <Toaster richColors position="top-right" />
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
