import { Button } from '@/components/ui/button/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import { cn } from '@/lib/utils'
import { Trash } from 'lucide-react'

const alerts = [
  {
    id: 'INV001',
    currencyFrom: 'USD',
    currencyTo: 'NGN',
  },
  {
    id: 'INV002',
    currencyFrom: 'EUR',
    currencyTo: 'NGN',
  },
  {
    id: 'INV003',
    currencyFrom: 'GBP',
    currencyTo: 'NGN',
  },
  {
    id: 'INV004',
    currencyFrom: 'CAD',
    currencyTo: 'NGN',
  },
]

export function RateAlerts() {
  return (
    <Table>
      <TableCaption className="sr-only">A list of your alerts</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Alert</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="font-medium relative">
              <div className="relative">
                <div className="np-theme-personal inline-flex border rounded-full">
                  <div
                    className={cn(
                      'currency-flag currency-flag-lg',
                      `currency-flag-${alert.currencyFrom.toLowerCase()}`,
                    )}
                  />
                </div>

                <div className="absolute bottom-[4px] left-[20px]">
                  <div className="np-theme-personal flex bg-white rounded-full items-center justify-center p-0.5 border">
                    <div
                      className={cn(
                        'currency-flag currency-flag-sm',
                        `currency-flag-${alert.currencyTo.toLowerCase()}`,
                      )}
                    />
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mt-1 font-normal">
                Notify me when {''}
                <span className="font-semibold text-foreground">1 USD</span> is
                greater than or equal to {''}
                <span className="font-semibold text-foreground">500 NGN</span>
              </p>
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent border-0 hover:bg-transparent"
              >
                <Trash className="size-[18px]" />
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
