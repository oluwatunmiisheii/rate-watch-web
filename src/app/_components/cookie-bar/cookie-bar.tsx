'use client'

import { Button } from '@/components/ui/button/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
} from '@/components/ui/sheet/sheet'
import { useCookies } from '@/hooks/use-cookies'
import React, { useEffect } from 'react'

export const CookieBar = () => {
  const [open, setOpen] = React.useState(false)
  const [getFromCookies, setCookies] = useCookies()
  const cookieConsent = getFromCookies('rw-cookie-consent')

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (cookieConsent == undefined) {
      timeout = setTimeout(() => {
        setOpen(true)
      }, 300)
    }
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [cookieConsent])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetPortal>
        <SheetContent
          className="w-full sm:max-w-0 sm:min-w-full px-0 mb-0 pb-0"
          side="bottom"
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <SheetHeader className="mx-auto w-full max-w-3xl px-4 md:px-0 py-8">
            <SheetTitle className="text-left">You are okay with cookies, right?</SheetTitle>
            <SheetDescription className="text-left">
              We use cookies to improve your experience on our site. By using our site you consent
              to cookies. only necessary cookies are used and we won&apos;t turn them on unless you
              accept them.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter className="bg-slate-100 border-t border-zinc-100 px-4 py-4">
            <div className="mx-auto w-full max-w-3xl py-4 px-0">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  onClick={() => {
                    setCookies('rw-cookie-consent', 'true', 180)
                    setOpen(false)
                  }}
                >
                  Accept
                </Button>
                <SheetClose asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setCookies('rw-cookie-consent', 'false', 5)
                    }}
                  >
                    Decline
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
