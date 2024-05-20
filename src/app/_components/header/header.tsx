'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Notifications } from './notifications/notifications'
import { Avatar, AvatarFallback } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'

export const Header = () => {
  const [isAuthenticated] = React.useState(true)
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
          className="relative z-10 flex max-w-max flex-1 items-center justify-center ml-auto space-x-6"
        >
          {isAuthenticated ? (
            <>
              <Notifications />
              <Avatar>
                <AvatarFallback className="bg-zinc-50 border border-zinc-300">
                  CN
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Button>Sign In</Button>
          )}
        </nav>
      </div>
    </header>
  )
}
