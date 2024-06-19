import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import CircleLoader from 'react-spinners/ClipLoader'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-blue-300 transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[#1D4ED8] text-white hover:bg-[#1D4ED8]/90 focus-visible:outline-[#1D4ED8]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        light: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        outline:
          'text-[#1D4ED8] border border-[#1D4ED8] bg-transparent hover:bg-[#1D4ED8] hover:text-white',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-[#1D4ED8] hover:bg-accent',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      isLoading: {
        true: 'opacity-60 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, isLoading }))}
        ref={ref}
        {...props}
      >
        {isLoading && <CircleLoader size={18} color="currentColor" className="mr-1" />}
        {children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
