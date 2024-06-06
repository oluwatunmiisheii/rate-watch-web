'use client'

import { useState } from 'react'
import { SearchResult } from './components/search-result/search-result'
import { RateAlerts } from './components/rate-alerts/rate-alerts'
import { CreateRateAlert } from './components/create-rate-alert/create-rate-alert'
import { SignedIn, useUser } from '@clerk/nextjs'
import { useRateAlert } from './hooks/use-rate-alert'
import { DeleteRateAlert } from './components/delete-rate-alert/delete-rate-alert'
import { RateAlertSearch } from './components/rate-alert-search/rate-alert-search'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const initialSourceCurrency = searchParams.get('sourceCurrency')
  const initialTargetCurrency = searchParams.get('targetCurrency')

  const user = useUser()
  const userEmail = user.user?.primaryEmailAddress?.emailAddress
  const { getRateAlerts, createAlert, deleteRateAlert } = useRateAlert(userEmail)

  const [sourceCurrency, setSourceCurrency] = useState(initialSourceCurrency ?? 'GBP')
  const [targetCurrency, setTargetCurrency] = useState(initialTargetCurrency ?? 'NGN')
  const [showResult, setShowResult] = useState(false)
  const [showCreateRateAlert, setShowCreateRateAlert] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [result, setResult] = useState<any[]>([])

  return (
    <>
      <RateAlertSearch
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        setSourceCurrency={setSourceCurrency}
        setTargetCurrency={setTargetCurrency}
        handleResult={(data) => {
          setResult(data)
          setShowResult(true)
        }}
        initialSourceCurrency={initialSourceCurrency}
        initialTargetCurrency={initialTargetCurrency}
      />

      <SignedIn>
        <RateAlerts
          alerts={getRateAlerts.data?.data || { daily: [], threshold: [] }}
          isLoading={getRateAlerts.isLoading}
          onSelectAlert={(id) => setSelectedAlert(id)}
          openCreateRateAlertModal={() => setShowCreateRateAlert(true)}
        />
      </SignedIn>

      <SearchResult
        open={showResult}
        onClose={() => setShowResult(false)}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
        createRateAlert={() => {
          setShowResult(false)
          setShowCreateRateAlert(true)
        }}
        result={result}
      />

      {showCreateRateAlert && (
        <CreateRateAlert
          open={showCreateRateAlert}
          onClose={() => setShowCreateRateAlert(false)}
          sourceCurrency={sourceCurrency}
          targetCurrency={targetCurrency}
          onCurrencySelect={(currency, type) => {
            type === 'source' ? setSourceCurrency(currency) : setTargetCurrency(currency)
          }}
          onSwapCurrency={() => {
            const temp = sourceCurrency
            setSourceCurrency(targetCurrency)
            setTargetCurrency(temp)
          }}
          onCreateAlert={(payload) => {
            return createAlert
              .mutateAsync({
                ...payload,
                sourceCurrency,
                targetCurrency,
                email: userEmail,
              })
              .then(() => {
                setShowCreateRateAlert(false)
              })
          }}
          status={createAlert.status}
        />
      )}

      <DeleteRateAlert
        open={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onDelete={() => {
          if (selectedAlert) {
            deleteRateAlert.mutateAsync(selectedAlert).then(() => {
              setSelectedAlert(null)
            })
          }
        }}
        status={deleteRateAlert.status}
      />
    </>
  )
}
