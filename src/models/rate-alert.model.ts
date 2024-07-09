const alertTypes = ['scheduled', 'daily'] as const
type AlertType = (typeof alertTypes)[number]

interface CreateRateWatch {
  alertTypes: AlertType[]
  targetAmount: number | undefined
  sourceCurrency: string
  targetCurrency: string
}

interface RateAlertBase {
  email: string
  end_date: Date
  start_date: Date
  next_notification: Date | null
  source_currency: string
  target_currency: string
  type: AlertType
  __v: number
  _id: string
}

export interface DailyRateAlert extends RateAlertBase {
  target_amount: null
}

export interface ThresholdRateAlert extends RateAlertBase {
  target_amount: number
}
