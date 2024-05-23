import { Button } from '@/components/ui/button/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
} from '@/components/ui/sheet/sheet'
import { ArrowUpDown, X } from 'lucide-react'
import { CurrencySelect } from '../currency-select/currency-select'
import { Input } from '@/components/ui/input/input'
import { CurrencyIcon } from '@/components/ui/currency-icon/currency-icon'
import { Switch } from '@/components/ui/switch/switch'
import { Label } from '@/components/ui/label/label'

interface CreateRateAlertProps {
  open: boolean
  onClose: () => void
  currencyFrom: string
  currencyTo: string
}

export const CreateRateAlert = ({
  currencyFrom = 'USD',
  currencyTo = 'NGN',
  open,
  onClose,
}: CreateRateAlertProps) => {
  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        !open && onClose()
      }}
    >
      <SheetPortal>
        <SheetContent>
          <SheetHeader className="mx-auto w-full max-w-3xl">
            <SheetTitle asChild>
              <div>
                <div className="border-b mb-2 pb-2 text-left">
                  <h3 className="mb-1">Rate watch</h3>
                  <p className="text-muted-foreground font-normal tracking-normal text-base">
                    Get notified when the exchange rate reaches a certain
                    threshold. You can set the rate you want to be notified
                    about.
                  </p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="mx-auto w-full max-w-3xl py-3 px-4">
            <div className="flex flex-col items-center space-y-4 w-full">
              <CurrencySelect
                selectedCurrency={''}
                onCurrencySelect={() => {}} // eslint-disable-line
                labelProps={{
                  className: 'bg-zinc-50',
                  children: 'From',
                }}
              />

              <Button
                variant="outline"
                className="rounded-full size-10 p-0 flex-shrink-0"
              >
                <span className="sr-only">Click me</span>
                <ArrowUpDown className="size-5" />
              </Button>

              <CurrencySelect
                selectedCurrency={''}
                onCurrencySelect={() => {}} // eslint-disable-line
                labelProps={{
                  className: 'bg-zinc-50',
                  children: 'To',
                }}
              />
            </div>

            <div className="flex flex-col space-y-6 mt-6">
              <div>
                <h5>Daily Updates</h5>
                <div className="flex items-center justify-between space-x-4 mt-1">
                  <Label
                    htmlFor="daily-updates"
                    className="font-normal text-muted-foreground tracking-normal leading-[24px]"
                  >
                    Get daily updates on the exchange rate between the
                    currencies you selected.
                  </Label>
                  <Switch id="daily-updates" />
                </div>
              </div>
              <div>
                <h5>Threshold Updates</h5>
                <div className="flex items-center justify-between space-x-4 mt-1">
                  <Label
                    htmlFor="threshold-updates"
                    className="font-normal text-muted-foreground tracking-normal leading-[24px]"
                  >
                    Get notified when the exchange rate reaches a certain
                    threshold.
                  </Label>
                  <Switch id="threshold-updates" />
                </div>
              </div>
              <div>
                <h5></h5>
              </div>
            </div>

            <div className="mb-8">
              <h5>Desired Rates</h5>
              <div className="flex space-x-12 items-center mt-1">
                <div className="flex-shrink-0">
                  <div className="flex items-center">
                    <CurrencyIcon
                      currency={currencyFrom}
                      className="mr-2 flex items-center"
                    />
                    <h4>1 {currencyFrom} =</h4>
                  </div>
                </div>
                <div className="relative flex-1">
                  <Input
                    type="text"
                    pattern="^[0-9]*[.]{0,1}[0-9]*$"
                    aria-label="rate-amount"
                  />
                  <div className="absolute top-1/3 right-6 flex items-center">
                    <CurrencyIcon currency={currencyTo} size="sm" />
                    <span className="text-xs pl-2">{currencyTo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="bg-zinc-50 border-t border-zinc-100">
            <div className="mx-auto w-full max-w-sm py-4 px-0">
              <div className="flex justify-between space-x-4">
                <Button className="flex-1" size="lg">
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
