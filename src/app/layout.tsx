import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './_components/header/header'
import './globals.css'
import { Footer } from './_components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Header />
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
