import { Container } from '@/components/ui/container/container'
import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <Container>
      <footer className="flex text-sm flex-row justify-between sm:items-center py-4">
        <div className="flex gap-4 flex-row">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
            href="https://nextjs.authjs.dev"
          >
            <span>Contact Me!</span>
          </a>
          <a className="underline underline-offset-4" href="/policy">
            Privacy Policy
          </a>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <Image
            className="size-5"
            src="https://authjs.dev/img/logo-sm.png"
            alt="Auth.js Logo"
            width={20}
            height={20}
          />
          <p className="inline-flex">© {new Date().getFullYear()} Fx Notify</p>
        </div>
      </footer>
    </Container>
  )
}
