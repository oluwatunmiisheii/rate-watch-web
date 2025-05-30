import { validateNumberInput } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface AppContextValue {
  initialSourceCurrency: string | null
  initialTargetCurrency: string | null
  showResult: boolean
  showCreateRateAlert: boolean
  selectedAlert: string | null
  selectedCurrency: {
    source: string
    target: string
  }
  result: any[]
  setResult: (result: any[]) => void
  updateCurrency: (field: 'target' | 'source', value: string) => void
  setShowResult: (showResult: boolean) => void
  setShowCreateRateAlert: (showCreateRateAlert: boolean) => void
  setSelectedAlert: (selectedAlert: string | null) => void
  setAmount: (amount: string) => void
  amount: string
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({ children }: any) => {
  const searchParams = useSearchParams()
  const initialSourceCurrency = searchParams.get('from')
  const initialTargetCurrency = searchParams.get('to')
  const initialAmount = validateNumberInput(searchParams.get('amount') ?? '')

  //todo: rename this to current, also export initial as an object so as to reduce the export from the context
  const [selectedCurrency, setSelectedCurrency] = useState({
    source: initialSourceCurrency ?? 'GBP',
    target: initialTargetCurrency ?? 'NGN',
  })
  const [amount, setAmount] = useState(initialAmount ?? '')

  const [showResult, setShowResult] = useState(false)
  const [showCreateRateAlert, setShowCreateRateAlert] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [result, setResult] = useState<any[]>([])

  const updateCurrency = (field: 'target' | 'source', value: string) => {
    setSelectedCurrency((prev) => ({ ...prev, [field]: value }))
  }

  const value = useMemo(
    () => ({
      initialSourceCurrency,
      initialTargetCurrency,
      selectedCurrency,
      amount,
      showResult,
      showCreateRateAlert,
      selectedAlert,
      result,
      setResult,
      setAmount,
      setShowResult,
      setShowCreateRateAlert,
      setSelectedAlert,
      updateCurrency,
    }),
    [
      initialSourceCurrency,
      initialTargetCurrency,
      selectedCurrency,
      result,
      selectedAlert,
      showCreateRateAlert,
      showResult,
      amount,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return context
}
