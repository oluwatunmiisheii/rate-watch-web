'use client'

import { Button } from '@/components/ui/button/button'
import { Container } from '@/components/ui/container/container'
import Image from 'next/image'
import Link from 'next/link'
import { useRateAlert } from '../hooks/use-rate-alert'
import { redirect, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Unsubscribe() {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const sourceCurrency = searchParams.get('sourceCurrency')
  const targetCurrency = searchParams.get('targetCurrency')

  const { deleteRateAlert } = useRateAlert()
  const router = useRouter()

  if (!id) {
    redirect('/')
  }

  return (
    <Container className="sm:my-5 h-[60vh] flex flex-col items-center justify-center">
      <Image src="/unsubscribe.svg" alt="Unsubscribe" width={200} height={200} className="mb-8" />
      <h3 className="text-2xl text-center">Are you sure about unsubscribing?</h3>
      <p className="text-foreground text-center">
        if you unsubscribe you will not receive any more daily alerts for{' '}
        <span className="text-foreground font-semibold">
          {sourceCurrency} to {targetCurrency}
        </span>{' '}
        exchange rate
      </p>
      <div className="flex space-x-4 mt-8">
        <Button
          variant="light"
          onClick={() => {
            deleteRateAlert.mutateAsync(id).then(() => router.replace('/'))
          }}
        >
          Unsubscribe
        </Button>
        <Link href="/" replace>
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </Container>
  )
}
