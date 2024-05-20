import { twMerge } from 'tailwind-merge'

import React from 'react'

type ContainerProps = JSX.IntrinsicElements['div']

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={twMerge(
        'w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
