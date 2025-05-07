'use client'
import { Button } from '@/components/ui/button/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetTitle,
} from '@/components/ui/sheet/sheet'
import { DownloadIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function InstallPrompt() {
  const [open, setOpen] = useState(true)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    console.log(navigator.userAgent)
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetPortal>
        <SheetContent
          className="left-0 sm:max-w-full md:max-w-[480px] mx-auto rounded-lg h-auto p-4 bottom-[20px]"
          side="bottom"
          closeButtonProps={{
            className: 'absolute -top-4 right-4',
          }}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-4 justify-between">
            <div className="flex gap-2 items-center">
              <div>
                <h4 className="text-[15px]">Install Rate Watch</h4>
                <p className="text-[13px] text-gray-500 leading-tight">
                  Add to your home screen for a better experience
                </p>
              </div>
            </div>
            <Button>Install</Button>
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
