import { Button } from '@/components/ui/button/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
} from '@/components/ui/sheet/sheet'
import { ArrowUpDown, Terminal } from 'lucide-react'
import { CurrencySelect } from '../currency-select/currency-select'
import { Input } from '@/components/ui/input/input'
import { CurrencyIcon } from '@/components/ui/currency-icon/currency-icon'
import { Switch } from '@/components/ui/switch/switch'
import { Label } from '@/components/ui/label/label'
import { ScrollArea } from '@/components/ui/scroll-area/scroll-area'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert/alert'
import { useState } from 'react'

interface CreateRateAlertProps {
  open: boolean
  onClose: () => void
  sourceCurrency: string
  targetCurrency: string
  onCurrencySelect: (value: string, type: 'source' | 'target') => void
  onSwapCurrency: () => void
  onCreateAlert: (payload: {
    alertTypes: string[]
    targetAmount?: number | undefined
  }) => void
}

export const CreateRateAlert = ({
  sourceCurrency = 'USD',
  targetCurrency = 'NGN',
  open,
  onClose,
  onCurrencySelect,
  onSwapCurrency,
  onCreateAlert,
}: CreateRateAlertProps) => {
  const [alertTypes, setAlertTypes] = useState<string[]>([])
  const [targetAmount, setTargetAmount] = useState<number | undefined>()

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        !open && onClose()
      }}
    >
      <SheetPortal>
        <SheetContent className="w-full sm:max-w-0 sm:min-w-full flex flex-col">
          <SheetHeader className="mx-auto w-full max-w-3xl">
            <SheetTitle asChild>
              <div>
                <div className="border-b mb-2 pb-2 text-left">
                  <h3 className="mb-1">Rate watch</h3>
                  <p className="text-muted-foreground font-normal tracking-normal text-sm leading-5">
                    Get notified when the exchange rate reaches a certain
                    threshold. You can set the rate you want to be notified
                    about.
                  </p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          <ScrollArea
            className="overflow-y-auto flex-1 pb-12"
            scrollbarProps={{
              className: 'w-0',
            }}
          >
            <div className="mx-auto w-full max-w-3xl py-8">
              <div className="flex flex-col items-center space-y-4 w-full">
                <CurrencySelect
                  selectedCurrency={sourceCurrency}
                  onCurrencySelect={(currency) =>
                    onCurrencySelect(currency, 'source')
                  }
                  labelProps={{
                    className: 'bg-white',
                    children: 'From',
                  }}
                />

                <Button
                  variant="outline"
                  className="rounded-full size-10 p-0 flex-shrink-0"
                  onClick={onSwapCurrency}
                  type="button"
                >
                  <span className="sr-only">Click me</span>
                  <ArrowUpDown className="size-5" />
                </Button>

                <CurrencySelect
                  selectedCurrency={targetCurrency}
                  onCurrencySelect={(currency) =>
                    onCurrencySelect(currency, 'target')
                  }
                  labelProps={{
                    className: 'bg-white',
                    children: 'To',
                  }}
                />
              </div>

              <Alert className="my-8" variant="secondary">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  <a
                    href="google.com"
                    className="border-b-2 border-dotted border-slate-900 font-semibold"
                  >
                    Nala
                  </a>{' '}
                  is offering the best rate at 1 USD to 412 NGN.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col space-y-6 mt-6 pb-16">
                <div>
                  <h5>Daily Updates</h5>
                  <div className="flex items-center justify-between space-x-4 mt-0.5">
                    <Label
                      htmlFor="daily-updates"
                      className="font-normal text-muted-foreground tracking-normal leading-5 text-sm"
                    >
                      Get daily updates on the exchange rate between the
                      currencies you selected.
                    </Label>
                    <Switch id="daily-updates" />
                  </div>
                </div>
                <div>
                  <h5>Threshold Updates</h5>
                  <div className="flex items-center justify-between space-x-4 mt-0.5">
                    <Label
                      htmlFor="threshold-updates"
                      className="font-normal text-muted-foreground tracking-normal leading-5 text-sm"
                    >
                      Get notified when the exchange rate reaches a certain
                      threshold.
                    </Label>
                    <Switch id="threshold-updates" />
                  </div>
                </div>
                <div>
                  <h5>Desired Rates</h5>
                  <div className="flex space-x-12 items-center mt-0.5">
                    <div className="flex-shrink-0">
                      <div className="flex items-center">
                        <CurrencyIcon
                          currency={sourceCurrency}
                          className="mr-2 flex items-center"
                        />
                        <h4>1 {sourceCurrency} =</h4>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        pattern="^[0-9]*[.]{0,1}[0-9]*$"
                        aria-label="rate-amount"
                      />
                      <div className="absolute top-1/3 right-6 flex items-center">
                        <CurrencyIcon currency={targetCurrency} size="sm" />
                        <span className="text-xs pl-2">{targetCurrency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="bg-zinc-50 border-t border-zinc-100 absolute bottom-0 w-full left-0">
            <div className="mx-auto w-full max-w-sm py-4 px-4 sm:px-0">
              <div className="flex justify-between space-x-4">
                <Button
                  className="flex-1"
                  size="lg"
                  type="button"
                  onClick={() =>
                    onCreateAlert({
                      alertTypes,
                      targetAmount,
                    })
                  }
                >
                  Create alert
                </Button>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
