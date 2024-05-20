'use client'

import { ArrowDownUp } from 'lucide-react'
import { CurrencySelect } from './_components/currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { useState } from 'react'
import { SearchResult } from './_components/search-result/search-result'
import { Container } from '@/components/ui/container/container'
import { RateAlerts } from './_components/rate-alerts/rate-alerts'

export default function Home() {
  const [currencyFrom, setCurrencyFrom] = useState('USD')
  const [currencyTo, setCurrencyTo] = useState('NGN')
  const [showResult, setShowResult] = useState(false)

  return (
    <>
      <Container>
        <h1 className="mb-1 font-semibold text-lg">
          Best Exchange Rate Finder
        </h1>
        <p className="text-muted-foreground font-normal tracking-normal text-base">
          We help you find the best exchange rates from different providers in a
          single place so you can make an informed decision on where to convert
          your money to get the best value for it in your local currency or any
          other currency you want to convert to.
        </p>
        <div className="div space-y-4 flex items-center flex-col mt-10 border bg-zinc-50 shadow rounded-md relative overflow-hidden">
          <div className="py-12 px-8 w-full">
            <p>Currency From</p>
            <CurrencySelect
              selectedCurrency={currencyFrom}
              onCurrencySelect={setCurrencyFrom}
            />
            {/* <div className="font-semibold text-lg self-start h-16 pb-8" /> */}
          </div>

          <div className="absolute top-[35%]">
            <Button
              variant="outline"
              className="rounded-full size-10 p-0 "
              onClick={() => {
                const temp = currencyFrom
                setCurrencyFrom(currencyTo)
                setCurrencyTo(temp)
              }}
            >
              <span className="sr-only">Click me</span>
              <ArrowDownUp className="size-5" />
            </Button>
          </div>

          <div className="bg-white w-full px-8 py-12">
            <p>Currency To</p>
            <CurrencySelect
              selectedCurrency={currencyTo}
              onCurrencySelect={setCurrencyTo}
            />
            <div className="w-full mt-10">
              <Button
                onClick={() => setShowResult(true)}
                className="w-full"
                size="lg"
              >
                Find best rates
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-zinc-50 mt-8">
        <Container>
          <div className="py-6 flex justify-between items-baseline">
            <div>
              <h2 className="text-lg font-semibold">Exchange rate alerts</h2>
              <p className="text-sm text-slate-500 mt-2">
                This are the list of exchange rate alerts you have set up for
                your favorite currencies
              </p>
            </div>
            <Button variant="outline" size="sm">
              Create new alert
            </Button>
          </div>
          <RateAlerts />
        </Container>
      </div>

      <SearchResult
        open={showResult}
        onClose={() => setShowResult(false)}
        currencyFrom={currencyFrom}
        currencyTo={currencyTo}
      />
    </>
  )
}
