import { Container } from '@/components/ui/container/container'
import React from 'react'
import { CurrencySelect } from '../currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { ArrowDownUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useAppContext } from '@/providers/app.provider'

export const RateAlertSearch = () => {
  const {
    sourceCurrency,
    initialSourceCurrency,
    targetCurrency,
    initialTargetCurrency,
    setSourceCurrency,
    setTargetCurrency,
    setResult,
    setShowResult,
  } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  const { isLoading } = useQuery({
    queryKey: ['rates', initialSourceCurrency, initialTargetCurrency],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/rates?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setResult(data.data ?? [])
        setShowResult(true)
        return data
      } catch (error) {
        console.error(error)
      }
    },
    enabled: !!initialSourceCurrency && !!initialTargetCurrency,
  })

  const disableSubmitButton = () => {
    if (sourceCurrency === targetCurrency) {
      return true
    }

    if (sourceCurrency === initialSourceCurrency && targetCurrency === initialTargetCurrency) {
      return true
    }

    return false
  }

  return (
    <Container
      containerProps={{
        className: 'bg-[#14338c] py-4 md:py-12',
      }}
    >
      <div className="lg:grid grid-cols-12 items-center h-full gap-12">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="mb-1 font-semibold text-lg lg:text-4xl text-white">Exchange Rate Watch</h1>
          <p className="text-white/80 text-sm sm:text-base mt-3">
            We help you find the best exchange rates from different providers in a single place so
            you can make an informed decision on where to convert your money to get the best value
            for it in your local currency or any other currency you want to convert to.
          </p>
        </div>
        <div className="div space-y-4 flex items-center flex-col mt-6 md:mt-0 border bg-slate-50 shadow rounded-md relative overflow-hidden col-span-12 lg:col-span-7">
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
                onClick={() => {
                  const params = new URLSearchParams()
                  params.append('sourceCurrency', sourceCurrency)
                  params.append('targetCurrency', targetCurrency)
                  router.push(`${pathname}?${params.toString()}`)
                }}
                className="w-full"
                size="lg"
                isLoading={isLoading}
                disabled={disableSubmitButton()}
              >
                Find best rates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
