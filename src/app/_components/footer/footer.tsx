import { Container } from '@/components/ui/container/container'
import { Cookie, Smile } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import NextLink from 'next/link'

export const Footer = () => {
  return (
    <Container>
      <footer className="flex text-sm flex-col sm:flex-row justify-between sm:items-center py-4 gap-4">
        <div className="flex space-x-6 flex-row">
          <Image
            className="size-5 "
            src="https://authjs.dev/img/logo-sm.png"
            alt="Auth.js Logo"
            width={20}
            height={20}
          />
          <NextLink
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1"
            href="https://nextjs.authjs.dev"
          >
            <span>Feedbacks</span>
            <span className="sr-only">Smile icon</span>
            <Smile className="size-4" />
          </NextLink>
          <NextLink
            className="inline-flex items-center space-x-1"
            href="/policy"
          >
            <span>Privacy Policy</span>
            <span className="sr-only">Privacy icon</span>
            <Cookie className="size-4" />
          </NextLink>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <p className="inline-flex items-center">
            Made with <span className="sr-only mx-2">Love</span> ❤️ by
            <NextLink
              href="#"
              target="_blank"
              className="pl-1 border-b border-dotted border-slate-900 font-semibold"
            >
              Wilson Adenuga
            </NextLink>
          </p>
          {/* © {new Date().getFullYear()} Fx Notify */}
        </div>
      </footer>
    </Container>
  )
}
