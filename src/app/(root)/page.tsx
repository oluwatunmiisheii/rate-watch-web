'use client'

import { ArrowDownUp } from 'lucide-react'
import { CurrencySelect } from './_components/currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { useState } from 'react'
import { SearchResult } from './_components/search-result/search-result'
import { Container } from '@/components/ui/container/container'
import { RateAlerts } from './_components/rate-alerts/rate-alerts'
import { CreateRateAlert } from './_components/create-rate-alert/create-rate-alert'
import { SignedIn, useAuth } from '@clerk/nextjs'
import { useRateAlert } from './hooks/use-rate-alert'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'

export default function Home() {
  const { sessionId } = useAuth()
  const { refetch, data, isLoading, error } = useRateAlert(sessionId)
  const [currencyFrom, setCurrencyFrom] = useState('USD')
  const [currencyTo, setCurrencyTo] = useState('NGN')
  const [showResult, setShowResult] = useState(false)
  const [showCreateRateAlert, setShowCreateRateAlert] = useState(false)

  return (
    <>
      <Container>
        <h1 className="mb-1 font-semibold text-lg">Exchange Rate Watch</h1>
        <p className="text-muted-foreground text-base">
          We help you find the best exchange rates from different providers in a
          single place so you can make an informed decision on where to convert
          your money to get the best value for it in your local currency or any
          other currency you want to convert to.
        </p>

        <div className="div space-y-4 flex items-center flex-col mt-10 border bg-zinc-50 shadow rounded-md relative overflow-hidden">
          <div className="py-12 px-8 w-full">
            <CurrencySelect
              selectedCurrency={currencyFrom}
              onCurrencySelect={setCurrencyFrom}
              labelProps={{
                className: 'bg-zinc-50',
                children: 'To',
              }}
            />
          </div>

          <div className="absolute top-[32%]">
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
            <CurrencySelect
              selectedCurrency={currencyTo}
              onCurrencySelect={setCurrencyTo}
              labelProps={{
                className: 'bg-white',
                children: 'To',
              }}
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

      <SignedIn>
        <Container
          containerProps={{
            className: 'mt-8 bg-zinc-50',
          }}
        >
          <div className="py-6 flex justify-between items-baseline  space-y-2">
            <h2 className="text-lg font-semibold">Exchange rate alerts</h2>
            <Button size="sm" onClick={() => setShowCreateRateAlert(true)}>
              Create new alert
            </Button>
          </div>
          <Tabs defaultValue="threshold">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-100">
              <TabsTrigger value="threshold">Threshold</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
            </TabsList>
            <TabsContent value="threshold">
              <RateAlerts
                alerts={(data?.data?.items ?? [])?.filter(
                  (alert: any) => alert.type === 'threshold',
                )}
                title={'Threshold'}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="daily">
              <RateAlerts
                alerts={(data?.data?.items ?? [])?.filter(
                  (alert: any) => alert.type === 'scheduled',
                )}
                title={'Daily'}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
          <p className="text-muted-foreground text-sm mt-12">
            Rate watch help you keep track of the exchange rate between two
            currencies. Exchange rate changes frequently and the current rate
            might not be available for long. By creating a rate alert, you can
            get notified when the rate changes to a value you are interested in.{' '}
            <span className="text-black border-b border-black border-dotted">
              Terms of use
            </span>
          </p>
        </Container>
      </SignedIn>

      <SearchResult
        open={showResult}
        onClose={() => setShowResult(false)}
        currencyFrom={currencyFrom}
        currencyTo={currencyTo}
        createRateAlert={() => {
          setShowResult(false)
          setShowCreateRateAlert(true)
        }}
      />

      <CreateRateAlert
        open={showCreateRateAlert}
        onClose={() => setShowCreateRateAlert(false)}
        currencyFrom={currencyFrom}
        currencyTo={currencyTo}
      />
    </>
  )
}
