'use client'

import { SearchResult } from './_components/search-result/search-result'
import { RateAlerts } from './_components/rate-alerts/rate-alerts'
import { CreateRateAlert } from './_components/create-rate-alert/create-rate-alert'
import { SignInButton, useUser } from '@clerk/nextjs'
import { useRateAlert } from '../hooks/use-rate-alert'
import { DeleteRateAlert } from './_components/delete-rate-alert/delete-rate-alert'
import { RateSearch } from './_components/rate-search/rate-search'
import { Container } from '@/components/ui/container/container'
import EmptyState from '@/components/ui/empty-state/empty-state'
import { Button } from '@/components/ui/button/button'
import Image from 'next/image'

export default function Home() {
  const user = useUser()
  const userEmail = user.user?.primaryEmailAddress?.emailAddress
  const { getRateAlerts, createAlert, deleteRateAlert } = useRateAlert(userEmail)

  return (
    <>
      <RateSearch />
      {user?.isLoaded && user.isSignedIn ? (
        <RateAlerts
          alerts={getRateAlerts.data?.data || { daily: [], threshold: [] }}
          isLoading={getRateAlerts.isLoading}
        />
      ) : (
        <Container className="py-12 md:py-16">
          <EmptyState
            title="Sign in to view or create your rate alerts"
            description="Rate alerts help you keep track of your preferred rates"
            className="border rounded-lg inset-0 p-4 bg-white shadow-neutral-50 py-12 overflow-hidden"
            icon={<Image src="/no-content-one.png" width={180} height={180} alt="" />}
          >
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </EmptyState>
        </Container>
      )}
      <SearchResult />
      <CreateRateAlert createAlert={createAlert} email={userEmail} />
      <DeleteRateAlert deleteRateAlert={deleteRateAlert} />
    </>
  )
}
