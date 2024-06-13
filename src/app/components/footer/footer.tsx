import { Container } from '@/components/ui/container/container'
import { Cookie, Smile } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import NextLink from 'next/link'

export const Footer = () => {
  return (
    <Container
      className="md:py-4"
      containerProps={{
        className: 'border-t mt-5',
      }}
    >
      <footer className="flex text-sm flex-col sm:flex-row justify-between sm:items-center py-4 gap-4">
        <div className="flex space-x-6 flex-row">
          <Image
            alt="Rate Watch Logo"
            width="30"
            height="20"
            className="object-contain"
            quality={100}
            src="/logo.svg"
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
          <NextLink className="inline-flex items-center space-x-1" href="/policy">
            <span>Privacy Policy</span>
            <span className="sr-only">Privacy icon</span>
            <Cookie className="size-4" />
          </NextLink>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <div className="inline-flex items-center">
            Built with
            <div className="pl-1" />
            <span className="sr-only">Love</span> ❤️ by
            <NextLink
              href="#"
              target="_blank"
              className=" ml-1 border-b border-dotted border-slate-900 font-semibold relative"
            >
              Wilson Adenuga
            </NextLink>
          </div>
        </div>
      </footer>
    </Container>
  )
}
