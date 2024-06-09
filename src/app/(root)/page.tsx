'use client'

import { SearchResult } from './components/search-result/search-result'
import { RateAlerts } from './components/rate-alerts/rate-alerts'
import { CreateRateAlert } from './components/create-rate-alert/create-rate-alert'
import { SignedIn, useUser } from '@clerk/nextjs'
import { useRateAlert } from './hooks/use-rate-alert'
import { DeleteRateAlert } from './components/delete-rate-alert/delete-rate-alert'
import { RateSearch } from './components/rate-search/rate-search'
import { Container } from '@/components/ui/container/container'

export default function Home() {
  const user = useUser()
  const userEmail = user.user?.primaryEmailAddress?.emailAddress
  const { getRateAlerts, createAlert, deleteRateAlert } = useRateAlert(userEmail)

  return (
    <>
      <Container
        containerProps={{
          className: 'bg-[#14338c] py-4 md:py-12',
        }}
      >
        <div className="lg:grid grid-cols-12 items-center h-full lg:space-x-20">
          <div className="col-span-12 lg:col-span-5">
            <h1 className="mb-1 font-semibold text-xl md:text-2xl lg:text-4xl lg:leading-[2.7rem] text-white">
              Find and compare exchange rates in one place
            </h1>
            <p className="text-white/80 text-sm sm:text-base mt-3">
              We help you find the best exchange rates from different providers in a single place so
              you can make an informed decision on where to convert your money to get the best value
              for it in your local currency or any other currency you want to convert to.
            </p>
          </div>
          <RateSearch />
        </div>
      </Container>
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
