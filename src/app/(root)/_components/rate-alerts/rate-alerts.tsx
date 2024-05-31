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
import { MoveRight, Trash2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton/skeleton'

export function RateAlerts({
  alerts = [],
  title,
  isLoading,
}: {
  alerts: any[]
  title: string
  isLoading: boolean
}) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-32 w-full bg-zinc-100 shadow" />
      ) : (
        <Table>
          <TableCaption className="sr-only">A list of your alerts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>{title} alerts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert._id}>
                <TableCell className="font-medium relative">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="np-theme-personal inline-flex border rounded-full">
                        <div
                          className={cn(
                            'currency-flag currency-flag-lg',
                            `currency-flag-${alert.source_currency.toLowerCase()}`,
                          )}
                        />
                      </div>
                      <div className="absolute bottom-[4px] left-[20px]">
                        <div className="np-theme-personal flex bg-white rounded-full items-center justify-center p-0.5 border">
                          <div
                            className={cn(
                              'currency-flag currency-flag-sm',
                              `currency-flag-${alert.target_currency.toLowerCase()}`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span>{alert.source_currency}</span>
                      <span className="px-1 inline-block">
                        <MoveRight size={14} />
                      </span>
                      <span>{alert.target_currency}</span>
                    </div>
                  </div>
                  {alert.type === 'threshold' ? (
                    <p className="text-muted-foreground mt-1 font-normal">
                      Notify me when {''}1 {alert.source_currency} {''}
                      is greater than or equal to {''}
                      {alert.target_amount} {alert.target_currency}
                    </p>
                  ) : (
                    <p className="text-muted-foreground mt-1 font-normal">
                      Notify me of the best {alert.source_currency} to{' '}
                      {alert.target_currency} exchange rate
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-0 hover:bg-transparent"
                  >
                    <Trash2 className="size-[18px]" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
