import * as React from 'react'
import { InfoIcon, MoveRight, X } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from '@/components/ui/drawer/drawer'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area/scroll-area'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip/tooltip'
import Image from 'next/image'

interface SearchResultProps {
  open: boolean
  onClose: () => void
  currencyFrom: string
  currencyTo: string
}

const logos = [
  'https://dq8dwmysp7hk1.cloudfront.net/logos/barclays.png',
  'https://dq8dwmysp7hk1.cloudfront.net/logos/monese.png',
  'https://dq8dwmysp7hk1.cloudfront.net/logos/moneygram.png',
  'https://dq8dwmysp7hk1.cloudfront.net/logos/skrill.png',
  'https://dq8dwmysp7hk1.cloudfront.net/logos/western-union.png',
]

const ResultCard = ({ currencyTo }: { currencyTo: string }) => {
  const logo = logos[Math.floor(Math.random() * logos.length)]
  return (
    <div className="relative flex items-center justify-between rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <Image
        className="h-6 w-32 object-contain object-left"
        src={logo}
        alt="Instarem."
        width={100}
        height={100}
      ></Image>
      <div>
        <p className="text-muted-foreground text-right">Rate</p>
        <p className="font-semibold">1, 100 {currencyTo}</p>
      </div>
    </div>
  )
}

export function SearchResult({
  open,
  onClose,
  currencyFrom,
  currencyTo,
}: SearchResultProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        !open && onClose()
      }}
    >
      <DrawerPortal>
        <DrawerContent>
          <DrawerHeader className="mx-auto w-full max-w-3xl px-0">
            <DrawerTitle>
              <div className="border-b mb-6 pb-2">
                <h3 className="mb-1">Disclaimer!!</h3>
                <p className="text-muted-foreground font-normal tracking-normal text-base">
                  Rates are gotten from the websites of the providers at a
                  particular time. Users should still check the websites before
                  going ahead to convert their money
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="np-theme-personal flex items-center justify-center border mr-2 rounded-full">
                    <div
                      className={cn(
                        'currency-flag',
                        `currency-flag-${currencyFrom.toLowerCase()}`,
                      )}
                    />
                  </div>
                  {currencyFrom}
                </div>
                <MoveRight className="size-5" />

                <div className="flex items-center justify-center">
                  <div className="np-theme-personal flex items-center justify-center border mr-2 rounded-full">
                    <div
                      className={cn(
                        'currency-flag',
                        `currency-flag-${currencyTo.toLowerCase()}`,
                      )}
                    />
                  </div>
                  {currencyTo}
                </div>
              </div>
            </DrawerTitle>
            <DrawerDescription>
              Showing the mid market exchange rate from{' '}
              <span className="text-gray-900 font-semibold">
                {currencyFrom}
              </span>{' '}
              to{' '}
              <span className="text-gray-900 font-semibold">{currencyTo}</span>
            </DrawerDescription>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="absolute right-5 top-5 rounded-full size-10 flex items-center justify-center p-0"
              >
                <span className="sr-only">Close</span>
                <X className="size-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <ScrollArea className="px-4 pb-0 h-[50vh]">
            <div className="mx-auto w-full max-w-3xl pb-6">
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <ResultCard key={i} currencyTo={currencyTo} />
                ))}
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter className="bg-zinc-50 border-t border-zinc-100">
            <div className="mx-auto w-full max-w-3xl py-8 px-0">
              <div className="flex justify-between space-x-4">
                <Button className="flex-1" size="lg">
                  Setup rate watch
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="sr-only">Learn more</span>
                      <InfoIcon className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Rate watch helps you keep track of the exchange rate of
                        the currency you are interested in converting. <br />
                        You will be notified when the rate changes to your
                        preference.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
