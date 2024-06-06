import { Button } from '@/components/ui/button/button'
import { Container } from '@/components/ui/container/container'
import { Skeleton } from '@/components/ui/skeleton/skeleton'

import React from 'react'
import { RateAlertTable } from './rate-alert-table/rate-alert-table'
import { Plus } from 'lucide-react'

interface RateAlertsProps {
  alerts: {
    daily: any[]
    threshold: any[]
  }
  isLoading: boolean
  onSelectAlert: (id: string) => void
  openCreateRateAlertModal: () => void
}

export const RateAlerts = ({ alerts, isLoading, onSelectAlert, openCreateRateAlertModal }: RateAlertsProps) => {
  return (
    <Container
      containerProps={{
        className: 'mt-8 bg-slate-50',
      }}
    >
      <div className="py-6 flex justify-between items-baseline  space-y-2">
        <h2 className="text-lg font-semibold">Exchange rate alerts</h2>
        <Button size="sm" onClick={openCreateRateAlertModal} variant="ghost">
          <Plus className="size-4 mr-1" />
          Create new alert
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Skeleton className="h-32 w-full shadow-sm bg-zinc-100" />
        ) : (
          (['daily', 'threshold'] as const).map((type) => (
            <RateAlertTable key={type} alerts={alerts[type]} title={type} onSelectAlert={onSelectAlert} />
          ))
        )}

        <p className="text-muted-foreground text-sm pt-8">
          Rate watch help you keep track of the exchange rate between two currencies. Exchange rate changes frequently
          and the current rate might not be available for long. By creating a rate alert, you can get notified when the
          rate changes to a value you are interested in.{' '}
          <span className="text-[#1D4ED8] border-b border-[#1D4ED8] border-dotted">Terms of use</span>
        </p>
      </div>
    </Container>
  )
}
