import { cn } from '@/lib/utils'
import React from 'react'

type CurrencyIconProps = JSX.IntrinsicElements['div'] & {
  currency: string
  size?: 'sm' | 'lg'
}

export const CurrencyIcon = ({ currency, className, size }: CurrencyIconProps) => {
  return (
    <div className="np-theme-personal leading-[0]">
      <div
        className={cn(
          'currency-flag',
          `currency-flag-${currency.toLowerCase()}`,
          size === 'sm' && 'currency-flag-sm',
          size === 'lg' && 'currency-flag-lg',
          className,
        )}
      />
    </div>
  )
}
