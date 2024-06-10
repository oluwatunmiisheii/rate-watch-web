import React from 'react'
import { CurrencySelect } from '../currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { ArrowDownUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useAppContext } from '@/providers/app.provider'

export const RateSearch = () => {
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

  const { isLoading, refetch } = useQuery({
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

    if (sourceCurrency === '' || targetCurrency === '') {
      return true
    }

    return false
  }

  return (
    <div className="div space-y-4 flex items-center flex-col mt-6 lg:mt-0 border bg-slate-50 shadow rounded-md relative overflow-hidden col-span-12 lg:col-span-7">
      <div className="pt-12 pb-8 px-8 w-full">
        <CurrencySelect
          selectedCurrency={sourceCurrency}
          onCurrencySelect={setSourceCurrency}
          labelProps={{
            className: 'bg-zinc-50',
            children: 'To',
          }}
        />
      </div>

      <div className="absolute top-[30%]">
        <Button
          variant="light"
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
              if (
                sourceCurrency === initialSourceCurrency &&
                targetCurrency === initialTargetCurrency
              ) {
                refetch()
              }

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
  )
}
