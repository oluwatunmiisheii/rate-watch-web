import * as React from 'react'
import { MoveRight } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button/button'
import { ScrollArea } from '@/components/ui/scroll-area/scroll-area'
import Image from 'next/image'
import Link from 'next/link'
import { CurrencyIcon } from '@/components/ui/currency-icon/currency-icon'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet/sheet'

interface SearchResultProps {
  open: boolean
  onClose: () => void
  sourceCurrency: string
  targetCurrency: string
  createRateAlert: () => void
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
    <Link
      href="https://google.com"
      target="_blank"
      className="relative rounded-lg border border-gray-300 bg-white p-4 shadow-sm hover:border-gray-400"
    >
      <div className="flex justify-between items-center">
        <Image
          className="h-6 w-32 object-contain object-left"
          src={logo}
          alt="Instarem."
          width={80}
          height={80}
        ></Image>
        <div>
          <p className="text-muted-foreground text-right text-sm">Rate</p>
          <p className="font-semibold">1, 100 {currencyTo}</p>
        </div>
      </div>
    </Link>
  )
}

export function SearchResult({
  open,
  onClose,
  sourceCurrency,
  targetCurrency,
  createRateAlert,
}: Readonly<SearchResultProps>) {
  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        !open && onClose()
      }}
    >
      <SheetPortal>
        <SheetContent
          className="w-full sm:max-w-0 sm:min-w-full flex flex-col h-full px-0 pb-0"
          side="bottom"
        >
          <SheetHeader className="mx-auto w-full max-w-3xl md:px-0">
            <SheetTitle asChild>
              <div>
                <div className="border-b mb-6 pb-2 text-left">
                  <h3 className="mb-1">Disclaimer!!</h3>
                  <p className="text-muted-foreground font-normal tracking-normal text-base">
                    Exchange rates are gathered from various providers&apos;
                    websites. Rates fluctuate frequently and may change by the
                    time you initiate a transaction. We do our best to keep them
                    updated.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <CurrencyIcon
                      currency={sourceCurrency}
                      className="flex items-center justify-center border mr-2 rounded-full"
                    />
                    {sourceCurrency}
                  </div>

                  <MoveRight className="size-5" />

                  <div className="flex items-center justify-center">
                    <CurrencyIcon
                      currency={targetCurrency}
                      className="flex items-center justify-center border mr-2 rounded-full"
                    />
                    {targetCurrency}
                  </div>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription className="text-left">
              Showing the mid market exchange rate from{' '}
              <span className="text-gray-900 font-semibold">
                {sourceCurrency}
              </span>{' '}
              to{' '}
              <span className="text-gray-900 font-semibold">
                {targetCurrency}
              </span>
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="px-4 pb-0 flex-1">
            <div className="mx-auto w-full max-w-3xl py-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, _i) => (
                  <ResultCard key={uuidv4()} currencyTo={targetCurrency} />
                ))}
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="bg-zinc-50 border-t border-zinc-100">
            <div className="mx-auto w-full max-w-sm py-4 px-0">
              <div className="flex justify-between space-x-4">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={createRateAlert}
                >
                  Setup rate watch
                </Button>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
