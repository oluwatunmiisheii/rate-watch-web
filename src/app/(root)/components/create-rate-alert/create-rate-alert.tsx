import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet/sheet'
import { ArrowUpDown, Terminal } from 'lucide-react'
import { CurrencySelect } from '../currency-select/currency-select'
import { Input } from '@/components/ui/forms/input/input'
import { CurrencyIcon } from '@/components/ui/currency-icon/currency-icon'
import { Switch } from '@/components/ui/forms/switch/switch'
import { Label } from '@/components/ui/forms/label/label'
import { ScrollArea } from '@/components/ui/scroll-area/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert/alert'
import { useAppContext } from '@/providers/app.provider'
import { UseMutationResult } from '@tanstack/react-query'
import { formatNumberWithCommas, validateNumberInput } from '@/lib/utils'

interface CreateRateAlertProps {
  createAlert: UseMutationResult<any, Error, any, unknown>
  email?: string
}

export const CreateRateAlert = ({ createAlert, email }: CreateRateAlertProps) => {
  const {
    sourceCurrency,
    targetCurrency,
    setSourceCurrency,
    setTargetCurrency,
    showCreateRateAlert,
    setShowCreateRateAlert,
  } = useAppContext()

  const [alertTypes, setAlertTypes] = useState<string[]>([])
  const [targetAmount, setTargetAmount] = useState<string>('')

  const updateAlertTypes = (checked: boolean, type: string) => {
    type === 'threshold' && setTargetAmount('')
    if (checked) {
      setAlertTypes([...alertTypes, type])
    } else {
      setAlertTypes(alertTypes.filter((alert) => alert !== type))
    }
  }

  const updateTargetAmount = (value: string) => {
    const validatedAmount = validateNumberInput(value)
    setTargetAmount(formatNumberWithCommas(validatedAmount))
  }

  const shouldDisableCreateButton = () => {
    const isMissingRequiredFields = !alertTypes.length || !sourceCurrency || !targetCurrency
    const isThresholdAlertMissingAmount = alertTypes.includes('threshold') && !targetAmount
    const isSameCurrency = sourceCurrency === targetCurrency

    return isMissingRequiredFields || isThresholdAlertMissingAmount || isSameCurrency
  }

  const resetFormValues = () => {
    setAlertTypes([])
    setTargetAmount('')
  }

  return (
    <Sheet
      open={showCreateRateAlert}
      onOpenChange={(open) => {
        if (!open) {
          resetFormValues()
          setShowCreateRateAlert(false)
        }
      }}
    >
      <SheetContent className="w-full sm:max-w-0 sm:min-w-full flex flex-col h-full" side="bottom">
        <SheetHeader className="mx-auto w-full max-w-3xl pt-6">
          <SheetTitle asChild>
            <div>
              <div className="border-b mb-2 pb-2 text-left">
                <h3 className="mb-1">Rate watch</h3>
                <p className="text-muted-foreground font-normal tracking-normal text-sm leading-5">
                  Get notified when the exchange rate reaches a certain threshold. You can set the
                  rate you want to be notified about.
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
                currencyToHide={targetCurrency}
                onCurrencySelect={(currency) => setSourceCurrency(currency)}
                labelProps={{
                  className: 'bg-white',
                  children: 'From',
                }}
              />

              <Button
                variant="light"
                className="rounded-full size-10 p-0 flex-shrink-0"
                onClick={() => {
                  const temp = sourceCurrency
                  setSourceCurrency(targetCurrency)
                  setTargetCurrency(temp)
                }}
                type="button"
              >
                <span className="sr-only">Click me</span>
                <ArrowUpDown className="size-5" />
              </Button>

              <CurrencySelect
                selectedCurrency={targetCurrency}
                currencyToHide={sourceCurrency}
                onCurrencySelect={(currency) => setTargetCurrency(currency)}
                labelProps={{
                  className: 'bg-white',
                  children: 'To',
                }}
              />
            </div>

            <div className="flex flex-col space-y-6 py-16">
              <div>
                <h5>Daily Updates</h5>
                <div className="flex items-center justify-between space-x-4 mt-0.5">
                  <Label
                    htmlFor="daily-updates"
                    className="font-normal text-muted-foreground tracking-normal leading-5 text-sm"
                  >
                    Get daily updates on the exchange rate between the currencies you selected.
                  </Label>
                  <Switch
                    id="daily-updates"
                    onCheckedChange={(checked) => updateAlertTypes(checked, 'scheduled')}
                  />
                </div>
              </div>
              <div>
                <h5>Threshold Updates</h5>
                <div className="flex items-center justify-between space-x-4 mt-0.5">
                  <Label
                    htmlFor="threshold-updates"
                    className="font-normal text-muted-foreground tracking-normal leading-5 text-sm"
                  >
                    Get notified when the exchange rate reaches a certain threshold.
                  </Label>
                  <Switch
                    id="threshold-updates"
                    onCheckedChange={(checked) => updateAlertTypes(checked, 'threshold')}
                  />
                </div>
              </div>

              {alertTypes.includes('threshold') && (
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
                        placeholder="0.00"
                        onChange={(e) => updateTargetAmount(e.target.value)}
                        onPaste={(e) => e.preventDefault()}
                        aria-label="target-amount"
                        value={targetAmount}
                      />
                      <div className="absolute top-1/3 right-6 flex items-center">
                        <CurrencyIcon currency={targetCurrency} size="sm" />
                        <span className="text-xs pl-2">{targetCurrency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="bg-zinc-50 border-t border-zinc-100 absolute bottom-0 w-full left-0">
          <div className="mx-auto w-full max-w-md py-4 px-4 sm:px-0">
            <div className="flex justify-between space-x-4">
              <Button
                className="flex-1"
                size="lg"
                type="button"
                onClick={() => {
                  createAlert
                    .mutateAsync({
                      alertTypes,
                      targetAmount: parseFloat(targetAmount.replace(/,/g, '')),
                      sourceCurrency,
                      targetCurrency,
                      email,
                    })
                    .then(() => {
                      resetFormValues()
                      setShowCreateRateAlert(false)
                    })
                }}
                isLoading={createAlert.status === 'pending'}
                disabled={shouldDisableCreateButton()}
              >
                Create Alert
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const BestRateAlert = () => {
  return (
    <Alert className="my-8 hidden" variant="secondary">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        <a href="google.com" className="border-b-2 border-dotted border-slate-900 font-semibold">
          Nala
        </a>{' '}
        is offering the best rate at 1 USD to 412 NGN.
      </AlertDescription>
    </Alert>
  )
}
