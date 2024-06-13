import { SignInButton } from '@clerk/nextjs'
import { Button } from '../button/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title: string
  description: string
  icon?: React.ReactNode
}

export default function EmptyState({
  children,
  title,
  description,
  icon,
  ...props
}: EmptyStateProps) {
  return (
    <div {...props} className={cn('text-center', props.className)}>
      {icon ? (
        <div className="flex justify-center">{icon}</div>
      ) : (
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  )
}
