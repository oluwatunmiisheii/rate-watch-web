'use client'

import { SearchResult } from './components/search-result/search-result'
import { RateAlerts } from './components/rate-alerts/rate-alerts'
import { CreateRateAlert } from './components/create-rate-alert/create-rate-alert'
import { SignedIn, useUser } from '@clerk/nextjs'
import { useRateAlert } from './hooks/use-rate-alert'
import { DeleteRateAlert } from './components/delete-rate-alert/delete-rate-alert'
import { RateAlertSearch } from './components/rate-alert-search/rate-alert-search'

export default function Home() {
  const user = useUser()
  const userEmail = user.user?.primaryEmailAddress?.emailAddress
  const { getRateAlerts, createAlert, deleteRateAlert } = useRateAlert(userEmail)

  return (
    <>
      <RateAlertSearch />
      <SignedIn>
        <RateAlerts
          alerts={getRateAlerts.data?.data || { daily: [], threshold: [] }}
          isLoading={getRateAlerts.isLoading}
        />
      </SignedIn>
      <SearchResult />
      <CreateRateAlert createAlert={createAlert} email={userEmail} />
      <DeleteRateAlert deleteRateAlert={deleteRateAlert} />
    </>
  )
}
