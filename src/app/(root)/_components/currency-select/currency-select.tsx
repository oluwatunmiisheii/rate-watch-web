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

const currencies = [
  {
    icon: 'currency-flag-usd',
    currencyCode: 'USD',
    label: 'US dollar',
  },
  {
    icon: 'currency-flag-gbp',
    currencyCode: 'GBP',
    label: 'British pound',
  },
  {
    icon: 'currency-flag-cad',
    currencyCode: 'CAD',
    label: 'Canadian dollar',
  },
  {
    icon: 'currency-flag-eur',
    currencyCode: 'EUR',
    label: 'Euro',
  },
  {
    icon: 'currency-flag-ngn',
    currencyCode: 'NGN',
    label: 'Nigerian naira',
  },
]

interface CurrencySelectProps {
  selectedCurrency: string
  onCurrencySelect: (value: string) => void
}

export const CurrencySelect = ({
  selectedCurrency,
  onCurrencySelect,
}: CurrencySelectProps) => {
  const [open, setOpen] = React.useState(false)

  const selectedCurrencyInfo = React.useMemo(() => {
    return currencies.find(
      (currency) => currency.currencyCode === selectedCurrency,
    )
  }, [selectedCurrency])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-16 border-gray-300"
        >
          {selectedCurrency ? (
            <span className="flex items-center">
              <i
                className={cn('mr-2 currency-flag', selectedCurrencyInfo?.icon)}
              />
              {selectedCurrency}
              <span className="mx-3">-</span>
              <span className="text-sm text-zinc-500 font-normal">
                {selectedCurrencyInfo?.label}
              </span>
            </span>
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
            {currencies.map(({ currencyCode, icon, label }) => (
              <CommandItem
                className="cursor-pointer"
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
                <i className={cn('mr-2 currency-flag', icon)} />
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
  )
}
