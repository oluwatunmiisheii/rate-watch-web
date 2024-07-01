import * as React from 'react'
import { MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import { ScrollArea } from '@/components/ui/scroll-area/scroll-area'
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
import { useAppContext } from '@/providers/app.provider'
import { SignedIn } from '@clerk/nextjs'
import { formatNumberWithCommas, removeCommas } from '@/lib/utils'
import Link from 'next/link'

const ResultCard = ({
  targetCurrency,
  sourceCurrency,
  providerLogo,
  rate,
  bestRate,
  amount,
  provider_url,
}: {
  targetCurrency: string
  sourceCurrency: string
  providerLogo: string
  rate: string
  bestRate: boolean
  amount: string
  provider_url: string
}) => {
  const totalAmount = parseFloat(removeCommas(amount || '1')) * parseFloat(rate)
  const formattedAmount = formatNumberWithCommas(totalAmount.toFixed(2))

  return (
    <Link className="relative mt-3" href={provider_url} target="_blank" rel="no referrer">
      <div className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-gray-400">
        <div className="flex justify-between items-center">
          <div
            className="bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${providerLogo})`,
              width: '110px',
              height: '65px',
            }}
          ></div>
          <div>
            <p className="font-semibold">
              {formattedAmount} {targetCurrency}
            </p>
          </div>
        </div>
      </div>
      <span className="absolute py-1 px-3 top-[-10px] left-3 text-[12px] bg-white rounded-2xl text-muted-foreground z-5">
        1 {sourceCurrency} = {rate} {targetCurrency}
      </span>

      {bestRate && (
        <span className="absolute py-1 px-3 top-[-10px] text-[12px] bg-[#40B270] rounded-2xl text-white z-5 right-3">
          Best rate
        </span>
      )}
    </Link>
  )
}

export function SearchResult() {
  const {
    showResult,
    setShowResult,
    sourceCurrency,
    targetCurrency,
    result,
    setShowCreateRateAlert,
    amount,
  } = useAppContext()

  return (
    <Sheet
      open={showResult}
      onOpenChange={(open) => {
        !open && setShowResult(false)
      }}
    >
      <SheetPortal>
        <SheetContent
          className="w-full sm:max-w-0 sm:min-w-full flex flex-col min-h-[75dvh] h-auto max-h-full px-0 pb-0"
          side="bottom"
        >
          <SheetHeader className="mx-auto w-full max-w-3xl px-4 md:px-0">
            <SheetTitle asChild>
              <div>
                <div className="border-b mb-6 pb-2 text-left">
                  <h3 className="mb-1">Disclaimer!!</h3>
                  <p className="text-muted-foreground font-normal tracking-normal text-sm sm:text-base">
                    We don&apos;t handle payments. We only show exchange rates from various
                    providers. Rates can change, so please check the current rate with the provider
                    before making any transactions.
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
              Showing exchange rate from{' '}
              <span className="text-gray-900 font-semibold">
                {amount} {sourceCurrency}
              </span>{' '}
              to <span className="text-gray-900 font-semibold">{targetCurrency}</span>
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="px-4 pb-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl pt-3 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {result.map((item, i) => (
                  <ResultCard
                    key={item.provider}
                    sourceCurrency={sourceCurrency}
                    targetCurrency={item.target_currency}
                    providerLogo={item.provider_logo}
                    rate={item.rate}
                    bestRate={i === 0}
                    amount={amount}
                    provider_url={item.provider_url}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>

          <SignedIn>
            <SheetFooter className="bg-slate-100 border-t border-zinc-100 px-4">
              <div className="mx-auto w-full max-w-sm py-4 px-0">
                <div className="flex justify-between space-x-4">
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={() => {
                      setShowResult(false)
                      setShowCreateRateAlert(true)
                    }}
                  >
                    Setup Rate Watch
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </SignedIn>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
