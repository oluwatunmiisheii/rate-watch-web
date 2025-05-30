import { formatNumberWithCommas, removeCommas } from '@/lib/utils'
import { AudioLines } from 'lucide-react'
import Link from 'next/link'

interface SearchResultCardProps {
  target_currency: string
  source_currency: string
  provider_logo: string
  rate: string
  bestRate: boolean
  amount: string
  provider_url: string
  flat_rate: boolean
}

export const SearchesultCard = ({
  target_currency,
  source_currency,
  provider_logo,
  rate,
  bestRate,
  amount,
  provider_url,
  flat_rate,
}: SearchResultCardProps) => {
  const totalAmount = parseFloat(removeCommas(amount || '1')) * parseFloat(rate)
  const formattedAmount = formatNumberWithCommas(totalAmount.toFixed(2))

  return (
    <Link className="relative mt-3" href={provider_url} target="_blank" rel="no referrer">
      <div className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-gray-400 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div
            className="bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${provider_logo})`,
              width: '110px',
              height: '65px',
            }}
          />
          <div>
            <p className="font-semibold">
              {formattedAmount} {target_currency}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-2 py-1 rounded-2xl text-xs text-muted-foreground flex items-center w-fit">
          <span className="flex-shrink-0 mr-1">
            <AudioLines size={12} />
          </span>
          {flat_rate
            ? 'Fixed rate for new and returning users'
            : 'Rates might be slightly lower for returning users'}
        </div>
      </div>
      <span className="absolute py-1 px-3 top-[-10px] left-3 text-[12px] bg-white rounded-2xl text-muted-foreground z-5">
        1 {source_currency} = {rate} {target_currency}
      </span>
      {bestRate && (
        <span className="absolute py-1 px-3 top-[-10px] text-[12px] bg-[#40B270] rounded-2xl text-white z-5 right-3">
          Best rate
        </span>
      )}
    </Link>
  )
}
