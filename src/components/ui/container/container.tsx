import { twMerge } from 'tailwind-merge'

import React from 'react'

type ContainerProps = JSX.IntrinsicElements['div'] & {
  containerProps?: JSX.IntrinsicElements['section']
}

export const Container = ({ className, children, containerProps, ...props }: ContainerProps) => {
  return (
    <section {...containerProps}>
      <div
        {...props}
        className={twMerge('w-full max-w-4xl px-4 py-4 mx-auto sm:px-6 md:py-6', className)}
      >
        {children}
      </div>
    </section>
  )
}
