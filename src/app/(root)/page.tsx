'use client'

import { ArrowDownUp } from 'lucide-react'
import { CurrencySelect } from './_components/currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { useState } from 'react'
import { SearchResult } from './_components/search-result/search-result'
import { Container } from '@/components/ui/container/container'
import { RateAlerts } from './_components/rate-alerts/rate-alerts'
import { CreateRateAlert } from './_components/create-rate-alert/create-rate-alert'
import { SignedIn, useUser } from '@clerk/nextjs'
import { useRateAlert } from './hooks/use-rate-alert'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'

export default function Home() {
  const user = useUser()
  const { getRateAlerts, createAlert } = useRateAlert(
    user.user?.primaryEmailAddress?.emailAddress,
  )
  const [targetCurrency, setTargetCurrency] = useState('USD')
  const [sourceCurrency, setSourceCurrency] = useState('NGN')
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
              selectedCurrency={sourceCurrency}
              onCurrencySelect={setSourceCurrency}
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
                const temp = sourceCurrency
                setSourceCurrency(targetCurrency)
                setTargetCurrency(temp)
              }}
            >
              <span className="sr-only">Click me</span>
              <ArrowDownUp className="size-5" />
            </Button>
          </div>

          <div className="bg-white w-full px-8 py-12">
            <CurrencySelect
              selectedCurrency={targetCurrency}
              onCurrencySelect={setTargetCurrency}
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

          <div className="space-y-4">
            <RateAlerts
              alerts={(getRateAlerts.data?.data?.items ?? [])?.filter(
                (alert: any) => alert.type === 'scheduled',
              )}
              title={'Daily'}
              isLoading={getRateAlerts.isLoading}
            />
            <RateAlerts
              alerts={(getRateAlerts.data?.data?.items ?? [])?.filter(
                (alert: any) => alert.type === 'threshold',
              )}
              title={'Threshold'}
              isLoading={getRateAlerts.isLoading}
            />
            <p className="text-muted-foreground text-sm pt-8">
              Rate watch help you keep track of the exchange rate between two
              currencies. Exchange rate changes frequently and the current rate
              might not be available for long. By creating a rate alert, you can
              get notified when the rate changes to a value you are interested
              in.{' '}
              <span className="text-black border-b border-black border-dotted">
                Terms of use
              </span>
            </p>
          </div>
        </Container>
      </SignedIn>

      <SearchResult
        open={showResult}
        onClose={() => setShowResult(false)}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        createRateAlert={() => {
          setShowResult(false)
          setShowCreateRateAlert(true)
        }}
      />

      <CreateRateAlert
        open={showCreateRateAlert}
        onClose={() => setShowCreateRateAlert(false)}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        onCurrencySelect={(currency, type) => {
          type === 'source'
            ? setSourceCurrency(currency)
            : setTargetCurrency(currency)
        }}
        onSwapCurrency={() => {
          const temp = sourceCurrency
          setSourceCurrency(targetCurrency)
          setTargetCurrency(temp)
        }}
        onCreateAlert={(payload) =>
          createAlert
            .mutateAsync({
              ...payload,
              sourceCurrency,
              targetCurrency,
              email: user.user?.primaryEmailAddress?.emailAddress,
            })
            .then(() => {
              setShowCreateRateAlert(false)
            })
        }
      />
    </>
  )
}
