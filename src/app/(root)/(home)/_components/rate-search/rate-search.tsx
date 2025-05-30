import { CurrencySelect } from '../currency-select/currency-select'
import { Button } from '@/components/ui/button/button'
import { ArrowDownUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useAppContext } from '@/providers/app.provider'
import { Container } from '@/components/ui/container/container'
import { toast } from 'sonner'
import { Input } from '@/components/ui/forms/input/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { formatNumberWithCommas, validateNumberInput, removeCommas } from '@/lib/utils'
import { sendGTMEvent } from '@next/third-parties/google'

export const RateSearch = () => {
  const {
    initialSourceCurrency,
    selectedCurrency: { source, target },
    initialTargetCurrency,
    updateCurrency,
    setResult,
    setShowResult,
    amount,
    setAmount,
  } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  const { isLoading, refetch, isFetching } = useQuery({
    queryKey: ['rates', initialSourceCurrency, initialTargetCurrency],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/rates?sourceCurrency=${source}&targetCurrency=${target}`)
        if (!response.ok) {
          toast.error('Network response was not ok')
          return null
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
    const isSameCurrency = source === target
    const isCurrencyEmpty = !(source && target)

    return isSameCurrency || isCurrencyEmpty
  }

  const trackAnalytics = !!process.env.NEXT_PUBLIC_GTM_ID

  const updateTargetAmount = (value: string) => {
    const validatedAmount = validateNumberInput(value)
    setAmount(formatNumberWithCommas(validatedAmount))
  }

  return (
    <Container
      containerProps={{
        className: 'bg-[#14338c] py-4 md:py-12',
      }}
    >
      <div className="lg:grid grid-cols-12 items-center h-full lg:space-x-20">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="mb-1 font-semibold text-xl md:text-2xl lg:text-4xl lg:leading-[2.7rem] text-white">
            Find and compare exchange rates
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-3">
            We help you find the best exchange rates from different providers in a single place so
            you can make an informed decision on where to convert your money to get the best value
            for it in your local currency or any other currency you want to convert to.
          </p>
        </div>
        <div className="div space-y-4 flex items-center flex-col mt-6 lg:mt-0 border bg-white border-slate-50 shadow rounded-md relative overflow-hidden col-span-12 lg:col-span-7">
          <div className="pt-12 pb-8 px-8 w-full space-y-8">
            <div className="relative pb-2">
              <Label className="absolute text-sm top-[-9px] left-[18px] z-50 bg-white px-1">
                Amount
              </Label>
              <Input
                type="text"
                placeholder="0.00"
                onPaste={(e) => e.preventDefault()}
                className="h-14"
                aria-label="target-amount"
                value={amount}
                onChange={(e) => updateTargetAmount(e.target.value)}
              />
            </div>
            <div className="mt-8 flex flex-col items-start">
              <CurrencySelect
                selectedCurrency={source}
                currencyToHide={target}
                onCurrencySelect={(value) => updateCurrency('source', value)}
                labelProps={{
                  className: 'bg-white',
                  children: 'From',
                }}
              />
              <Button
                variant="ghost"
                className="size-10 p-0 mb-4 mt-3.5 !bg-transparent text-foreground/80"
                onClick={() => {
                  const temp = source
                  updateCurrency('source', target)
                  updateCurrency('target', temp)
                }}
              >
                <span className="sr-only">Click me</span>
                <ArrowDownUp className="size-5" />
              </Button>
              <CurrencySelect
                selectedCurrency={target}
                currencyToHide={source}
                onCurrencySelect={(value) => updateCurrency('target', value)}
                labelProps={{
                  className: 'bg-white',
                  children: 'To',
                }}
              />
            </div>
            <div className="w-full mt-10">
              <Button
                onClick={() => {
                  if (source === initialSourceCurrency && target === initialTargetCurrency) {
                    refetch()
                  } else {
                    const params = new URLSearchParams()
                    params.append('from', source)
                    params.append('to', target)
                    params.append('amount', removeCommas(amount || '1'))
                    router.push(`${pathname}?${params.toString()}`)
                  }

                  if (trackAnalytics) {
                    sendGTMEvent({
                      event: 'compareRates',
                      rate: `${source}-${target}`,
                    })
                  }
                }}
                className="w-full"
                size="lg"
                isLoading={isLoading || isFetching}
                disabled={disableSubmitButton()}
              >
                Compare Rates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
