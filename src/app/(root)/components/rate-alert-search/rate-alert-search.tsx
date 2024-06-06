import { Container } from '@/components/ui/container/container'
import React from 'react'
import { CurrencySelect } from '../currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { ArrowDownUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

interface RateAlertSearchProps {
  sourceCurrency: string
  targetCurrency: string
  setSourceCurrency: (currency: string) => void
  setTargetCurrency: (currency: string) => void
  handleResult: (data: any[]) => void
  initialSourceCurrency: string | null
  initialTargetCurrency: string | null
}

export const RateAlertSearch = ({
  sourceCurrency,
  targetCurrency,
  setSourceCurrency,
  setTargetCurrency,
  handleResult,
  initialSourceCurrency,
  initialTargetCurrency,
}: RateAlertSearchProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const { isLoading } = useQuery({
    queryKey: ['rates', initialSourceCurrency, initialTargetCurrency],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/rates?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        handleResult(data.data ?? [])
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
    <Container>
      <h1 className="mb-1 font-semibold text-lg">Exchange Rate Watch</h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        We help you find the best exchange rates from different providers in a single place so you can make an informed
        decision on where to convert your money to get the best value for it in your local currency or any other
        currency you want to convert to.
      </p>

      <div className="div space-y-4 flex items-center flex-col mt-6 sm:mt-10 border bg-slate-50 shadow rounded-md relative overflow-hidden">
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
    </Container>
  )
}
