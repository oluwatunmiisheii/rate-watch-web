import * as React from 'react'
import { Check, ChevronsDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import { twMerge } from 'tailwind-merge'
import { CurrencyIcon } from '@/components/ui/currency-icon/currency-icon'

const currencies = [
  {
    currencyCode: 'USD',
    label: 'US dollar',
  },
  {
    currencyCode: 'GBP',
    label: 'British pound',
  },
  {
    currencyCode: 'CAD',
    label: 'Canadian dollar',
  },
  {
    currencyCode: 'EUR',
    label: 'Euro',
  },
  {
    currencyCode: 'NGN',
    label: 'Nigerian naira',
  },
]

interface CurrencySelectProps {
  selectedCurrency: string
  onCurrencySelect: (value: string) => void
  labelProps: JSX.IntrinsicElements['p']
}

export const CurrencySelect = ({
  selectedCurrency,
  onCurrencySelect,
  labelProps,
}: CurrencySelectProps) => {
  const [open, setOpen] = React.useState(false)

  const selectedCurrencyInfo = React.useMemo(() => {
    return currencies.find(
      (currency) => currency.currencyCode === selectedCurrency,
    )
  }, [selectedCurrency])

  return (
    <div className="relative w-full">
      <p
        className={twMerge(
          'absolute text-sm top-[-9px] left-[18px]',
          labelProps.className,
        )}
      >
        Currency {labelProps.children}
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-14 border-gray-300"
          >
            {selectedCurrency ? (
              <div className="flex items-center">
                <CurrencyIcon
                  currency={selectedCurrencyInfo?.currencyCode ?? ''}
                  className="border rounded-full flex justify-center items-center mr-2"
                />
                {selectedCurrency}
                <span className="mx-3">-</span>
                <span className="text-sm text-zinc-500 font-normal">
                  {selectedCurrencyInfo?.label}
                </span>
              </div>
            ) : (
              'Select currency...'
            )}
            <ChevronsDown
              className={cn(
                'ml-2 size-5 shrink-0 opacity-50 transition-transform duration-200 ease-in-out',
                open ? 'transform rotate-180' : '',
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] max-w-sm p-0">
          <Command>
            <CommandInput placeholder="Search currency..." />
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandList>
              {currencies.map(({ currencyCode, label }) => (
                <CommandItem
                  className="cursor-pointer flex items-center"
                  key={currencyCode}
                  value={currencyCode}
                  onSelect={(currentValue) => {
                    onCurrencySelect(
                      currentValue === selectedCurrency ? '' : currentValue,
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedCurrency === currencyCode
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  <span className="sr-only">Currency icon</span>
                  <CurrencyIcon currency={currencyCode} className="mr-2" />
                  {currencyCode}
                  <span className="mx-3">-</span>
                  <span className="text-sm  text-zinc-500 font-normal">
                    {label}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
