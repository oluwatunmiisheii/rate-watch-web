import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Notifications } from './notifications/notifications'
import { Button } from '@/components/ui/button/button'
import { UserWidget } from './user-widget/user-widget'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

export const Header = () => {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <Link href="/" aria-label="Home">
          <Image
            alt="Home"
            loading="lazy"
            width="32"
            height="32"
            decoding="async"
            className="min-w-8"
            style={{ color: 'transparent' }}
            src="https://next-auth-example.vercel.app/_next/image?url=%2Flogo.png&w=32&q=75"
          />
        </Link>
        <nav
          aria-label="Main"
          data-orientation="horizontal"
          dir="ltr"
          className="relative z-10 flex max-w-max flex-1 items-center justify-center ml-auto space-x-3 md:space-x-3"
        >
          <SignedIn>
            <Notifications />
            <UserWidget />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  )
}
