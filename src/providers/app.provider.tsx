import { useSearchParams } from 'next/navigation'
import React, { createContext, useContext, useMemo, useState } from 'react'

interface AppContextValue {
  initialSourceCurrency: string | null
  initialTargetCurrency: string | null
  sourceCurrency: string
  targetCurrency: string
  showResult: boolean
  showCreateRateAlert: boolean
  selectedAlert: string | null
  result: any[]
  setResult: (result: any[]) => void
  setSourceCurrency: (sourceCurrency: string) => void
  setTargetCurrency: (targetCurrency: string) => void
  setShowResult: (showResult: boolean) => void
  setShowCreateRateAlert: (showCreateRateAlert: boolean) => void
  setSelectedAlert: (selectedAlert: string | null) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({ children }: any) => {
  const searchParams = useSearchParams()
  const initialSourceCurrency = searchParams.get('sourceCurrency')
  const initialTargetCurrency = searchParams.get('targetCurrency')

  const [sourceCurrency, setSourceCurrency] = useState(initialSourceCurrency ?? 'GBP')
  const [targetCurrency, setTargetCurrency] = useState(initialTargetCurrency ?? 'NGN')
  const [showResult, setShowResult] = useState(false)
  const [showCreateRateAlert, setShowCreateRateAlert] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [result, setResult] = useState<any[]>([])

  const value = useMemo(
    () => ({
      initialSourceCurrency,
      initialTargetCurrency,
      sourceCurrency,
      targetCurrency,
      showResult,
      showCreateRateAlert,
      selectedAlert,
      result,
      setResult,
      setSourceCurrency,
      setTargetCurrency,
      setShowResult,
      setShowCreateRateAlert,
      setSelectedAlert,
    }),
    [
      initialSourceCurrency,
      initialTargetCurrency,
      result,
      selectedAlert,
      showCreateRateAlert,
      showResult,
      sourceCurrency,
      targetCurrency,
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
