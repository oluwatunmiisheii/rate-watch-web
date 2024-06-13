const alertTypes = ['scheduled', 'daily'] as const
type AlertType = (typeof alertTypes)[number]

interface CreateRateWatch {
  alertTypes: AlertType[]
  targetAmount: number | undefined
  sourceCurrency: string
  targetCurrency: string
}
